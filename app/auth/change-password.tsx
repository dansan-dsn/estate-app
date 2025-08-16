import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";
import { Appbar, Card, Text, TextInput, Button } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmsecure, setConfirmSecure] = useState(true);

  const { colors } = useThemeStore();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={colors.text}
        />
        <Appbar.Content
          title="Reset Password"
          titleStyle={{ fontWeight: "bold", color: colors.text }}
        />
      </Appbar.Header>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text
            variant="bodyMedium"
            style={{ color: colors.text, marginBottom: 30 }}
          >
            Atleast 8 characters with uppercase and lowercase
          </Text>

          <TextInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.outline,
              },
            ]}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
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
                borderColor: colors.outline,
              },
            ]}
            secureTextEntry={confirmsecure}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={confirmsecure ? "eye-off" : "eye"}
                color={colors.icon}
                onPress={() => setConfirmSecure(!confirmsecure)}
              />
            }
            textColor={colors.text}
            placeholderTextColor={colors.textSecondary}
            outlineColor={colors.tabBarBorder}
            activeOutlineColor={colors.primary}
          />

          <Button
            mode="contained"
            style={[
              styles.submitBtn,
              {
                backgroundColor: colors.primary,
              },
            ]}
            labelStyle={[styles.buttonLabel, { color: colors.white }]}
            onPress={() => console.log("Login pressed")}
          >
            Continue
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    paddingVertical: 10,
    marginHorizontal: 30,
  },
  input: {
    marginBottom: 15,
  },
  submitBtn: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
