import { StyleSheet, Pressable, Text } from "react-native";
import styles from "../styles/styles";



export const primaryButton = (props) => {
  const style = StyleSheet.create({
    text: {
      color: "white",
    },
  });

  return (
    <Pressable style={styles.general.primaryButton} onPress={props.onPress}>
      <Text style={style.text}>{props.title}</Text>
    </Pressable>
  );
};
