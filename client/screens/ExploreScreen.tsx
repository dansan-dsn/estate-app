import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";
import MapView, { Marker } from "react-native-maps";

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
const properties: Property[] = [
  {
    id: "1",
    name: "Luxury Apartment",
    price: 1200000,
    location: "New York, NY",
    propertyType: "Villa",
    latitude: 40.7128,
    longitude: -74.006,
    bed: 3,
    bath: 2,
    distance: 10,
    broker: "John Doe",
    description: "A beautiful luxury apartment.",
    image: require("../assets/house3.webp"),
    status: "Pending",
  },
  {
    id: "2",
    name: "Modern Villa",
    price: 2500000,
    location: "Los Angeles, CA",
    propertyType: "Apartment",
    latitude: 34.0522,
    longitude: -118.2437,
    bed: 4,
    bath: 3,
    distance: 15,
    broker: "Jane Smith",
    description: "A spacious and modern villa.",
    image: require("../assets/house2.jpg"),
    status: "For sale",
  },
  {
    id: "3",
    name: "Modern Villa",
    price: 2500000,
    location: "Los Angeles, CA",
    propertyType: "Rentals",
    latitude: 34.0522,
    longitude: -118.2437,
    bed: 4,
    bath: 3,
    distance: 20,
    broker: "Emily Johnson",
    description: "A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.A modern villa with a great view.",
    image: require("../assets/house4.jpg"),
    status: "Rented",
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const [isMapView, setIsMapView] = useState(false);

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  const handleNavigate = (Property: Property) => {
    navigation.navigate("PropertyDetails", { Property });
  };

  return (
    <View style={styles.container}>
      <Header isMapView={isMapView} toggleView={toggleView} />
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
          {properties.map((property) => (
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
          data={properties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard item={item} onPress={() => handleNavigate(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapView: {
    flex: 1,
  },
});

export default ExploreScreen;
