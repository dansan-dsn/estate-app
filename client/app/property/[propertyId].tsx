import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Chip, Divider } from "react-native-paper";
import { properties } from "@/shared/data/property";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/stores/useTheme";

const { width: screenWidth } = Dimensions.get("window");
const IMAGE_HEIGHT = 350;
const HEADER_HEIGHT = 100;

export default function PropertyDetails() {
  const { propertyId } = useLocalSearchParams();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { colors } = useThemeStore();

  const property = properties.find(
    (p) => p && String(p.property_id) === String(propertyId)
  );

  if (!property) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.secondaryText }]}>
          Property not found
        </Text>
      </View>
    );
  }

  // Header animations
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.6, IMAGE_HEIGHT * 0.8],
    outputRange: [0, 0.3, 1],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.5, IMAGE_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentImageIndex(index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Background */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            opacity: headerBackgroundOpacity,
            transform: [{ translateY: headerTranslateY }],
            backgroundColor: colors.primaryDark,
          },
        ]}
      />

      {/* Header Content */}
      <Animated.View
        style={[
          styles.headerContent,
          {
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <View style={styles.headerInner}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <Animated.Text
            style={[
              styles.propertyTitle,
              { opacity: headerTitleOpacity, color: colors.white },
            ]}
            numberOfLines={1}
          >
            {property.title}
          </Animated.Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? colors.error : colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Property Content */}
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Slider */}
        {property.media?.images && property.media.images.length > 0 && (
          <Animated.View
            style={[styles.carouselContainer, { opacity: imageOpacity }]}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {property.media.images.map((image, index) => (
                <Image
                  key={index}
                  source={image.url}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <View
              style={[styles.imageIndicator, { backgroundColor: "#00000080" }]}
            >
              {property.media.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    { backgroundColor: colors.white + "66" },
                    currentImageIndex === index && [
                      styles.activeDot,
                      { backgroundColor: colors.white },
                    ],
                  ]}
                />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Spacer for sticky header */}
        <View style={{ height: HEADER_HEIGHT }} />

        {/* Overview Section */}
        <View style={[styles.section, { backgroundColor: colors.white }]}>
          <View style={styles.overviewHeader}>
            <Text style={[styles.price, { color: colors.primaryDark }]}>
              ${property.price.toLocaleString()}
            </Text>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: colors.chipBackground },
              ]}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={20}
                color={isFavorite ? colors.error : colors.secondaryText}
              />
              <Text
                style={[styles.saveButtonText, { color: colors.secondaryText }]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.addressText, { color: colors.secondaryText }]}>
            {property.address?.street}, {property.address?.city},{" "}
            {property.address?.state} {property.address?.postal_code}
          </Text>
          <View style={styles.chipContainer}>
            <Chip
              icon={() => (
                <Ionicons name="home" size={16} color={colors.primary} />
              )}
              style={[styles.chip, { backgroundColor: colors.chipBackground }]}
              textStyle={[styles.chipText, { color: colors.primaryDark }]}
            >
              {property.type}
            </Chip>
            <Chip
              icon={() => (
                <Ionicons name="calendar" size={16} color={colors.primary} />
              )}
              style={[styles.chip, { backgroundColor: colors.chipBackground }]}
              textStyle={[styles.chipText, { color: colors.primaryDark }]}
            >
              Built: {property.year_built}
            </Chip>
          </View>
        </View>

        <Divider
          style={[styles.divider, { backgroundColor: colors.divider }]}
        />

        {/* Features Section */}
        {property.features && (
          <View style={[styles.section, { backgroundColor: colors.white }]}>
            <Text style={[styles.sectionTitle, { color: colors.primaryDark }]}>
              Property Details
            </Text>
            <View style={styles.featuresGrid}>
              <View
                style={[
                  styles.featureItem,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Ionicons name="bed" size={28} color={colors.primary} />
                <Text
                  style={[styles.featureValue, { color: colors.primaryDark }]}
                >
                  {property.features.bedrooms}
                </Text>
                <Text
                  style={[styles.featureLabel, { color: colors.secondaryText }]}
                >
                  Bedrooms
                </Text>
              </View>
              <View
                style={[
                  styles.featureItem,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Ionicons name="water" size={28} color={colors.primary} />
                <Text
                  style={[styles.featureValue, { color: colors.primaryDark }]}
                >
                  {property.features.bathrooms}
                </Text>
                <Text
                  style={[styles.featureLabel, { color: colors.secondaryText }]}
                >
                  Bathrooms
                </Text>
              </View>
              <View
                style={[
                  styles.featureItem,
                  { backgroundColor: colors.cardBackground },
                ]}
              >
                <Ionicons name="expand" size={28} color={colors.primary} />
                <Text
                  style={[styles.featureValue, { color: colors.primaryDark }]}
                >
                  {property.features.floor_area} sqft
                </Text>
                <Text
                  style={[styles.featureLabel, { color: colors.secondaryText }]}
                >
                  Area
                </Text>
              </View>
              {property.features.garage?.spaces && (
                <View
                  style={[
                    styles.featureItem,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Ionicons name="car" size={28} color={colors.primary} />
                  <Text
                    style={[styles.featureValue, { color: colors.primaryDark }]}
                  >
                    {property.features.garage.spaces}
                  </Text>
                  <Text
                    style={[
                      styles.featureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Garage
                  </Text>
                </View>
              )}
            </View>

            {property.features.amenities && (
              <>
                <Text
                  style={[
                    styles.subSectionTitle,
                    { color: colors.primaryDark },
                  ]}
                >
                  Amenities
                </Text>
                <View style={styles.amenitiesContainer}>
                  {property.features.amenities.map((amenity, index) => (
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
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        <Divider
          style={[styles.divider, { backgroundColor: colors.divider }]}
        />

        {/* Description Section */}
        <View style={[styles.section, { backgroundColor: colors.white }]}>
          <Text style={[styles.sectionTitle, { color: colors.primaryDark }]}>
            Description
          </Text>
          <Text
            style={[styles.descriptionText, { color: colors.secondaryText }]}
          >
            {property.description}
          </Text>
        </View>

        {/* Contact Section */}
        <View style={[styles.section, { backgroundColor: colors.white }]}>
          <TouchableOpacity
            style={[
              styles.contactButton,
              { backgroundColor: colors.primary, shadowColor: colors.primary },
            ]}
          >
            <Ionicons name="mail" size={24} color={colors.white} />
            <Text style={[styles.contactButtonText, { color: colors.white }]}>
              Contact Agent
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "100%",
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    flex: 1,
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  headerActions: {
    flexDirection: "row",
  },
  content: {
    paddingBottom: 80,
  },
  carouselContainer: {
    height: IMAGE_HEIGHT,
    backgroundColor: "#000",
  },
  mainImage: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
  },
  imageIndicator: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 32,
    fontWeight: "800",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 16,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenityChip: {
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  featureItem: {
    width: "47%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureValue: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    marginVertical: 12,
    height: 1,
  },
  contactButton: {
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  contactButtonText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
});
