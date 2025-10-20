import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserProfile } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface RoleSpecificCardProps {
  userProfile: UserProfile;
  colors: any;
}

export const RoleSpecificCard: React.FC<RoleSpecificCardProps> = ({
  userProfile,
  colors,
}) => {
  if (userProfile.role === 'agent') {
    return (
      <GlassCard style={styles.card}>
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Agent Workspace
        </Text>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="identifier"
            size={20}
            color={colors.primary}
          />
          <Text style={{ color: colors.text }}>
            {userProfile.agentId || 'ID pending'}
          </Text>
        </View>
        <Divider style={styles.divider} />

        {userProfile.companyName && (
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="office-building"
              size={20}
              color={colors.primary}
            />
            <Text style={{ color: colors.text }}>
              {userProfile.companyName}
            </Text>
          </View>
        )}

        {userProfile.licenseNumber && (
          <View style={styles.row}>
            <MaterialIcons
              name="workspace-premium"
              size={20}
              color={colors.primary}
            />
            <Text style={{ color: colors.text }}>
              License {userProfile.licenseNumber}
            </Text>
          </View>
        )}

        <Divider style={[styles.divider, { marginVertical: 12 }]} />

        <View style={styles.metricGrid}>
          <View style={styles.metricItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Active listings
            </Text>
            <Text variant="titleLarge" style={{ color: colors.text }}>
              {userProfile.activeListings ?? 0}
            </Text>
          </View>
          <View style={styles.metricItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Active clients
            </Text>
            <Text variant="titleLarge" style={{ color: colors.text }}>
              {userProfile.clients ?? 0}
            </Text>
          </View>
          {userProfile.rating && (
            <View style={styles.metricItem}>
              <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                Rating
              </Text>
              <View style={styles.ratingRow}>
                <Text variant="titleLarge" style={{ color: colors.text }}>
                  {userProfile.rating.toFixed(1)}
                </Text>
                <MaterialCommunityIcons
                  name="star"
                  size={18}
                  color={colors.secondary}
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.chipRow}>
          {userProfile.closingRate && (
            <Chip
              icon="chart-line"
              style={{ backgroundColor: colors.success + '1a' }}
              textStyle={{ color: colors.success }}
            >
              Closing rate {userProfile.closingRate}
            </Chip>
          )}
          {userProfile.avgResponseTime && (
            <Chip
              icon="clock-outline"
              style={{ backgroundColor: colors.info + '1a' }}
              textStyle={{ color: colors.info }}
            >
              Response {userProfile.avgResponseTime}
            </Chip>
          )}
          {userProfile.avgDaysOnMarket && (
            <Chip
              icon="calendar-clock"
              style={{ backgroundColor: colors.warning + '1a' }}
              textStyle={{ color: colors.warning }}
            >
              {userProfile.avgDaysOnMarket} days on market
            </Chip>
          )}
        </View>

        {(userProfile.specialties?.length ||
          userProfile.territories?.length) && (
          <>
            <Divider style={[styles.divider, { marginVertical: 12 }]} />
            {userProfile.specialties && userProfile.specialties.length > 0 && (
              <View style={styles.supportRow}>
                <MaterialCommunityIcons
                  name="target-account"
                  size={18}
                  color={colors.primary}
                />
                <Text
                  style={[styles.supportText, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {userProfile.specialties.join(' • ')}
                </Text>
              </View>
            )}
            {userProfile.territories && userProfile.territories.length > 0 && (
              <View style={styles.supportRow}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={18}
                  color={colors.primary}
                />
                <Text
                  style={[styles.supportText, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {userProfile.territories.join(' • ')}
                </Text>
              </View>
            )}
          </>
        )}
      </GlassCard>
    );
  }

  return (
    <GlassCard style={styles.card}>
      <Text
        variant="titleMedium"
        style={[styles.sectionTitle, { color: colors.text }]}
      >
        Tenant Profile
      </Text>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="home-city"
          size={20}
          color={colors.primary}
        />
        <Text style={{ color: colors.text }}>
          {userProfile.currentProperty || 'No active lease'}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="calendar-end"
          size={20}
          color={colors.primary}
        />
        <Text style={{ color: colors.text }}>
          Lease ends {userProfile.leaseEndDate || '—'}
        </Text>
      </View>

      <Divider style={[styles.divider, { marginVertical: 12 }]} />

      <View style={styles.metricGrid}>
        <View style={styles.metricItem}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            Monthly rent
          </Text>
          <Text variant="titleLarge" style={{ color: colors.text }}>
            {userProfile.monthlyRent || 'N/A'}
          </Text>
        </View>
        {typeof userProfile.tenantScore === 'number' && (
          <View style={styles.metricItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Resident score
            </Text>
            <Text variant="titleLarge" style={{ color: colors.success }}>
              {userProfile.tenantScore}
            </Text>
          </View>
        )}
        {userProfile.roommates && (
          <View style={styles.metricItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Roommates
            </Text>
            <Text variant="titleLarge" style={{ color: colors.text }}>
              {userProfile.roommates}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.chipRow}>
        {userProfile.tenantPaymentStatus && (
          <Chip
            icon="calendar-check"
            style={{ backgroundColor: colors.success + '1a' }}
            textStyle={{ color: colors.success }}
          >
            {userProfile.tenantPaymentStatus}
          </Chip>
        )}
        {userProfile.emergencyContact && (
          <Chip
            icon="account-heart"
            style={{ backgroundColor: colors.info + '1a' }}
            textStyle={{ color: colors.info }}
          >
            Emergency: {userProfile.emergencyContact}
          </Chip>
        )}
      </View>

      <Divider style={[styles.divider, { marginVertical: 12 }]} />

      {userProfile.moveInDate && (
        <View style={styles.supportRow}>
          <MaterialCommunityIcons
            name="calendar-start"
            size={18}
            color={colors.primary}
          />
          <Text style={[styles.supportText, { color: colors.text }]}>
            Move-in {userProfile.moveInDate}
          </Text>
        </View>
      )}

      {typeof userProfile.roommates === 'number' && (
        <View style={styles.supportRow}>
          <MaterialCommunityIcons
            name="account-multiple"
            size={18}
            color={colors.info}
          />
          <Text style={[styles.supportText, { color: colors.text }]}>
            {userProfile.roommates} roommate
            {userProfile.roommates === 1 ? '' : 's'}
          </Text>
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
    gap: 12,
    paddingVertical: 6,
  },
  divider: {
    marginVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    marginBottom: 12,
  },
  metricItem: {
    minWidth: 110,
    gap: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  supportText: {
    flex: 1,
  },
});
