import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PropertyCard from "../components/property/PropertyCard";
import { useFavorite } from "../context/FavoriteContext";
import { propertyData } from "../utils/properties";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import useSafeAreaInsets

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
  const insets = useSafeAreaInsets(); // Get safe area insets

  // Filter the properties to only show favorited ones
  const favoriteProperties = properties.filter(
    (property) => favorites[property.id]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <View style={{ flex: 1, paddingTop: 100 }}>
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
          <View style={styles.emptyState}>
            <Image
              source={require("../assets/images/empty_fav.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.noFavorites}>No favorites yet</Text>
            <Text style={styles.addFavoritesText}>
              Add some properties to your favorites!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#34495e",
    padding: 10,
    paddingTop: 60, // Space for the status bar
    width: "100%", // Ensure title spans the full width
    elevation: 5, // Adds shadow to make the title stand out
  },
  title: {
    fontFamily: "Poppins", // Consistent font across the app
    fontSize: 24,
    color: "#fff",
    paddingBottom: 6,
    paddingLeft: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain", // Ensures image is well-suited for the screen
  },
  noFavorites: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
    fontFamily: "Poppins", // Same font family for consistency
    marginBottom: 10,
  },
  addFavoritesText: {
    fontSize: 16,
    textAlign: "center",
    color: "#34495e", // Dark gray color
    fontFamily: "Poppins",
    marginTop: 5,
  },
});

export default FavoriteScreen;
