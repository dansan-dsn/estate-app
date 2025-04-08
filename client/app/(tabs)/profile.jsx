import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/hooks/AuthContext.js";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  // State to track open/close for each accordion section
  const [openAccount, setOpenAccount] = useState(false);
  const [openListings, setOpenListings] = useState(false);
  const [openSearches, setOpenSearches] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const [openSubscriptions, setOpenSubscriptions] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Section - Fixed at the top */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image
            source={require("@/assets/images/profile.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>johndoe@example.com</Text>
          <Text style={styles.profileBio}>
            A passionate real estate professional helping clients find their
            dream homes.
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Ionicons name="person-circle-outline" size={20} color="black" />
            <Text style={styles.editButtonText}> Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Data Section */}
      <ScrollView
        style={styles.dataSection}
        showsVerticalScrollIndicator={false} // Hide the scroll bar
      >
        {/* Account Information Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenAccount(!openAccount)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>Account Details</Text>
            <Ionicons
              name={openAccount ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openAccount && (
            <View style={styles.accordionContent}>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Phone Number</Text>
                <Text style={styles.cardText}>
                  <Ionicons name="call-outline" size={16} /> +123 456 789
                </Text>
              </View>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Location</Text>
                <Text style={styles.cardText}>
                  <Ionicons name="location-outline" size={16} /> New York, USA
                </Text>
              </View>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Email</Text>
                <Text style={styles.cardText}>
                  <Ionicons name="mail-outline" size={16} /> johndoe@example.com
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Preferences Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenPreferences(!openPreferences)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Ionicons
              name={openPreferences ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openPreferences && (
            <View style={styles.accordionContent}>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Notification</Text>
                <Text style={styles.cardText}>
                  <Ionicons name="notifications-circle" size={16} /> Enabled
                </Text>
              </View>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Language</Text>
                <Text style={styles.cardText}>
                  <Ionicons name="language" size={16} /> English
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Subscription Details Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenSubscriptions(!openSubscriptions)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>Subscription Plan</Text>
            <Ionicons
              name={openSubscriptions ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openSubscriptions && (
            <View style={styles.accordionContent}>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Current Plan</Text>
                <Text style={styles.cardText}>Premium</Text>
              </View>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Renewal Date</Text>
                <Text style={styles.cardText}>01/01/2026</Text>
              </View>
              <View style={styles.accordionCard}>
                <Text style={styles.cardTitle}>Features</Text>
                <Text style={styles.cardText}>
                  Unlimited Listings, Priority Support
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Property Listings Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenListings(!openListings)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>My Listings</Text>
            <Ionicons
              name={openListings ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openListings && (
            <View style={styles.accordionContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyListings")}
              >
                <Text style={styles.linkText}>View Listings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddListing")}
              >
                <Text style={styles.linkText}>Add New Listing</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Saved Searches Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenSearches(!openSearches)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>Saved Searches</Text>
            <Ionicons
              name={openSearches ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openSearches && (
            <View style={styles.accordionContent}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SavedSearches")}
              >
                <Text style={styles.linkText}>Manage Searches</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Messages Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenMessages(!openMessages)}
            style={styles.accordionHeader}
          >
            <Text style={styles.sectionTitle}>Messages</Text>
            <Ionicons
              name={openMessages ? "chevron-up" : "chevron-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>
          {openMessages && (
            <View style={styles.accordionContent}>
              <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
                <Text style={styles.linkText}>Open Chat</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutButtonText}> Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileSection: {
    width: "100%",
    height: 300, // Fix the profile section height
    backgroundColor: "gray", // Unique background color for the profile header
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  profileHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    color: "white",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: "#FFFFFF", // Add border around the profile photo
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFFFFF",
  },
  profileEmail: {
    marginTop: 5,
    fontSize: 14,
    color: "#FFFFFF",
  },
  profileBio: {
    fontSize: 12,
    marginTop: 10,
    color: "black",
    textAlign: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    zIndex: 1, // Ensure the back button is always on top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonText: {
    color: "#007AFF",
    marginLeft: 10,
  },
  dataSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F9F9F9", // Different background for the content area
    paddingBottom: 40,
    paddingTop: 40,
  },

  section: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  accordionContent: {
    paddingTop: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginTop: 8,
  },
  accordionCard: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    marginBottom: 6,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 50,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProfileScreen;
