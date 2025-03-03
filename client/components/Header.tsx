import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  isMapView: boolean;
  toggleView: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMapView, toggleView }) => {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search by city, neighborhood, or address"
          />
        </View>
        <TouchableOpacity style={styles.mapToggle} onPress={toggleView}>
          <Ionicons name={isMapView ? "list" : "map"} size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterTabs}>
        <TouchableOpacity style={styles.filterOption}>
          <Text>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <Text>Bed/Bath</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <Text>Property Type</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
    paddingTop: 60,
  },
  searchContainer: { flexDirection: "row", alignItems: "center" },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchIcon: { marginRight: 10 },
  searchBar: {
    flex: 1,
    height: 40,
  },
  mapToggle: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginLeft: 10,
  },
  filterTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  filterOption: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
