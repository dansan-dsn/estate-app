import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingText: string | null;
  startLoading: (text?: string) => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingText: null,
  startLoading: (text) =>
    set({ isLoading: true, loadingText: text || 'Loading...' }),
  stopLoading: () => set({ isLoading: false, loadingText: null }),
}));
