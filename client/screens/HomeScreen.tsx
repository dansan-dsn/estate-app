import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <ImageBackground
        source={require("../assets/estate.jpg")} // Replace with your image
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <Text style={styles.headerTitle}>Find Your Dream Property</Text>
        <Text style={styles.headerSubtitle}>
          Explore thousands of properties for sale, rent, or investment.
        </Text>
      </ImageBackground>

      {/* Action Buttons Section */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="attach-money" size={40} color="#4CAF50" />
          <Text style={styles.actionText}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="hand-holding-usd" size={40} color="#FFA000" />
          <Text style={styles.actionText}>Rent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="house" size={40} color="#2196F3" />
          <Text style={styles.actionText}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Properties Section */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        <View style={styles.propertyCard}>
          <ImageBackground
            source={require("../assets/estate.jpg")} // Replace with your image
            style={styles.propertyImage}
            imageStyle={styles.propertyImageStyle}
          >
            <View style={styles.propertyOverlay}>
              <Text style={styles.propertyPrice}>$500,000</Text>
              <Text style={styles.propertyLocation}>New York, USA</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  featuredContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  propertyCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
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
    padding: 10,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  propertyLocation: {
    fontSize: 14,
    color: "#FFF",
  },
});
