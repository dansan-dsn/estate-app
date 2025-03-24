import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

const BedBathFilter = ({ beds, baths, setBeds, setBaths, onApplyFilter }) => {
  const bottomSheetRef = useRef();

  const handleBedsChange = (value) => {
    setBeds(value);
  };

  const handleBathsChange = (value) => {
    setBaths(value);
  };

  const handleApplyFilter = () => {
    bottomSheetRef.current.close(); // Close the bottom sheet when applying the filter
    onApplyFilter(beds, baths); // Trigger the filter application
  };

  return (
    <View>
      <TouchableOpacity style={styles.filterOption} onPress={() => bottomSheetRef.current.open()}>
        <Text>Bed & Bath</Text>
      </TouchableOpacity>

      {/* Raw Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={230}
        openDuration={250}
        closeOnPressBack={true}
        closeOnPressMask={true}
        draggableIcon={null}
        customStyles={{
          container: {
            ...styles.modalContent,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Bed & Bath Filters</Text>
          <TouchableOpacity onPress={() => bottomSheetRef.current.close()}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Bed & Bath Inputs */}
        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <Text style={styles.rangeLabel}>Beds</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              placeholder="Enter number of beds"
              value={beds ? beds.toString() : ""}
              onChangeText={handleBedsChange}
            />
            {beds && (
              <Ionicons
                name="close-circle"
                size={20}
                color="#888"
                style={styles.closeIcon}
                onPress={() => setBeds("")}
              />
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.rangeLabel}>Baths</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              placeholder="Enter number of baths"
              value={baths ? baths.toString() : ""}
              onChangeText={handleBathsChange}
            />
            {baths && (
              <Ionicons
                name="close-circle"
                size={20}
                color="#888"
                style={styles.closeIcon}
                onPress={() => setBaths("")}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.closeButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default BedBathFilter;

const styles = StyleSheet.create({
  filterOption: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
  },
  modalContent: {
    backgroundColor: "white", // Set this to white for the content, not transparent
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
    position: "relative",
    flex: 1,
    marginHorizontal: 5,
  },
  closeIcon: {
    position: "absolute",
    bottom: 10,
    right: 0,
    marginRight: 5,
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
    paddingRight: 27,
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
