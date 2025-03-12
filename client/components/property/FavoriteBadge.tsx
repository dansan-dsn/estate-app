import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFavorite } from "../../context/FavoriteContext";

// Define props type for FavoriteBadge
interface FavoriteBadgeProps {
  id: string; // Ensures id is always a string
}

const FavoriteBadge: React.FC<FavoriteBadgeProps> = ({ id }) => {
  const { favorites, toggleFavorite } = useFavorite(); // Get favorites state and toggle function
  const isFavorite = favorites[id] || false; // Check if this specific id is favorited

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(id)}
      style={styles.favoriteBadge}
    >
      <Ionicons name="heart" size={24} color={isFavorite ? "red" : "#c7c8c9"} />
    </TouchableOpacity>
  );
};

export default FavoriteBadge;

const styles = StyleSheet.create({
  favoriteBadge: {
    position: "absolute",
    top: 18,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
