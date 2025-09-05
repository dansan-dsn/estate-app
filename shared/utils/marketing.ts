[
  {
    comparatives: {
      cma_id: 'CMA-4001',
      subject_property: 'PROP-2023-0567',
      comparables: [
        {
          property_id: 'PROP-2022-1234',
          address: '321 Beach Rd',
          sold_price: 1150000,
          sold_date: '2023-03-15',
          distance_km: 0.8,
          adjustments: {
            square_meters: '+50000',
            pool: '+75000',
          },
        },
      ],
      price_range: [1100000, 1250000],
    },
  },
  {
    area_statistics: {
      area_id: 'MALIBU-90265',
      avg_price_sqm: 4200,
      avg_dom: 45, // days on market
      price_trends: {
        '1_year_change': '+8.2%',
        '5_year_change': '+32.5%',
      },
      school_ratings: {
        elementary: 9,
        middle: 8,
        high: 9,
      },
    },
  },
];
