import { Stack, Link } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/not_found.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text variant="titleLarge" style={styles.text}>
          Page Not Found
        </Text>
        <Link href="/" asChild>
          <Button mode="contained" style={styles.button}>
            Go Back Home
          </Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "80%",
    height: 250,
    marginBottom: 30,
  },
  text: {
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
  },
});
