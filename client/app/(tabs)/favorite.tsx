import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Favorite() {
  return (
    <View style={styles.container}>
      <Button mode="elevated">Favorite</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
});
