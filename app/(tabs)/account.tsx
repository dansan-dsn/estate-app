import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SegmentedButtons, Text, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
import GlassCard from '@/components/ui/GlassCard';

type SupportedRole = 'agent' | 'tenant';

type SectionSpan = 'full' | 'half';

interface SectionItem {
  key: string;
  span: SectionSpan;
  content: React.ReactNode;
}

interface AccountSection {
  id: string;
  title: string;
  description?: string;
  items: SectionItem[];
}

type SectionRow = {
  key: string;
  items: SectionItem[];
};

const workspaceProfiles: Record<SupportedRole, UserProfile> = {
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
  SupportedRole,
  {
    label: string;
    title: string;
    description: string;
    icon: string;
    heroHighlights: (profile: UserProfile) => { icon: string; text: string }[];
  }
> = {
  agent: {
    label: 'Agent Desk',
    title: 'Agent Operating Hub',
    description:
      'Blend performance analytics, client pipelines, and personal branding into one streamlined cockpit.',
    icon: 'clipboard-account',
    heroHighlights: (profile) => [
      {
        icon: 'home-city',
        text: `${profile.activeListings ?? 0} active listings`,
      },
      {
        icon: 'account-group',
        text: `${profile.clients ?? 0} active clients`,
      },
      {
        icon: 'chart-line',
        text: profile.closingRate
          ? `Closing at ${profile.closingRate}`
          : 'Tracking conversions',
      },
    ],
  },
  tenant: {
    label: 'Tenant Hub',
    title: 'Resident Living Hub',
    description:
      'Review lease essentials, handle requests, and keep your household details organized in one calm space.',
    icon: 'home-account',
    heroHighlights: (profile) => [
      {
        icon: 'credit-card-check',
        text: profile.tenantPaymentStatus || 'Set up payment reminders',
      },
      {
        icon: 'calendar-range',
        text: profile.leaseEndDate
          ? `Lease ends ${profile.leaseEndDate}`
          : 'Add lease end date',
      },
      {
        icon: 'shield-star',
        text:
          typeof profile.tenantScore === 'number'
            ? `Resident score ${profile.tenantScore}`
            : 'Track resident score',
      },
    ],
  },
};

export default function Account() {
  const [isLoggedIn] = useState(true);
  const { colors } = useThemeStore();
  const router = useRouter();

  const [profiles, setProfiles] = useState(workspaceProfiles);
  const [activeRole, setActiveRole] = useState<SupportedRole>('agent');
  const userProfile = profiles[activeRole];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  useEffect(() => {
    setEditedProfile(userProfile);
  }, [userProfile]);

  const handleSaveProfile = () => {
    setProfiles((prev) => {
      const nextRole = editedProfile.role as SupportedRole;
      const updated = { ...prev, [nextRole]: editedProfile };
      return updated;
    });
    if (editedProfile.role !== activeRole) {
      setActiveRole(editedProfile.role as SupportedRole);
    }
    setIsEditingProfile(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(false);
  };

  const roleOptions = useMemo(
    () => Object.keys(profiles) as SupportedRole[],
    [profiles]
  );

  const sections = useMemo<AccountSection[]>(
    () => [
      {
        id: 'pulse',
        title: 'Workspace Pulse',
        description:
          'Monitor momentum, pipeline strength, and the actions queued up next.',
        items: [
          {
            key: 'analytics',
            span: 'full',
            content: (
              <AnalyticsHighlights
                metrics={userProfile.analysis}
                colors={colors}
              />
            ),
          },
          {
            key: 'pipeline',
            span: 'half',
            content: (
              <PipelineCard items={userProfile.pipeline} colors={colors} />
            ),
          },
          {
            key: 'tasks',
            span: 'half',
            content: <TaskBoard tasks={userProfile.tasks} colors={colors} />,
          },
        ],
      },
      {
        id: 'identity',
        title: 'Identity & Profile',
        description:
          'Keep your personal details, workspace context, and role-specific signals polished.',
        items: [
          {
            key: 'personal',
            span: 'half',
            content: (
              <PersonalInfoCard
                userProfile={userProfile}
                colors={colors}
                onEditPress={() => setIsEditingProfile(true)}
              />
            ),
          },
          {
            key: 'account',
            span: 'half',
            content: (
              <AccountDetailsCard userProfile={userProfile} colors={colors} />
            ),
          },
          {
            key: 'role',
            span: 'full',
            content: (
              <RoleSpecificCard userProfile={userProfile} colors={colors} />
            ),
          },
        ],
      },
      {
        id: 'actions',
        title: 'Workflow Shortcuts',
        description:
          'Dive straight into the routines and tools that keep your journey moving.',
        items: [
          {
            key: 'actions',
            span: 'full',
            content: <ActionsCard userProfile={userProfile} colors={colors} />,
          },
        ],
      },
    ],
    [colors, userProfile]
  );

  if (!isLoggedIn) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <LoginView
          onLoginPress={() => router.push('/auth/login')}
          colors={colors}
        />
      </View>
    );
  }

  const activeWorkspace = workspaceCopy[activeRole];
  const heroHighlights = activeWorkspace.heroHighlights(userProfile);

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
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard
          style={[styles.heroCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.heroHeader}>
            <View
              style={[
                styles.heroIcon,
                { backgroundColor: colors.primary + '1f' },
              ]}
            >
              <MaterialCommunityIcons
                name={activeWorkspace.icon as any}
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.heroTextBlock}>
              <Text
                variant="titleSmall"
                style={{ color: colors.textSecondary }}
              >
                {activeWorkspace.title}
              </Text>
              <Text
                variant="headlineSmall"
                style={{ color: colors.text, marginTop: 4 }}
              >
                Welcome back, {userProfile.firstName}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  color: colors.textSecondary,
                  marginTop: 6,
                  lineHeight: 20,
                }}
              >
                {activeWorkspace.description}
              </Text>
            </View>
          </View>

          <SegmentedButtons
            value={activeRole}
            onValueChange={(value) => setActiveRole(value as SupportedRole)}
            buttons={roleOptions.map((role) => ({
              value: role,
              label: workspaceCopy[role].label,
              icon: workspaceCopy[role].icon,
            }))}
            style={styles.roleSwitcher}
          />

          <View style={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <Chip
                key={item.icon + item.text}
                icon={item.icon as any}
                style={{ backgroundColor: colors.surfaceVariant }}
                textStyle={{ color: colors.text }}
              >
                {item.text}
              </Chip>
            ))}
          </View>
        </GlassCard>

        <ProfileHeader
          userProfile={userProfile}
          colors={colors}
          onEditPress={() => setIsEditingProfile(true)}
        />

        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={{ color: colors.text }}>
                {section.title}
              </Text>
              {section.description ? (
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary, marginTop: 4 }}
                >
                  {section.description}
                </Text>
              ) : null}
            </View>
            <View style={styles.sectionGrid}>
              {section.items.map((item) => (
                <View
                  key={item.key}
                  style={
                    item.span === 'full'
                      ? styles.fullCardSlot
                      : styles.halfCardSlot
                  }
                >
                  {item.content}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <EditProfileModal
        visible={isEditingProfile}
        editedProfile={editedProfile}
        colors={colors}
        onSave={handleSaveProfile}
        onCancel={handleCancelEdit}
        onProfileChange={setEditedProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 24,
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
  heroCard: {
    paddingBottom: 16,
    gap: 16,
  },
  heroHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextBlock: {
    flex: 1,
  },
  roleSwitcher: {
    alignSelf: 'flex-start',
  },
  heroHighlights: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  fullCardSlot: {
    width: '100%',
  },
  halfCardSlot: {
    flexGrow: 1,
    flexBasis: '48%',
    minWidth: 320,
  },
});
