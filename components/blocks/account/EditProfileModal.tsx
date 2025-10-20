import React from 'react';
import { View, StyleSheet, ScrollView, Modal } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  SegmentedButtons,
  Chip,
} from 'react-native-paper';
import { UserProfile } from '@/shared/interfaces/user';

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

            <Text
              style={[styles.sectionHeading, { color: colors.textSecondary }]}
            >
              Profile preferences
            </Text>
            <SegmentedButtons
              value={editedProfile.role}
              onValueChange={(value) =>
                onProfileChange({
                  ...editedProfile,
                  role: value as UserProfile['role'],
                })
              }
              buttons={[
                { value: 'agent', label: 'Agent' },
                { value: 'tenant', label: 'Tenant' },
              ]}
              style={{ marginBottom: 16 }}
            />

            <TextInput
              label="Language"
              value={editedProfile.language || ''}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, language: text })
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Timezone"
              value={editedProfile.timezone || ''}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, timezone: text })
              }
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Preferred Currency"
              value={editedProfile.preferredCurrency || ''}
              onChangeText={(text) =>
                onProfileChange({ ...editedProfile, preferredCurrency: text })
              }
              style={styles.input}
              mode="outlined"
            />

            <Text
              style={[styles.sectionHeading, { color: colors.textSecondary }]}
            >
              Role specifics
            </Text>

            {editedProfile.role === 'agent' && (
              <>
                <TextInput
                  label="Agency name"
                  value={editedProfile.companyName || ''}
                  onChangeText={(text) =>
                    onProfileChange({ ...editedProfile, companyName: text })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="License number"
                  value={editedProfile.licenseNumber || ''}
                  onChangeText={(text) =>
                    onProfileChange({ ...editedProfile, licenseNumber: text })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Specialties (comma separated)"
                  value={(editedProfile.specialties || []).join(', ')}
                  onChangeText={(text) =>
                    onProfileChange({
                      ...editedProfile,
                      specialties: text
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Territories (comma separated)"
                  value={(editedProfile.territories || []).join(', ')}
                  onChangeText={(text) =>
                    onProfileChange({
                      ...editedProfile,
                      territories: text
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                  style={styles.input}
                  mode="outlined"
                />
              </>
            )}

            {editedProfile.role === 'tenant' && (
              <>
                <TextInput
                  label="Current Property"
                  value={editedProfile.currentProperty || ''}
                  onChangeText={(text) =>
                    onProfileChange({ ...editedProfile, currentProperty: text })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Lease end date"
                  value={editedProfile.leaseEndDate || ''}
                  onChangeText={(text) =>
                    onProfileChange({ ...editedProfile, leaseEndDate: text })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Monthly rent"
                  value={editedProfile.monthlyRent || ''}
                  onChangeText={(text) =>
                    onProfileChange({ ...editedProfile, monthlyRent: text })
                  }
                  style={styles.input}
                  mode="outlined"
                />
                <TextInput
                  label="Emergency contact"
                  value={editedProfile.emergencyContact || ''}
                  onChangeText={(text) =>
                    onProfileChange({
                      ...editedProfile,
                      emergencyContact: text,
                    })
                  }
                  style={styles.input}
                  mode="outlined"
                />
              </>
            )}

            <Text
              style={[styles.sectionHeading, { color: colors.textSecondary }]}
            >
              Notifications
            </Text>
            <View style={styles.chipRow}>
              {['Email', 'SMS', 'Push'].map((channel) => {
                const isActive =
                  editedProfile.notificationChannels?.includes(channel);
                return (
                  <Chip
                    key={channel}
                    style={{
                      backgroundColor: isActive
                        ? colors.primary + '22'
                        : colors.surfaceVariant,
                    }}
                    textStyle={{
                      color: isActive ? colors.primary : colors.textSecondary,
                    }}
                    icon={isActive ? 'check-bold' : 'bell-outline'}
                    onPress={() => {
                      const current = editedProfile.notificationChannels || [];
                      const next = isActive
                        ? current.filter((c) => c !== channel)
                        : [...current, channel];
                      onProfileChange({
                        ...editedProfile,
                        notificationChannels: next,
                      });
                    }}
                  >
                    {channel}
                  </Chip>
                );
              })}
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    minWidth: 100,
  },
  input: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
});
