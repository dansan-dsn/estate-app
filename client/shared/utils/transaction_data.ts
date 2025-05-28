[
  {
    offers_data: {
      offer_id: "OFF-5001",
      property_id: "PROP-2023-0567",
      buyer_id: "USR-1001",
      seller_id: "USR-1002",
      amount: 1200000,
      status: "pending", // accepted/rejected/countered
      terms: {
        contingencies: ["financing", "inspection"],
        closing_date: "2023-12-15",
        earnest_money: 50000,
      },
      timeline: [
        {
          date: "2023-10-01",
          event: "offer_submitted",
          notes: "Buyer requested 30-day closing",
        },
      ],
    },
  },
  {
    escroll_data: {
      escrow_id: "ESC-3001",
      title_company: "Pacific Coast Title",
      escrow_officer: "Jane Smith",
      disclosures: ["lead_paint", "natural_hazard"],
      documents: [
        {
          name: "Purchase Agreement",
          url: "/escrow/3001/contract.pdf",
          signed: true,
        },
      ],
    },
  },
];
