import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal"; // Import the Modal component

interface HeaderProps {
  isMapView: boolean;
  toggleView: () => void;
  minPrice: number | string;
  maxPrice: number | string;
  priceError: string | null;
  setMinPrice: React.Dispatch<React.SetStateAction<number | string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | string>>;
  setPriceError: React.Dispatch<React.SetStateAction<string>>;
  onApplyFilter: (minPrice: number | string, maxPrice: number | string) => void;
}

const Header: React.FC<HeaderProps> = ({
                                         isMapView,
                                         toggleView,
                                         minPrice,
                                         maxPrice,
                                         setMinPrice,
                                         setMaxPrice,
                                         priceError,
                                         setPriceError,
                                         onApplyFilter
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    if (maxPrice && Number(value) > Number(maxPrice)) {
      setPriceError("Max Price can't be less than Min Price");
    } else {
      setPriceError("");
    }
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    if (minPrice && Number(value) < Number(minPrice)) {
      setPriceError("Max Price can't be less than Min Price");
    } else {
      setPriceError("");
    }
  };

  const handleApplyFilter = () => {
    setModalVisible(false)
    onApplyFilter(minPrice, maxPrice); // Trigger the filter application
  };

  return (
      <View style={styles.header}>
        {/* Search and Map Toggle */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput style={styles.searchBar} placeholder="Search by city, neighborhood, or address" />
          </View>
          <TouchableOpacity style={styles.mapToggle} onPress={toggleView}>
            <Ionicons name={isMapView ? "list" : "map"} size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity style={styles.filterOption} onPress={toggleModal}>
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

        {/* Bottom Modal Component */}
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Price Range</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Price Inputs */}
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <Text style={styles.rangeLabel}>Min Price</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="No min"
                    value={minPrice.toString()}
                    onChangeText={handleMinPriceChange}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.rangeLabel}>Max Price</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="No max"
                    value={maxPrice.toString()}
                    onChangeText={handleMaxPriceChange}
                />
              </View>
            </View>
            {priceError ? <Text style={styles.maxMinError}>{priceError}</Text> : null}
            <TouchableOpacity style={[styles.closeButton, priceError && {opacity: 0.5}]} onPress={handleApplyFilter} disabled={!!priceError}>
              <Text style={styles.closeButtonText} >View Homes</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#322f2f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0, // Remove default margin
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  rangeLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  maxMinError: {
    color: "#b00505",
    fontWeight: "bold",
    fontSize: 13,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#322f2f",
    borderRadius: 25,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
