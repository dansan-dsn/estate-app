import { Stack, Link } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

export default function NotFoundScreen() {
  const { colors } = useThemeStore();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image
          source={require("@/assets/images/not_found.jpg")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text
          variant="titleLarge"
          style={[styles.text, { color: colors.text, fontFamily: "SpaceMono" }]}
        >
          Page Not Found
        </Text>
        <Link href="/" asChild>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: colors.primary }]}
            labelStyle={{ color: colors.white }}
          >
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
    borderRadius: 8,
    paddingVertical: 4,
  },
});
