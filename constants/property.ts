// Type and options for property types
export interface PropertyTypeOption {
  label: string;
  value: string;
}

export interface PriceRangePreset {
  label: string;
  min: number;
  max: number;
}

export interface PropertyDate {
  label: string;
  date: string;
}
export const PRICE_MIN = 0;
export const PRICE_MAX = 2000000;

export const PRESET_RANGES: PriceRangePreset[] = [
  { label: "Any", min: PRICE_MIN, max: PRICE_MAX },
  { label: "Under $100k", min: PRICE_MIN, max: 100000 },
  { label: "$100k - $300k", min: 100000, max: 300000 },
  { label: "$300k - $500k", min: 300000, max: 500000 },
  { label: "Over $500k", min: 500000, max: PRICE_MAX },
];

export const PROPERTY_TYPE_OPTIONS: PropertyTypeOption[] = [
  { label: "Any", value: "Any" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Condo", value: "condo" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Villa", value: "villa" },
  { label: "Land", value: "land" },
  { label: "Commercial", value: "commercial" },
];

export const PROPERTY_DATE: PropertyDate[] = [
  { label: "Any", date: "Any" },
  { label: "Oldest", date: "Oldest" },
  { label: "Newest", date: "Newest" },
];

export const PROPERTY_BATH: { label: string; value: string }[] = [
  { label: "Any", value: "Any" },
  { label: "1 Bath", value: "1" },
  { label: "2 Baths", value: "2" },
  { label: "3 Baths", value: "3" },
  { label: "4 Baths", value: "4" },
  { label: "5+ Baths", value: "5+" },
];

export const PROPERTY_BED: { label: string; value: string }[] = [
  { label: "Any", value: "Any" },
  { label: "1 Bedroom", value: "1" },
  { label: "2 Bedrooms", value: "2" },
  { label: "3 Bedrooms", value: "3" },
  { label: "4 Bedrooms", value: "4" },
  { label: "5+ Bedrooms", value: "5+" },
];
