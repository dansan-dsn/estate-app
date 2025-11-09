import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const STORAGE_KEY = 'estate-app:onboarding_complete';

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  isReady: boolean;
  initialize: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasCompletedOnboarding: false,
  isReady: false,
  initialize: async () => {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
      set({
        hasCompletedOnboarding: storedValue === 'true',
        isReady: true,
      });
    } catch (error) {
      console.warn('Failed to load onboarding state', error);
      set({ hasCompletedOnboarding: false, isReady: true });
    }
  },
  completeOnboarding: async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
      set({ hasCompletedOnboarding: true });
    } catch (error) {
      console.warn('Failed to persist onboarding state', error);
      set({ hasCompletedOnboarding: true });
    }
  },
  resetOnboarding: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset onboarding state', error);
    } finally {
      set({ hasCompletedOnboarding: false });
    }
  },
}));
