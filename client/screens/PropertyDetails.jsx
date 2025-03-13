import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import FavoriteBadge from "../components/property/FavoriteBadge";
import MapView, { Marker } from "react-native-maps";

const PropertyDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { Property } = route.params || {};

  const scrollY = useRef(new Animated.Value(0)).current; // Animated scroll value

  // Interpolate opacity based on scroll position to fade out the image
  const opacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [100, 0], // Image fades out as you scroll
    extrapolate: "clamp",
  });

  // Interpolate background color based on scroll position
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ["transparent", "#edf1f7"], // Starts transparent and becomes white after scrolling
    extrapolate: "clamp",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const description = Property?.description || "";
  const sentences = description.split(".");
  const slice = sentences.slice(0, 2).join(".") + ".";
  const remainingSlice = sentences.slice(2).join(".");
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Image container with overlay back button */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={Property?.image}
            style={[styles.image, { opacity }]} // Apply opacity only to the image
          />
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            {Property?.name ?? "Unknown Property"}
          </Text>
          <Text style={{ color: "gray", marginBottom: 3, fontSize: 16 }}>
            {Property?.latitude}S, {Property?.longitude}N | {Property?.distance}{" "}
            sqft
          </Text>
          <Text style={styles.location}>
            {Property?.location ?? "Location not specified"}
          </Text>
          <Text style={styles.broker}>Broker: {Property?.broker ?? "N/A"}</Text>

          <Text style={styles.description}>
            {slice}
            {isExpanded + remainingSlice}

            <TouchableOpacity onPress={toggleExpansion}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginLeft: 10,
                  fontSize: 15,
                }}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          </Text>
          <View
            style={{
              backgroundColor: "#ebedf7",
              padding: 15,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
              <Text style={{ color: "blue" }}>{Property?.bed}</Text>{" "}
              <FontAwesome name="bed" size={24} color="#000" />
            </Text>
            <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
              <Text style={{ color: "blue" }}>{Property?.bath}</Text>{" "}
              <FontAwesome name="bath" size={24} color="#000" />
            </Text>
            <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
              <Text style={{ color: "blue" }}>56</Text>{" "}
              <FontAwesome name="bath" size={24} color="#000" />
            </Text>
          </View>
        </View>

        {/* Contact Broker Button */}
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contact Broker</Text>
        </TouchableOpacity>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Property?.latitude ?? 37.78825,
              longitude: Property?.longitude ?? -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: Property?.latitude ?? 37.78825,
                longitude: Property?.longitude ?? -122.4324,
              }}
            />
          </MapView>
        </View>
      </Animated.ScrollView>

      {/* Fixed Top Buttons (Back and Favorite) */}
      <Animated.View style={[styles.fixedTopContainer, { backgroundColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.favoriteBadgeContainer}>
          <FavoriteBadge id={Property?.id} />
        </View>
      </Animated.View>

      {/* Fixed Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <Text style={styles.propertyPrice}>
          ${Property?.price?.toLocaleString() ?? "N/A"}
        </Text>
        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 100, // Prevent content from being overlapped by bottom buttons
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300, // Ensure the image takes up the whole screen height
    overflow: "hidden", // Ensure the image does not spill outside the container
  },
  image: {
    width: "100%",
    height: "100%", // Image will fill the container height
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    backgroundColor: "white", // White background for back button
    padding: 10,
    borderRadius: 50,
    zIndex: 1, // Ensure the back button is always on top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteBadgeContainer: {
    position: "absolute",
    top: 40,
    right: 16,
    zIndex: 1, // Ensure the favorite badge stays on top
  },
  fixedTopContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 60, // Increase the height of the background area
    paddingHorizontal: 15, // Add horizontal padding to ensure elements don't touch edges
    zIndex: 1, // Keeps it above the image
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  broker: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: "#392f94",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  contactText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  mapContainer: {
    marginBottom: 20,
    height: 200,
  },
  map: {
    flex: 1,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  propertyPrice: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 45,
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    alignItems: "center",
  },
  rentButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 45,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
