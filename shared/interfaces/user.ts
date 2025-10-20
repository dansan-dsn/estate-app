export type TrendDirection = 'up' | 'down' | 'steady';

export interface UserAnalysisItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  trend?: TrendDirection;
  helperText?: string;
}

export interface UserPipelineItem {
  id: string;
  label: string;
  value: string;
  description: string;
  status: 'success' | 'warning' | 'info';
  icon: string;
}

export interface UserTaskItem {
  id: string;
  title: string;
  due: string;
  type: 'call' | 'meeting' | 'document' | 'payment' | 'inspection' | 'other';
  completed: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  role: 'agent' | 'tenant' | 'broker';
  profileImage?: string;
  memberSince: string;
  status?: 'active' | 'pending' | 'suspended';
  tier?: string;
  timezone?: string;
  language?: string;
  preferredCurrency?: string;
  notificationChannels?: string[];
  // Agent specific fields
  agentId?: string;
  companyName?: string;
  licenseNumber?: string;
  activeListings?: number;
  clients?: number;
  rating?: number;
  avgResponseTime?: string;
  closingRate?: string;
  avgDaysOnMarket?: number;
  specialties?: string[];
  territories?: string[];
  // Tenant specific fields
  currentProperty?: string;
  leaseEndDate?: string;
  monthlyRent?: string;
  emergencyContact?: string;
  tenantPaymentStatus?: string;
  tenantScore?: number;
  moveInDate?: string;
  roommates?: number;
  // Broker specific fields
  brokerageName?: string;
  brokerTeamSize?: number;
  brokerNetworkSize?: number;
  brokerPortfolioValue?: string;
  brokerMonthlyVolume?: string;
  complianceScore?: number;
  flagshipMarkets?: string[];
  // Shared analytics
  analysis?: UserAnalysisItem[];
  pipeline?: UserPipelineItem[];
  tasks?: UserTaskItem[];
  quickLinks?: { label: string; route?: string; icon: string }[];
}
