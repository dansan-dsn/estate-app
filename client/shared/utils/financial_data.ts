[
  {
    mortgage_calc: {
      calculation_id: "MORT-8001",
      loan_amount: 1000000,
      interest_rate: 6.5,
      term_years: 30,
      down_payment: 20,
      results: {
        monthly_payment: 6320,
        total_interest: 1275520,
        amortization: ["Payment"], // Payment schedule
      },
    },
  },
  {
    transaction_history: {
      transaction_id: "TRX-9001",
      property_id: "PROP-2023-0567",
      sale_price: 1250000,
      recording_date: "2023-11-15",
      parties: {
        buyer: "USR-1001",
        seller: "USR-1002",
        agents: ["AGT-2001", "AGT-2002"],
      },
      fees: {
        commission: 75000,
        title_insurance: 2500,
        transfer_tax: 13750,
      },
    },
  },
];
