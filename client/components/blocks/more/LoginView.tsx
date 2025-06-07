import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { LoginViewProps } from "@/shared/interfaces/settings";

const LoginView = ({ onLoginPress, colors }: LoginViewProps) => (
  <View
    style={[styles.notLoggedInBox, { backgroundColor: colors.surfaceVariant }]}
  >
    <Text style={[styles.notLoggedInText, { color: colors.error }]}>
      You are not logged in. Please log in to access account settings.
    </Text>
    <Button
      mode="contained"
      onPress={onLoginPress}
      style={styles.loginButton}
      labelStyle={styles.buttonLabel}
      theme={{ colors: { primary: colors.primary } }}
    >
      Log In / Sign Up
    </Button>
  </View>
);

const styles = StyleSheet.create({
  notLoggedInBox: {
    margin: 24,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notLoggedInText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  loginButton: {
    marginTop: 16,
    width: "80%",
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 2,
  },
});

export default LoginView;
