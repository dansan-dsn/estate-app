[
  {
    user: {
      user_id: "USR-1001",
      role: "buyer", // buyer, seller, agent, admin
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      password_hash: "hashed_secure_password",
      profile_pic: "/uploads/users/1001.jpg",
      verification: {
        email_verified: true,
        phone_verified: false,
        id_verified: false, // KYC for agents/sellers
      },
      preferences: {
        property_types: ["villa", "apartment"],
        budget_range: [500000, 1200000],
        locations: ["Malibu", "Beverly Hills"],
      },
    },
  },

  {
    agent: {
      agent_id: "AGT-2001",
      license_number: "CA-123456",
      agency: "Luxury Coastal Realty",
      specializations: ["Luxury Homes", "Waterfront Properties"],
      years_experience: 8,
      languages: ["English", "Spanish"],
      bio: "Top 1% agent in Malibu...",
      social_links: {
        linkedin: "https://linkedin.com/agent2001",
        instagram: "@malibuhomes",
      },
    },
  },
];
