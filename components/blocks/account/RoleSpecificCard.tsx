import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider, Icon } from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';

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
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Agent Information
          </Text>

          {userProfile.agentId && (
            <>
              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Agent ID:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.agentId}
                </Text>
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          {userProfile.companyName && (
            <>
              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Company:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.companyName}
                </Text>
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          {userProfile.licenseNumber && (
            <>
              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  License:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.licenseNumber}
                </Text>
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          <View style={styles.cardRow}>
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              Active Listings:
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.text }}>
              {userProfile.activeListings || 0}
            </Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.cardRow}>
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              Clients:
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.text }}>
              {userProfile.clients || 0}
            </Text>
          </View>

          {userProfile.rating && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Rating:
                </Text>
                <View style={styles.ratingContainer}>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    {userProfile.rating}
                  </Text>
                  <Icon source="star" size={16} color={colors.secondary} />
                </View>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    );
  }

  // Tenant card
  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Tenant Information
        </Text>

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Current Property:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.currentProperty || 'Not specified'}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Lease End:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.leaseEndDate || 'N/A'}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Monthly Rent:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.monthlyRent || 'N/A'}
          </Text>
        </View>

        {userProfile.emergencyContact && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.cardRow}>
              <Text
                variant="bodyMedium"
                style={{ color: colors.textSecondary }}
              >
                Emergency Contact:
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.text }}>
                {userProfile.emergencyContact}
              </Text>
            </View>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
