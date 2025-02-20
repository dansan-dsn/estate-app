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
import PropertyCard from "../components/PropertyCard";

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../assets/estate.jpg")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.headerTitle}>Find Your Dream Property</Text>
        <Text style={styles.headerSubtitle}>
          Explore thousands of properties for rent.
        </Text>
      </ImageBackground>

      <SearchBar />

      <Category />

      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <PropertyCard />
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
});

export default HomeScreen;
