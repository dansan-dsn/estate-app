import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';

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

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <Text
          variant="titleMedium"
          style={[styles.sectionTitle, { color: colors.text }]}
        >
          Actions
        </Text>

        {userProfile.role === 'agent' ? (
          <>
            <Button
              mode="contained"
              icon="plus"
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              textColor={colors.white}
              onPress={() =>
                Alert.alert('Feature', 'Add listing feature coming soon!')
              }
            >
              Add New Listing
            </Button>
            <Button
              mode="outlined"
              icon="chart-bar"
              style={[styles.actionButton, { borderColor: colors.primary }]}
              textColor={colors.primary}
              onPress={() =>
                Alert.alert('Feature', 'Dashboard feature coming soon!')
              }
            >
              View Dashboard
            </Button>
            <Button
              mode="outlined"
              icon="account-group"
              style={[styles.actionButton, { borderColor: colors.info }]}
              textColor={colors.info}
              onPress={() =>
                Alert.alert('Feature', 'Client management feature coming soon!')
              }
            >
              Manage Clients
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="contained"
              icon="home-search"
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              textColor={colors.white}
              onPress={() =>
                Alert.alert('Feature', 'Property search feature coming soon!')
              }
            >
              Search Properties
            </Button>
            <Button
              mode="outlined"
              icon="heart"
              style={[styles.actionButton, { borderColor: colors.secondary }]}
              textColor={colors.secondary}
              onPress={() =>
                Alert.alert('Feature', 'Favorites feature coming soon!')
              }
            >
              My Favorites
            </Button>
            <Button
              mode="outlined"
              icon="file-document"
              style={[styles.actionButton, { borderColor: colors.info }]}
              textColor={colors.info}
              onPress={() =>
                Alert.alert('Feature', 'Applications feature coming soon!')
              }
            >
              My Applications
            </Button>
          </>
        )}

        <Divider style={[styles.divider, { marginVertical: 16 }]} />

        <Button
          mode="outlined"
          icon="cog"
          style={[styles.actionButton, { borderColor: colors.textSecondary }]}
          textColor={colors.textSecondary}
          onPress={() =>
            Alert.alert('Feature', 'Settings feature coming soon!')
          }
        >
          Settings
        </Button>

        <Button
          mode="contained-tonal"
          icon="logout"
          style={[styles.actionButton, { backgroundColor: colors.warning }]}
          textColor={colors.white}
          onPress={handleSignOut}
        >
          Sign Out
        </Button>

        <Button
          mode="outlined"
          icon="delete"
          style={[styles.actionButton, { borderColor: colors.error }]}
          textColor={colors.error}
          onPress={handleDeleteAccount}
        >
          Delete Account
        </Button>
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
  sectionTitle: {
    marginBottom: 12,
  },
  actionButton: {
    marginVertical: 6,
    borderRadius: 4,
  },
  divider: {
    marginVertical: 4,
  },
});
