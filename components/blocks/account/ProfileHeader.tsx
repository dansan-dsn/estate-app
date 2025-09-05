import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, Text, Chip } from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';

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
    return `${userProfile.firstName} ${userProfile.lastName} (${
      userProfile.role === 'agent' ? 'Agent' : 'Tenant'
    })`;
  };

  return (
    <View style={[styles.header, { backgroundColor: colors.surfaceVariant }]}>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={80}
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
          Change Photo
        </Button>
      </View>

      <Text
        variant="titleLarge"
        style={[styles.username, { color: colors.text }]}
      >
        {getFullName()}
      </Text>

      <Text
        variant="bodyMedium"
        style={[styles.email, { color: colors.textSecondary }]}
      >
        {userProfile.email}
      </Text>

      <Chip
        mode="outlined"
        style={[
          styles.roleChip,
          {
            backgroundColor: colors.chipBackground,
            borderColor:
              userProfile.role === 'agent' ? colors.success : colors.info,
          },
        ]}
        textStyle={{
          color: userProfile.role === 'agent' ? colors.success : colors.info,
          fontWeight: 'bold',
        }}
        icon={userProfile.role === 'agent' ? 'check-decagram' : 'home-account'}
      >
        {userProfile.role === 'agent' ? 'Verified Agent' : 'Active Tenant'}
      </Chip>

      <Button
        mode="outlined"
        icon="account-edit"
        style={[styles.editButton, { borderColor: colors.primary }]}
        textColor={colors.primary}
        onPress={onEditPress}
      >
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    borderRadius: 12,
    marginTop: 60,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    marginBottom: 8,
  },
  changePhotoButton: {
    marginTop: 4,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    marginBottom: 8,
    textAlign: 'center',
  },
  roleChip: {
    marginTop: 8,
    marginBottom: 12,
  },
  editButton: {
    marginTop: 8,
  },
});
