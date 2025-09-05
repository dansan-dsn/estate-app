import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, RadioButton, TouchableRipple } from 'react-native-paper';
import { useThemeStore } from '@/stores/useTheme';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'it', label: 'Italian', flag: '🇮🇹' },
  { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'zh', label: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
  { code: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'sw', label: 'Swahili', flag: '🇰🇪' },
];

const Language = () => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('en');
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Appbar.Header
        elevated
        style={{ backgroundColor: colors.headerBackground }}
      >
        <Appbar.BackAction
          onPress={() => router.back()}
          color={colors.headerTint}
        />
        <Appbar.Content
          title="Languages"
          titleStyle={{ color: colors.headerText, fontWeight: '600' }}
        />
      </Appbar.Header>

      {/* Languages */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const isActive = selectedLang === lang.code;
          return (
            <TouchableRipple
              key={lang.code}
              onPress={() => setSelectedLang(lang.code)}
              borderless
              rippleColor={colors.primary + '33'}
              style={[
                styles.langItem,
                {
                  borderLeftColor: isActive ? colors.primary : 'transparent',
                  backgroundColor: isActive
                    ? colors.surfaceVariant
                    : colors.surface,
                },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.flag, { color: colors.text }]}>
                  {lang.flag}
                </Text>
                <Text
                  style={[
                    styles.langText,
                    { color: isActive ? colors.primary : colors.text },
                  ]}
                >
                  {lang.label}
                </Text>
                <RadioButton
                  value={lang.code}
                  color={colors.primary}
                  status={isActive ? 'checked' : 'unchecked'}
                />
              </View>
            </TouchableRipple>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  langText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});
