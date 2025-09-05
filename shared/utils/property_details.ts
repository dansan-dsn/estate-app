// property basic info
[
  {
    property: {
      property_id: 'PROP-2023-0567',
      title: 'Luxury 4-Bedroom Villa with Ocean View',
      description:
        'Stunning modern villa with panoramic ocean views, private pool, and smart home features in gated community.',
      type: 'Villa', // Apartment, Condo, Townhouse, Land, Commercial
      category: 'Residential', // Residential/Commercial/Industrial
      price: 1250000,
      currency: 'USD',
      price_per_sqm: 4500,
      year_built: 2020,
      status: 'For Sale', // For Rent/Sold/Off Market
      listing_date: '2023-05-15',
    },
  },
];

// location data
[
  {
    address: {
      street: '123 Coastal Boulevard',
      city: 'Malibu',
      state: 'California',
      postal_code: '90265',
      country: 'USA',
      coordinates: {
        lat: 34.025922,
        lng: -118.779757,
      },
      neighborhood: 'Malibu Colony',
    },
  },
];

// property features
[
  {
    features: {
      bedrooms: 4,
      bathrooms: 3.5, // .5 for powder rooms
      floor_area: 278, // in sqm
      plot_size: 450, // in sqm
      floors: 2,
      garage: {
        spaces: 2,
        type: 'Attached',
      },
      amenities: [
        'Swimming Pool',
        'Smart Home System',
        'Home Theater',
        'Wine Cellar',
        'Solar Panels',
        'Security System',
      ],
      additional_spaces: ['Guest House', 'Outdoor Kitchen', 'Home Office'],
    },
  },
];

// construction detials
[
  {
    construction: {
      style: 'Modern Contemporary',
      condition: 'Excellent',
      roof_type: 'Flat',
      exterior_material: ['Concrete', 'Glass'],
      heating: 'Central',
      cooling: 'Central A/C',
      basement: 'None',
      energy_efficiency: {
        rating: 'A',
        features: ['Double Glazing', 'Insulated Walls'],
      },
    },
  },
];

// medai assets
[
  {
    media: {
      images: [
        {
          url: 'https://example.com/properties/villa-1.jpg',
          caption: 'Front view with landscaping',
          is_primary: true,
        },
        {
          url: 'https://example.com/properties/villa-2.jpg',
          caption: 'Infinity pool overlooking ocean',
        },
      ],
      videos: [
        {
          url: 'https://youtube.com/embed/xyz123',
          type: 'Virtual Tour',
        },
      ],
      floor_plans: [
        {
          url: 'https://example.com/plans/floor1.pdf',
          level: 'First Floor',
        },
      ],
    },
  },
];

// financial legal info
[
  {
    financial: {
      tax_annual: 18500,
      hoa_fees: {
        amount: 450,
        frequency: 'Monthly',
      },
      ownership_type: 'Freehold',
      last_sold: {
        price: 980000,
        date: '2018-03-12',
      },
    },
  },
];

// agend and listing details
[
  {
    listing_agent: {
      agent_id: 'AGT-10025',
      agency: 'Luxury Coastal Properties',
      contact: '+1 310-555-2023',
      listing_terms: 'Exclusive Right to Sell',
    },
    showings: {
      availability: 'By Appointment',
      virtual_tour: true,
      open_house: {
        next_date: '2023-06-10',
        hours: '11AM-2PM',
      },
    },
  },
];
