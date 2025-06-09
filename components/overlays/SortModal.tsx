import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Text, Icon, MD3Colors } from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";
import { SCREEN_HEIGHT, HEADER_HEIGHT } from "@/constants/screen";
import BottomSheetModal from "@/components/ui/BottomSheet";
import { Picker } from "@react-native-picker/picker";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRESET_RANGES,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_DATE,
  PROPERTY_BATH,
  PROPERTY_BED,
} from "@/constants/property";

export type PropertyFilters = {
  min: number;
  max: number;
  propertyType: string;
  beds: string;
  baths: string;
  date: string;
};

interface SortModalProps {
  visible: boolean;
  close: () => void;
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
}

const defaultFilters: PropertyFilters = {
  min: PRICE_MIN,
  max: PRICE_MAX,
  propertyType: PROPERTY_TYPE_OPTIONS[0].value,
  beds: PROPERTY_BED[0].value,
  baths: PROPERTY_BATH[0].value,
  date: PROPERTY_DATE[0].date,
};

const SortModal = ({ visible, close, filters, setFilters }: SortModalProps) => {
  const { colors } = useThemeStore();

  const [minPrice, setMinPrice] = useState<string>(PRICE_MIN.toLocaleString());
  const [maxPrice, setMaxPrice] = useState<string>(PRICE_MAX.toLocaleString());

  const [selectedType, setSelectedType] = useState<string>(
    PROPERTY_TYPE_OPTIONS[0].value
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    PROPERTY_DATE[0].date
  );
  const [selectedBed, setSelectedBed] = useState<string>(PROPERTY_BED[0].value);
  const [selectedBath, setSelectedBath] = useState<string>(
    PROPERTY_BATH[0].value
  );
  const matchedRange = PRESET_RANGES.find(
    (r) => filters.min === r.min && filters.max === r.max
  );
  const [selectedRange, setSelectedRange] = useState<string | null>(
    matchedRange ? matchedRange.label : PRESET_RANGES[0].label
  );

  useEffect(() => {
    if (visible) {
      setMinPrice(filters.min.toLocaleString());
      setMaxPrice(filters.max.toLocaleString());
      setSelectedType(filters.propertyType);
      setSelectedBed(filters.beds);
      setSelectedBath(filters.baths);
      setSelectedDate(filters.date);

      const matched = PRESET_RANGES.find(
        (r) => filters.min === r.min && filters.max === r.max
      );
      setSelectedRange(matched ? matched.label : PRESET_RANGES[0].label);
    }
  }, [visible, filters]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSelectRange = (range: (typeof PRESET_RANGES)[0]) => {
    setSelectedRange(range.label);
    setMinPrice(range.min.toLocaleString());
    setMaxPrice(range.max.toLocaleString());
  };

  const handleClearAll = () => {
    setMinPrice(defaultFilters.min.toLocaleString());
    setMaxPrice(defaultFilters.max.toLocaleString());
    setSelectedType(defaultFilters.propertyType);
    setSelectedBed(defaultFilters.beds);
    setSelectedBath(defaultFilters.baths);
    setSelectedDate(defaultFilters.date);
    setSelectedRange(PRESET_RANGES[0].label);
    // Optionally immediately apply? Usually not: let user hit "Apply"
  };

  const handleApply = () => {
    const min = parseInt(minPrice.replace(/,/g, "")) || PRICE_MIN;
    const max = parseInt(maxPrice.replace(/,/g, "")) || PRICE_MAX;
    const finalMin = Math.min(min, max);
    const finalMax = Math.max(min, max);

    setFilters({
      min: finalMin,
      max: finalMax,
      propertyType: selectedType,
      beds: selectedBed,
      baths: selectedBath,
      date: selectedDate,
    });

    close();
  };

  return (
    <BottomSheetModal
      visible={visible}
      defaultHeight={540}
      maxHeight={SCREEN_HEIGHT * 0.8}
      backdropOpacity={0.7}
      onClose={close}
      draggable={false}
    >
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: colors.cardBackground,
              zIndex: 10,
              shadowColor: "#000",
              elevation: 2,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Filter Properties
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable
              onPress={handleClearAll}
              style={[styles.iconBtn, { backgroundColor: colors.background }]}
            >
              <Icon source="refresh" size={20} color={colors.primary} />
              <Text
                style={{
                  color: colors.primary,
                  marginLeft: 4,
                  fontWeight: "500",
                }}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable onPress={close} style={styles.closeBtn}>
              <Icon source="close" size={16} color={colors.white} />
            </Pressable>
          </View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginTop: HEADER_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Property Type */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Property Type
            </Text>
            <View
              style={[
                styles.pickerWrapper,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.outline,
                  borderWidth: 1,
                  borderRadius: 8,
                },
              ]}
            >
              <Picker
                selectedValue={selectedType}
                onValueChange={setSelectedType}
                style={{
                  height: 50,
                  color: colors.textSecondary,
                }}
                mode="dropdown"
                dropdownIconColor={colors.icon}
                itemStyle={{
                  color: colors.textSecondary,
                }}
              >
                {PROPERTY_TYPE_OPTIONS.map((option, i) => (
                  <Picker.Item
                    key={i}
                    label={option.label}
                    value={option.value}
                    color={colors.textSecondary}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Price Range */}
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
                          : colors.surface,
                      borderColor:
                        selectedRange === range.label
                          ? colors.primary
                          : "transparent",
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
            <View style={styles.priceInputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.secondary }]}>
                  Min Price
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text style={[styles.currencySymbol, { color: colors.text }]}>
                    $
                  </Text>
                  <Text
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        backgroundColor: colors.surfaceVariant,
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    selectable
                    suppressHighlighting
                  >
                    {minPrice}
                  </Text>
                </View>
              </View>
              <View style={styles.spacer} />
              <View style={styles.inputWrapper}>
                <Text style={[styles.inputLabel, { color: colors.secondary }]}>
                  Max Price
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Text style={[styles.currencySymbol, { color: colors.text }]}>
                    $
                  </Text>
                  <Text
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        backgroundColor: colors.surfaceVariant,
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    selectable
                    suppressHighlighting
                  >
                    {maxPrice}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Beds */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Beds
            </Text>
            <View style={styles.presetContainer}>
              {PROPERTY_BED.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.presetButton,
                    {
                      backgroundColor:
                        selectedBed === option.value
                          ? colors.primary
                          : colors.surface,
                      borderColor:
                        selectedBed === option.value
                          ? colors.primary
                          : "transparent",
                    },
                  ]}
                  onPress={() => setSelectedBed(option.value)}
                >
                  <Text
                    style={[
                      styles.presetButtonText,
                      {
                        color:
                          selectedBed === option.value ? "#fff" : colors.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Bath */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Bath
            </Text>
            <View style={styles.presetContainer}>
              {PROPERTY_BATH.map((option) => (
                <Pressable
                  key={option.value}
                  style={[
                    styles.presetButton,
                    {
                      backgroundColor:
                        selectedBath === option.value
                          ? colors.primary
                          : colors.surface,
                      borderColor:
                        selectedBath === option.value
                          ? colors.primary
                          : "transparent",
                    },
                  ]}
                  onPress={() => setSelectedBath(option.value)}
                >
                  <Text
                    style={[
                      styles.presetButtonText,
                      {
                        color:
                          selectedBath === option.value ? "#fff" : colors.text,
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Date Added */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Date Added
            </Text>
            <View
              style={
                (styles.pickerWrapper,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.outline,
                  borderWidth: 1,
                  borderRadius: 8,
                })
              }
            >
              <Picker
                selectedValue={selectedDate}
                onValueChange={setSelectedDate}
                style={{ height: 50, paddingVertical: 8 }}
                mode="dropdown"
                dropdownIconColor={colors.textSecondary}
                itemStyle={{ color: colors.text }}
              >
                {PROPERTY_DATE.map((option, i) => (
                  <Picker.Item
                    key={i}
                    label={option.label}
                    value={option.date}
                    color={colors.textSecondary}
                  />
                ))}
              </Picker>
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
        </Animated.ScrollView>
      </View>
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
    height: HEADER_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: MD3Colors.error50,
    elevation: 2,
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  presetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  presetButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    marginBottom: 8,
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  priceInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 8,
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 4,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    paddingLeft: 24,
    height: 44,
  },
  currencySymbol: {
    position: "absolute",
    left: 12,
    zIndex: 1,
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "transparent",
    textAlignVertical: "center",
  },
  spacer: {
    width: 16,
  },
  applyBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 24,
    elevation: 2,
    marginBottom: 24,
  },
  applyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.2,
  },
});

export default SortModal;
