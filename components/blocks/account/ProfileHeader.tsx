import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, Text, Chip } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserProfile } from '@/shared/interfaces/user';
import GlassCard from '@/components/ui/GlassCard';

interface ProfileHeaderProps {
  userProfile: UserProfile;
  colors: any;
  onEditPress: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  colors,
  onEditPress,
}) => {
  const getInitials = () => {
    return `${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const getFullName = () => {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  };

  const roleBadgeMap: Record<
    UserProfile['role'],
    { label: string; icon: string; tone: string }
  > = {
    agent: {
      label: 'Certified Agent',
      icon: 'account-tie',
      tone: colors.success,
    },
    tenant: {
      label: 'Verified Tenant',
      icon: 'account-key',
      tone: colors.info,
    },
    broker: {
      label: 'Broker Partner',
      icon: 'account-group',
      tone: colors.secondary,
    },
  };

  const roleBadge = roleBadgeMap[userProfile.role];

  return (
    <GlassCard style={styles.header}>
      <View style={styles.avatarRow}>
        <View>
          <Avatar.Text
            size={82}
            label={getInitials()}
            style={[styles.avatar, { backgroundColor: colors.primary }]}
            color={colors.white}
          />
          <Button
            mode="text"
            icon="camera"
            textColor={colors.primary}
            style={styles.changePhotoButton}
            onPress={() => Alert.alert('Feature', 'Photo upload coming soon!')}
          >
            Update photo
          </Button>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.nameRow}>
            <Text variant="headlineSmall" style={{ color: colors.text }}>
              {getFullName()}
            </Text>
            <Chip
              style={{
                backgroundColor: roleBadge.tone + '1f',
                borderColor: roleBadge.tone,
                borderWidth: 1,
                marginLeft: 12,
              }}
              textStyle={{
                color: roleBadge.tone,
                fontWeight: '600',
              }}
              icon={roleBadge.icon as any}
            >
              {roleBadge.label}
            </Chip>
          </View>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={{ color: colors.textSecondary, marginLeft: 6 }}>
              {userProfile.email}
            </Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialIcons
              name="phone"
              size={18}
              color={colors.textSecondary}
            />
            <Text style={{ color: colors.textSecondary, marginLeft: 6 }}>
              {userProfile.phone}
            </Text>
          </View>

          <View style={styles.badgeRow}>
            {userProfile.status && (
              <Chip
                icon="shield-check"
                style={{ backgroundColor: colors.success + '1a' }}
                textStyle={{ color: colors.success, fontWeight: '600' }}
              >
                {userProfile.status.toUpperCase()}
              </Chip>
            )}
            {userProfile.tier && (
              <Chip
                icon="crown"
                style={{ backgroundColor: colors.secondary + '1a' }}
                textStyle={{ color: colors.secondary, fontWeight: '600' }}
              >
                {userProfile.tier}
              </Chip>
            )}
            {userProfile.notificationChannels && (
              <Chip
                icon="bell"
                style={{ backgroundColor: colors.info + '1a' }}
                textStyle={{ color: colors.info, fontWeight: '600' }}
              >
                {userProfile.notificationChannels.join(' • ')}
              </Chip>
            )}
          </View>
        </View>
      </View>

      <View style={styles.metaGrid}>
        {userProfile.language && (
          <View style={styles.metaItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Preferred language
            </Text>
            <Text variant="titleSmall" style={{ color: colors.text }}>
              {userProfile.language}
            </Text>
          </View>
        )}
        {userProfile.timezone && (
          <View style={styles.metaItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Timezone
            </Text>
            <Text variant="titleSmall" style={{ color: colors.text }}>
              {userProfile.timezone}
            </Text>
          </View>
        )}
        {userProfile.preferredCurrency && (
          <View style={styles.metaItem}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              Currency
            </Text>
            <Text variant="titleSmall" style={{ color: colors.text }}>
              {userProfile.preferredCurrency}
            </Text>
          </View>
        )}
        <View style={styles.metaItem}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            Member since
          </Text>
          <Text variant="titleSmall" style={{ color: colors.text }}>
            {userProfile.memberSince}
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        icon="account-edit"
        style={[styles.editButton, { backgroundColor: colors.primary }]}
        textColor={colors.white}
        onPress={onEditPress}
      >
        Personalize workspace
      </Button>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
  },
  changePhotoButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  editButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 18,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 20,
  },
  metaContainer: {
    flex: 1,
    gap: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
  },
  metaItem: {
    minWidth: 120,
    gap: 4,
  },
});
