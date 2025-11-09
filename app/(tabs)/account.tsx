import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

import LoginView from '@/components/blocks/more/LoginView';
import {
  AccountHero,
  RoleMeta,
  RoleOption,
} from '@/components/account/AccountHero';
import { AccountSection } from '@/components/account/AccountSection';
import { IdentityCard } from '@/components/account/IdentityCard';
import { MetricsGrid } from '@/components/account/MetricsGrid';
import { PipelineProgress } from '@/components/account/PipelineProgress';
import { TasksList } from '@/components/account/TasksList';
import {
  QuickActionsPanel,
  QuickAction,
} from '@/components/account/QuickActions';
import { ShortcutChips } from '@/components/account/ShortcutChips';
import { useThemeStore } from '@/stores/useTheme';
import { userData } from '@/shared/data/user';
import { UserProfile, UserTaskItem } from '@/shared/interfaces/user';

type SupportedRole = UserProfile['role'];

const roleContent: Record<SupportedRole, RoleMeta> = {
  agent: {
    label: 'Agent Workspace',
    heroTitle: 'Agency Command Center',
    description:
      'Monitor listings, nurture relationships, and keep your close rate trending upward.',
    icon: 'account-tie',
    highlights: (profile) => [
      `${profile.activeListings ?? 0} active listings`,
      `${profile.clients ?? 0} engaged clients`,
      profile.closingRate
        ? `Closing rate ${profile.closingRate}`
        : 'Add your closing rate',
    ],
  },
  tenant: {
    label: 'Tenant Hub',
    heroTitle: 'Resident Living Hub',
    description:
      'Stay ahead of rent, requests, and renewal planning from one calm dashboard.',
    icon: 'home-account',
    highlights: (profile) => [
      profile.tenantPaymentStatus ?? 'Track payment status',
      profile.leaseEndDate ? `Lease ends ${profile.leaseEndDate}` : 'Add lease',
      typeof profile.tenantScore === 'number'
        ? `Resident score ${profile.tenantScore}`
        : 'Track resident score',
    ],
  },
};

const quickActionsMap: Record<SupportedRole, QuickAction[]> = {
  agent: [
    {
      label: 'Add listing',
      icon: 'home-plus',
      mode: 'contained',
      intent: 'primary',
    },
    {
      label: 'Share market insight',
      icon: 'chart-line',
      mode: 'outlined',
      intent: 'info',
    },
    {
      label: 'Invite client',
      icon: 'account-plus',
      mode: 'outlined',
      intent: 'secondary',
    },
  ],
  tenant: [
    {
      label: 'Pay rent',
      icon: 'credit-card-check',
      mode: 'contained',
      intent: 'primary',
    },
    {
      label: 'Schedule maintenance',
      icon: 'tools',
      mode: 'outlined',
      intent: 'info',
    },
    {
      label: 'Renew lease',
      icon: 'file-sign',
      mode: 'outlined',
      intent: 'secondary',
    },
  ],
};

const taskTypeIcons: Partial<Record<UserTaskItem['type'], string>> = {
  call: 'phone',
  meeting: 'calendar-account',
  document: 'file-document-edit',
  payment: 'credit-card-check-outline',
  inspection: 'clipboard-text-search',
  other: 'checkbox-marked-circle',
};

export default function Account() {
  const { colors } = useThemeStore();
  const router = useRouter();

  const profilesByRole = useMemo(() => {
    return userData.reduce(
      (acc, profile) => ({ ...acc, [profile.role]: profile }),
      {} as Record<SupportedRole, UserProfile>
    );
  }, []);

  const availableRoles = Object.keys(profilesByRole) as SupportedRole[];
  const [sessionRole, setSessionRole] = useState<SupportedRole | null>(
    availableRoles[0] ?? null
  );

  const isLoggedIn = Boolean(sessionRole && profilesByRole[sessionRole]);
  const activeProfile =
    sessionRole && profilesByRole[sessionRole]
      ? profilesByRole[sessionRole]
      : null;

  const handleLogin = (role?: SupportedRole) => {
    setSessionRole(role ?? availableRoles[0] ?? null);
  };

  const handleLogout = () => {
    setSessionRole(null);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <LoginView
        colors={colors}
        onLoginPress={() => handleLogin(availableRoles[0])}
      />
    </View>
  );

  const parsePercent = (value?: string) => {
    if (!value) return 0;
    const numeric = Number(value.replace(/[^\d.]/g, ''));
    if (Number.isNaN(numeric)) return 0;
    return Math.min(Math.max(numeric / 100, 0), 1);
  };

  if (!isLoggedIn || !activeProfile) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Appbar.Header style={{ backgroundColor: colors.headerBackground }}>
          <Appbar.Content
            title="Account"
            titleStyle={styles.headerTitle}
            color={colors.headerText}
          />
        </Appbar.Header>
        {renderEmptyState()}
      </View>
    );
  }

  const roleMeta = roleContent[activeProfile.role];
  const quickActions = quickActionsMap[activeProfile.role];
  const roleOptions: RoleOption[] = availableRoles.map((role) => ({
    value: role,
    label: roleContent[role].label,
    icon: roleContent[role].icon,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.headerBackground }}>
        <Appbar.Content
          title="Account"
          titleStyle={styles.headerTitle}
          color={colors.headerText}
        />
        <Appbar.Action
          icon="cog-outline"
          color={colors.headerTint}
          onPress={() => router.push('/(tabs)/settings')}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AccountHero
          profile={activeProfile}
          colors={colors}
          roleMeta={roleMeta}
          roleOptions={roleOptions}
          activeRole={activeProfile.role}
          onRoleChange={(value) => handleLogin(value)}
        />

        <AccountSection
          title="Identity & Contact"
          description="Personal details and preferences"
          colors={colors}
        >
          <IdentityCard
            profile={activeProfile}
            colors={colors}
            roleLabel={roleMeta.label}
          />
        </AccountSection>

        {activeProfile.analysis && activeProfile.analysis.length > 0 && (
          <AccountSection
            title="Performance Pulse"
            description="Live metrics tailored to your workspace."
            colors={colors}
          >
            <MetricsGrid metrics={activeProfile.analysis} colors={colors} />
          </AccountSection>
        )}

        {activeProfile.pipeline && activeProfile.pipeline.length > 0 && (
          <AccountSection
            title="Pipeline & Progress"
            description="Track stage health at a glance."
            colors={colors}
          >
            <PipelineProgress
              items={activeProfile.pipeline}
              colors={colors}
              parsePercent={parsePercent}
            />
          </AccountSection>
        )}

        {activeProfile.tasks && activeProfile.tasks.length > 0 && (
          <AccountSection
            title="Tasks & Reminders"
            description="Stay proactive with upcoming work."
            colors={colors}
          >
            <TasksList
              tasks={activeProfile.tasks}
              colors={colors}
              taskTypeIcons={taskTypeIcons}
            />
          </AccountSection>
        )}

        <AccountSection
          title="Quick Actions"
          description="Jump directly into your most common workflows."
          colors={colors}
        >
          <QuickActionsPanel
            actions={quickActions}
            colors={colors}
            onEditProfile={() => router.push('/auth/change-password')}
            onLogout={handleLogout}
          />
        </AccountSection>

        {activeProfile.quickLinks && activeProfile.quickLinks.length > 0 && (
          <AccountSection
            title="Shortcuts"
            description="Keep your essential entry points within reach."
            colors={colors}
          >
            <ShortcutChips
              shortcuts={activeProfile.quickLinks}
              colors={colors}
            />
          </AccountSection>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
    gap: 20,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
