import { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useThemeStore } from "@/stores/useTheme";
import Loader from "@/components/loaders/Loader";
import GlobalSnackbar from "@/components/ui/Snackbar";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { colors, theme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme(); // Load saved theme on app start
  }, [initializeTheme]);

  if (!loaded) {
    return <Loader />;
  }

  // Customize navigation theme with colors from useThemeStore
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.cardBackground,
      text: colors.text,
      border: colors.divider,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="property/[propertyId]"
            options={{
              headerShown: false,
              title: "Property Details",
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <GlobalSnackbar />
        <StatusBar style={theme === "light" ? "dark" : "light"} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
