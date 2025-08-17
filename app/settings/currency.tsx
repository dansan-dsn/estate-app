import { StyleSheet, View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Appbar, List, RadioButton, Divider } from "react-native-paper";
import { useCurrencyStore } from "@/stores/currency";
import { useThemeStore } from "@/stores/useTheme";

const CURRENCIES = ["USD", "EUR", "UGX", "JPY", "GBP", "KES", "INR"];

const Currency = () => {
  const { colors } = useThemeStore();
  const router = useRouter();
  const { currency, setCurrency } = useCurrencyStore();

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = currency === item;

    return (
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelected
              ? colors.tabFocusedBackground
              : colors.surface,
            borderColor: isSelected ? colors.tabIndicator : colors.divider,
          },
        ]}
      >
        <List.Item
          title={item}
          titleStyle={[
            styles.itemTitle,
            { color: isSelected ? colors.tabFocusedText : colors.text },
          ]}
          onPress={() => setCurrency(item)}
          right={() => (
            <RadioButton
              value={item}
              status={isSelected ? "checked" : "unchecked"}
              color={colors.primary}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: colors.headerBackground }}>
        <Appbar.BackAction
          onPress={() => router.back()}
          color={colors.headerTint}
        />
        <Appbar.Content
          title="Currencies"
          titleStyle={{ color: colors.headerText, fontWeight: "600" }}
        />
      </Appbar.Header>

      {/* Currency List */}
      <FlatList
        data={CURRENCIES}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 1, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
