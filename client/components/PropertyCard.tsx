import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

const properties = [
  {
    img: require("../assets/estate.jpg"),
    price: "$1,200",
    location: "Los Angeles, USA",
    type: "2 Bed | 2 Bath",
    tag: "Rented", // status is "Rented"
  },
  {
    img: require("../assets/estate.jpg"),
    price: "$500000",
    location: "New York, USA",
    type: "4 Bed | 3 Bath",
    tag: "Free", // status is "Free"
  },
];

const PropertyCard = () => {
  // Helper function to determine the background color based on the status
  const getTagColor = (status: string) => {
    if (status === "Rented") {
      return "green"; // Green for Rented
    } else if (status === "Free") {
      return "blue"; // Blue for Free (or any other color you like)
    }
    return "gray"; // Default color if status is not recognized
  };

  return (
    <View>
      {properties.map((property, index) => (
        <ImageBackground
          key={index}
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
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20, // Optional if you want extra space below each image background
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

export default PropertyCard;
