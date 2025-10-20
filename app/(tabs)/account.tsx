import React, { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';
import LoginView from '@/components/blocks/more/LoginView';
import { useThemeStore } from '@/stores/useTheme';
import { UserProfile } from '@/shared/interfaces/user';
import { ProfileHeader } from '@/components/blocks/account/ProfileHeader';
import { PersonalInfoCard } from '@/components/blocks/account/PersonalInfoCard';
import { AccountDetailsCard } from '@/components/blocks/account/AccountDetailsCard';
import { RoleSpecificCard } from '@/components/blocks/account/RoleSpecificCard';
import { ActionsCard } from '@/components/blocks/account/ActionCard';
import { EditProfileModal } from '@/components/blocks/account/EditProfileModal';
import { AnalyticsHighlights } from '@/components/blocks/account/AnalyticsHighlights';
import { PipelineCard } from '@/components/blocks/account/PipelineCard';
import { TaskBoard } from '@/components/blocks/account/TaskBoard';

const workspaceProfiles: Record<UserProfile['role'], UserProfile> = {
  broker: {
    firstName: 'Taylor',
    lastName: 'Smith',
    email: 'taylor.smith@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Founder broker at Urban Estates Collective. Focused on curating boutique portfolios and rapid closing experiences for institutional and luxury clients.',
    role: 'broker',
    memberSince: 'June 2021',
    status: 'active',
    tier: 'Premier Partner',
    timezone: 'EST (UTC-5)',
    language: 'English',
    preferredCurrency: 'USD',
    notificationChannels: ['Email', 'Push'],
    agentId: 'BRK-9021',
    companyName: 'Urban Estates Collective',
    brokerageName: 'Urban Estates Collective',
    brokerTeamSize: 12,
    brokerNetworkSize: 48,
    brokerPortfolioValue: '$86M',
    brokerMonthlyVolume: '$4.6M',
    complianceScore: 96,
    flagshipMarkets: ['New York', 'San Francisco', 'Austin'],
    activeListings: 28,
    clients: 42,
    rating: 4.8,
    avgResponseTime: '1h 15m',
    closingRate: '68%',
    avgDaysOnMarket: 19,
    analysis: [
      {
        id: 'leads',
        label: 'Qualified leads',
        value: '32',
        icon: 'account-multiple-check',
        trend: 'up',
        helperText: '+12% vs last month',
      },
      {
        id: 'volume',
        label: 'Projected volume',
        value: '$9.4M',
        icon: 'chart-line',
        trend: 'up',
        helperText: '3 contracts awaiting signatures',
      },
      {
        id: 'satisfaction',
        label: 'Client NPS',
        value: '92',
        icon: 'emoticon-happy-outline',
        trend: 'steady',
        helperText: 'Consistent positive feedback',
      },
      {
        id: 'renewals',
        label: 'Renewals due',
        value: '6',
        icon: 'calendar-refresh',
        trend: 'down',
        helperText: '2 high-priority renewals this week',
      },
    ],
    pipeline: [
      {
        id: 'discovery',
        label: 'Discovery calls',
        value: '45%',
        description: 'Prospects aligned with investment strategy',
        status: 'info',
        icon: 'phone-forward',
      },
      {
        id: 'negotiation',
        label: 'Negotiations',
        value: '65%',
        description: 'Active deals under counter offer review',
        status: 'warning',
        icon: 'handshake',
      },
      {
        id: 'closing',
        label: 'Closing desk',
        value: '82%',
        description: 'Scheduled for signatures and funding',
        status: 'success',
        icon: 'file-sign',
      },
    ],
    tasks: [
      {
        id: 'broker-task-1',
        title: 'Review lease addendum for Riverside Lofts',
        due: 'Today',
        type: 'document',
        completed: false,
      },
      {
        id: 'broker-task-2',
        title: 'Prep investor dashboard briefing',
        due: 'Tomorrow',
        type: 'meeting',
        completed: false,
      },
      {
        id: 'broker-task-3',
        title: 'Follow up with relocation partner',
        due: 'Friday',
        type: 'call',
        completed: true,
      },
    ],
    quickLinks: [
      { label: 'Compliance Center', icon: 'shield-check' },
      { label: 'Team Directory', icon: 'account-group' },
      { label: 'Marketing Studio', icon: 'bullhorn' },
    ],
  },
  agent: {
    firstName: 'Jordan',
    lastName: 'Lee',
    email: 'jordan.lee@metropolitanhomes.com',
    phone: '+1 (555) 240-8890',
    bio: 'Lead listing agent specializing in luxury rentals and corporate relocations with a focus on concierge-level service.',
    role: 'agent',
    memberSince: 'January 2020',
    status: 'active',
    tier: 'Elite Agent',
    timezone: 'PST (UTC-8)',
    language: 'English, Spanish',
    preferredCurrency: 'USD',
    notificationChannels: ['Email', 'SMS', 'Push'],
    agentId: 'AGT-4410',
    companyName: 'Metropolitan Homes',
    licenseNumber: 'CA-921488',
    activeListings: 12,
    clients: 18,
    rating: 4.9,
    avgResponseTime: '45m',
    closingRate: '72%',
    avgDaysOnMarket: 14,
    specialties: ['Luxury Rentals', 'Corporate Relocation', 'New Developments'],
    territories: ['Downtown LA', 'Santa Monica', 'Pasadena'],
    analysis: [
      {
        id: 'showings',
        label: 'Weekly showings',
        value: '24',
        icon: 'door',
        trend: 'up',
        helperText: '+6 vs last week',
      },
      {
        id: 'conversion',
        label: 'Lead conversions',
        value: '38%',
        icon: 'chart-bell-curve',
        trend: 'steady',
        helperText: 'Top of funnel stable',
      },
      {
        id: 'offers',
        label: 'Active offers',
        value: '7',
        icon: 'file-document-edit',
        trend: 'up',
        helperText: '2 above asking',
      },
      {
        id: 'followups',
        label: 'Follow-ups due',
        value: '5',
        icon: 'calendar-clock',
        trend: 'down',
        helperText: 'Reduced backlog',
      },
    ],
    pipeline: [
      {
        id: 'prospects',
        label: 'New prospects',
        value: '35%',
        description: 'Qualified buyers entering CRM',
        status: 'info',
        icon: 'account-search',
      },
      {
        id: 'showings',
        label: 'Scheduled showings',
        value: '58%',
        description: 'Tours booked for this week',
        status: 'warning',
        icon: 'home-search',
      },
      {
        id: 'offers',
        label: 'Offer negotiations',
        value: '76%',
        description: 'Contracts under review',
        status: 'success',
        icon: 'file-document-edit',
      },
    ],
    tasks: [
      {
        id: 'agent-task-1',
        title: 'Confirm staging team for Skyview Penthouse',
        due: 'Today',
        type: 'meeting',
        completed: false,
      },
      {
        id: 'agent-task-2',
        title: 'Send comp report to Rivera family',
        due: 'Tomorrow',
        type: 'document',
        completed: false,
      },
      {
        id: 'agent-task-3',
        title: 'Follow up with OmniCorp relocation',
        due: 'Thursday',
        type: 'call',
        completed: false,
      },
    ],
    quickLinks: [
      { label: 'Marketing Calendar', icon: 'calendar-month-outline' },
      { label: 'Pipeline Health', icon: 'chart-timeline-variant' },
      { label: 'Investor Toolkit', icon: 'briefcase' },
    ],
  },
  tenant: {
    firstName: 'Morgan',
    lastName: 'Price',
    email: 'morgan.price@tenantmail.com',
    phone: '+1 (555) 765-4433',
    bio: 'UX designer working remotely and prioritizing calm, well-connected living spaces with concierge-style amenities.',
    role: 'tenant',
    memberSince: 'March 2022',
    status: 'active',
    tier: 'Resident Plus',
    timezone: 'CST (UTC-6)',
    language: 'English',
    preferredCurrency: 'USD',
    notificationChannels: ['Email', 'Push'],
    currentProperty: 'Riverside Loft 5B',
    leaseEndDate: 'Dec 31, 2025',
    monthlyRent: '$2,850',
    emergencyContact: 'Jamie Price (+1 555-555-2211)',
    tenantPaymentStatus: 'Paid - Oct',
    tenantScore: 93,
    moveInDate: 'Jan 12, 2023',
    roommates: 1,
    analysis: [
      {
        id: 'rent',
        label: 'On-time payments',
        value: '24 months',
        icon: 'calendar-check',
        trend: 'up',
        helperText: 'Never missed a payment',
      },
      {
        id: 'utilities',
        label: 'Utility balance',
        value: '$0',
        icon: 'flash',
        trend: 'steady',
        helperText: 'Auto-pay enabled',
      },
      {
        id: 'maintenance',
        label: 'Open requests',
        value: '1',
        icon: 'tools',
        trend: 'down',
        helperText: 'Awaiting contractor visit',
      },
      {
        id: 'renewal-window',
        label: 'Renewal window',
        value: '60 days',
        icon: 'calendar-refresh',
        trend: 'steady',
        helperText: 'We will remind you soon',
      },
    ],
    pipeline: [
      {
        id: 'amenities',
        label: 'Amenities usage',
        value: '48%',
        description: 'Gym & cowork bookings this month',
        status: 'info',
        icon: 'dumbbell',
      },
      {
        id: 'maintenance',
        label: 'Maintenance progress',
        value: '80%',
        description: 'Latest ticket scheduled',
        status: 'warning',
        icon: 'tools',
      },
      {
        id: 'renewal',
        label: 'Renewal readiness',
        value: '65%',
        description: 'Docs prepared for review',
        status: 'success',
        icon: 'file-sign',
      },
    ],
    tasks: [
      {
        id: 'tenant-task-1',
        title: 'Upload renter insurance renewal',
        due: 'Next week',
        type: 'document',
        completed: false,
      },
      {
        id: 'tenant-task-2',
        title: 'Schedule HVAC filter change',
        due: 'Friday',
        type: 'inspection',
        completed: false,
      },
      {
        id: 'tenant-task-3',
        title: 'Confirm pet policy addendum',
        due: 'Tomorrow',
        type: 'call',
        completed: false,
      },
    ],
    quickLinks: [
      { label: 'Pay rent', icon: 'credit-card-check' },
      { label: 'Maintenance desk', icon: 'wrench' },
      { label: 'Community events', icon: 'calendar-heart' },
    ],
  },
};

const workspaceCopy: Record<
  UserProfile['role'],
  { title: string; description: string }
> = {
  broker: {
    title: 'Broker control tower',
    description: 'Monitor compliance, capital flows, and team health across your network.',
  },
  agent: {
    title: 'Agent operations desk',
    description: 'Coordinate listings, nurture leads, and personalize every client hand-off.',
  },
  tenant: {
    title: 'Resident living hub',
    description: 'Track payments, manage requests, and explore your community perks.',
  },
};

export default function Account() {
  const [isLoggedIn] = useState(true);
  const { colors } = useThemeStore();
  const router = useRouter();

  const [profiles, setProfiles] = useState(workspaceProfiles);
  const [activeRole, setActiveRole] = useState<UserProfile['role']>('broker');
  const userProfile = profiles[activeRole];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  useEffect(() => {
    setEditedProfile(userProfile);
  }, [userProfile]);

  const handleSaveProfile = () => {
    setProfiles((prev) => {
      const nextRole = editedProfile.role;
      const updated = { ...prev, [nextRole]: editedProfile } as Record<
        UserProfile['role'],
        UserProfile
      >;
      return updated;
    });
    if (editedProfile.role !== activeRole) {
      setActiveRole(editedProfile.role);
    }
    setIsEditingProfile(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(false);
  };

  const handleEditPress = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(true);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.backdrop,
          {
            backgroundColor: colors.primary + '1d',
          },
        ]}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {!isLoggedIn ? (
          <LoginView
            onLoginPress={() => {
              router.push('/auth/login');
            }}
            colors={colors}
          />
        ) : (
          <Fragment>
            <View style={styles.roleSwitcher}>
              <SegmentedButtons
                value={activeRole}
                onValueChange={(value) =>
                  setActiveRole(value as UserProfile['role'])
                }
                buttons={[
                  {
                    value: 'broker',
                    label: 'Broker Suite',
                    icon: 'account-tie',
                  },
                  {
                    value: 'agent',
                    label: 'Agent Desk',
                    icon: 'clipboard-account',
                  },
                  {
                    value: 'tenant',
                    label: 'Tenant Hub',
                    icon: 'home-account',
                  },
                ]}
                style={{ marginBottom: 12 }}
              />
              <Text
                variant="bodySmall"
                style={{ color: colors.textSecondary, marginTop: 4 }}
              >
                {workspaceCopy[activeRole].title}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  color: colors.text,
                  marginTop: 4,
                  lineHeight: 20,
                }}
              >
                {workspaceCopy[activeRole].description}
              </Text>
            </View>
            <ProfileHeader
              userProfile={userProfile}
              colors={colors}
              onEditPress={handleEditPress}
            />

            <AnalyticsHighlights metrics={userProfile.analysis} colors={colors} />

            <PipelineCard items={userProfile.pipeline} colors={colors} />

            <PersonalInfoCard
              userProfile={userProfile}
              colors={colors}
              onEditPress={handleEditPress}
            />

            <AccountDetailsCard userProfile={userProfile} colors={colors} />

            <RoleSpecificCard userProfile={userProfile} colors={colors} />

            <TaskBoard tasks={userProfile.tasks} colors={colors} />

            <ActionsCard userProfile={userProfile} colors={colors} />

            <EditProfileModal
              visible={isEditingProfile}
              editedProfile={editedProfile}
              colors={colors}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
              onProfileChange={setEditedProfile}
            />
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  roleSwitcher: {
    marginBottom: 16,
  },
  backdrop: {
    position: 'absolute',
    top: -120,
    left: -80,
    right: -80,
    height: 240,
    borderBottomLeftRadius: 240,
    borderBottomRightRadius: 240,
    opacity: 0.55,
  },
  container: {
    flex: 1,
  },
});
