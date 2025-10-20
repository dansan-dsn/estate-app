import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  Switch,
  HelperText,
  Chip,
  Checkbox,
} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from 'zod';
import { useThemeStore } from '@/stores/useTheme';
import GlassCard from '@/components/ui/GlassCard';

const signupSchema = z
  .object({
    fullName: z.string().min(3, 'Please provide your full name'),
    email: z.string().email('Use a valid email address'),
    password: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[0-9]/, 'Include at least one number'),
    confirmPassword: z.string(),
    agreeTerms: z
      .boolean()
      .refine((val) => val, 'You must accept the terms to proceed'),
    role: z.enum(['tenant', 'agent', 'broker']),
    subscribe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

type SignupForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  role: 'tenant' | 'agent' | 'broker';
  subscribe?: boolean;
};

export default function SignupScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const [formData, setFormData] = useState<SignupForm>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    role: 'tenant',
    subscribe: true,
  });
  const [secureEntry, setSecureEntry] = useState(true);
  const [confirmSecureEntry, setConfirmSecureEntry] = useState(true);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupForm, string>>
  >({});

  const formIsValid = useMemo(
    () => signupSchema.safeParse(formData).success,
    [formData]
  );

  const validateField = (field: keyof SignupForm) => {
    const partialSchema = signupSchema.pick({ [field]: true } as any);
    const result = partialSchema.safeParse({ [field]: formData[field] });
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const handleChange = (field: keyof SignupForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof SignupForm;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    Alert.alert(
      'Account created',
      'Your profile is ready. Connect to APIs to persist data.'
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
      <View style={[styles.hero, { backgroundColor: colors.secondary + '1a' }]}>
        <MaterialCommunityIcons
          name="account-network"
          size={36}
          color={colors.secondary}
        />
        <Text
          variant="headlineSmall"
          style={{ color: colors.secondary, marginTop: 8 }}
        >
          Create your EstateOS identity
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: colors.textSecondary,
            marginTop: 6,
            textAlign: 'center',
          }}
        >
          Unlock a glassmorphic workspace tailored for investors, brokers, and
          modern tenants.
        </Text>
      </View>

      <GlassCard style={styles.formCard}>
        <Text
          variant="titleMedium"
          style={{ color: colors.text, marginBottom: 12 }}
        >
          Profile details
        </Text>

        <TextInput
          label="Full name"
          value={formData.fullName}
          onChangeText={(value) => handleChange('fullName', value)}
          onBlur={() => validateField('fullName')}
          style={styles.input}
          left={<TextInput.Icon icon="account-outline" />}
        />
        <HelperText type="error" visible={Boolean(errors.fullName)}>
          {errors.fullName}
        </HelperText>

        <TextInput
          label="Email address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          onBlur={() => validateField('email')}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
        />
        <HelperText type="error" visible={Boolean(errors.email)}>
          {errors.email}
        </HelperText>

        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          onBlur={() => validateField('password')}
          style={styles.input}
          secureTextEntry={secureEntry}
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={secureEntry ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setSecureEntry((prev) => !prev)}
            />
          }
        />
        <HelperText type="error" visible={Boolean(errors.password)}>
          {errors.password}
        </HelperText>

        <TextInput
          label="Confirm password"
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          onBlur={() => validateField('confirmPassword')}
          style={styles.input}
          secureTextEntry={confirmSecureEntry}
          left={<TextInput.Icon icon="shield-lock-outline" />}
          right={
            <TextInput.Icon
              icon={confirmSecureEntry ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setConfirmSecureEntry((prev) => !prev)}
            />
          }
        />
        <HelperText type="error" visible={Boolean(errors.confirmPassword)}>
          {errors.confirmPassword}
        </HelperText>

        <Text
          variant="bodySmall"
          style={{ color: colors.textSecondary, marginTop: 8 }}
        >
          Choose the experience that fits you best
        </Text>
        <View style={styles.roleRow}>
          {(
            [
              { value: 'tenant', label: 'Tenant' },
              { value: 'agent', label: 'Agent' },
              { value: 'broker', label: 'Broker' },
            ] as const
          ).map((option) => (
            <Chip
              key={option.value}
              selected={formData.role === option.value}
              onPress={() => handleChange('role', option.value)}
              style={{
                backgroundColor:
                  formData.role === option.value
                    ? colors.primary + '22'
                    : colors.surfaceVariant,
              }}
              textStyle={{
                color:
                  formData.role === option.value
                    ? colors.primary
                    : colors.textSecondary,
                fontWeight: '600',
              }}
              icon={
                formData.role === option.value
                  ? 'check-circle-outline'
                  : 'circle-outline'
              }
            >
              {option.label}
            </Chip>
          ))}
        </View>

        <View style={styles.switchRow}>
          <Switch
            value={formData.agreeTerms}
            onValueChange={(value) => {
              handleChange('agreeTerms', value);
              validateField('agreeTerms');
            }}
            color={colors.primary}
            trackColor={{
              false: colors.textSecondary,
              true: colors.primaryDark,
            }}
          />
          <Text
            variant="bodyMedium"
            style={{ color: colors.textSecondary, flex: 1 }}
          >
            I agree to the Terms of Service and Privacy Policy
          </Text>
        </View>
        <HelperText type="error" visible={Boolean(errors.agreeTerms)}>
          {errors.agreeTerms}
        </HelperText>

        <View style={styles.checkboxRow}>
          <Checkbox
            status={formData.subscribe ? 'checked' : 'unchecked'}
            onPress={() => handleChange('subscribe', !formData.subscribe)}
            color={colors.primary}
          />
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Send me curated market reports and launch updates
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
          Create workspace
        </Button>
      </GlassCard>

      <GlassCard style={styles.secondaryCard} intensity={25} borderless>
        <Text
          variant="titleSmall"
          style={{ color: colors.text, marginBottom: 12 }}
        >
          Quick onboarding
        </Text>
        <Button
          mode="outlined"
          icon="linkedin"
          style={[styles.socialButton, { borderColor: '#0A66C2' }]}
          labelStyle={{ color: '#0A66C2' }}
          onPress={() =>
            Alert.alert('LinkedIn', 'LinkedIn onboarding coming soon.')
          }
        >
          Import from LinkedIn
        </Button>
      </GlassCard>

      <View style={styles.footer}>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          Already have an account?
        </Text>
        <Button
          mode="text"
          labelStyle={{ color: colors.primary }}
          onPress={() => router.push('/auth/login')}
        >
          Sign in
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
    paddingVertical: 30,
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
  roleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  primaryButton: {
    marginTop: 16,
    borderRadius: 18,
  },
  socialButton: {
    marginVertical: 6,
  },
  secondaryCard: {
    gap: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
});
