import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CurrencyState = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (amount: number) => string;
};

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: "USD",
  setCurrency: (currency) => {
    AsyncStorage.setItem("appCurrency", currency);
    set({ currency });
  },
  formatPrice: (amount: number) => {
    const { currency } = get();
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(amount);
  },
}));

// Load from storage on app start
AsyncStorage.getItem("appCurrency").then((saved) => {
  if (saved) {
    useCurrencyStore.setState({ currency: saved });
  }
});
