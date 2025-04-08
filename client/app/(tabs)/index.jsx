import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import PropertyCard from "@/components/property/PropertyCard";
import MapView, { Marker } from "react-native-maps";
import { propertyData } from "@/constants/properties";

const ExploreScreen = () => {
  const navigation = useNavigation();

  const [isMapView, setIsMapView] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const properties = propertyData;

  // Use useEffect to update filtered properties when data is available
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
      setFilteredProperties(properties);
  }, [properties]); // Update when properties change

  const toggleMapView = () => {
    setIsMapView(!isMapView);
  };

  const handleNavigate = (property) => {
    navigation.navigate("property-details", { Property: property });
  };

  // Apply filtering logic
  const applyFilter = () => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const bedsFilter = beds ? Number(beds) : 0;
    const bathsFilter = baths ? Number(baths) : 0;

    const filtered = properties.filter(property => {
      const priceMatch = property.price >= min && property.price <= max;
      const bedsMatch = beds ? property.bed >= bedsFilter : true;
      const bathsMatch = baths ? property.bath >= bathsFilter : true;
      return priceMatch && bedsMatch && bathsMatch;
    });

    setFilteredProperties(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        isMapView={isMapView}
        toggleView={toggleMapView}
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceError={priceError}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setPriceError={setPriceError}
        beds={beds}
        baths={baths}
        setBeds={setBeds}
        setBaths={setBaths}
        onApplyFilter={applyFilter}
      />
      {filteredProperties.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Image
            source={require("@/assets/images/no-data.png")}
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
              {filteredProperties.map((property) => (
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
              data={filteredProperties}
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
