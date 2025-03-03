import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreStackNavigator from "./ExploreStack";
import FavoritesScreen from "../screens/FavoritesScreen"; // Ensure you have this screen
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";

type RootTabParamList = {
  Explore: undefined;
  Favorites: undefined;
  Account: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconNames =
  | "search"
  | "heart"
  | "person-circle-outline"
  | "settings"
  | "help-circle";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconNames;

          if (route.name === "Explore") {
            iconName = "search";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Account") {
            iconName = "person-circle-outline";
          } else if (route.name === "More") {
            iconName = "settings";
          } else {
            iconName = "help-circle"; // Fallback icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#d41340",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          // headerShown: false,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingsScreen}
        options={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
