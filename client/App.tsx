import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Ensure IconName is imported
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import ExploreScreen from "./screens/ExploreScreen"; // Ensure you have this screen
import SavedScreen from "./screens/SavedScreen"; // Ensure you have this screen
import ProfileScreen from "./screens/ProfileScreen";
import Toast, { ToastConfig } from "react-native-toast-message"; // Ensure ToastConfig is imported
import { toastConfig } from "./utils/toastConfig";

// Define types for navigation
type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Saved: undefined;
  Profile: undefined;
};

// Define a type for the icon names
type IconNames = "home" | "compass" | "bookmark" | "user" | "question";

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

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explore") {
            iconName = "compass";
          } else if (route.name === "Saved") {
            iconName = "bookmark";
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
        tabBarItemStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
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
