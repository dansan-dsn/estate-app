import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const GoogleLoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "Your_secrete_id",
    redirectUri: "http://localhost:5000/api/users/auth/google/callback",
  });

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();

    if (response?.type === "success") {
      const { token } = response.params;
      alert("Google login successful");

      // Send token to backend for authentication
      fetch("http://localhost:5000/api/users/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Server Response:", data))
        .catch((err) => console.error("Error:", err));
    }
  }, [response]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <FontAwesome
            name="google"
            size={20}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  icon: { marginRight: 10 },
  googleBtn: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3e4df7",
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 20,
    borderRadius: 45,
    backgroundColor: "#3e4df7",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default GoogleLoginScreen;
