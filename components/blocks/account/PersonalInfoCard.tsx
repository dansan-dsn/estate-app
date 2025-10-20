import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Divider, Chip } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserProfile } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface PersonalInfoCardProps {
  userProfile: UserProfile;
  colors: any;
  onEditPress: () => void;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  userProfile,
  colors,
  onEditPress,
}) => {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.cardHeader}>
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Personal Information
        </Text>
        <Button
          mode="text"
          icon="account-edit"
          textColor={colors.primary}
          onPress={onEditPress}
        >
          Update
        </Button>
      </View>

      <View style={styles.cardRow}>
        <MaterialCommunityIcons
          name="card-account-details"
          size={18}
          color={colors.primary}
        />
        <Text variant="bodyMedium" style={{ color: colors.text }}>
          {userProfile.firstName} {userProfile.lastName}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.cardRow}>
        <MaterialIcons name="phone" size={18} color={colors.primary} />
        <Text variant="bodyMedium" style={{ color: colors.text }}>
          {userProfile.phone}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.cardColumn}>
        <Text
          variant="bodySmall"
          style={{ color: colors.textSecondary, marginBottom: 4 }}
        >
          Bio
        </Text>
        <Text
          variant="bodyMedium"
          style={{ color: colors.text, lineHeight: 20 }}
        >
          {userProfile.bio || 'No bio added yet.'}
        </Text>
      </View>

      {(userProfile.specialties || userProfile.territories) && (
        <View style={styles.skillSection}>
          {userProfile.specialties && userProfile.specialties.length > 0 && (
            <View style={styles.chipGroup}>
              <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                Specialties
              </Text>
              <View style={styles.chipRow}>
                {userProfile.specialties.map((specialty) => (
                  <Chip
                    key={specialty}
                    style={{ backgroundColor: colors.primary + '12' }}
                    textStyle={{ color: colors.primary }}
                    compact
                  >
                    {specialty}
                  </Chip>
                ))}
              </View>
            </View>
          )}

          {userProfile.territories && userProfile.territories.length > 0 && (
            <View style={styles.chipGroup}>
              <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                Territories
              </Text>
              <View style={styles.chipRow}>
                {userProfile.territories.map((territory) => (
                  <Chip
                    key={territory}
                    style={{ backgroundColor: colors.secondary + '12' }}
                    textStyle={{ color: colors.secondary }}
                    compact
                  >
                    {territory}
                  </Chip>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  cardColumn: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  skillSection: {
    marginTop: 8,
    gap: 12,
  },
  chipGroup: {
    gap: 6,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
