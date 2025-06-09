import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useThemeStore } from "@/stores/useTheme";
import { useLoadingStore } from "@/stores/useLoading";

export default function Loader() {
  const { colors } = useThemeStore();
  const { isLoading, loadingText } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <View style={(styles.overlay, { backgroundColor: colors.black })}>
      <View style={(styles.container, { backgroundColor: colors.white })}>
        <LottieView
          autoPlay
          loop
          style={styles.animation}
          // source={require("@/assets/animations/loader.json")}
        />
        {loadingText && <Text style={styles.text}>{loadingText}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  animation: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
