import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Notification from "../components/Notification";
import SearchBar from "../components/SearchBar";
import Category from "../components/Category";
import PropertyCard from "../components/PropertyCard";

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <ImageBackground
        source={require("../assets/estate.jpg")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.headerTitle}>Find Your Dream Property</Text>
        <Text style={styles.headerSubtitle}>
          Explore thousands of properties for rent and sale.
        </Text>
      </ImageBackground>

      {/* Search Bar */}
      <SearchBar />

      {/* Categories */}
      <Category />

      {/* Featured Properties */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <PropertyCard />
      </View>

      {/* Recommended for You */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <PropertyCard />
      </View>

      {/* Latest Listings */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Latest Listings</Text>
        <PropertyCard />
      </View>

      {/* Call to Action: List Your Property */}
      <View style={styles.callToActionContainer}>
        <Text style={styles.callToActionText}>
          Want to sell or rent your property?
        </Text>
        <TouchableOpacity style={styles.callToActionButton}>
          <Text style={styles.callToActionButtonText}>List Your Property</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerImage: {
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5c5d61",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#de7935",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  callToActionContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginVertical: 20,
    borderRadius: 10,
  },
  callToActionText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  callToActionButton: {
    backgroundColor: "#de7935",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  callToActionButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
