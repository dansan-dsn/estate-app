import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Settings Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenAccountSettings(!openAccountSettings)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <FontAwesome
              name={openAccountSettings ? "chevron-up" : "chevron-down"}
              size={18}
              color="gray"
              marginRight={10}
            />
          </TouchableOpacity>
          {openAccountSettings && (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("EditAccount")}
              >
                <FontAwesome name="key" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("TwoStepAuthentication")}
              >
                <FontAwesome name="shield" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Two-Step Authentication</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Notifications Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenNotifications(!openNotifications)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Notifications</Text>
            <FontAwesome
              name={openNotifications ? "chevron-up" : "chevron-down"}
              size={18}
              color="gray"
              marginRight={10}
            />
          </TouchableOpacity>
          {openNotifications && (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("ManageNotifications")}
              >
                <FontAwesome name="bell" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Push Notification</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("ManageNotifications")}
              >
                <FontAwesome name="envelope" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Email Notification</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Language & Currency Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenLanguage(!openLanguage)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Language & Currency</Text>
            <FontAwesome
              name={openLanguage ? "chevron-up" : "chevron-down"}
              size={18}
              color="gray"
              marginRight={10}
            />
          </TouchableOpacity>
          {openLanguage && (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("SelectLanguage")}
              >
                <FontAwesome name="language" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Choose Language</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("SelectCurrency")}
              >
                <FontAwesome name="dollar" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Preferred Currency</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Privacy & Security Accordion */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setOpenPrivacy(!openPrivacy)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
            <FontAwesome
              name={openPrivacy ? "chevron-up" : "chevron-down"}
              size={18}
              color="gray"
              marginRight={10}
            />
          </TouchableOpacity>
          {openPrivacy && (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("ManagePermissions")}
              >
                <FontAwesome name="unlock" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Manage Data Permissions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate("DeleteAccount")}
              >
                <FontAwesome name="trash" size={20} color="#2c3e50" />
                <Text style={styles.itemText}>Delete Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Help & Support (Always Open, No Arrow) */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("HelpCenter")}
          >
            <FontAwesome name="info-circle" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ContactSupport")}
          >
            <FontAwesome name="phone" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ReportProblem")}
          >
            <FontAwesome name="exclamation-circle" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>Report a Problem</Text>
          </TouchableOpacity>
        </View>
        {/* About & Legal (Always Open, No Arrow) */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("TermsConditions")}
          >
            <FontAwesome name="gavel" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <FontAwesome name="lock" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("AppVersion")}
          >
            <Ionicons name="logo-google-playstore" size={20} color="#2c3e50" />
            <Text style={styles.itemText}>App Version</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray background to provide a professional and clean feel
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#34495e", // Subtle dark color to contrast with light background
    padding: 16,
    zIndex: 1, // Ensure it stays on top
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    fontFamily: "Poppins", // Clean and modern font
  },
  scrollContent: {
    padding: 16,
    paddingTop: 120, // Extra padding to prevent overlap with the fixed title
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#ecf0f1", // Soft background for headers
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50", // Dark gray for section titles
    fontFamily: "Roboto",
    paddingHorizontal: 10,
  },
  item: {
    paddingVertical: 15,
    backgroundColor: "#ffffff", // White background for items
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white", // Light border to separate items
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 0, // Remove left border
    borderRightWidth: 0, // Remove right border
    borderRadius: 5, // Rounded corners for better visual appeal
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#2c3e50", // Dark gray text
    marginLeft: 12, // Space between the icon and the text
    fontFamily: "Roboto", // Clean and professional font
  },
});
