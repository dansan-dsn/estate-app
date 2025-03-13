import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropertyCard from "../components/property/PropertyCard";
import { useFavorite } from "../context/FavoriteContext";
import { propertyData } from "../utils/properties";

// Use the same properties data from ExploreScreen
const properties = propertyData;

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useFavorite();

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
            <TouchableOpacity>
              <Text style={styles.addFavoritesText}>Add favorites</Text>
            </TouchableOpacity>
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
    color: "#fff", // Dark gray color
    fontFamily: "Poppins",
    marginTop: 5,
    backgroundColor: "#de4b4b",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});

export default FavoriteScreen;
