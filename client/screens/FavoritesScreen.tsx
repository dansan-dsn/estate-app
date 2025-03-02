import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the heart icon

const propertiesData = [
  {
    id: 1,
    img: require("../assets/estate.jpg"),
    price: "$1,200",
    location: "Los Angeles, USA",
    type: "2 Bed | 2 Bath",
    tag: "Rented", // status is "Rented"
    like: "true", // Liked property
  },
  {
    id: 2,
    img: require("../assets/estate.jpg"),
    price: "$500,000",
    location: "New York, USA",
    type: "4 Bed | 3 Bath",
    tag: "Free", // status is "Free"
    like: "false", // Not liked property
  },
];

const FavoritesScreen = () => {
  const [properties, setProperties] = useState(propertiesData);

  // Helper function to determine the background color based on the status
  const getTagColor = (status: string) => {
    if (status === "Rented") {
      return "green"; // Green for Rented
    } else if (status === "Free") {
      return "blue"; // Blue for Free (or any other color you like)
    }
    return "gray"; // Default color if status is not recognized
  };

  // Toggle like status
  const toggleLike = (id: number) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === id
          ? { ...property, like: property.like === "true" ? "false" : "true" }
          : property
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {properties
        .filter((property) => property.like === "true") // Filter liked properties
        .map((property, index) => (
          <View key={property.id} style={styles.propertyCard}>
            <ImageBackground
              source={property.img} // Replace with your image
              style={styles.propertyImage}
              imageStyle={styles.propertyImageStyle}
            >
              <View style={styles.propertyOverlay}>
                <Text style={styles.propertyPrice}>{property.price}</Text>
                <Text style={styles.propertyLocation}>{property.location}</Text>
                <Text style={styles.propertyType}>{property.type}</Text>
                <View
                  style={[
                    styles.propertyTagContainer,
                    { backgroundColor: getTagColor(property.tag) }, // Dynamic color based on status
                  ]}
                >
                  <Text style={styles.propertyTag}>{property.tag}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
  },
  propertyCard: {
    marginBottom: 20, // Add spacing between each card
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 3,
  },
  propertyImage: {
    height: 200,
    justifyContent: "flex-end",
  },
  propertyImageStyle: {
    borderRadius: 10,
  },
  propertyOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  propertyLocation: {
    fontSize: 16,
    color: "#FFF",
  },
  propertyType: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 5,
  },
  propertyTagContainer: {
    position: "absolute", // Position tag on the right side
    top: 15, // Space from the top of the card
    right: 15, // Space from the right side
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 40, // Make it a rounded pill
  },
  propertyTag: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
