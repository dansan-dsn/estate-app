import React, { useState, useContext, useEffect } from "react";
import { View, FlatList, StyleSheet, Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../components/Header";
import PropertyCard from "../components/property/PropertyCard";
import MapView, { Marker } from "react-native-maps";
import { DataContext } from "../context/DataContext";

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

const ExploreScreen = () => {
  const context = useContext(DataContext);

  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { data, isRefreshing, fetchData } = context;
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const [isMapView, setIsMapView] = useState(false);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [priceError, setPriceError] = useState<string>("");

  // Ensure properties are correctly typed
  const properties: Property[] = (data as unknown as Property[]) || [];

  // Use useEffect to update filtered properties when data is available
  const [priceFilteredProperties, setPriceFilteredProperties] = useState<
    Property[]
  >([]);

  useEffect(() => {
    if (properties.length > 0) {
      setPriceFilteredProperties(properties);
    }
  }, [properties]); // Update when properties change

  const toggleMapView = () => {
    setIsMapView(!isMapView);
  };

  const handleNavigate = (Property: Property) => {
    navigation.navigate("PropertyDetails", { Property });
  };

  // Apply filtering logic
  const applyFilter = (
    minPrice: number | string,
    maxPrice: number | string
  ) => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const filtered = properties.filter(
      (property) => property.price >= min && property.price <= max
    );
    setPriceFilteredProperties(filtered);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.noResultsText}>
            No properties available for this price range
          </Text>
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
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={fetchData}
                />
              }
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
