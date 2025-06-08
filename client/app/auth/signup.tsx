import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Text, TextInput, Card, Switch } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isAgent, setIsAgent] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
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
      {/* <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      /> */}

      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text
            variant="headlineMedium"
            style={[styles.title, { color: colors.text }]}
          >
            Create {isAgent ? "Agent" : "Tenant"} Account
          </Text>

          <View style={styles.roleSwitchContainer}>
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              I&apos;m a tenant
            </Text>
            <Switch
              value={isAgent}
              onValueChange={() => setIsAgent(!isAgent)}
              style={styles.roleSwitch}
              color={colors.primary}
              trackColor={{
                false: colors.surfaceVariant,
                true: colors.primary + "33",
              }}
              thumbColor={isAgent ? colors.primary : colors.icon}
            />
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              I&apos;m an agent
            </Text>
          </View>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="outlined"
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.tabBarBorder,
              },
            ]}
            autoCapitalize="words"
            left={<TextInput.Icon icon="account" color={colors.icon} />}
            textColor={colors.text}
            placeholderTextColor={colors.textSecondary}
            outlineColor={colors.tabBarBorder}
            activeOutlineColor={colors.primary}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.tabBarBorder,
              },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" color={colors.icon} />}
            textColor={colors.text}
            placeholderTextColor={colors.textSecondary}
            outlineColor={colors.tabBarBorder}
            activeOutlineColor={colors.primary}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.tabBarBorder,
              },
            ]}
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye-off" : "eye"}
                color={colors.icon}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            textColor={colors.text}
            placeholderTextColor={colors.textSecondary}
            outlineColor={colors.tabBarBorder}
            activeOutlineColor={colors.primary}
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.tabBarBorder,
              },
            ]}
            secureTextEntry={confirmSecureTextEntry}
            right={
              <TextInput.Icon
                icon={confirmSecureTextEntry ? "eye-off" : "eye"}
                color={colors.icon}
                onPress={() =>
                  setConfirmSecureTextEntry(!confirmSecureTextEntry)
                }
              />
            }
            textColor={colors.text}
            placeholderTextColor={colors.textSecondary}
            outlineColor={colors.tabBarBorder}
            activeOutlineColor={colors.primary}
          />

          {isAgent && (
            <TextInput
              label="License Number (Optional)"
              mode="outlined"
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.tabBarBorder,
                },
              ]}
              left={<TextInput.Icon icon="certificate" color={colors.icon} />}
              textColor={colors.text}
              placeholderTextColor={colors.textSecondary}
              outlineColor={colors.tabBarBorder}
              activeOutlineColor={colors.primary}
            />
          )}

          <View style={styles.termsRow}>
            <Switch
              value={agreeTerms}
              onValueChange={setAgreeTerms}
              color={colors.primary}
              trackColor={{
                false: colors.surfaceVariant,
                true: colors.primary + "33",
              }}
              thumbColor={agreeTerms ? colors.primary : colors.icon}
            />
            <Text
              variant="bodyMedium"
              style={[styles.termsText, { color: colors.textSecondary }]}
            >
              I agree to the{" "}
              <Text style={{ color: colors.primary }}>Terms</Text> and{" "}
              <Text style={{ color: colors.primary }}>Privacy Policy</Text>
            </Text>
          </View>

          <Button
            mode="contained"
            style={[styles.signupButton, { backgroundColor: colors.primary }]}
            labelStyle={[styles.buttonLabel, { color: colors.white }]}
            disabled={!agreeTerms}
            onPress={() => console.log("Signup pressed")}
          >
            Create Account
          </Button>

          <View style={styles.dividerContainer}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: colors.divider || colors.surfaceVariant },
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
                { backgroundColor: colors.divider || colors.surfaceVariant },
              ]}
            />
          </View>

          <Button
            mode="outlined"
            icon="google"
            style={[styles.socialButton, { borderColor: "#4285F4" }]}
            labelStyle={[styles.socialButtonLabel, { color: "#4285F4" }]}
            onPress={() => console.log("Google signup pressed")}
          >
            Continue with Google
          </Button>

          <View style={styles.loginPrompt}>
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              Already have an account?{" "}
            </Text>
            <Button
              mode="text"
              compact
              onPress={() => router.push("/auth/login")}
              labelStyle={{ color: colors.primary }}
            >
              Login
            </Button>
          </View>
        </Card.Content>
      </Card>
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
    elevation: 3,
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  roleSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  roleSwitch: {
    marginHorizontal: 8,
  },
  input: {
    marginBottom: 15,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  termsText: {
    marginLeft: 8,
    flexShrink: 1,
  },
  signupButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
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
    borderRadius: 8,
    paddingVertical: 8,
  },
  socialButtonLabel: {},
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
