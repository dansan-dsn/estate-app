import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";

// Define the Property type
interface Property {
  id: string;
  name: string;
  price: number;
  location: string;
  image: any; // Use `ImageSourcePropType` if you import it from 'react-native'
  status?: string;
}

// Define the root stack type
type RootStackParamList = {
  Explore: undefined;
  PropertyDetails: { Property: Property };
  // Add other screens here
};

// Define the navigation prop type
type ExploreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Explore"
>;

const properties: Property[] = [
  {
    id: "1",
    name: "Luxury Apartment",
    price: 1200000,
    location: "New York, NY",
    image: require("../assets/estate.jpg"),
    status: "Pending",
  },
  {
    id: "2",
    name: "Modern Villa",
    price: 2500000,
    location: "Los Angeles, CA",
    image: require("../assets/estate.jpg"),
    status: "Sold",
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
        <View style={styles.mapView}>
          <Text>Map View Placeholder</Text>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef",
  },
});

export default ExploreScreen;
