import React from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function SectionTitle({
  title,
  colors,
  isSubsection = false,
}: {
  title: string;
  colors: any;
  isSubsection?: boolean;
}) {
  return (
    <Text
      style={[
        isSubsection
          ? { fontSize: 17, fontWeight: "600", marginBottom: 12 }
          : { fontSize: 20, fontWeight: "700", marginBottom: 16 },
        { color: colors.primaryDark },
      ]}
    >
      {title}
    </Text>
  );
}

export function OverviewSection({
  property,
  colors,
  styles,
}: {
  property: any;
  colors: any;
  styles: any;
}) {
  return (
    <>
      <View style={styles.overviewHeader}>
        <Text style={[styles.price, { color: colors.primaryDark }]}>
          ${property.price.toLocaleString()}{" "}
          <Text style={{ fontSize: 16, color: colors.textSecondary }}>
            {property.currency}
          </Text>
        </Text>
        <Chip
          style={{
            backgroundColor:
              property.status === "available"
                ? colors.success
                : property.status === "sold"
                ? colors.error
                : colors.warning,
          }}
          textStyle={{ color: colors.white, fontWeight: "bold" }}
        >
          {property.status.toUpperCase()}
        </Chip>
      </View>
      <Text style={[styles.addressText, { color: colors.textSecondary }]}>
        {property.address?.street}, {property.address?.city},{" "}
        {property.address?.state} {property.address?.postal_code}
      </Text>

      <View style={styles.dividerLine} />

      <View style={styles.quickFacts}>
        <QuickFact
          icon="home"
          label="Type"
          value={property.type}
          colors={colors}
        />
        <QuickFact
          icon="king-bed"
          label="Bedrooms"
          value={property.features?.bedrooms ?? ""}
          colors={colors}
        />
        <QuickFact
          icon="bathtub"
          label="Bathrooms"
          value={property.features?.bathrooms ?? ""}
          colors={colors}
        />
        <QuickFact
          icon="square-foot"
          label="Area"
          value={`${property.features?.floor_area || 0} sqft`}
          colors={colors}
        />
      </View>
    </>
  );
}

export function FeaturesSection({
  property,
  colors,
  styles,
}: {
  property: any;
  colors: any;
  styles: any;
}) {
  return (
    <>
      <View style={styles.featuresGrid}>
        <FeatureCard
          icon="straighten"
          label="Plot Size"
          value={`${property.features.plot_size} sqft`}
          colors={colors}
        />
        {property.features.floors && (
          <FeatureCard
            icon="layers"
            label="Floors"
            value={property.features.floors}
            colors={colors}
          />
        )}
        {property.features.garage?.spaces && (
          <FeatureCard
            icon="garage"
            label="Garage"
            value={`${property.features.garage.spaces} (${property.features.garage.type})`}
            colors={colors}
          />
        )}
        <FeatureCard
          icon="calendar-today"
          label="Year Built"
          value={property.year_built ?? ""}
          colors={colors}
        />
      </View>
      {property.features.additional_spaces &&
        property.features.additional_spaces.length > 0 && (
          <>
            <SectionTitle
              title="Additional Spaces"
              colors={colors}
              isSubsection
            />
            <View style={styles.amenitiesContainer}>
              {property.features.additional_spaces.map(
                (space: string, idx: number) => (
                  <Chip
                    key={idx}
                    style={[
                      styles.amenityChip,
                      { backgroundColor: colors.chipBackground },
                    ]}
                    textStyle={[
                      styles.amenityText,
                      { color: colors.primaryDark },
                    ]}
                  >
                    {space}
                  </Chip>
                )
              )}
            </View>
          </>
        )}
      {property.features.amenities && (
        <>
          <SectionTitle title="Amenities" colors={colors} isSubsection />
          <View style={styles.amenitiesContainer}>
            {property.features.amenities.map(
              (amenity: string, index: number) => (
                <Chip
                  key={index}
                  style={[
                    styles.amenityChip,
                    { backgroundColor: colors.chipBackground },
                  ]}
                  textStyle={[
                    styles.amenityText,
                    { color: colors.primaryDark },
                  ]}
                >
                  {amenity}
                </Chip>
              )
            )}
          </View>
        </>
      )}
    </>
  );
}

export function QuickFact({
  icon,
  label,
  value,
  colors,
}: {
  icon: string;
  label: string;
  value: string | number;
  colors: any;
}) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <MaterialIcons name={icon as any} size={20} color={colors.primary} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginTop: 8,
          color: colors.primaryDark,
        }}
      >
        {value}
      </Text>
      <Text style={{ fontSize: 12, marginTop: 4, color: colors.textSecondary }}>
        {label}
      </Text>
    </View>
  );
}

export function FeatureCard({
  icon,
  label,
  value,
  colors,
}: {
  icon: string;
  label: string;
  value: string | number;
  colors: any;
}) {
  return (
    <View
      style={{
        width: "48%",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: colors.cardBackground,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <MaterialIcons name={icon as any} size={24} color={colors.primary} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginVertical: 8,
          color: colors.primaryDark,
        }}
      >
        {value}
      </Text>
      <Text style={{ fontSize: 13, color: colors.textSecondary }}>{label}</Text>
    </View>
  );
}
