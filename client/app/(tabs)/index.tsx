import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  Appbar,
  Text,
  SegmentedButtons,
  TouchableRipple,
} from "react-native-paper";

export default function Home() {
  const [value, setValue] = useState("");
  const segmentaView = [
    { label: "Map", value: "map" },
    { label: "List", value: "list" },
  ];
  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          paddingVertical: 10,
          backgroundColor: "#56475e",
          zIndex: 1,
        }}
      >
        {/* Search Field and Sort Icon */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="Type something" style={styles.searchField} />
          <Appbar.Action
            icon="sort"
            style={{ marginRight: 8, backgroundColor: "#fff" }}
            onPress={() => {}}
          />
        </View>

        {/* Tabs for Map and List */}
        <View style={styles.tabContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={segmentaView}
          />
        </View>
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  searchField: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    gap: 20,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
