import { useState } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput, Switch } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { colors } = useThemeStore();
  const router = useRouter();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: colors.text }]}
        >
          Login
        </Text>

        <TextInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
          theme={{
            colors: {
              primary: colors.primary,
              outline: colors.outline,
              onSurface: colors.text,
              onSurfaceVariant: colors.textSecondary,
            },
          }}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="flat"
          style={styles.input}
          secureTextEntry={secureTextEntry}
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          }
          theme={{
            colors: {
              primary: colors.primary,
              outline: colors.outline,
              onSurface: colors.text,
              onSurfaceVariant: colors.textSecondary,
            },
          }}
        />

        <View style={styles.rememberRow}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            color={colors.primary}
            trackColor={{
              false: colors.textSecondary,
              true: colors.primaryDark,
            }}
            thumbColor={rememberMe ? colors.primary : colors.primaryLight}
          />
          <Text
            variant="bodyMedium"
            style={[styles.rememberText, { color: colors.textSecondary }]}
          >
            Remember me
          </Text>
        </View>

        <Button
          mode="contained"
          style={[
            styles.loginButton,
            {
              backgroundColor: colors.primary,
            },
          ]}
          labelStyle={[styles.buttonLabel, { color: colors.white }]}
          onPress={() => console.log("Login pressed")}
        >
          Login
        </Button>

        <Button
          mode="text"
          style={styles.forgotButton}
          labelStyle={{ color: colors.primary }}
          onPress={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </Button>

        <View style={styles.dividerContainer}>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: colors.divider || colors.surface },
            ]}
          />
          <Text
            variant="bodyMedium"
            style={[styles.dividerText, { color: colors.textSecondary }]}
          >
            OR
          </Text>
          <View
            style={[
              styles.dividerLine,
              { backgroundColor: colors.divider || colors.surface },
            ]}
          />
        </View>

        <Button
          mode="outlined"
          icon="google"
          style={[styles.socialButton, { borderColor: "#4285F4" }]}
          labelStyle={[styles.socialButtonLabel, { color: "#4285F4" }]}
          onPress={() => console.log("Google login pressed")}
        >
          Continue with Google
        </Button>

        <View style={styles.signupPrompt}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Don&apos;t have an account?{" "}
          </Text>
          <Button
            mode="text"
            compact
            onPress={() => router.push("/auth/signup")}
            labelStyle={{ color: colors.primary }}
          >
            Sign up
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rememberText: {
    marginLeft: 8,
  },
  loginButton: {
    // marginTop: 5,
    paddingVertical: 5,
    borderRadius: 25,
  },
  buttonLabel: {
    fontSize: 16,
  },
  forgotButton: {
    marginTop: 5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
  },
  socialButton: {
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 5,
  },
  socialButtonLabel: {},
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
