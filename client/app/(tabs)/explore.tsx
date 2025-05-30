import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, TextInput, FlatList, Animated } from "react-native";
import { Appbar, SegmentedButtons, Badge } from "react-native-paper";
import PropertyCard from "@/components/blocks/PropertyCard";
import ExploreMapView from "@/components/Maps/ExploreMapview";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { properties } from "@/shared/data/property";
import { useThemeStore } from "@/stores/useTheme";
import SortModal from "@/components/overlays/SortModal";

export default function Explore() {
  const [value, setValue] = useState("map");
  const [search, setSearch] = useState("");
  const [sortVisible, setSortVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const { colors } = useThemeStore();
  const showSort = () => setSortVisible(true);
  const hideSort = () => setSortVisible(false);

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
              <PropertyCard
                property={item}
                onPress={() => {
                  router.push(`/property/${item.property_id}`);
                }}
              />
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header
        style={[styles.appHeader, { backgroundColor: colors.headerBackground }]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for a property"
              style={[styles.searchField, { backgroundColor: colors.white }]}
              value={search}
              onChangeText={(newSearch) => setSearch(newSearch)}
            />
            <MaterialIcons
              name="search"
              size={24}
              color={colors.icon}
              style={styles.searchIcon}
            />
            {search && (
              <MaterialIcons
                name="clear"
                size={24}
                color={colors.white}
                style={[styles.clearIcon, { backgroundColor: colors.info }]}
                onPress={() => setSearch("")}
              />
            )}
          </View>
          <View style={{ position: "relative" }}>
            <Badge style={[styles.badge, { backgroundColor: colors.error }]}>
              3
            </Badge>
            <Appbar.Action
              icon="bell"
              style={[styles.sortBtn, { backgroundColor: colors.white }]}
              onPress={() => {}}
            />
          </View>
          <Appbar.Action
            icon="sort-variant"
            style={[styles.sortBtn, { backgroundColor: colors.white }]}
            onPress={showSort}
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
          theme={{
            colors: {
              primary: colors.primary,
              onPrimary: colors.white,
              secondaryContainer: colors.chipBackground,
            },
          }}
        />
      </Animated.View>

      {renderContent()}
      <SortModal visible={sortVisible} onClose={hideSort} />
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
    top: 8,
    left: 5,
    fontSize: 27,
  },
  clearIcon: {
    position: "absolute",
    top: 11,
    right: 15,
    fontSize: 14,
    padding: 2,
    borderRadius: 20,
  },
  searchField: {
    flex: 1,
    borderRadius: 50,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 34,
    height: 40,
    fontSize: 15,
  },
  sortBtn: {
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
  badge: {
    position: "absolute",
    top: -1,
    right: -1,
    zIndex: 2,
  },
});
