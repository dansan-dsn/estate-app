import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, Button, Divider, Chip } from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface ActionsCardProps {
  userProfile: UserProfile;
  colors: any;
}

export const ActionsCard: React.FC<ActionsCardProps> = ({
  userProfile,
  colors,
}) => {
  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', onPress: () => console.log('Sign out') },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Delete account'),
        },
      ]
    );
  };

  const actionSets: Record<
    UserProfile['role'],
    {
      icon: string;
      label: string;
      mode: 'contained' | 'outlined';
      color: string;
      onPress: () => void;
    }[]
  > = {
    agent: [
      {
        icon: 'home-plus',
        label: 'Create listing',
        mode: 'contained',
        color: colors.primary,
        onPress: () =>
          Alert.alert('Feature', 'Add listing feature coming soon!'),
      },
      {
        icon: 'chart-line',
        label: 'Analytics dashboard',
        mode: 'outlined',
        color: colors.primary,
        onPress: () => Alert.alert('Feature', 'Dashboard feature coming soon!'),
      },
      {
        icon: 'account-group',
        label: 'Manage clients',
        mode: 'outlined',
        color: colors.info,
        onPress: () =>
          Alert.alert('Feature', 'Client management feature coming soon!'),
      },
    ],
    tenant: [
      {
        icon: 'home-search',
        label: 'Explore residences',
        mode: 'contained',
        color: colors.primary,
        onPress: () =>
          Alert.alert('Feature', 'Property search feature coming soon!'),
      },
      {
        icon: 'heart',
        label: 'View favorites',
        mode: 'outlined',
        color: colors.secondary,
        onPress: () => Alert.alert('Feature', 'Favorites feature coming soon!'),
      },
      {
        icon: 'file-document-outline',
        label: 'Rental applications',
        mode: 'outlined',
        color: colors.info,
        onPress: () =>
          Alert.alert('Feature', 'Applications feature coming soon!'),
      },
    ],
  };

  return (
    <GlassCard style={styles.card}>
      <Text
        variant="titleMedium"
        style={[styles.sectionTitle, { color: colors.text }]}
      >
        Quick Actions
      </Text>

      {actionSets[userProfile.role].map((action) => (
        <Button
          key={action.label}
          mode={action.mode}
          icon={action.icon as any}
          style={[
            styles.actionButton,
            action.mode === 'contained'
              ? { backgroundColor: action.color }
              : { borderColor: action.color },
          ]}
          textColor={action.mode === 'contained' ? colors.white : action.color}
          onPress={action.onPress}
        >
          {action.label}
        </Button>
      ))}

      {userProfile.quickLinks && userProfile.quickLinks.length > 0 && (
        <View style={styles.quickLinksSection}>
          <Divider style={[styles.divider, { marginBottom: 12 }]} />
          <Text
            variant="bodySmall"
            style={{ color: colors.textSecondary, marginBottom: 8 }}
          >
            Workflows
          </Text>
          <View style={styles.quickLinkRow}>
            {userProfile.quickLinks.map((link) => (
              <Chip
                key={link.label}
                icon={link.icon as any}
                style={{ backgroundColor: colors.surfaceVariant }}
                textStyle={{ color: colors.text }}
                onPress={() =>
                  Alert.alert(
                    'Navigation',
                    `${link.label} will open once APIs are wired.`
                  )
                }
              >
                {link.label}
              </Chip>
            ))}
          </View>
        </View>
      )}

      <Divider style={[styles.divider, { marginVertical: 16 }]} />

      <Button
        mode="outlined"
        icon="cog"
        style={[styles.actionButton, { borderColor: colors.textSecondary }]}
        textColor={colors.textSecondary}
        onPress={() => Alert.alert('Feature', 'Settings feature coming soon!')}
      >
        Workspace settings
      </Button>

      <Button
        mode="contained-tonal"
        icon="logout"
        style={[styles.actionButton, { backgroundColor: colors.warning }]}
        textColor={colors.white}
        onPress={handleSignOut}
      >
        Sign out
      </Button>

      <Button
        mode="outlined"
        icon="delete"
        style={[styles.actionButton, { borderColor: colors.error }]}
        textColor={colors.error}
        onPress={handleDeleteAccount}
      >
        Delete account
      </Button>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  actionButton: {
    marginVertical: 6,
    borderRadius: 12,
  },
  divider: {
    marginVertical: 4,
  },
  quickLinksSection: {
    marginTop: 10,
  },
  quickLinkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
