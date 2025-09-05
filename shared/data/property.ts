import { Property } from '@/shared/interfaces/property';
import { ImageSourcePropType } from 'react-native';
const home1: ImageSourcePropType = require('@/assets/images/home1.jpg');
const home2: ImageSourcePropType = require('@/assets/images/home2.jpeg');
const home3: ImageSourcePropType = require('@/assets/images/home3.jpg');
const home4: ImageSourcePropType = require('@/assets/images/home4.jpg');
const home5: ImageSourcePropType = require('@/assets/images/home5.jpg');

export const properties: Property[] = [
  {
    property_id: '1',
    title: 'Property 1',
    description: 'Description of Property 1',
    type: 'apartment',
    category: 'residential',
    price: 500000,
    currency: 'USD',
    price_per_sqm: 416.67,
    year_built: 2010,
    status: 'available',
    listing_date: '2024-06-01',
    listing_agent: {
      agent_id: 'AGT-10025',
      agency: 'Urban Estates',
      contact: 'agent1@urbanestates.com',
      listing_terms: 'Open',
    },
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'USA',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
      neighborhood: 'Midtown',
    },
    media: {
      images: [
        {
          url: home1,
          caption: 'Image 1',
        },
        {
          url: home2,
          caption: 'Image 1',
        },
      ],
      videos: [
        {
          url: 'https://example.com/video1.mp4',
          caption: 'Property overview',
          is_primary: true,
        },
      ],
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      floor_area: 1200,
      plot_size: 0,
      floors: 1,
      garage: {
        spaces: 1,
        type: 'underground',
      },
      amenities: ['Elevator', 'Doorman', 'Balcony'],
      additional_spaces: ['Storage Room'],
    },
    construction: {
      style: 'Contemporary',
      condition: 'Good',
      roof_type: 'Flat',
      exterior_material: ['Concrete', 'Glass'],
      heating: 'central',
      cooling: 'central',
      basement: 'None',
      energy_efficiency: {
        rating: 'B',
        features: ['Double glazing'],
      },
    },
    finance: {
      tax_annual: 4200,
      hoa_fees: {
        amount: 200,
        frequency: 'Monthly',
      },
      ownership_type: 'Condo',
      last_sold: {
        price: 475000,
        date: '2018-05-20',
      },
    },
    showings: {
      availability: 'Weekdays and Weekends',
      virtual_tour: true,
      open_house: {
        next_date: '2024-06-08',
        hours: '11:00 AM - 3:00 PM',
      },
    },
  },
  {
    property_id: '2',
    title: 'Property 2',
    description: 'Description of Property 2',
    type: 'house',
    category: 'residential',
    price: 600000,
    currency: 'USD',
    price_per_sqm: 400.0,
    year_built: 2015,
    status: 'available',
    listing_date: '2024-06-02',
    listing_agent: {
      agent_id: 'AGT-10026',
      agency: 'Sunrise Realty',
      contact: 'agent2@sunrise.com',
      listing_terms: 'Exclusive',
    },
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      postal_code: '90001',
      country: 'USA',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
      neighborhood: 'Downtown',
    },
    media: {
      images: [
        {
          url: home3,
          caption: 'Front view',
          is_primary: true,
        },
        {
          url: home4,
          caption: 'Backyard view',
        },
        {
          url: home2,
          caption: 'Image 1',
        },
      ],
      videos: [
        {
          url: 'https://example.com/video2.mp4',
          caption: 'Property tour',
          is_primary: true,
        },
      ],
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      floor_area: 1500,
      plot_size: 2000,
      floors: 2,
      garage: {
        spaces: 2,
        type: 'attached',
      },
      amenities: ['Pool', 'Gym', 'Garden'],
      additional_spaces: ['Home Office', 'Laundry Room'],
    },
    construction: {
      style: 'Modern',
      condition: 'Excellent',
      roof_type: 'Gabled',
      exterior_material: ['Brick', 'Stucco'],
      heating: 'central',
      cooling: 'central',
      basement: 'Finished',
      energy_efficiency: {
        rating: 'A',
        features: ['Double glazing', 'Solar panels'],
      },
    },
    finance: {
      tax_annual: 5200,
      hoa_fees: {
        amount: 150,
        frequency: 'Monthly',
      },
      ownership_type: 'Freehold',
      last_sold: {
        price: 550000,
        date: '2021-08-15',
      },
    },
    showings: {
      availability: 'Weekends only',
      virtual_tour: true,
      open_house: {
        next_date: '2024-06-10',
        hours: '10:00 AM - 2:00 PM',
      },
    },
  },
  {
    property_id: '3',
    title: 'Property 3',
    description: 'Description of Property 1',
    type: 'apartment',
    category: 'residential',
    price: 500000,
    currency: 'USD',
    price_per_sqm: 416.67,
    year_built: 2010,
    status: 'sold',
    listing_date: '2024-06-01',
    listing_agent: {
      agent_id: 'AGT-10025',
      agency: 'Urban Estates',
      contact: 'agent1@urbanestates.com',
      listing_terms: 'Open',
    },
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'USA',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
      neighborhood: 'Midtown',
    },
    media: {
      images: [
        {
          url: home5,
          caption: 'Image 1',
        },
        {
          url: home1,
          caption: 'Image 1',
        },
      ],
      videos: [
        {
          url: 'https://example.com/video1.mp4',
          caption: 'Property overview',
          is_primary: true,
        },
      ],
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      floor_area: 1200,
      plot_size: 0,
      floors: 1,
      garage: {
        spaces: 1,
        type: 'underground',
      },
      amenities: ['Elevator', 'Doorman', 'Balcony'],
      additional_spaces: ['Storage Room'],
    },
    construction: {
      style: 'Contemporary',
      condition: 'Good',
      roof_type: 'Flat',
      exterior_material: ['Concrete', 'Glass'],
      heating: 'central',
      cooling: 'central',
      basement: 'None',
      energy_efficiency: {
        rating: 'B',
        features: ['Double glazing'],
      },
    },
    finance: {
      tax_annual: 4200,
      hoa_fees: {
        amount: 200,
        frequency: 'Monthly',
      },
      ownership_type: 'Condo',
      last_sold: {
        price: 475000,
        date: '2018-05-20',
      },
    },
    showings: {
      availability: 'Weekdays and Weekends',
      virtual_tour: true,
      open_house: {
        next_date: '2024-06-08',
        hours: '11:00 AM - 3:00 PM',
      },
    },
  },
  {
    property_id: '4',
    title: 'Property 4',
    description: 'Description of Property 2',
    type: 'house',
    category: 'residential',
    price: 600000,
    currency: 'USD',
    price_per_sqm: 400.0,
    year_built: 2015,
    status: 'rented',
    listing_date: '2024-06-02',
    listing_agent: {
      agent_id: 'AGT-10026',
      agency: 'Sunrise Realty',
      contact: 'agent2@sunrise.com',
      listing_terms: 'Exclusive',
    },
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      postal_code: '90001',
      country: 'USA',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
      neighborhood: 'Downtown',
    },
    media: {
      images: [
        {
          url: home2,
          caption: 'Front view',
          is_primary: true,
        },
        {
          url: home3,
          caption: 'Backyard view',
        },
      ],
      videos: [
        {
          url: 'https://example.com/video2.mp4',
          caption: 'Property tour',
          is_primary: true,
        },
      ],
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      floor_area: 1500,
      plot_size: 2000,
      floors: 2,
      garage: {
        spaces: 2,
        type: 'attached',
      },
      amenities: ['Pool', 'Gym', 'Garden'],
      additional_spaces: ['Home Office', 'Laundry Room'],
    },
    construction: {
      style: 'Modern',
      condition: 'Excellent',
      roof_type: 'Gabled',
      exterior_material: ['Brick', 'Stucco'],
      heating: 'central',
      cooling: 'central',
      basement: 'Finished',
      energy_efficiency: {
        rating: 'A',
        features: ['Double glazing', 'Solar panels'],
      },
    },
    finance: {
      tax_annual: 5200,
      hoa_fees: {
        amount: 150,
        frequency: 'Monthly',
      },
      ownership_type: 'Freehold',
      last_sold: {
        price: 550000,
        date: '2021-08-15',
      },
    },
    showings: {
      availability: 'Weekends only',
      virtual_tour: true,
      open_house: {
        next_date: '2024-06-10',
        hours: '10:00 AM - 2:00 PM',
      },
    },
  },
];
