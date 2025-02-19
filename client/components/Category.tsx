import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const categories = ["Buy", "Rent", "Sell", "Invest"];

const Category = () => {
  return (
    <View style={styles.badgesContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginHorizontal: 20,
  },
  badge: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 20,
    elevation: 3,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Category;
