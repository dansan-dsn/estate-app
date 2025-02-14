import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Icons
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import PropertiesScreen from "./screens/PropertiesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";

// Define types for navigation
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Properties: undefined;
  Favorites: undefined;
  Messages: undefined;
  Profile: undefined;
};

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
          let iconName: string;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Properties") {
            iconName = "building";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "Messages") {
            iconName = "envelope";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else {
            iconName = "question"; // Fallback icon
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#d41340",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Properties" component={PropertiesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
      <Toast config={toastConfig} />
    </>
  );
}
