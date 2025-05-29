import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { Platform } from "react-native";
import HomeScreen from "@/app/(tabs)/index";
import FavoriteScreen from "@/app/(tabs)/favorite";
import AccountScreen from "@/app/(tabs)/account";
import SettingsScreen from "@/app/(tabs)/settings";
import { useThemeStore } from "@/stores/useTheme";

export default function TabLayout() {
  const [index, setIndex] = useState(0);
  const { colors } = useThemeStore();

  const routes = [
    {
      key: "index",
      title: "Home",
      focusedIcon: "compass",
      unfocusedIcon: "compass-outline",
    },
    {
      key: "favorite",
      title: "Favorite",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    index: HomeScreen,
    favorite: FavoriteScreen,
    account: AccountScreen,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      labeled={false}
      barStyle={{
        position: Platform.OS === "ios" ? "absolute" : "relative",
        backgroundColor: colors.surfaceVariant,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
        elevation: 2,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      activeColor={colors.iconActive}
      inactiveColor={colors.icon}
    />
  );
}
