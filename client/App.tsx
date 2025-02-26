import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Ensure IconName is imported
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen"; // Ensure you have this screen
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen"; // Ensure you have this screen
import Toast, { ToastConfig } from "react-native-toast-message"; // Ensure ToastConfig is imported
import { toastConfig } from "./utils/toastConfig";
import { Ionicons } from "@expo/vector-icons";

// Define types for navigation
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RootTabParamList = {
  Discover: undefined;
  Favorites: undefined;
  Account: undefined;
  More: undefined;
};

// Define a type for the icon names
type IconNames =
  | "search"
  | "heart"
  | "person-circle-outline"
  | "settings"
  | "help-circle";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Stack Navigator for Auth Screens
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconNames;

          if (route.name === "Discover") {
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
        name="Discover"
        component={HomeScreen}
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
          headerShown: false,
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

// Main App Component
export default function App() {
  return (
    <>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      <Toast config={toastConfig as ToastConfig} /> {/* Ensure correct type */}
    </>
  );
}
