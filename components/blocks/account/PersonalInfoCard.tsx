import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";
import { UserProfile } from "@/shared/interfaces/user";

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
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: colors.text }]}
          >
            Personal Information
          </Text>
          <Button
            mode="text"
            icon="pencil"
            textColor={colors.primary}
            onPress={onEditPress}
          >
            Edit
          </Button>
        </View>

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Full Name:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.firstName} {userProfile.lastName}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardRow}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            Phone:
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.text }}>
            {userProfile.phone}
          </Text>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.cardColumn}>
          <Text
            variant="bodyMedium"
            style={{ color: colors.textSecondary, marginBottom: 4 }}
          >
            Bio:
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: colors.text, lineHeight: 20 }}
          >
            {userProfile.bio || "No bio added yet."}
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
