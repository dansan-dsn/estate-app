import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";
import MapView, { Marker } from "react-native-maps";
import { propertyData } from "../utils/properties";

// Define the Property type
interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bed: number;
  bath: number;
  distance: number;
  broker: string;
  description: string;
  image: any; // Image asset
  status?: string;
}

// Define the root stack type
type RootStackParamList = {
  Explore: undefined;
  PropertyDetails: { Property: Property };
};

// Define the navigation prop type
type ExploreScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Explore"
>;

// Sample properties with latitude and longitude
const properties: Property[] = propertyData;

const ExploreScreen = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const [isMapView, setIsMapView] = useState(false);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties); // Default to all properties

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  const handleNavigate = (Property: Property) => {
    navigation.navigate("PropertyDetails", { Property });
  };

  // This function will be passed to Header to trigger price filtering
  const applyFilter = (minPrice: number | string, maxPrice: number | string) => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const filtered = properties.filter((property) => property.price >= min && property.price <= max);
    setFilteredProperties(filtered); // Apply the filter
  };

  return (
      <View style={styles.container}>
        <Header
            isMapView={isMapView}
            toggleView={toggleView}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceError={priceError}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setPriceError={setPriceError}
            onApplyFilter={applyFilter} // Pass the applyFilter function
        />
        {filteredProperties.length === 0 ? (
            // Show message if no properties match the filter
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No properties available for this price range</Text>
            </View>
        ) : (
            <>
              {isMapView ? (
                  <MapView
                      style={styles.mapView}
                      initialRegion={{
                        latitude: properties[0]?.latitude || 37.7749, // Default to first property or a default location
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
                          <PropertyCard item={item} onPress={() => handleNavigate(item)} />
                      )}
                  />
              )}
            </>
        )}
      </View>
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
});

export default ExploreScreen;
