import { useLocalSearchParams, useNavigation } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { properties } from '@/shared/data/property';
import { useRef, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeStore } from '@/stores/useTheme';
import { useFavoriteStore } from '@/stores/favorites';
import { useSnackbar } from '@/stores/snackbar';
import {
  SectionTitle,
  OverviewSection,
  FeaturesSection,
} from '@/components/blocks/property/PropertyDetailSections';

const { width: screenWidth } = Dimensions.get('window');
const IMAGE_HEIGHT = 380;
const HEADER_HEIGHT = 90;

export default function PropertyDetails() {
  const { propertyId } = useLocalSearchParams();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { colors } = useThemeStore();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const { showSnackbar } = useSnackbar();

  const property = properties.find(
    (p) => p && String(p.property_id) === String(propertyId)
  );

  if (!property) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          Property not found
        </Text>
      </View>
    );
  }

  const favorite = Boolean(isFavorite(Number(property.property_id)));
  const onFavoritePress = () => {
    toggleFavorite(Number(property.property_id));
    showSnackbar(
      favorite ? 'Removed from favorites' : 'Added to favorites',
      colors.black
    );
  };

  // Header animations
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 0],
    extrapolate: 'clamp',
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.6, IMAGE_HEIGHT * 0.8],
    outputRange: [0, 0.3, 1],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.5, IMAGE_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
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
            backgroundColor: colors.headerBackground,
            shadowColor: colors.primaryDark,
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
            style={[
              styles.iconButton,
              { backgroundColor: colors.iconActive + '33' },
            ]}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.headerTint}
            />
          </TouchableOpacity>

          <Animated.Text
            style={[
              styles.propertyTitle,
              { opacity: headerTitleOpacity, color: colors.headerText },
            ]}
            numberOfLines={1}
          >
            {property.title}
          </Animated.Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.iconActive + '33' },
              ]}
              onPress={onFavoritePress}
            >
              <MaterialIcons
                name={favorite ? 'favorite' : 'favorite-border'}
                size={24}
                color={favorite ? colors.error : colors.headerTint}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.iconActive + '33' },
              ]}
            >
              <MaterialIcons name="share" size={24} color={colors.headerTint} />
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
            style={[
              styles.carouselContainer,
              { opacity: imageOpacity, backgroundColor: colors.black },
            ]}
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
              style={[
                styles.imageIndicator,
                { backgroundColor: colors.overlay },
              ]}
            >
              {property.media.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    { backgroundColor: colors.white + '66' },
                    currentImageIndex === index && [
                      styles.activeDot,
                      { backgroundColor: colors.primary },
                    ],
                  ]}
                />
              ))}
            </View>
          </Animated.View>
        )}

        <View style={{ height: HEADER_HEIGHT }} />

        <View style={styles.mainContent}>
          <View
            style={[
              styles.section,
              { backgroundColor: colors.surface, shadowColor: colors.black },
            ]}
          >
            <OverviewSection
              property={property}
              colors={colors}
              styles={styles}
            />
          </View>

          {/* VIDEO SECTION */}
          {property.media?.videos && property.media.videos.length > 0 && (
            <View
              style={[
                styles.section,
                { backgroundColor: colors.surface, shadowColor: colors.black },
              ]}
            >
              <SectionTitle title="Property Tour" colors={colors} />
              {property.media.videos.map((video, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => Linking.openURL(video.url)}
                >
                  <View
                    style={[
                      styles.videoContainer,
                      { backgroundColor: colors.black },
                    ]}
                  >
                    <MaterialIcons
                      name="play-circle-outline"
                      size={48}
                      color={colors.white}
                    />
                    <Text
                      style={[styles.videoCaption, { color: colors.white }]}
                    >
                      {video.caption}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Description Section */}
          <View
            style={[
              styles.section,
              { backgroundColor: colors.surface, shadowColor: colors.black },
            ]}
          >
            <SectionTitle title="Description" colors={colors} />
            <Text
              style={[styles.descriptionText, { color: colors.textSecondary }]}
            >
              {property.description}
            </Text>
          </View>

          {/* Features Section */}
          {property.features && (
            <View
              style={[
                styles.section,
                { backgroundColor: colors.surface, shadowColor: colors.black },
              ]}
            >
              <SectionTitle title="Property Features" colors={colors} />
              <FeaturesSection
                property={property}
                colors={colors}
                styles={styles}
              />
            </View>
          )}

          {/* Location Section */}
          {property.address?.coordinates && (
            <View
              style={[
                styles.section,
                { backgroundColor: colors.surface, shadowColor: colors.black },
              ]}
            >
              <SectionTitle title="Location" colors={colors} />
              <View
                style={[
                  styles.mapPlaceholder,
                  { backgroundColor: colors.surfaceVariant },
                ]}
              >
                <Text style={{ color: colors.textSecondary }}>
                  Map would be displayed here
                </Text>
              </View>
              <View style={styles.locationDetails}>
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color={colors.primary}
                />
                <Text
                  style={[styles.locationText, { color: colors.textSecondary }]}
                >
                  {property.address.street}, {property.address.city},{' '}
                  {property.address.state} {property.address.postal_code}
                </Text>
              </View>
              {property.address.neighborhood && (
                <View style={styles.locationDetailRow}>
                  <MaterialIcons
                    name="people"
                    size={18}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.locationDetailText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Neighborhood: {property.address.neighborhood}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Contact Section */}
          {property.listing_agent && (
            <View
              style={[
                styles.section,
                { backgroundColor: colors.surface, shadowColor: colors.black },
              ]}
            >
              <SectionTitle title="Listing Agent" colors={colors} />
              <View style={styles.agentInfo}>
                <View style={styles.agentDetail}>
                  <MaterialIcons
                    name="business"
                    size={18}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[styles.agentText, { color: colors.textSecondary }]}
                  >
                    {property.listing_agent.agency}
                  </Text>
                </View>
                <View style={styles.agentDetail}>
                  <MaterialIcons
                    name="call"
                    size={18}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[styles.agentText, { color: colors.textSecondary }]}
                  >
                    {property.listing_agent.contact}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Contact Button */}
          <TouchableOpacity
            style={[
              styles.contactButton,
              { backgroundColor: colors.primary, shadowColor: colors.primary },
            ]}
            onPress={() =>
              property.listing_agent?.contact &&
              Linking.openURL(`mailto:${property.listing_agent.contact}`)
            }
          >
            <MaterialIcons name="mail" size={24} color={colors.white} />
            <Text style={[styles.contactButtonText, { color: colors.white }]}>
              Contact Agent
            </Text>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.white}
            />
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: '100%',
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginHorizontal: 12,
  },
  iconButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    paddingBottom: 30,
  },
  mainContent: {
    paddingHorizontal: 16,
  },
  carouselContainer: {
    height: IMAGE_HEIGHT,
  },
  mainImage: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
  },
  dividerLine: {
    height: 1,
    marginVertical: 16,
  },
  quickFacts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickFact: {
    alignItems: 'center',
    flex: 1,
  },
  quickFactValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  quickFactLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  videoContainer: {
    height: 180,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  videoCaption: {
    marginTop: 8,
    fontSize: 14,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  featureCard: {
    width: '48%',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureCardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  featureCardLabel: {
    fontSize: 13,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 13,
    fontWeight: '500',
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 15,
  },
  locationDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationDetailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  agentInfo: {
    marginTop: 8,
  },
  agentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  agentText: {
    marginLeft: 8,
    fontSize: 15,
  },
  contactButton: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 30,
  },
  contactButtonText: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
