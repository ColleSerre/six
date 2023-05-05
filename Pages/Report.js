import { SafeAreaView, View, Text, TextInput, Button } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useState } from "react";
import styles from "../styles/styles";
import { Spacer, VStack } from "@react-native-material/core";
import firestore from "@react-native-firebase/firestore";

export default Report = ({ route, navigation }) => {
  const { peer } = route.params;
  var [reason, setReason] = useState({
    IL_I: false,
    SPAM: false,
    HARASS: false,
  });
  return (
    <SafeAreaView
      style={[
        styles.general.container,
        {
          justifyContent: "space-between",
        },
      ]}
    >
      <VStack
        style={{
          margin: 20,
        }}
      >
        <Text
          style={[
            styles.auth.title,
            {
              color: "red",
            },
          ]}
        >
          Report
        </Text>

        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Why are you reporting {peer.name}
        </Text>

        <VStack>
          <Spacer />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <CheckBox
              value={reason["IL_I"]}
              onValueChange={(newValue) => {
                setReason({ ...reason, IL_I: newValue });
              }}
            />
            <Spacer />

            <Text
              style={{
                fontSize: 15,
              }}
            >
              Inappropriate Language or Images
            </Text>
            <Spacer />
          </View>
          <Spacer />

          <View style={{ flexDirection: "row" }}>
            <CheckBox
              value={reason["SPAM"]}
              onValueChange={(newValue) => {
                setReason({ ...reason, SPAM: newValue });
              }}
            />
            <Spacer />

            <Text
              style={{
                fontSize: 15,
              }}
            >
              Spam
            </Text>
            <Spacer />
          </View>
          <Spacer />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              value={reason["HARASS"]}
              onValueChange={(newValue) => {
                setReason({ ...reason, HARASS: newValue });
              }}
            />
            <Spacer />

            <Text
              style={{
                fontSize: 15,
              }}
            >
              Harassment
            </Text>
            <Spacer />
          </View>
          <Spacer />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Spacer />

            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Feel free to contact me for other inquiries not listed here:
              daren.palmer.22@ucl.ac.uk
            </Text>
            <Spacer />
          </View>
          <Spacer />
          <Button
            title="Submit"
            onPress={() => {
              firestore()
                .collection("reports")
                .doc(peer.name)
                .set(
                  {
                    reason: reason,
                    timestamps: firestore.FieldValue.arrayUnion(
                      new Date().toISOString()
                    ),
                  },
                  { merge: true }
                );
            }}
          />
          <Spacer />
          <Spacer />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
