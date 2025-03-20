import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStackNavigator from "./stacks/MainStackNavigator";
import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { RefreshProvider } from "./context/RefreshContext";

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <RefreshProvider>
                    <FavoriteProvider>
                        <NavigationContainer>
                            <MainStackNavigator />
                        </NavigationContainer>
                        <Toast config={toastConfig} />
                    </FavoriteProvider>
                </RefreshProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
