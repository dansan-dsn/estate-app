import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import Toast from "react-native-toast-message"; // Import Toast for better user feedback

const baseUrl = "http://192.168.55.221:5000/api/users";

const GoogleLoginScreen: React.FC = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "", // Replace with your actual Google Client ID
    redirectUri: `${baseUrl}/auth/google/callback`,
  });

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();

    if (response?.type === "success") {
      const { token } = response.params;

      // Send token to backend for authentication using axios
      const authenticateWithBackend = async () => {
        try {
          const res = await axios.post(`${baseUrl}/auth/google`, {
            token,
          });

          Toast.show({
            type: "success",
            text1: "Google login successful!",
          });
          console.log("Server Response:", res.data);
        } catch (error: any) {
          console.error("Error:", error);
          Toast.show({
            type: "error",
            text1: error.response?.data?.message || "Google login failed",
          });
        }
      };

      authenticateWithBackend();
    }
  }, [response]);

  return (
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
