import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  HelperText,
  Chip,
  Checkbox,
} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from 'zod';
import { useThemeStore } from '@/stores/useTheme';
import GlassCard from '@/components/ui/GlassCard';

const forgotSchema = z.object({
  email: z.string().email('Provide a valid email'),
  channel: z.enum(['email', 'sms']),
  sendCopy: z.boolean().optional(),
});

type ForgotForm = {
  email: string;
  channel: 'email' | 'sms';
  sendCopy?: boolean;
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const [formData, setFormData] = useState<ForgotForm>({
    email: '',
    channel: 'email',
    sendCopy: true,
  });
  const [errors, setErrors] = useState<Partial<Record<'email', string>>>({});

  const formIsValid = useMemo(
    () => forgotSchema.safeParse(formData).success,
    [formData]
  );

  const handleSubmit = () => {
    const result = forgotSchema.safeParse(formData);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === 'email');
      setErrors({ email: issue?.message });
      return;
    }

    Alert.alert(
      'Reset link sent',
      'Follow the instructions sent to your inbox.'
    );
    router.push('/auth/login');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.hero, { backgroundColor: colors.info + '1a' }]}>
        <MaterialCommunityIcons
          name="shield-key"
          size={36}
          color={colors.info}
        />
        <Text
          variant="headlineSmall"
          style={{ color: colors.info, marginTop: 8 }}
        >
          Recover your access
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: colors.textSecondary,
            marginTop: 6,
            textAlign: 'center',
          }}
        >
          We&apos;ll send a secure recovery link aligned with your preferred
          channel.
        </Text>
      </View>

      <GlassCard style={styles.formCard}>
        <Text
          variant="titleMedium"
          style={{ color: colors.text, marginBottom: 12 }}
        >
          Account email
        </Text>
        <TextInput
          label="Email address"
          value={formData.email}
          onChangeText={(value) => {
            setFormData((prev) => ({ ...prev, email: value }));
            setErrors({});
          }}
          onBlur={() => {
            const result = forgotSchema
              .pick({ email: true })
              .safeParse({ email: formData.email });
            setErrors(
              result.success ? {} : { email: result.error.issues[0]?.message }
            );
          }}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
        />
        <HelperText type="error" visible={Boolean(errors.email)}>
          {errors.email}
        </HelperText>

        <Text
          variant="bodySmall"
          style={{ color: colors.textSecondary, marginTop: 8 }}
        >
          Delivery method
        </Text>
        <View style={styles.channelRow}>
          {(
            [
              {
                value: 'email',
                label: 'Email link',
                icon: 'email-fast-outline',
              },
              { value: 'sms', label: 'SMS code', icon: 'cellphone-key' },
            ] as const
          ).map((option) => (
            <Chip
              key={option.value}
              selected={formData.channel === option.value}
              onPress={() =>
                setFormData((prev) => ({ ...prev, channel: option.value }))
              }
              icon={option.icon}
              style={{
                backgroundColor:
                  formData.channel === option.value
                    ? colors.primary + '22'
                    : colors.surfaceVariant,
              }}
              textStyle={{
                color:
                  formData.channel === option.value
                    ? colors.primary
                    : colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {option.label}
            </Chip>
          ))}
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            status={formData.sendCopy ? 'checked' : 'unchecked'}
            onPress={() =>
              setFormData((prev) => ({ ...prev, sendCopy: !prev.sendCopy }))
            }
            color={colors.primary}
          />
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Send me a copy of this request for auditing
          </Text>
        </View>

        <Button
          mode="contained"
          style={[
            styles.primaryButton,
            {
              backgroundColor: formIsValid
                ? colors.primary
                : colors.primaryLight,
            },
          ]}
          textColor={formIsValid ? colors.white : colors.textSecondary}
          disabled={!formIsValid}
          onPress={handleSubmit}
        >
          Send reset link
        </Button>
      </GlassCard>

      <View style={styles.footer}>
        <Button
          mode="text"
          labelStyle={{ color: colors.primary }}
          onPress={() => router.push('/auth/login')}
        >
          Return to sign in
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 18,
  },
  hero: {
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 8,
  },
  formCard: {
    gap: 8,
  },
  input: {
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  channelRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  primaryButton: {
    marginTop: 12,
    borderRadius: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 12,
  },
});
