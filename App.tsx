import { initializeApp } from "firebase/app";
import Home from "./Pages/Home.js";
import Call from "./Pages/Call.js";
import EndOfCall from "./Pages/EndOfCall.js";
import Report from "./Pages/Report.js";
import Banned from "./Pages/Banned.js";
import AuthPage from "./Pages/Auth.js";
import ProfilePage from "./Pages/Profile.js";
import SocialAuth from "./Pages/SocialAuth.js";
import Err from "./Pages/Err.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Lusitana_400Regular } from "@expo-google-fonts/lusitana";
import React, { useState } from "react";
import { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, View, Text } from "react-native";
import useAuthState from "./firebase/useAuthState";

const firebaseConfig = {
  apiKey: "AIzaSyA0mO4alc8_FeBT8bH4SelN8VLdK8gN9Ts",
  authDomain: "sixe-3567e.firebaseapp.com",
  projectId: "sixe-3567e",
  storageBucket: "sixe-3567e.appspot.com",
  messagingSenderId: "578042409908",
  appId: "1:578042409908:web:c8cf2ee2a00d08e76438e1",
  measurementId: "G-WMJZXNXHJF",
};
export const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

export default function App() {
  const { user, loading } = useAuthState();

  let [fontsLoaded] = useFonts({
    Lusitana_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainRoute = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Call"
            component={Call}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EndOfCall"
            component={EndOfCall}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Report"
            component={Report}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !user ? (
        <AuthPage />
      ) : (
        <MainRoute />
      )}
    </View>
  );
}
