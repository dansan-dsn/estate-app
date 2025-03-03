import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import FavoriteBadge from "../components/FavoriteBadge";

// Type for the route parameters
type PropertyDetailsRouteProp = RouteProp<
  RootStackParamList,
  "PropertyDetails"
>;

const PropertyDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<PropertyDetailsRouteProp>();
  const { Property } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Image container with overlay back button */}
        <View style={styles.imageContainer}>
          <Image source={Property?.image} style={styles.image} />

          {/* Back Button (Top-Left) */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Favorite Badge (Top-Right, slightly lower) */}
          <View style={styles.favoriteBadgeContainer}>
            <FavoriteBadge />
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            {Property?.name ?? "Unknown Property"}
          </Text>
          <Text style={styles.price}>
            ${Property?.price?.toLocaleString() ?? "N/A"}
          </Text>
          <Text style={{ color: "gray" }}>
            {Property?.bed}bed | {Property?.bath}bath | {Property?.distance}{" "}
            sqft
          </Text>
          <Text style={{ color: "gray" }}>
            {Property?.latitude}S, {Property?.longitude} N
          </Text>
          <Text style={styles.location}>
            {Property?.location ?? "Location not specified"}
          </Text>
          <Text style={styles.status}>{Property?.status ?? "Available"}</Text>
        </View>

        <View style={styles.additionalInfoContainer}>
          <Text style={styles.propertyType}>
            Type: {Property?.propertyType ?? "N/A"}
          </Text>
          <Text style={styles.beds}>Beds: {Property?.bed ?? "N/A"}</Text>
          <Text style={styles.baths}>Baths: {Property?.bath ?? "N/A"}</Text>
          <Text style={styles.broker}>Broker: {Property?.broker ?? "N/A"}</Text>
          <Text style={styles.description}>
            {Property?.description ?? "No description available."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    zIndex: 1, // Ensure it's above the image
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  additionalInfoContainer: {
    padding: 20,
    backgroundColor: "#f1f1f1",
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  propertyType: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  beds: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  baths: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  broker: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  favoriteBadgeContainer: {
    position: "absolute",
    top: 40, // Adjust this value to move the badge lower
    right: 16,
  },
});
