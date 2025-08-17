import { useState, Fragment } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView, Alert, Modal } from "react-native";
import LoginView from "@/components/blocks/more/LoginView";
import {
  IconButton,
  Button,
  Text,
  Avatar,
  Card,
  Divider,
  Chip,
  Icon,
  TextInput,
} from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

// User profile interface
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  role: "agent" | "tenant";
  profileImage?: string;
  memberSince: string;
  // Agent specific fields
  agentId?: string;
  companyName?: string;
  licenseNumber?: string;
  activeListings?: number;
  clients?: number;
  rating?: number;
  // Tenant specific fields
  currentProperty?: string;
  leaseEndDate?: string;
  monthlyRent?: string;
  emergencyContact?: string;
}

export default function Account() {
  const [isLoggedIn] = useState(true);
  const { colors } = useThemeStore();
  const router = useRouter();

  // Sample user data - this would come from your user store/API in real app
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Taylor",
    lastName: "Smith",
    email: "taylor.smith@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Looking for the perfect home in the city. Interested in modern apartments with good amenities.",
    role: "agent",
    memberSince: "June 2023",
    // Tenant specific data
    currentProperty: "Sunrise Apartments #304",
    leaseEndDate: "June 30, 2024",
    monthlyRent: "$1,200",
    emergencyContact: "John Smith - (555) 987-6543",
  });

  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  // Helper functions
  const getInitials = () => {
    return `${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const getFullName = () => {
    return `${userProfile.firstName} ${userProfile.lastName} (${
      userProfile.role === "agent" ? "Agent" : "Tenant"
    })`;
  };

  // Handle profile save
  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditingProfile(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditingProfile(false);
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
          {/* Profile Header */}
          <View
            style={[styles.header, { backgroundColor: colors.surfaceVariant }]}
          >
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
                onPress={() =>
                  Alert.alert("Feature", "Photo upload coming soon!")
                }
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
                    userProfile.role === "agent" ? colors.success : colors.info,
                },
              ]}
              textStyle={{
                color:
                  userProfile.role === "agent" ? colors.success : colors.info,
                fontWeight: "bold",
              }}
              icon={
                userProfile.role === "agent" ? "check-decagram" : "home-account"
              }
            >
              {userProfile.role === "agent"
                ? "Verified Agent"
                : "Active Tenant"}
            </Chip>

            <Button
              mode="outlined"
              icon="account-edit"
              style={[styles.editButton, { borderColor: colors.primary }]}
              textColor={colors.primary}
              onPress={() => {
                setEditedProfile(userProfile);
                setIsEditingProfile(true);
              }}
            >
              Edit Profile
            </Button>
          </View>

          {/* Personal Information */}
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
                  onPress={() => {
                    setEditedProfile(userProfile);
                    setIsEditingProfile(true);
                  }}
                >
                  Edit
                </Button>
              </View>

              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Full Name:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.firstName} {userProfile.lastName}
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
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

          {/* Account Information */}
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: colors.text }]}
              >
                Account Details
              </Text>

              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
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
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Member Since:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.memberSince}
                </Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.cardRow}>
                <Text
                  variant="bodyMedium"
                  style={{ color: colors.textSecondary }}
                >
                  Account Type:
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.text }}>
                  {userProfile.role === "agent"
                    ? "Real Estate Agent"
                    : "Tenant"}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Role-Specific Information */}
          {userProfile.role === "agent" ? (
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
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Active Listings:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    {userProfile.activeListings || 0}
                  </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
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
                        <Text
                          variant="bodyMedium"
                          style={{ color: colors.text }}
                        >
                          {userProfile.rating}
                        </Text>
                        <Icon
                          source="star"
                          size={16}
                          color={colors.secondary}
                        />
                      </View>
                    </View>
                  </>
                )}
              </Card.Content>
            </Card>
          ) : (
            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={[styles.sectionTitle, { color: colors.text }]}
                >
                  Tenant Information
                </Text>

                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Current Property:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    {userProfile.currentProperty || "Not specified"}
                  </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Lease End:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    {userProfile.leaseEndDate || "N/A"}
                  </Text>
                </View>
                <Divider style={styles.divider} />

                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Monthly Rent:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    {userProfile.monthlyRent || "N/A"}
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
          )}

          {/* Actions Section */}
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: colors.text }]}
              >
                Actions
              </Text>

              {userProfile.role === "agent" ? (
                <>
                  <Button
                    mode="contained"
                    icon="plus"
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.primary },
                    ]}
                    textColor={colors.white}
                    onPress={() =>
                      Alert.alert("Feature", "Add listing feature coming soon!")
                    }
                  >
                    Add New Listing
                  </Button>
                  <Button
                    mode="outlined"
                    icon="chart-bar"
                    style={[
                      styles.actionButton,
                      { borderColor: colors.primary },
                    ]}
                    textColor={colors.primary}
                    onPress={() =>
                      Alert.alert("Feature", "Dashboard feature coming soon!")
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
                      Alert.alert(
                        "Feature",
                        "Client management feature coming soon!"
                      )
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
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.primary },
                    ]}
                    textColor={colors.white}
                    onPress={() =>
                      Alert.alert(
                        "Feature",
                        "Property search feature coming soon!"
                      )
                    }
                  >
                    Search Properties
                  </Button>
                  <Button
                    mode="outlined"
                    icon="heart"
                    style={[
                      styles.actionButton,
                      { borderColor: colors.secondary },
                    ]}
                    textColor={colors.secondary}
                    onPress={() =>
                      Alert.alert("Feature", "Favorites feature coming soon!")
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
                      Alert.alert(
                        "Feature",
                        "Applications feature coming soon!"
                      )
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
                style={[
                  styles.actionButton,
                  { borderColor: colors.textSecondary },
                ]}
                textColor={colors.textSecondary}
                onPress={() =>
                  Alert.alert("Feature", "Settings feature coming soon!")
                }
              >
                Settings
              </Button>

              <Button
                mode="contained-tonal"
                icon="logout"
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.warning },
                ]}
                textColor={colors.white}
                onPress={() => {
                  Alert.alert(
                    "Sign Out",
                    "Are you sure you want to sign out?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Sign Out",
                        onPress: () => console.log("Sign out"),
                      },
                    ]
                  );
                }}
              >
                Sign Out
              </Button>

              <Button
                mode="outlined"
                icon="delete"
                style={[styles.actionButton, { borderColor: colors.error }]}
                textColor={colors.error}
                onPress={() => {
                  Alert.alert(
                    "Delete Account",
                    "This action cannot be undone. Are you sure?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => console.log("Delete account"),
                      },
                    ]
                  );
                }}
              >
                Delete Account
              </Button>
            </Card.Content>
          </Card>

          {/* Edit Profile Modal */}
          <Modal
            visible={isEditingProfile}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCancelEdit}
          >
            <View style={styles.modalOverlay}>
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: colors.surface },
                ]}
              >
                <View style={styles.modalHeader}>
                  <Text
                    variant="titleLarge"
                    style={[styles.modalTitle, { color: colors.text }]}
                  >
                    Edit Profile
                  </Text>
                  {/* <Button
                    mode="text"
                    icon="close"
                    onPress={handleCancelEdit}
                    textColor={colors.textSecondary}
                  ></Button> */}
                  <IconButton
                    icon="close"
                    iconColor={colors.textSecondary}
                    size={20}
                    onPress={handleCancelEdit}
                  />
                </View>

                <ScrollView style={styles.modalBody}>
                  <TextInput
                    label="First Name"
                    value={editedProfile.firstName}
                    onChangeText={(text) =>
                      setEditedProfile((prev) => ({ ...prev, firstName: text }))
                    }
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Last Name"
                    value={editedProfile.lastName}
                    onChangeText={(text) =>
                      setEditedProfile((prev) => ({ ...prev, lastName: text }))
                    }
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Email"
                    value={editedProfile.email}
                    onChangeText={(text) =>
                      setEditedProfile((prev) => ({ ...prev, email: text }))
                    }
                    keyboardType="email-address"
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Phone"
                    value={editedProfile.phone}
                    onChangeText={(text) =>
                      setEditedProfile((prev) => ({ ...prev, phone: text }))
                    }
                    keyboardType="phone-pad"
                    style={styles.input}
                    mode="outlined"
                  />
                  <TextInput
                    label="Bio"
                    value={editedProfile.bio}
                    onChangeText={(text) =>
                      setEditedProfile((prev) => ({ ...prev, bio: text }))
                    }
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    mode="outlined"
                  />
                </ScrollView>

                <View style={styles.modalActions}>
                  <Button
                    mode="outlined"
                    onPress={handleCancelEdit}
                    style={[
                      styles.modalButton,
                      { borderColor: colors.outline },
                    ]}
                    textColor={colors.textSecondary}
                  >
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSaveProfile}
                    style={[
                      styles.modalButton,
                      { backgroundColor: colors.primary },
                    ]}
                    textColor={colors.white}
                  >
                    Save Changes
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 20,
    borderRadius: 12,
    marginTop: 60,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    marginBottom: 8,
  },
  changePhotoButton: {
    marginTop: 4,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  email: {
    marginBottom: 8,
    textAlign: "center",
  },
  roleChip: {
    marginTop: 8,
    marginBottom: 12,
  },
  editButton: {
    marginTop: 8,
  },
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
  statusActive: {
    fontWeight: "bold",
  },
  sectionTitle: {
    marginBottom: 12,
  },
  actionButton: {
    marginVertical: 6,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  switchRoleButton: {
    marginLeft: 8,
  },
  input: {
    marginBottom: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 12,
    padding: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  modalButton: {
    minWidth: 100,
  },
});
