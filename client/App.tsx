import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast, { ToastConfig } from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
// import AuthStack from "./stacks/AuthStack";
import TabNavigator from "./stacks/TabNavigator";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      <Toast config={toastConfig as ToastConfig} />
    </AuthProvider>
  );
}
