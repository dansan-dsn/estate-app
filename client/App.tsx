import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast, { ToastConfig } from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
import MainStackNavigator from "./stacks/MainStackNavigator";
import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
          <Toast config={toastConfig as ToastConfig} />
        </FavoriteProvider>
      </DataProvider>
    </AuthProvider>
  );
}
