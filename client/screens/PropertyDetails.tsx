import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";

type PropertyDetailsRouteProp = RouteProp<
  RootStackParamList,
  "PropertyDetails"
>;

const PropertyDetails = () => {
  const route = useRoute<PropertyDetailsRouteProp>();
  const { Property } = route.params; // Get passed property data

  return (
    <View style={styles.container}>
      <Image source={Property.image} style={styles.image} />
      <Text style={styles.title}>{Property.name}</Text>
      <Text style={styles.price}>${Property.price.toLocaleString()}</Text>
      <Text style={styles.location}>{Property.location}</Text>
      <Text style={styles.status}>
        Status: {Property.status ?? "Available"}
      </Text>
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 18, color: "green", marginBottom: 8 },
  location: { fontSize: 16, color: "gray", marginBottom: 8 },
  status: { fontSize: 16, fontWeight: "bold", color: "blue" },
});
