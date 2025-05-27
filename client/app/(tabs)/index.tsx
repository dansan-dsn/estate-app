import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  Appbar,
  Card,
  SegmentedButtons,
  Text,
  Button,
} from "react-native-paper";
import MapView from "react-native-maps"; // You'll need to install this

export default function Home() {
  const [value, setValue] = useState("map"); // Default to map view
  const segmentaView = [
    { label: "Map", value: "map" },
    { label: "List", value: "list" },
  ];

  // Render the appropriate view based on selection
  const renderContent = () => {
    switch (value) {
      case "map":
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      case "list":
        return (
          <View style={styles.listContainer}>
            <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" />
              <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          </View>
        );
      default:
        return null;
    }
  };

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
        <View style={styles.searchContainer}>
          <TextInput placeholder="Type something" style={styles.searchField} />
          <Appbar.Action
            icon="sort"
            style={{ marginRight: 8, backgroundColor: "#fff" }}
            onPress={() => {}}
          />
        </View>

        <View style={styles.tabContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={segmentaView}
          />
        </View>
      </Appbar.Header>

      {renderContent()}
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
  map: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
