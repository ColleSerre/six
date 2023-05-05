import { TextInput, StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState, useRef, Component, useMemo } from "react";
import { HStack, Spacer, Flex, VStack } from "@react-native-material/core";
import { primaryButton } from "../components/buttons.js";
import auth from "@react-native-firebase/auth";
import styles from "../styles/styles.js";
import firestore from "@react-native-firebase/firestore";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const InfoSheet = (ref, message, illustration) => {
  return (
    <View>
      <BottomSheet ref={ref}>
        <VStack>
          <Text>{message}</Text>
          <Image source={illustration} />
        </VStack>
      </BottomSheet>
    </View>
  );
};

export default AuthPage = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["40%"], []);
  const openModal = () => {
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
      <Flex fill style={styles.general.container}>
        <Spacer />
        <HStack>
          <Spacer />
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 8,
              borderColor: "#8d76ff",
              borderWidth: 3,
            }}
          />
          <Spacer />
        </HStack>
        <Spacer />
        <TextInput
          value={email}
          onChangeText={(newText) => setEmail(newText)}
          placeholder="Enter your UCL Email"
          placeholderTextColor={"black"}
          style={[styles.auth.textInput, { width: "90%" }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>{err}</Text>
        <Spacer />
        <HStack fill>
          <Spacer />
          {primaryButton({
            title: "Sign Up",
            onPress: () => {
              if (email.endsWith("@ucl.ac.uk")) {
                setValidEmail(true);
                const characters =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
                const password = Array(32)
                  .fill(characters)
                  .map(function (x) {
                    return x[Math.floor(Math.random() * x.length)];
                  })
                  .join("");
                auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    const user = auth().currentUser;
                    //user.sendEmailVerification();
                    firestore().collection("users").doc(user.uid).set({
                      email: email,
                      uid: user.uid,
                      emailVerified: false,
                    });
                  })
                  .catch((err) => setErr(err.code));
                const actionCodeSettings = {
                  url: "https://www.example.com/",
                  iOS: {
                    bundleId: "com.palmer.six",
                  },
                  handleCodeInApp: true,
                };
                sendSignInLinkToEmail(getAuth(), email, actionCodeSettings)
                  .then(() => openModal())
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                  });
              } else {
                openModal();
              }
            },
          })}
          <Spacer />
        </HStack>
        <Spacer />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={{
            borderRadius: 120,
            margin: 0.5,
          }}
        >
          <VStack fill>
            <HStack>
              <Spacer />
              <Image
                style={{ width: "20%", height: "20%", padding: "25%" }}
                source={
                  validEmail
                    ? require("../assets/img/016-mail-letter-heart-love.png")
                    : require("../assets/img/123-man-video-tutorial-course-01.png")
                }
              />
              <Spacer />
            </HStack>
            <Spacer />
            <HStack>
              <Spacer />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {
                  validEmail
                    ? "Check your spam box ! We've emailed you a sign-in link"
                    : "Don't forget to use your UCL email to sign-up\nWe hope to expand to other universities ! " // here change to be modular and changeable based on the event outcome
                }
              </Text>
              <Spacer />
            </HStack>
            <Spacer />
          </VStack>
        </BottomSheetModal>
      </Flex>
    </BottomSheetModalProvider>
  );
};
