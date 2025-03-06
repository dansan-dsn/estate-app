import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PropertyCard from "../components/PropertyCard";
import { useFavorite } from "../context/FavoriteContext";

// Import the Property type
interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bed: number;
  bath: number;
  distance: number;
  broker: string;
  description: string;
  image: any; // Image asset
  status?: string;
}

// Define the root stack type
type RootStackParamList = {
  PropertyDetails: { Property: Property };
};

// Define the navigation prop type
type FavoriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PropertyDetails"
>;

// Use the same properties data from ExploreScreen
const properties: Property[] = [
  {
    id: "1",
    name: "Luxury Apartment",
    price: 1200000,
    location: "New York, NY",
    propertyType: "Villa",
    latitude: 40.7128,
    longitude: -74.006,
    bed: 3,
    bath: 2,
    distance: 10,
    broker: "John Doe",
    description: "A beautiful luxury apartment.",
    image: require("../assets/house3.webp"),
    status: "Pending",
  },
  {
    id: "2",
    name: "Modern Villa",
    price: 2500000,
    location: "Los Angeles, CA",
    propertyType: "Apartment",
    latitude: 34.0522,
    longitude: -118.2437,
    bed: 4,
    bath: 3,
    distance: 15,
    broker: "Jane Smith",
    description: "A spacious and modern villa.",
    image: require("../assets/house2.jpg"),
    status: "For sale",
  },
  {
    id: "3",
    name: "Modern Villa",
    price: 2500000,
    location: "Los Angeles, CA",
    propertyType: "Rentals",
    latitude: 34.0522,
    longitude: -118.2437,
    bed: 4,
    bath: 3,
    distance: 20,
    broker: "Emily Johnson",
    description: "A modern villa with a great view.",
    image: require("../assets/house4.jpg"),
    status: "Rented",
  },
];

const FavoriteScreen = () => {
  const navigation = useNavigation<FavoriteScreenNavigationProp>();
  const { favorites } = useFavorite(); // Get favorite state

  // Filter the properties to only show favorited ones
  const favoriteProperties = properties.filter((property) => favorites[property.id]);

  return (
    <View style={styles.container}>
      {favoriteProperties.length > 0 ? (
        <FlatList
          data={favoriteProperties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard item={item} onPress={() => navigation.navigate("PropertyDetails", { Property: item })} />
          )}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 1 },
  noFavorites: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default FavoriteScreen;
