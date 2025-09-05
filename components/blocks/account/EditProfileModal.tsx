import React from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { Text, TextInput, Button, IconButton } from "react-native-paper";
import { UserProfile } from "@/shared/interfaces/user";

interface EditProfileModalProps {
  visible: boolean;
  editedProfile: UserProfile;
  colors: any;
  onSave: () => void;
  onCancel: () => void;
  onProfileChange: (profile: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  editedProfile,
  colors,
  onSave,
  onCancel,
  onProfileChange,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, { backgroundColor: colors.surface }]}
        >
          <View style={styles.modalHeader}>
            <Text
              variant="titleLarge"
              style={[styles.modalTitle, { color: colors.text }]}
            >
              Edit Profile
            </Text>
            <IconButton
              icon="close"
              iconColor={colors.textSecondary}
              size={20}
              onPress={onCancel}
            />
          </View>

          <ScrollView style={styles.modalBody}>
            <TextInput
              label="First Name"
              value={editedProfile.firstName}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, firstName: text })
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Last Name"
              value={editedProfile.lastName}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, lastName: text })
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Email"
              value={editedProfile.email}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, email: text })
              }
              keyboardType="email-address"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Phone"
              value={editedProfile.phone}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, phone: text })
              }
              keyboardType="phone-pad"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Bio"
              value={editedProfile.bio}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, bio: text })
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
              onPress={onCancel}
              style={[styles.modalButton, { borderColor: colors.outline }]}
              textColor={colors.textSecondary}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={onSave}
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              textColor={colors.white}
            >
              Save Changes
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  input: {
    marginBottom: 12,
  },
});
