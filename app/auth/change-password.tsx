import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { Appbar, Text, TextInput, Button } from 'react-native-paper';
import { useThemeStore } from '@/stores/useTheme';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secureCurrentEntry, setSecureCurrentEntry] = useState(true);
  const [secureNewEntry, setSecureNewEntry] = useState(true);

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
          title="Change Password"
          titleStyle={{ fontWeight: 'bold', color: colors.text }}
        />
      </Appbar.Header>
      <View style={styles.card}>
        <Text
          variant="bodyMedium"
          style={{ color: colors.text, marginBottom: 30 }}
        >
          Set a New password using the current one
        </Text>

        <TextInput
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          mode="flat"
          style={styles.input}
          secureTextEntry={secureCurrentEntry}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={secureCurrentEntry ? 'eye-off' : 'eye'}
              color={colors.icon}
              onPress={() => setSecureCurrentEntry(!secureCurrentEntry)}
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
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          mode="flat"
          style={styles.input}
          secureTextEntry={secureNewEntry}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={secureNewEntry ? 'eye-off' : 'eye'}
              color={colors.icon}
              onPress={() => setSecureNewEntry(!secureNewEntry)}
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
          label="Confirm New Password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          mode="flat"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          right={
            newPassword.length > 0 &&
            confirmNewPassword.length > 0 &&
            newPassword === confirmNewPassword && (
              <TextInput.Icon icon={'check-circle'} color={colors.success} />
            )
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
          onPress={() => console.log('Login pressed')}
        >
          Change Password
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

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
