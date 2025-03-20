import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ isMapView, toggleView }) => {
  const [searchContent, setSearchContent] = useState("");

  const handleSearch = (value) => {
    setSearchContent(value);
  };
  return (
    <View>
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
            value={searchContent}
            onChangeText={handleSearch}
          />
          {searchContent && (
            <Ionicons
              name="close-circle"
              size={20}
              color="#888"
              style={styles.closeIcon}
              onPress={() => setSearchContent("")}
            />
          )}
        </View>
        <TouchableOpacity style={styles.mapToggle} onPress={toggleView}>
          <Ionicons name={isMapView ? "list" : "map"} size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
  },
  searchContainer: { flexDirection: "row", alignItems: "center" },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  searchIcon: { marginRight: 10 },
  closeIcon: {
    marginRight: 10,
    color: "lightblue",
  },
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#322f2f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
