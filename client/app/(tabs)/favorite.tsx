import { useRef, useMemo } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, Animated, FlatList } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { properties } from "@/shared/data/property";
import PropertyCard from "@/components/blocks/PropertyCard";
import { useThemeStore } from "@/stores/useTheme";
import { useFavoriteStore } from "@/stores/favorites";

const Favorite = () => {
  const flatListRef = useRef<FlatList>(null);

  const router = useRouter();
  const { colors } = useThemeStore();
  const { favorites } = useFavoriteStore();

  const favoritesProperty = useMemo(() => {
    return properties.filter((p) => favorites.includes(Number(p?.property_id)));
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Appbar.Header
        elevated
        style={{ backgroundColor: colors.headerBackground }}
      >
        <Appbar.Content
          title="Favorites"
          color="white"
          style={{
            alignItems: "center",
          }}
        />
      </Appbar.Header>
      <Animated.FlatList
        ref={flatListRef}
        data={favoritesProperty}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => {
              router.push(`/property/${item.property_id}`);
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.noContainer}>
            <Text variant="displayMedium" style={styles.emoji}>
              💔
            </Text>
            <Text variant="titleLarge" style={styles.title}>
              No Favorites Yet
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Tap the <Text style={styles.heart}>♥</Text> on any property to add
              it to your favorites.
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => router.push("/explore")}
              icon="magnify"
              labelStyle={{ fontWeight: "bold" }}
            >
              Explore Properties
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  noContainer: {
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 20,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
  },
  emoji: {
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
    marginBottom: 18,
  },
  heart: {
    color: "#e53935",
    fontWeight: "bold",
  },
  button: {
    marginTop: 8,
    width: "80%",
    borderRadius: 25,
  },
});

export default Favorite;
