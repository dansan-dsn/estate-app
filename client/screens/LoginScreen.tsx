import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import GoogleLoginScreen from "./GoogleLoginScreen";
import Toast from "react-native-toast-message"; // Import Toast
import { useAuth } from "../context/AuthContext";

type LoginScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const baseUrl = "http://192.168.55.221:5000/api";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        email,
        password,
      });

      const userData = response.data;
      login(userData);

      Toast.show({
        type: "success",
        text1: "Logged in successful!",
      });
      navigation.navigate("Explore");
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            Toast.show({
              type: "error",
              text1:
                data.message || "Invalid request. Please check your input.",
            });
            break;
          case 401:
            Toast.show({
              type: "error",
              text1: data.message || "Invalid credentials",
            });
            break;
          case 500:
            Toast.show({
              type: "error",
              text1: "Server error. Please try again later.",
            });
            break;
          default:
            Toast.show({
              type: "error",
              text1: "An unexpected error occurred. Please try again.",
            });
            break;
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Network error. Please check your connection.",
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Hello, Welcome back!</Text>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color="gray"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              style={styles.input}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <FontAwesome
                name={secureTextEntry ? "eye-slash" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Or</Text>
          <GoogleLoginScreen />
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Without an account?{" "}
            <Text
              style={{ color: "#3e4df7", fontWeight: "bold" }}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  heading: {
    textAlign: "center",
    marginVertical: 60,
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 18,
    borderRadius: 45,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  loginBtn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#4CAF50",
    borderWidth: 1,
    marginHorizontal: 12,
    marginVertical: 20,
    borderRadius: 45,
    backgroundColor: "#4CAF50",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginScreen;
