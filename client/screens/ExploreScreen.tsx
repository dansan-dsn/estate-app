import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const isAuthenticated = false; // Replace with actual authentication logic

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Authentication Required",
        "You need to log in to place an order.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Login", onPress: () => navigation.navigate("Login") },
        ]
      );
    } else {
      // Proceed with placing the order
      Alert.alert("Order Placed", "Your order has been placed successfully!");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Properties Screen</Text>
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExploreScreen;
