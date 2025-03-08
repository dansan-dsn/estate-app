import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PropertyCard from "../components/PropertyCard";
import { useFavorite } from "../context/FavoriteContext";
import { propertyData } from "../utils/properties";

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
const properties: Property[] = propertyData;

const FavoriteScreen = () => {
  const navigation = useNavigation<FavoriteScreenNavigationProp>();
  const { favorites } = useFavorite(); // Get favorite state

  // Filter the properties to only show favorited ones
  const favoriteProperties = properties.filter(
    (property) => favorites[property.id]
  );

  return (
    <View style={styles.container}>
      {favoriteProperties.length > 0 ? (
        <FlatList
          data={favoriteProperties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard
              item={item}
              onPress={() =>
                navigation.navigate("PropertyDetails", { Property: item })
              }
            />
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
