import { useState, Fragment } from "react";
import { useRouter } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import LoginView from "@/components/blocks/more/LoginView";
import {
  Button,
  Text,
  Avatar,
  Card,
  Divider,
  Chip,
  Icon,
} from "react-native-paper";
import { useThemeStore } from "@/stores/useTheme";

export default function Account() {
  const [isAgent] = useState("agent");
  const [isLoggedIn] = useState(false);
  const { colors } = useThemeStore();
  const router = useRouter();

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
            <Avatar.Text
              size={80}
              label={isAgent ? "AG" : "TN"}
              style={[styles.avatar, { backgroundColor: colors.primary }]}
              color={colors.white}
            />
            <Text
              variant="titleLarge"
              style={[styles.username, { color: colors.text }]}
            >
              {isAgent ? "Alex Garcia (Agent)" : "Taylor Smith (Tenant)"}
            </Text>
            <Text
              variant="bodyMedium"
              style={[styles.email, { color: colors.textSecondary }]}
            >
              user@example.com
            </Text>
            <Chip
              mode="outlined"
              style={[
                styles.roleChip,
                {
                  backgroundColor: colors.chipBackground,
                  borderColor: isAgent ? colors.success : colors.info,
                },
              ]}
              textStyle={{
                color: isAgent ? colors.success : colors.info,
                fontWeight: "bold",
              }}
              icon={isAgent ? "check-decagram" : "check-circle"}
            >
              {isAgent ? "Verified Agent" : "Active Tenant"}
            </Chip>
          </View>

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
                  June 2023
                </Text>
              </View>
              {isAgent && (
                <>
                  <Divider style={styles.divider} />
                  <View style={styles.cardRow}>
                    <Text
                      variant="bodyMedium"
                      style={{ color: colors.textSecondary }}
                    >
                      Agent ID:
                    </Text>
                    <Text variant="bodyMedium" style={{ color: colors.text }}>
                      AG-789456
                    </Text>
                  </View>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Role-Specific Information */}
          {isAgent ? (
            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={[styles.sectionTitle, { color: colors.text }]}
                >
                  Agent Statistics
                </Text>
                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Listings:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    24 Active
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
                    18
                  </Text>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Rating:
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text variant="bodyMedium" style={{ color: colors.text }}>
                      4.8
                    </Text>
                    <Icon source="star" size={16} color={colors.secondary} />
                  </View>
                </View>
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
                    Sunrise Apartments #304
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
                    June 30, 2024
                  </Text>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.cardRow}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.textSecondary }}
                  >
                    Rent:
                  </Text>
                  <Text variant="bodyMedium" style={{ color: colors.text }}>
                    $1,200/month
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Settings Section */}
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: colors.text }]}
              >
                Settings
              </Text>
              <Button
                mode="text"
                icon="cog"
                style={styles.menuButton}
                textColor={colors.primary}
                onPress={() => console.log("Settings pressed")}
              >
                App Settings
              </Button>
              <Button
                mode="text"
                icon="shield"
                style={styles.menuButton}
                textColor={colors.info}
                onPress={() => console.log("Privacy pressed")}
              >
                Privacy & Security
              </Button>
              {isAgent && (
                <Button
                  mode="text"
                  icon="office-building"
                  style={styles.menuButton}
                  textColor={colors.secondary}
                  onPress={() => console.log("Agency pressed")}
                >
                  Agency Profile
                </Button>
              )}
            </Card.Content>
          </Card>

          {/* Actions Section */}
          <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Text
                variant="titleMedium"
                style={[styles.sectionTitle, { color: colors.text }]}
              >
                Actions
              </Text>
              {isAgent && (
                <>
                  <Button
                    mode="contained"
                    icon="plus"
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.primary },
                    ]}
                    textColor={colors.white}
                    onPress={() => console.log("Add listing pressed")}
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
                    onPress={() => console.log("View stats pressed")}
                  >
                    View Statistics
                  </Button>
                </>
              )}
              <Button
                mode="contained-tonal"
                icon="logout"
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.warning },
                ]}
                textColor={colors.white}
                onPress={() => console.log("Sign out pressed")}
              >
                Sign Out
              </Button>
              <Button
                mode="outlined"
                icon="delete"
                style={[styles.actionButton, { borderColor: colors.error }]}
                labelStyle={{ color: colors.error }}
                textColor={colors.error}
                onPress={() => console.log("Delete account pressed")}
              >
                Delete Account
              </Button>
            </Card.Content>
          </Card>
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
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 60,
  },
  avatar: {
    marginBottom: 12,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    marginBottom: 8,
  },
  roleChip: {
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  menuButton: {
    justifyContent: "flex-start",
    paddingVertical: 8,
  },
  actionButton: {
    marginVertical: 8,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
