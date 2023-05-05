import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Animated,
  Pressable,
} from "react-native";
import styles from "../styles/styles";
import { Flex, HStack, Spacer } from "@react-native-material/core";
import { useRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default SocialAuth = (props) => {
  const [instagram, setInstagram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState("");
  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;
  const animation3 = useRef(new Animated.Value(0)).current;
  const textAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const buttonValidation = () => {
    console.log("CLICKED");

    console.log(instagram, snapchat, linkedin);
    if (instagram || snapchat || linkedin) {
      console.log("Validated");
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({
          socials: {
            instagram: instagram,
            snapchat: snapchat,
            linkedin: linkedin,
          },
        });
    } else {
      return setError("Please fill in at least one field");
    }
  };

  Animated.timing(animation1, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();
  setTimeout(() => {
    Animated.timing(animation2, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, 700);
  setTimeout(() => {
    Animated.timing(animation3, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, 1400);
  setTimeout(() => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, 2100);
  setTimeout(() => {
    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, 2800);

  return (
    <SafeAreaView style={styles.general.container}>
      <Flex fill style={{ marginHorizontal: 8, width: "80%" }}>
        <Spacer />
        <Text style={styles.general.text}>Add Social Media Accounts:</Text>
        <Spacer />
        <Animated.View
          style={{
            opacity: animation1,
            backgroundColor: "#F2F2F2",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={[
              styles.general.text,
              { fontSize: 15, color: "black", marginBottom: 8 },
            ]}
          >
            Instagram
          </Text>
          <TextInput
            value={instagram}
            onChangeText={(newText) => setInstagram(newText)}
            placeholder="daren_palmer..."
            placeholderTextColor={"#5C5B5E"}
            style={[
              styles.auth.textInput,
              {
                alignItems: "baseline",
                borderColor: "darkgrey",
                borderWidth: 2,
              },
            ]}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
        <Spacer />

        <Animated.View
          style={{
            backgroundColor: "#F2F2F2",
            padding: 20,
            borderRadius: 10,
            opacity: animation2,
          }}
        >
          <Text
            style={[
              styles.general.text,
              { fontSize: 15, color: "black", marginBottom: 8 },
            ]}
          >
            Snapchat
          </Text>
          <TextInput
            value={snapchat}
            onChangeText={(newText) => setSnapchat(newText)}
            placeholder="ur mom..."
            placeholderTextColor={"#5C5B5E"}
            style={[
              styles.auth.textInput,
              {
                alignItems: "baseline",
                borderColor: "darkgrey",
                borderWidth: 2,
              },
            ]}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
        <Spacer />
        <Animated.View
          style={{
            backgroundColor: "#F2F2F2",
            padding: 20,
            borderRadius: 10,
            opacity: animation3,
          }}
        >
          <Text
            style={[
              styles.general.text,
              { fontSize: 15, color: "black", marginBottom: 8 },
            ]}
          >
            Linkedin
          </Text>
          <TextInput
            value={linkedin}
            onChangeText={(newText) => setLinkedin(newText)}
            placeholder="Jeffrey Bezouz"
            placeholderTextColor={"#5C5B5E"}
            style={[
              styles.auth.textInput,
              {
                alignItems: "baseline",
                borderColor: "darkgrey",
                borderWidth: 2,
              },
            ]}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Animated.View>
        <Spacer flex={2} />
        <HStack>
          <Spacer />

          <AnimatedPressable
            style={{
              backgroundColor: "#3B7EC8",
              borderRadius: 10,
              padding: 12,
              width: "40%",
              opacity: buttonAnimation,
            }}
            onPress={() => {
              buttonValidation();
            }}
          >
            <HStack>
              <Spacer />
              <Text
                style={[styles.general.text, { fontSize: 15, color: "white" }]}
              >
                Done
              </Text>
              <Spacer />
            </HStack>
          </AnimatedPressable>
          <Spacer />
        </HStack>
        <Spacer />
        <Animated.Text
          style={{
            color: "black",
            textAlign: "center",
            opacity: textAnimation,
          }}
        >
          We run daily checks if you have entered your own username
        </Animated.Text>
      </Flex>
    </SafeAreaView>
  );
};
