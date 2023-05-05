import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Audio,
} from "react-native";
import { HStack, Spacer, Flex, Divider } from "@react-native-material/core";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CountDown from "react-native-countdown-component";

import { useState } from "react";

import styles from "../styles/styles.js";

const profilePic = (url) => {
  const style = StyleSheet.create({
    pfp: {
      height: 150,
      width: 150,
      borderColor: "transparent",
      borderRadius: 100,
    },
  });
  return <Image source={{ uri: url }} style={style.pfp} />;
};

const UserIcon = (userData) => {
  return (
    <View style={[styles.general.container, { backgroundColor: "#0000" }]}>
      {profilePic(userData.profile_picture)}
      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
          color: "white",
          fontSize: 15,
        }}
      >
        {userData.name}
      </Text>
    </View>
  );
};

export default Call = (
  navigation,
  peerStream,
  display_name,
  profile_picture,
  socialMedia
) => {
  const [Mic, setMic] = useState(true);
  const [camera, setCamera] = useState(false);
  const [Counter, setCounter] = useState(6 * 60);
  const style = StyleSheet.create({
    commandBar: {
      backgroundColor: "black",
      paddingTop: 20,
      paddingBottom: 30,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      justifyContent: "space-evenly",
      width: "100%",
    },
  });
  return (
    <Flex
      full
      style={[
        styles.general.container,
        { backgroundColor: styles.home.startButton.backgroundColor },
      ]}
    >
      <CountDown
        until={Counter}
        onFinish={() => {}}
        onChange={(n) => {
          if (n === 3 * 60) {
            setCamera(true);
          }
        }}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: styles.primary }}
        timeLabelStyle={{ color: "white" }}
        size={20}
        style={{
          margin: "12%",
        }}
        timeToShow={["M", "S"]}
      />
      <Spacer />
      {UserIcon({
        name: display_name,
        profile_picture: profile_picture,
      })}
      <Spacer />

      {
        // set audio stream play
        //<Audio src={peerStream.toURI()} />
      }

      <HStack style={style.commandBar}>
        <Pressable
          style={{
            backgroundColor: camera ? "black" : "white",
            width: 50,
            height: 50,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setCamera(!camera);
          }}
        >
          <Feather
            name={camera ? "camera" : "camera-off"}
            size={20}
            color={camera ? "white" : "black"}
          />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Mic ? "black" : "white",
            width: 50,
            height: 50,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setMic(!Mic);
          }}
        >
          <FontAwesome
            name={Mic ? "microphone" : "microphone-slash"}
            size={20}
            color={Mic ? "white" : "black"}
          />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "red",
            width: 50,
            height: 50,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("EndOfCall", {
              peerData: {
                display_name: display_name,
                profile_picture: profile_picture,
                socials: socialMedia,
              },
            });
          }}
        >
          <Feather name="x" size={20} color="white" />
        </Pressable>
      </HStack>
    </Flex>
  );
};
