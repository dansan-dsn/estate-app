import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  Text,
} from "react-native";
import { Appbar, SegmentedButtons, Badge } from "react-native-paper";
import PropertyCard from "@/components/blocks/property/PropertyCard";
import ExploreMapView from "@/components/Maps/ExploreMapview";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { properties } from "@/shared/data/property";
import { useThemeStore } from "@/stores/useTheme";
import SortModal, { PropertyFilters } from "@/components/overlays/SortModal";
import {
  PRICE_MAX,
  PRICE_MIN,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_DATE,
  PROPERTY_BATH,
  PROPERTY_BED,
} from "@/constants/property";
import { useNotification } from "@/stores/notifications";

const defaultFilters: PropertyFilters = {
  min: PRICE_MIN,
  max: PRICE_MAX,
  propertyType: PROPERTY_TYPE_OPTIONS[0].value,
  beds: PROPERTY_BED[0].value,
  baths: PROPERTY_BATH[0].value,
  date: PROPERTY_DATE[0].date,
};

const Explore = () => {
  const [value, setValue] = useState("map");
  const [search, setSearch] = useState("");
  const [sortVisible, setSortVisible] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const router = useRouter();
  const { getUnreadCount } = useNotification();
  const { colors } = useThemeStore();

  const filteredProperties = properties.filter((item) => {
    if (!item) return false;
    const priceOk = item.price >= filters.min && item.price <= filters.max;
    const typeOk =
      filters.propertyType === "Any" || item.type === filters.propertyType;
    const bedsOk =
      filters.beds === "Any" ||
      item.features?.bedrooms.toString() === filters.beds;
    const bathsOk =
      filters.baths === "Any" ||
      item.features?.bathrooms.toString() === filters.baths;
    const searchOk =
      !search ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.type?.toLowerCase().includes(search.toLowerCase());
    item.address?.city?.toLowerCase().includes(search.toLowerCase()) ||
      item.address?.state?.toLowerCase().includes(search.toLowerCase()) ||
      item.address?.country?.toLowerCase().includes(search.toLowerCase());

    return priceOk && typeOk && bedsOk && bathsOk && searchOk;
  });

  const segmentaView = [
    {
      label: "Map",
      value: "map",
      labelStyle:
        value === "map"
          ? { color: colors.segmentActiveText }
          : { color: colors.segmentText },
      style: {
        backgroundColor:
          value === "map"
            ? colors.segmentActiveBackground
            : colors.segmentBackground,
        borderWidth: 0,
        borderColor: "transparent",
        elevation: 4,
        shadowColor: "black",
      },
    },
    {
      label: "List",
      value: "list",
      labelStyle:
        value === "list"
          ? { color: colors.segmentActiveText }
          : { color: colors.segmentText },
      style: {
        backgroundColor:
          value === "list"
            ? colors.segmentActiveBackground
            : colors.segmentBackground,
        borderWidth: 0,
        borderColor: "transparent",
        elevation: 4,
        shadowColor: "black",
      },
    },
  ];

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const renderContent = () => {
    switch (value) {
      case "map":
        return <ExploreMapView />;
      // return <Text>Hello</Text>;
      case "list":
        return (
          <Animated.FlatList
            ref={flatListRef}
            data={filteredProperties}
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
            ListEmptyComponent={
              <View style={{ padding: 40, alignItems: "center", opacity: 0.8 }}>
                <MaterialIcons
                  name="search-off"
                  size={64}
                  color={colors.text}
                />
                <Text
                  style={{
                    marginTop: 16,
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  No properties found
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: colors.textSecondary,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Try adjusting your filters or search terms.
                </Text>
              </View>
            }
          />
        );
      default:
        return null;
    }
  };

  const unRead = getUnreadCount();

  const activeFilterCount =
    (filters.propertyType !== "Any" ? 1 : 0) +
    (filters.beds !== "Any" ? 1 : 0) +
    (filters.baths !== "Any" ? 1 : 0) +
    (filters.date !== "Any" ? 1 : 0) +
    (filters.min !== PRICE_MIN || filters.max !== PRICE_MAX ? 1 : 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header
        style={[styles.appHeader, { backgroundColor: colors.headerBackground }]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search for a property"
              style={[
                styles.searchField,
                { backgroundColor: colors.surface, color: colors.text },
              ]}
              value={search}
              onChangeText={(newSearch) => setSearch(newSearch)}
              placeholderTextColor={colors.textTertiary}
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
            {unRead > 0 && (
              <Badge style={[styles.badge, { backgroundColor: colors.error }]}>
                {unRead > 99 ? "99+" : unRead}
              </Badge>
            )}
            <Appbar.Action
              icon="bell"
              style={[styles.sortBtn, { backgroundColor: colors.surface }]}
              color={colors.icon}
              onPress={() => {
                router.push("/property/notifications");
              }}
            />
          </View>
          <View style={{ position: "relative" }}>
            {activeFilterCount > 0 && (
              <Badge
                style={[styles.badge, { backgroundColor: colors.success }]}
              >
                {activeFilterCount}
              </Badge>
            )}
            <Appbar.Action
              icon="sort-variant"
              style={[styles.sortBtn, { backgroundColor: colors.surface }]}
              color={colors.icon}
              onPress={() => setSortVisible(true)}
            />
          </View>
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
          style={{ borderWidth: 0, borderColor: "transparent", elevation: 0 }}
        />
      </Animated.View>

      {renderContent()}
      {sortVisible && (
        <SortModal
          visible={sortVisible}
          close={() => setSortVisible(false)}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </View>
  );
};

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

export default Explore;
