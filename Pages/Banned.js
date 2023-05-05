import { View } from "react-native";
import styles from "../styles/styles";

export default Banned = () => {
  return (
    <View style={styles.general.container}>
      <Text>
        {
          "You have been banned\nReach out on Instagram or by email to appeal this"
        }
      </Text>
    </View>
  );
};
