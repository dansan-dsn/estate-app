import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Define a type for the category data
interface CategoryItem {
  name: string;
  iconName: keyof typeof FontAwesome.glyphMap; // Ensures valid FontAwesome icon names
}

// Define the categories array with proper typing
const categories: CategoryItem[] = [
  { name: "House", iconName: "home" },
  { name: "Apartment", iconName: "building" },
  { name: "Hotel", iconName: "hotel" },
  { name: "Room", iconName: "hotel" },
];

const Category: React.FC = () => {
  return (
    <View style={styles.badgesContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.badge}>
          <FontAwesome name={category.iconName} size={20} color="#522426" />
          <Text style={styles.badgeText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow items to wrap onto the next line
    justifyContent: "space-between", // Even spacing between items
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 10,
    padding: 10,
  },
  badge: {
    flexDirection: "column", // Stack the icon and text vertically
    alignItems: "center", // Center icon and text horizontally
    paddingVertical: 10,
    paddingHorizontal: 1,
    margin: 5,
    backgroundColor: "#fff",
  },
  badgeText: {
    color: "#4f5463",
    fontWeight: "bold",
    marginTop: 5, // Space between the icon and text
  },
});

export default Category;
