import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, TextInput, Switch } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { colors } = useThemeStore();
  const router = useRouter();

  const isFormValid = () => {
    return (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      password.length >= 8 &&
      agreeTerms
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          variant="headlineLarge"
          style={[styles.title, { color: colors.text }]}
        >
          Join Our Platform
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          Find your perfect home with ease
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          mode="flat"
          style={styles.input}
          autoCapitalize="words"
          left={<TextInput.Icon icon="account-outline" />}
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

        {password.length > 0 && password.length < 8 && (
          <Text
            variant="bodySmall"
            style={[styles.passwordHint, { color: colors.warning }]}
          >
            Password must be at least 8 characters
          </Text>
        )}

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Switch
            value={agreeTerms}
            onValueChange={setAgreeTerms}
            color={colors.primary}
            trackColor={{
              false: colors.textSecondary,
              true: colors.primaryDark,
            }}
            thumbColor={agreeTerms ? colors.primary : colors.primaryLight}
          />
          <View style={styles.termsTextContainer}>
            <Text
              variant="bodyMedium"
              style={[styles.termsText, { color: colors.textSecondary }]}
            >
              I agree to the{" "}
              <Text
                style={[styles.linkText, { color: colors.primary }]}
                onPress={() => console.log("Terms pressed")}
              >
                Terms of Service
              </Text>
              {" and "}
              <Text
                style={[styles.linkText, { color: colors.primary }]}
                onPress={() => console.log("Privacy pressed")}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>

        {/* Main Action */}
        <Button
          mode="contained"
          style={[
            styles.createButton,
            {
              backgroundColor: isFormValid()
                ? colors.primary
                : colors.primaryLight,
              elevation: isFormValid() ? 2 : 0,
            },
          ]}
          labelStyle={[
            styles.buttonLabel,
            { color: isFormValid() ? colors.white : colors.textSecondary },
          ]}
          disabled={!isFormValid()}
          onPress={() => console.log("Account created")}
        >
          Create Account
        </Button>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: colors.outline }]} />
          <Text
            variant="bodySmall"
            style={[styles.dividerText, { color: colors.textTertiary }]}
          >
            or continue with
          </Text>
          <View style={[styles.line, { backgroundColor: colors.outline }]} />
        </View>

        {/* Social Login */}
        <Button
          mode="outlined"
          icon="google"
          style={[styles.socialButton, { borderColor: colors.outline }]}
          labelStyle={[styles.buttonLabel, { color: colors.text }]}
          onPress={() => console.log("Google signup")}
        >
          Google
        </Button>
      </View>

      {/* Agent Interest Link */}
      <View
        style={[styles.agentSection, { backgroundColor: colors.primaryLight }]}
      >
        <Text
          variant="bodyMedium"
          style={[styles.agentText, { color: colors.primary }]}
        >
          Real estate professional?{" "}
        </Text>
        <Button
          mode="text"
          compact
          onPress={() => console.log("Agent application")}
          labelStyle={[styles.agentLink, { color: colors.primary }]}
          contentStyle={{ paddingHorizontal: 4 }}
        >
          Apply to become an agent
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          Already have an account?{" "}
        </Text>
        <Button
          mode="text"
          compact
          onPress={() => router.push("/auth/login")}
          labelStyle={[styles.footerLink, { color: colors.primary }]}
          contentStyle={{ paddingHorizontal: 4 }}
        >
          Sign In
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    flex: 1,
    gap: 18,
  },
  input: {
    backgroundColor: "transparent",
  },
  passwordHint: {
    marginTop: -12,
    marginLeft: 16,
    fontSize: 12,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginTop: 4,
  },
  termsText: {
    lineHeight: 20,
    fontSize: 14,
  },
  linkText: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  createButton: {
    paddingVertical: 5,
    borderRadius: 25,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
    fontWeight: "500",
  },
  socialButton: {
    paddingVertical: 5,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  agentSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 16,
    flexWrap: "wrap",
  },
  agentText: {
    fontWeight: "500",
  },
  agentLink: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    flexWrap: "wrap",
  },
  footerLink: {
    fontWeight: "600",
  },
});
