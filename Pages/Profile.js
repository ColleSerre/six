import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Animated,
} from "react-native";
import { HStack, Spacer, Flex } from "@react-native-material/core";
import styles from "../styles/styles.js";
import { launchCamera } from "react-native-image-picker";
import { permissions } from "react-native-webrtc";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default ProfilePage = (props) => {
  const firstLogin = !props.firstLogin ? false : true;
  const animation = new Animated.Value(0);
  Animated.timing(animation, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: true,
  }).start();

  const Instructions = () => {
    if (firstLogin) {
      const animation2 = new Animated.Value(0);
      setTimeout(
        () =>
          Animated.timing(animation2, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }).start(),
        2000
      );
      return (
        <Animated.Text style={[styles.general.text, { opacity: animation2 }]}>
          {
            "First, take a picture of a random thing around you.\nKeep your face a surprise for later."
          }
        </Animated.Text>
      );
    } else {
      return <Text>Profile picture:</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.general.container}>
      <Flex fill style={{ marginHorizontal: 8 }}>
        <Spacer />
        <HStack>
          <Animated.Text
            style={[
              styles.general.text,
              { opacity: firstLogin ? animation : 1 },
            ]}
          >
            {firstLogin ? "Create your profile:" : "Edit Profile"}
          </Animated.Text>
        </HStack>
        <Instructions />
        <Spacer />
        <TakePictureButton firstLogin={true} />
      </Flex>
    </SafeAreaView>
  );
};

export const TakePictureButton = (props) => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    console.log(photo);
    if (photo) {
      firestore().collection("users").doc(auth().currentUser.uid).set(
        {
          profile_picture: photo,
        },
        { merge: true }
      );
    }
  }, [photo]);
  const buttonAnimation = new Animated.Value(0);
  const textAnimation = new Animated.Value(0);
  const takePicture = async () => {
    const cameraOptions = { mediaType: "photo", cameraType: "front" };
    const response = await permissions.query({ name: "camera" });
    console.log(response);
    if (response === "granted") {
      launchCamera(cameraOptions, (response) => {
        if (response["errorCode"] == "camera_unavailable") {
          console.log("Camera unavailable");
          return "https://picsum.photos/200";
        }
        if (response.assets) {
          return response.assets[0].uri;
        }
      });
    } else {
      permissions.request({ name: "camera" }).then((response) => {
        takePicture();
      });
    }
  };
  setTimeout(
    () =>
      Animated.parallel([
        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(),
    6000
  );
  return (
    <Flex fill>
      <HStack>
        <Spacer />

        <Animated.View
          style={{
            backgroundColor: "white",
            width: "40%",
            borderRadius: 8,
            padding: 8,
            opacity: props.firstLogin ? buttonAnimation : 1,
          }}
        >
          <Button
            title={"Open Camera"}
            color={"black"}
            onPress={() => takePicture().then((uri) => setPhoto(uri))}
          />
        </Animated.View>
        <Spacer />
      </HStack>
      <Spacer />
      <Animated.Text
        style={{ color: "black", textAlign: "center", opacity: textAnimation }}
      >
        Remember we have your UCL email so no dick picks gentlemen
      </Animated.Text>
    </Flex>
  );
};
