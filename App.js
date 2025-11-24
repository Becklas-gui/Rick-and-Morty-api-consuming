import "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <View style={styles.app}>
      <AppNavigator />
    </View>
  );
}


const styles = StyleSheet.create({
  app: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
  },
});
