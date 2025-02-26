import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PropertyCard from "../components/PropertyCard";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([
    { id: "1", title: "Luxury Apartment in New York" },
    { id: "2", title: "Modern Villa in Los Angeles" },
    { id: "3", title: "Beach House in Miami" },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((property) => property.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Saved Properties</Text>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.propertyContainer}>
              <PropertyCard title={item.title} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavorite(item.id)}
              >
                <Ionicons name="heart-dislike-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={50} color="#999" />
          <Text style={styles.emptyText}>
            You haven't saved any properties yet.
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Properties</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  propertyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
    marginTop: 10,
  },
  exploreButton: {
    marginTop: 15,
    backgroundColor: "#de7935",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  exploreButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
