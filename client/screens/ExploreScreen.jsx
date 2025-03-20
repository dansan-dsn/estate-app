import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
    ScrollView,
    RefreshControl
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import PropertyCard from "../components/property/PropertyCard";
import MapView, { Marker } from "react-native-maps";
import { propertyData } from "../utils/properties";
// import { RefreshContext } from "../context/RefreshContext";

const ExploreScreen = () => {
  const navigation = useNavigation();
  // const { refreshing, onRefresh } = useContext(RefreshContext);

  const [isMapView, setIsMapView] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const properties = propertyData;

  // Use useEffect to update filtered properties when data is available
  const [priceFilteredProperties, setPriceFilteredProperties] = useState([]);

  useEffect(() => {
    if (properties.length > 0) {
      setPriceFilteredProperties(properties);
    }
  }, [properties]); // Update when properties change

  const toggleMapView = () => {
    setIsMapView(!isMapView);
  };

  const handleNavigate = (property) => {
    navigation.navigate("PropertyDetails", { Property: property });
  };

  // Apply filtering logic
  const applyFilter = (minPrice, maxPrice) => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const filtered = properties.filter(
      (property) => property.price >= min && property.price <= max
    );
    setPriceFilteredProperties(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      //     // refreshControl={
      //   // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
      <Header
        isMapView={isMapView}
        toggleView={toggleMapView}
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceError={priceError}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setPriceError={setPriceError}
        onApplyFilter={applyFilter}
      />
      {priceFilteredProperties.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Image
            source={require("../assets/images/no-data.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.noProperty}>No Property found</Text>
          <TouchableOpacity>
            <Text style={styles.searchProperty}>Search Properties</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {isMapView ? (
            <MapView
              style={styles.mapView}
              initialRegion={{
                latitude: properties[0]?.latitude || 37.7749,
                longitude: properties[0]?.longitude || -122.4194,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {priceFilteredProperties.map((property) => (
                <Marker
                  key={property.id}
                  coordinate={{
                    latitude: property.latitude,
                    longitude: property.longitude,
                  }}
                  title={property.name}
                  description={property.location}
                />
              ))}
            </MapView>
          ) : (
            <FlatList
              data={priceFilteredProperties}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PropertyCard
                  item={item}
                  onPress={() => handleNavigate(item)}
                />
              )}
            />
          )}
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapView: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain", // Ensures image is well-suited for the screen
  },
  noProperty: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
    fontFamily: "Poppins", // Same font family for consistency
    marginBottom: 10,
  },
  searchProperty: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff", // Dark gray color
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginTop: 5,
    backgroundColor: "#322f2f",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});

export default ExploreScreen;
