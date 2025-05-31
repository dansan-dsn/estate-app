import BottomSheetModal from "@/components/ui/BottomSheet";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Text, Icon, MD3Colors, Divider } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";
import { useState } from "react";
import { SCREEN_HEIGHT } from "@/constants/screen";

interface SortModalProps {
  visible: boolean;
  close: () => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 2000000;

const SortModal = ({ visible, close }: SortModalProps) => {
  const { colors } = useThemeStore();
  const [minPrice, setMinPrice] = useState("100,000");
  const [maxPrice, setMaxPrice] = useState("500,000");
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const PRESET_RANGES = [
    { label: "Any", min: PRICE_MIN, max: PRICE_MAX },
    { label: "Under $100k", min: PRICE_MIN, max: 100000 },
    { label: "$100k - $300k", min: 100000, max: 300000 },
    { label: "$300k - $500k", min: 300000, max: 500000 },
    { label: "Over $500k", min: 500000, max: PRICE_MAX },
  ];

  // Handle preset range selection
  const handleSelectRange = (range: (typeof PRESET_RANGES)[0]) => {
    setSelectedRange(range.label);
    setMinPrice(range.min.toLocaleString());
    setMaxPrice(range.max.toLocaleString());
  };

  // Apply filter logic
  const handleApply = () => {
    const min = parseInt(minPrice.replace(/,/g, "")) || PRICE_MIN;
    const max = parseInt(maxPrice.replace(/,/g, "")) || PRICE_MAX;

    // Validate min <= max
    const finalMin = Math.min(min, max);
    const finalMax = Math.max(min, max);

    // Apply your filter logic here
    console.log("Applying filter:", { min: finalMin, max: finalMax });
    close();
  };

  return (
    <BottomSheetModal
      visible={visible}
      defaultHeight={500}
      maxHeight={SCREEN_HEIGHT * 0.8}
      backdropOpacity={0.7}
      onClose={close}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Filter Properties
          </Text>
          <Pressable onPress={close} style={styles.closeBtn}>
            <Icon source="close" size={20} color={colors.white} />
          </Pressable>
        </View>

        <Divider style={{ backgroundColor: colors.outline }} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Price Range
          </Text>

          <View style={styles.presetContainer}>
            {PRESET_RANGES.map((range) => (
              <Pressable
                key={range.label}
                onPress={() => handleSelectRange(range)}
                style={[
                  styles.presetButton,
                  {
                    backgroundColor:
                      selectedRange === range.label
                        ? colors.primary
                        : colors.surfaceVariant,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    {
                      color:
                        selectedRange === range.label ? "#fff" : colors.text,
                    },
                  ]}
                >
                  {range.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={[
            styles.applyBtn,
            {
              backgroundColor: colors.primary,
            },
          ]}
          onPress={handleApply}
        >
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </Pressable>
      </ScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: MD3Colors.error50,
    elevation: 2,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  presetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  presetButtonText: {
    fontSize: 14,
  },
  priceInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  currencySymbol: {
    position: "absolute",
    left: 12,
    zIndex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 30,
    paddingRight: 12,
    fontSize: 16,
  },
  spacer: {
    width: 16,
  },
  applyBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 2,
  },
  applyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SortModal;
