import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

import TabLayout from '@/app/(tabs)/_layout';
import { useOnboardingStore } from '@/stores/onboarding';
import { useThemeStore } from '@/stores/useTheme';

export default function Index() {
  const { colors } = useThemeStore();
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding
  );
  const isReady = useOnboardingStore((state) => state.isReady);
  const initialize = useOnboardingStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <TabLayout />;
}
