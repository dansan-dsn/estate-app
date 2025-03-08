import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';  // Import icon library

const SettingsScreen = ({ navigation }) => {
  // State to handle accordion open/close
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Account Settings Accordion */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setOpenAccountSettings(!openAccountSettings)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Account Settings
          </Text>
          <Icon name={openAccountSettings ? "chevron-up" : "chevron-down"} size={18} color="#333" />
        </TouchableOpacity>

        {openAccountSettings && (
          <>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditAccount')}>
              <Icon name="key" size={20} color="#333" />
              <Text style={styles.itemText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TwoStepAuthentication')}>
              <Icon name="shield" size={20} color="#333" />
              <Text style={styles.itemText}>Two-Step Authentication</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Notifications Accordion */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setOpenNotifications(!openNotifications)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Notifications
          </Text>
          <Icon name={openNotifications ? "chevron-up" : "chevron-down"} size={18} color="#333" />
        </TouchableOpacity>

        {openNotifications && (
          <>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ManageNotifications')}>
              <Icon name="bell" size={20} color="#333" />
              <Text style={styles.itemText}>Push Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ManageNotifications')}>
              <Icon name="envelope" size={20} color="#333" />
              <Text style={styles.itemText}>Email Notification</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Language & Currency Accordion */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setOpenLanguage(!openLanguage)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Language & Currency
          </Text>
          <Icon name={openLanguage ? "chevron-up" : "chevron-down"} size={18} color="#333" />
        </TouchableOpacity>

        {openLanguage && (
          <>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SelectLanguage')}>
              <Icon name="language" size={20} color="#333" />
              <Text style={styles.itemText}>Choose Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SelectCurrency')}>
              <Icon name="dollar" size={20} color="#333" />
              <Text style={styles.itemText}>Preferred Currency</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Privacy & Security Accordion */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setOpenPrivacy(!openPrivacy)} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Privacy & Security
          </Text>
          <Icon name={openPrivacy ? "chevron-up" : "chevron-down"} size={18} color="#333" />
        </TouchableOpacity>

        {openPrivacy && (
          <>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ManagePermissions')}>
              <Icon name="unlock" size={20} color="#333" />
              <Text style={styles.itemText}>Manage Data Permissions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DeleteAccount')}>
              <Icon name="trash" size={20} color="#333" />
              <Text style={styles.itemText}>Delete Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Help & Support (Always Open, No Arrow) */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('HelpCenter')}>
          <Icon name="info-circle" size={20} color="#333" />
          <Text style={styles.itemText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ContactSupport')}>
          <Icon name="phone" size={20} color="#333" />
          <Text style={styles.itemText}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ReportProblem')}>
          <Icon name="exclamation-circle" size={20} color="#333" />
          <Text style={styles.itemText}>Report a Problem</Text>
        </TouchableOpacity>
      </View>

      {/* About & Legal (Always Open, No Arrow) */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TermsConditions')}>
          <Icon name="file-text" size={20} color="#333" />
          <Text style={styles.itemText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Icon name="file-text" size={20} color="#333" />
          <Text style={styles.itemText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AppVersion')}>
          <Icon name="app-store" size={20} color="#333" />
          <Text style={styles.itemText}>App Version</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    flexDirection: "row", // Align text and icon horizontally
    alignItems: "center",
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  item: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10, // Space between icon and text
  },
});
