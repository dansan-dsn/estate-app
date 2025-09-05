import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';

interface AccountDetailsCardProps {
  userProfile: UserProfile;
  colors: any;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  userProfile,
  colors,
}) => {
  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Account Details
        </Text>

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Status:
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.statusActive, { color: colors.success }]}
          >
            Active
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Member Since:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.memberSince}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Account Type:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.role === 'agent' ? 'Real Estate Agent' : 'Tenant'}
          </Text>
        </View>
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
  statusActive: {
    fontWeight: 'bold',
  },
});
