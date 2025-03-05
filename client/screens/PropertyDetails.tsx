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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image container with overlay back button */}
        <View style={styles.imageContainer}>
          <Image source={Property?.image} style={styles.image} />

          {/* Back Button */}
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
          <Text style={{ color: "gray", marginBottom: 3, fontSize: 16 }}>
            {Property?.latitude}S, {Property?.longitude}N | {Property?.distance}{" "}
            sqft
          </Text>
          <Text style={styles.location}>
            {Property?.location ?? "Location not specified"}
          </Text>
          <Text style={styles.broker}>Broker: {Property?.broker ?? "N/A"}</Text>
          <Text style={styles.description}>
            {Property?.description ?? "No description available."}
          </Text>
          <View
            style={{
              backgroundColor: "#ebedf7",
              padding: 15,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ paddingHorizontal: 10 }}>{Property?.bed} beds</Text>
            <Text style={{ paddingHorizontal: 10 }}>{Property?.bath} bath</Text>
            <Text style={{ paddingHorizontal: 10 }}>{Property?.latitude}</Text>
          </View>
        </View>

        {/* Contact Broker Button */}
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contact Broker</Text>
        </TouchableOpacity>
      </ScrollView>

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
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
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
    // backgroundColor: "#e4e5eb",
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
  favoriteBadgeContainer: {
    position: "absolute",
    top: 40, // Adjust this value to move the badge lower
    right: 16,
  },
});
