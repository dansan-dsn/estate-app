import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const FavoriteBadge = () => {
  return (
    <View style={styles.favoriteBadge}>
      <Ionicons name="heart" size={18} color="#fff" />
    </View>
  );
};

export default FavoriteBadge;

const styles = StyleSheet.create({
  favoriteBadge: {
    position: "absolute",
    top: 18,
    right: 16,
    backgroundColor: "red",
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
