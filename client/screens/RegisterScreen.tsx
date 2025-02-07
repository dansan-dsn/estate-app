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
import GoogleLoginScreen from "./GoogleLoginScreen";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegister = async () => {
    if (!email || !phoneNumber || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        phoneNumber,
        password,
      });
      alert(response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
            <GoogleLoginScreen />

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Already have an account?{" "}
              <Text
                style={{ color: "#3e4df7", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Login")}
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
    // backgroundColor: "lightblue",
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
