import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const IMAGE_SIZE = 90;

export default function PropertyCardHorizontal({
  property,
  onPress,
  onRemove,
  colors,
}: {
  property: any;
  onPress: () => void;
  onRemove: () => void;
  colors: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={property.media?.images?.[0]?.url}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>
          {property.title}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${property.price.toLocaleString()}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Type:
          </Text>
          <Text style={[styles.value, { color: colors.textTertiary }]}>
            {property.type}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Bedrooms:{" "}
          </Text>
          <Text style={[styles.value, { color: colors.textTertiary }]}>
            {property.features?.bedrooms}
          </Text>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {" "}
            Bathrooms:{" "}
          </Text>
          <Text style={[styles.value, { color: colors.textTertiary }]}>
            {property.features?.bathrooms}
          </Text>
        </View>
        <View style={styles.row}>
          <View
            style={{
              backgroundColor:
                property.status === "available"
                  ? colors.success
                  : property.status === "sold"
                  ? colors.error
                  : colors.warning,
              borderRadius: 999,
              paddingHorizontal: 8,
              paddingVertical: 2,
              minWidth: 36,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
              height: 18,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                fontSize: 10,
                lineHeight: 14,
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              {property.status.toUpperCase()}
            </Text>
          </View>

          <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
            <MaterialIcons name="favorite" size={20} color={colors.error} />
            <Text style={[styles.removeText, { color: colors.error }]}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 6,
    alignItems: "center",
    minHeight: IMAGE_SIZE + 20,
    padding: 10,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 2,
  },
  price: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    flexWrap: "wrap",
    gap: 6,
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
  },
  value: {
    fontSize: 13,
    color: "#222",
    marginRight: 10,
  },
  removeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    backgroundColor: "#f8d7da",
    borderRadius: 12,
  },
  removeText: {
    fontSize: 12,
    marginLeft: 3,
    fontWeight: "600",
  },
});
