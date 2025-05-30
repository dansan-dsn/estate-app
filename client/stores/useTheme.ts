import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorState } from "@/shared/interfaces/theme";
import { Colors } from "@/constants/Colors";

export const useThemeStore = create<ColorState>((set) => ({
  theme: "light",
  colors: Colors.light,
  setTheme: async (theme) => {
    set({
      theme,
      colors: theme === "light" ? Colors.light : Colors.dark,
    });
    await AsyncStorage.setItem("theme", theme);
  },
  initializeTheme: async () => {
    const savedTheme = await AsyncStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      set({
        theme: savedTheme,
        colors: savedTheme === "light" ? Colors.light : Colors.dark,
      });
    }
  },
}));
