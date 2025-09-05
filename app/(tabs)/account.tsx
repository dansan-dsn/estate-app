import React, { useState, Fragment } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, ScrollView, Alert } from "react-native";
import LoginView from "@/components/blocks/more/LoginView";
import { useThemeStore } from "@/stores/useTheme";
import { UserProfile } from "@/shared/interfaces/user";
import { ProfileHeader } from "@/components/blocks/account/ProfileHeader";
import { PersonalInfoCard } from "@/components/blocks/account/PersonalInfoCard";
import { AccountDetailsCard } from "@/components/blocks/account/AccountDetailsCard";
import { RoleSpecificCard } from "@/components/blocks/account/RoleSpecificCard";
import { ActionsCard } from "@/components/blocks/account/ActionCard";
import { EditProfileModal } from "@/components/blocks/account/EditProfileModal";

export default function Account() {
  const [isLoggedIn] = useState(true);
  const { colors } = useThemeStore();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Taylor",
    lastName: "Smith",
    email: "taylor.smith@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Looking for the perfect home in the city. Interested in modern apartments with good amenities.",
    role: "agent",
    memberSince: "June 2023",
    currentProperty: "Sunrise Apartments #304",
    leaseEndDate: "June 30, 2024",
    monthlyRent: "$1,200",
    emergencyContact: "John Smith - (555) 987-6543",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditingProfile(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(false);
  };

  const handleEditPress = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(true);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {!isLoggedIn ? (
        <LoginView
          onLoginPress={() => {
            router.push("/auth/login");
          }}
          colors={colors}
        />
      ) : (
        <Fragment>
          <ProfileHeader
            userProfile={userProfile}
            colors={colors}
            onEditPress={handleEditPress}
          />

          <PersonalInfoCard
            userProfile={userProfile}
            colors={colors}
            onEditPress={handleEditPress}
          />

          <AccountDetailsCard userProfile={userProfile} colors={colors} />

          <RoleSpecificCard userProfile={userProfile} colors={colors} />

          <ActionsCard userProfile={userProfile} colors={colors} />

          <EditProfileModal
            visible={isEditingProfile}
            editedProfile={editedProfile}
            colors={colors}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
            onProfileChange={setEditedProfile}
          />
        </Fragment>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
