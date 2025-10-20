import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserProfile } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface AccountDetailsCardProps {
  userProfile: UserProfile;
  colors: any;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  userProfile,
  colors,
}) => {
  const roleLabelMap: Record<UserProfile['role'], string> = {
    agent: 'Real Estate Agent',
    tenant: 'Tenant Resident',
    broker: 'Brokerage Partner',
  };

  return (
    <GlassCard style={styles.card}>
      <Text
        variant="titleMedium"
        style={[styles.sectionTitle, { color: colors.text }]}
      >
        Workspace Summary
      </Text>

      <View style={styles.row}>
        <MaterialCommunityIcons name="shield-check" size={20} color={colors.success} />
        <View style={styles.rowContent}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            Status
          </Text>
          <Text variant="titleSmall" style={{ color: colors.success }}>
            {(userProfile.status || 'active').toUpperCase()}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.row}>
        <MaterialCommunityIcons name="badge-account" size={20} color={colors.primary} />
        <View style={styles.rowContent}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            Account type
          </Text>
          <Text variant="titleSmall" style={{ color: colors.text }}>
            {roleLabelMap[userProfile.role]}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.row}>
        <MaterialIcons name="event" size={20} color={colors.primary} />
        <View style={styles.rowContent}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            Member since
          </Text>
          <Text variant="titleSmall" style={{ color: colors.text }}>
            {userProfile.memberSince}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      {(userProfile.avgResponseTime || userProfile.closingRate || userProfile.avgDaysOnMarket) && (
        <View>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginBottom: 8 }}>
            Engagement insights
          </Text>
          <View style={styles.insightRow}>
            {userProfile.avgResponseTime && (
              <Chip
                icon="clock-fast"
                style={{ backgroundColor: colors.info + '1a' }}
                textStyle={{ color: colors.info }}
              >
                {`Response: ${userProfile.avgResponseTime}`}
              </Chip>
            )}
            {userProfile.closingRate && (
              <Chip
                icon="chart-line"
                style={{ backgroundColor: colors.success + '1a' }}
                textStyle={{ color: colors.success }}
              >
                {`Closing: ${userProfile.closingRate}`}
              </Chip>
            )}
            {userProfile.avgDaysOnMarket && (
              <Chip
                icon="calendar-clock"
                style={{ backgroundColor: colors.warning + '1a' }}
                textStyle={{ color: colors.warning }}
              >
                {`Days on market: ${userProfile.avgDaysOnMarket}`}
              </Chip>
            )}
          </View>
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 6,
  },
  rowContent: {
    flex: 1,
  },
  divider: {
    marginVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  insightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
});
