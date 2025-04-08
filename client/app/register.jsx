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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import GoogleLogin from "./google-login";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message"; // Import Toast

const baseUrl = "http://192.168.55.221:5000/api";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState < string > "";
  const [phoneNumber, setPhoneNumber] = useState < string > "";
  const [password, setPassword] = useState < string > "";
  const [secureTextEntry, setSecureTextEntry] = useState < boolean > true;

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = async () => {
    if (!email || !phoneNumber || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/users/register`, {
        email,
        phoneNumber,
        password,
      });

      Toast.show({
        type: "success",
        text1: response.data.message || "Registration successful!",
      });
      navigation.navigate("Login");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 400:
            if (data.message === "All fields are required") {
              Toast.show({
                type: "error",
                text1: "Please fill in all fields",
              });
            } else if (data.message === "Password too short") {
              Toast.show({
                type: "error",
                text1: "Password too short",
              });
            } else if (
              data.message === "Email or phone number already exists"
            ) {
              Toast.show({
                type: "error",
                text1: "Email or phone number already exists",
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Invalid request. Please check your input.",
              });
            }
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.heading}>Create an Account</Text>

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
                name="phone"
                size={20}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder="+256 234567890"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType="phone-pad"
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

            <TouchableOpacity
              style={styles.registrationBtn}
              onPress={handleRegister}
            >
              <Text style={styles.btnText}>Join Now</Text>
            </TouchableOpacity>

            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Or</Text>
            <GoogleLogin />

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Already have an account?{" "}
              <Text
                style={{ color: "#3e4df7", fontWeight: "bold" }}
                onPress={() => navigation.navigate("login")}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    textAlign: "center",
    marginVertical: 40,
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
  registrationBtn: {
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

export default RegisterScreen;
