import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useThemeStore } from '@/stores/useTheme';
import { useOnboardingStore } from '@/stores/onboarding';

const { width } = Dimensions.get('window');

type OnboardingSlide = {
  key: string;
  title: string;
  description: string;
  icon: string;
};

const SLIDES: OnboardingSlide[] = [
  {
    key: 'discover',
    title: 'Discover curated listings',
    description:
      'Tour premium rentals and investments with immersive media, smart filters, and contextual insights.',
    icon: 'home-search',
  },
  {
    key: 'organize',
    title: 'Organize your pipeline',
    description:
      'Track tasks, monitor performance, and stay aligned with clients or household members from one workspace.',
    icon: 'view-dashboard-outline',
  },
  {
    key: 'stay-connected',
    title: 'Stay ahead with alerts',
    description:
      'Save searches, get notified instantly, and collaborate with agents or property managers in real time.',
    icon: 'bell-ring-outline',
  },
];

export default function OnboardingScreen() {
  const { colors } = useThemeStore();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList<OnboardingSlide>>(null);

  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await completeOnboarding();
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: colors.primary + '15' },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={48}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {item.description}
            </Text>
          </View>
        )}
      />

      <View style={styles.indicatorRow}>
        {SLIDES.map((slide, index) => (
          <View
            key={slide.key}
            style={[
              styles.indicator,
              {
                backgroundColor:
                  index === currentIndex
                    ? colors.primary
                    : colors.segmentBackground,
                width: index === currentIndex ? 28 : 10,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          mode="text"
          textColor={colors.textSecondary}
          onPress={handleComplete}
        >
          Skip
        </Button>

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.primaryButton}
          contentStyle={{ paddingHorizontal: 18 }}
        >
          {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  primaryButton: {
    borderRadius: 24,
  },
});
