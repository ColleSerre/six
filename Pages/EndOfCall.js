import { View, Button, Linking, SafeAreaView, Text } from "react-native";
import styles from "../styles/styles.js";
import { Spacer } from "@react-native-material/core";

export default EndOfCall = ({ navigation }, peerData) => {
  const url = (social) => {
    switch (social.toLowerCase()) {
      case "instagram":
        return "https://www.instagram.com/";
        break;
      case "snapchat":
        return "https://www.snapchat.com/add/";
      case "linkedin":
        return "https://www.linkedin.com/in/daren-palmer-b473b424b/";
      default:
        return "https://www." + social.toLowerCase() + ".com/";
    }
  };

  const SocialButtons = () => {
    return Object.keys(peerData.socials).map((social, index) => {
      return (
        <View
          style={{
            padding: 6,
            backgroundColor: "#1e1e1e",
            borderRadius: 5,
            margin: 10,
          }}
          key={Object.keys(peerData.socials).indexOf(social)}
        >
          <Button
            title={`${social}: ${peerData.socials[social]}`}
            color={"#fff"}
            onPress={() => {
              Linking.openURL(url(social) + peerData.socials[social]);
            }}
          />
        </View>
      );
    });
  };

  peerData = {
    name: "Daren Palmer",
    socials: {
      Instagram: "daren.palmer",
      Snapchat: "daren.palmer",
    },
  };

  return (
    <SafeAreaView
      style={[styles.general.container, { backgroundColor: styles.primary }]}
    >
      <Text
        style={[
          styles.auth.title,
          {
            fontSize: 20,
          },
        ]}
      >
        Time flies when you're having fun, add {peerData.name} on:
      </Text>
      <Spacer />
      <SocialButtons />
      <Spacer />

      <Button
        title={"Not this time"}
        color={"black"}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Spacer />

      <Button
        title={"Report"}
        color={"red"}
        onPress={() => {
          navigation.navigate("Report", {
            peer: peerData,
          });
        }}
      />
    </SafeAreaView>
  );
};
