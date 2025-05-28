import { useState, useRef } from "react";
import { View, StyleSheet, TextInput, FlatList, Animated } from "react-native";
import { Appbar, SegmentedButtons } from "react-native-paper";
import PropertyCard from "@/components/cards/PropertyCard";
import ExploreMapView from "@/components/Maps/ExploreMapview";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { properties } from "@/shared/data/property";

export default function Home() {
  const [value, setValue] = useState("map");
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const segmentaView = [
    { label: "Map", value: "map" },
    { label: "List", value: "list" },
  ];

  // Animation for hiding segmented buttons on scroll
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const renderContent = () => {
    switch (value) {
      case "map":
        return <ExploreMapView />;
      case "list":
        return (
          <Animated.FlatList
            ref={flatListRef}
            data={properties}
            renderItem={({ item }) => (
              <PropertyCard property={item} onPress={() => {}} />
            )}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.listContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.appHeader]}>
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for a property"
              style={styles.searchField}
              value={search}
              onChangeText={(newSearch) => setSearch(newSearch)}
            />
            <MaterialIcons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            {search && (
              <MaterialIcons
                name="clear"
                size={24}
                color="black"
                style={styles.clearIcon}
                onPress={() => setSearch("")}
              />
            )}
          </View>
          <Appbar.Action
            icon="sort"
            style={styles.sortBtn}
            onPress={() => {}}
          />
        </View>
      </Appbar.Header>

      <Animated.View
        style={[
          styles.tabContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: scrollY.interpolate({
              inputRange: [0, 30],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
            position: "absolute",
            top: 110,
            left: 0,
            right: 0,
            zIndex: 1,
          },
        ]}
      >
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={segmentaView}
        />
      </Animated.View>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Poppins-SemiBold",
  },
  appHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
    backgroundColor: "#a99cb5",
    zIndex: 2,
    elevation: 4,
  },
  headerContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    top: 6,
    left: 5,
    fontSize: 27,
    color: "#49484a",
  },
  clearIcon: {
    position: "absolute",
    top: 9,
    right: 15,
    fontSize: 14,
    backgroundColor: "#463fa6",
    padding: 2,
    borderRadius: 20,
    color: "#fff",
  },
  searchField: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 34,
    height: 40,
    fontSize: 15,
  },
  sortBtn: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 45,
  },
});
