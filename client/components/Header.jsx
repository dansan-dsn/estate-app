import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./filters/SearchBar";
import PriceFilter from "./filters/PriceFilter";

const Header = ({
  isMapView,
  toggleView,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  priceError,
  setPriceError,
  onApplyFilter,
}) => {
  return (
    <View style={styles.header}>
      {/* search bar and the map view */}
      <SearchBar isMapView={isMapView} toggleView={toggleView} />

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {/* Price filter */}
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          priceError={priceError}
          setPriceError={setPriceError}
          onApplyFilter={onApplyFilter}
        />

        {/* Bed and Bath filter */}
        <TouchableOpacity style={styles.filterOption}>
          <Text>Bed/Bath</Text>
        </TouchableOpacity>

        {/* Property type filter */}
        <TouchableOpacity style={styles.filterOption}>
          <Text>Property Type</Text>
        </TouchableOpacity>

        {/* general filter */}
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
