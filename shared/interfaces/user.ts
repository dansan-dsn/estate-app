export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  role: "agent" | "tenant";
  profileImage?: string;
  memberSince: string;
  // Agent specific fields
  agentId?: string;
  companyName?: string;
  licenseNumber?: string;
  activeListings?: number;
  clients?: number;
  rating?: number;
  // Tenant specific fields
  currentProperty?: string;
  leaseEndDate?: string;
  monthlyRent?: string;
  emergencyContact?: string;
}
