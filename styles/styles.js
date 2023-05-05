import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  primary: "#7955FB",
  general: {
    primaryButton: {
      borderColor: "#00000",
      borderRadius: 30,
      backgroundColor: "#7955FB",
      alignItems: "center",
      justifyContent: "center",
      width: "40%",
      height: "30%",
    },
    text: {
      color: "black",
      fontSize: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "#dbf8f5",
      //backgroundColor: "#fbc777",
      //backgroundColor: "navajowhite",
      //backgroundColor: "#1e242e",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  home: {
    startButton: {
      backgroundColor: "#cb717a",
      elevation: 20,
      shadowColor: "#52006A",
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
      height: "70%",
      width: "60%",
    },
  },
  auth: {
    textInput: {
      backgroundColor: "#ffff",
      borderRadius: 12,
      padding: 20,
    },
    title: {
      fontSize: 25,
      marginTop: 20,
      textAlign: "center",
      color: "white",
    },
  },
  call: {},
});
