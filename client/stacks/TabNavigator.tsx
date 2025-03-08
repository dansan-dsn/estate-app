import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/ExploreScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
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

type IconNames = "search" | "heart" | "person-circle" | "cog" | "help-circle";

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
            iconName = "person-circle";
          } else if (route.name === "More") {
            iconName = "cog";
          } else {
            iconName = "help-circle"; // Fallback icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ba0f0b", // Active icon color
        tabBarInactiveTintColor: "#614c4c", // Inactive icon color
        tabBarStyle: {
          backgroundColor: "#fff", // Tab bar background color
          paddingBottom: 5, // Adjust bottom padding to align better
          height: 60, // Increase height of tab bar
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust font size of label
          fontWeight: "bold", // Make label text bold
          paddingBottom: 5, // Add some space below the label
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingsScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
