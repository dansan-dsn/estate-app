import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { useThemeStore } from '@/stores/useTheme';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmsecure, setConfirmSecure] = useState(true);

  const { colors } = useThemeStore();
  const navigation = useNavigation();

  const handleEmailSubmit = () => {
    if (email.trim().length > 0) {
      // Here you might want to verify email or send OTP
      setShowPasswordFields(true);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={colors.text}
        />
        <Appbar.Content
          title={!showPasswordFields ? 'Forgot Password' : 'Creat New Password'}
          titleStyle={{ fontWeight: 'bold', color: colors.text }}
        />
      </Appbar.Header>

      <View style={styles.card}>
        {!showPasswordFields ? (
          <>
            <Text
              variant="bodyMedium"
              style={{ color: colors.text, marginBottom: 25 }}
            >
              Enter your email for your account for verification to reset your
              password
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

            <Button
              mode="contained"
              style={[
                styles.submitBtn,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              labelStyle={[styles.buttonLabel, { color: colors.white }]}
              onPress={handleEmailSubmit}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <Text
              variant="bodyMedium"
              style={{ color: colors.text, marginBottom: 30 }}
            >
              At least 8 characters with uppercase and lowercase
            </Text>

            <TextInput
              label="New Password"
              value={password}
              onChangeText={setPassword}
              mode="flat"
              style={styles.input}
              secureTextEntry={secureTextEntry}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
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

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="flat"
              style={styles.input}
              secureTextEntry={confirmsecure}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={confirmsecure ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setConfirmSecure(!confirmsecure)}
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

            <Button
              mode="contained"
              style={[
                styles.submitBtn,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              labelStyle={[styles.buttonLabel, { color: colors.white }]}
              onPress={() => console.log('Reset pressed')}
            >
              Continue
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    paddingVertical: 10,
    marginTop: 30,
    marginHorizontal: 40,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  submitBtn: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
