import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import Notification from "../components/Notification"; // Importing the notification icon
import SearchBar from "../components/SearchBar"; // Importing the search bar
import Category from "../components/Category"; // Importing the category badges

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Notification Icon */}
      <ImageBackground
        source={require("../assets/estate.jpg")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.headerTitle}>Find Your Dream Property</Text>
        <Text style={styles.headerSubtitle}>
          Explore thousands of properties for sale, rent, or investment.
        </Text>
      </ImageBackground>

      {/* Search Bar */}
      <SearchBar />

      {/* Category Badges */}
      <Category />

      {/* Featured Properties Section */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>

        {/* Property Cards */}
        <View style={styles.propertyCard}>
          <ImageBackground
            source={require("../assets/estate.jpg")} // Replace with your image
            style={styles.propertyImage}
            imageStyle={styles.propertyImageStyle}
          >
            <View style={styles.propertyOverlay}>
              <Text style={styles.propertyPrice}>$500,000</Text>
              <Text style={styles.propertyLocation}>New York, USA</Text>
              <Text style={styles.propertyType}>4 Bed, 3 Bath</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.propertyCard}>
          <ImageBackground
            source={require("../assets/estate.jpg")} // Replace with your image
            style={styles.propertyImage}
            imageStyle={styles.propertyImageStyle}
          >
            <View style={styles.propertyOverlay}>
              <Text style={styles.propertyPrice}>$1,200/month</Text>
              <Text style={styles.propertyLocation}>Los Angeles, USA</Text>
              <Text style={styles.propertyType}>2 Bed, 2 Bath</Text>
            </View>
          </ImageBackground>
        </View>
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
  featuredContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  propertyCard: {
    marginBottom: 20,
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
});

export default HomeScreen;
