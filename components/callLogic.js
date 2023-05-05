import Peer from "react-native-peerjs";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { mediaDevices } from "react-native-webrtc";
import { useState, useRef } from "react";
import { View, Text } from "react-native";

// Peer to peer connection

export default queryMatchmaking = async (peer, stream) => {
  firestore()
    .collection("matchmaking")
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().peerID !== peer.id) {
          const peerInfo = {
            peerID: doc.data().peerID,
            display_name: doc.data().display_name,
            socialMedia: doc.data().socials,
          };
          console.log("Found peer: " + doc.data().peerID);
          const conn = peer.connect(peerInfo.peerID);
          conn.on("open", () => {
            console.log("Connected to: " + doc.data().peerID);
            peer.call(peerInfo.peerID, stream);
          });
        }
      });
    });
};
