import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Text,
  Easing,
  Image,
} from "react-native";
import { HStack, Spacer, Flex } from "@react-native-material/core";
import styles from "../styles/styles.js";
import queryMatchmaking from "../components/callLogic.js";
import { mediaDevices } from "react-native-webrtc";
import { useRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Peer from "react-native-peerjs";

const Home = ({ navigation }, props) => {
  const [clicked, setClicked] = useState(false);
  const [stream, setStream] = useState(null);
  const [caller, setCaller] = useState(null);
  const [connected, setConnected] = useState(false);

  if (stream && caller) {
    navigation.navigate("Call", {
      peerStream: caller.stream,
      display_name: caller.display_name,
      profile_picture: caller.profile_picture,
      socialsMedia: caller.socialMedia,
    });
  }

  function StartButton(navigation) {
    const animation = new Animated.Value(1);
    const fade1 = new Animated.Value(1);
    const fade2 = new Animated.Value(1);
    const halo = new Animated.Value(0);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    let peer = useRef(new Peer()).current;
    peer.on("open", (id) => onOpen(id));
    peer.on("error", (err) => {
      console.log(err);
    });
    peer.on("call", (call, stream) => onCall(call, stream));
    peer.on("close", () => {
      firestore().collection("matchmaking").doc(user.uid).delete();
    });
    peer.on("error", (err) => console.log(err));

    const onCall = (call, stream) => {
      console.log("Call received");
      call.answer(stream);
      console.log("Answered call");
      setConnected(true);
      call.on("stream", (remoteStream) => {
        console.log("Stream received");
        firestore().collection("matchmaking").doc(user.id).delete();
        setCaller({
          peerStream: remoteStream,
          display_name: peerInfo.display_name,
          profile_picture: peerInfo.profile_picture,
          socialsMedia: peerInfo.socialMedia,
        });
      });
    };

    const onOpen = async (id) => {
      console.log("My peer ID is: " + id);
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        //video: true,
      });

      if (stream) {
        peer.on("call", (call) => onCall(call, stream));
      } else {
        console.log("Stream not found");
      }
    };

    clicked && !caller
      ? Animated.loop(
          Animated.sequence([
            Animated.timing(halo, {
              toValue: 20,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(halo, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start()
      : null;

    const style = StyleSheet.create({
      knob: {
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 1,
        width: 20,
        height: 20,
        margin: "6%",
        opacity: fade2,
      },
      secondaryText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
      },
    });
    const onClick = async () => {
      const user = (
        await firestore().collection("users").doc(auth().currentUser.uid).get()
      ).data();
      console.log(
        peer.id,
        user.display_name,
        user.profile_picture,
        user.socials
      );
      // enter matchmaking db with user info
      firestore().collection("matchmaking").add({
        peerID: peer.id,
        display_name: user.display_name,
        profile_picture: user.profile_picture,
        socialMedia: user.socials,
      });
      // search every 5 seconds for a peer, then stop when one is found
      peer
        ? setInterval(() => {
            queryMatchmaking(peer, stream);
          }, 5000)
        : null;

      connected ? clearInterval(interval) : null;
    };

    return (
      <AnimatedPressable
        onPress={() => {
          setClicked(!clicked);
          onClick();
          // TODO: refactor to include callLogic.js

          //startMatchmaking().then(() => {
          //Animated.parallel([
          //  Animated.timing(animation, {
          //    toValue: 30,
          //    duration: 5000,
          //    useNativeDriver: true,
          //  }),
          //  Animated.timing(fade1, {
          //    toValue: 0,
          //    duration: 300,
          //    useNativeDriver: true,
          //  }),
          //  Animated.timing(fade2, {
          //    toValue: 0,
          //    duration: 300,
          //    useNativeDriver: true,
          //  }),
          //]).start();
          //});
        }}
        style={[
          styles.home.startButton,
          {
            transform: [{ scale: animation }],
            shadowRadius: halo,
            shadowColor: "#9F93F5",
            shadowOpacity: 2,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
        ]}
      >
        <Flex fill>
          <Spacer />
          <Animated.View
            style={{
              opacity: fade1,
              marginHorizontal: 25,
              padding: 8,
            }}
          >
            <Text
              style={[
                style.secondaryText,
                {
                  fontSize: 14,
                },
              ]}
            >
              Knock to meet someone new
            </Text>
          </Animated.View>
          <Spacer />
          <HStack>
            <Spacer />
            <Animated.View style={[style.knob]} />
          </HStack>
          <Spacer />
          <Spacer />
          <Spacer />
        </Flex>
      </AnimatedPressable>
    );
  }

  return (
    <View style={styles.general.container}>
      {StartButton(props.navigation)}
    </View>
  );
};

export default Home;
