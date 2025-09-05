import { ImageSourcePropType } from 'react-native';

export type PropertyStatus = 'available' | 'sold' | 'rented';
export type HeatingType = 'electric' | 'gas' | 'none' | 'central';
export type PropertyType =
  | 'house'
  | 'apartment'
  | 'villa'
  | 'townhouse'
  | 'condo'
  | 'land'
  | 'commercial';

interface PropertyDetails {
  property_id: string;
  title: string;
  description: string;
  type: PropertyType;
  category: string;
  price: number;
  currency?: string;
  price_per_sqm?: number;
  year_built?: number;
  status: PropertyStatus;
  listing_date: string;
  is_favorite?: boolean;
}

interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  postal_code?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
}

interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  floor_area?: number;
  plot_size: number;
  floors?: number;
  garage?: {
    spaces: number;
    type: string;
  };
  amenities?: string[];
  additional_spaces?: string[];
}

interface PropertyConstruction {
  style: string;
  condition: string;
  roof_type: string;
  exterior_material: string[];
  heating: HeatingType;
  cooling: string;
  basement?: string | null;
  energy_efficiency: {
    rating: string;
    features: string[];
  };
}

interface PropertyMedia {
  images: {
    url: ImageSourcePropType;
    caption: string;
    is_primary?: boolean;
  }[];
  videos?: {
    url: string;
    caption: string;
    is_primary: boolean;
  }[];
}

interface PropertyFinance {
  tax_annual: number;
  hoa_fees: {
    amount: number;
    frequency: string;
  };
  ownership_type: string;
  last_sold: {
    price: number;
    date: string;
  };
}

interface ListingAgent {
  agent_id: string;
  agency?: string;
  contact?: string;
  listing_terms?: string;
}

interface Showings {
  availability: string;
  virtual_tour: boolean;
  open_house?: {
    next_date: string;
    hours: string;
  };
}

export interface Property extends PropertyDetails {
  address?: PropertyAddress;
  features?: PropertyFeatures;
  construction?: PropertyConstruction;
  media?: PropertyMedia;
  finance?: PropertyFinance;
  listing_agent?: ListingAgent;
  showings?: Showings;
}

// property card props
export interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
}
