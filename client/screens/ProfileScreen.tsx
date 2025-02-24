import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

// Simulate user data for logged-in status
const userDetails = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Admin",
  profileImage: "https://randomuser.me/api/portraits/men/1.jpg", // Random image for the user
};

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      // Simulate fetching user data (replace with actual logic)
      setUserData(userDetails);
    } else {
      setUserData(null);
    }
  }, [isLoggedIn]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Your Profile</Text>
        <Text style={styles.headerSubtitle}>
          Manage your account settings, saved properties, and more.
        </Text>
      </View>

      {/* Display profile card if logged in */}
      {isLoggedIn ? (
        <View style={styles.profileCard}>
          <Image
            source={{ uri: userData?.profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userData?.name}</Text>
          <Text style={styles.userInfo}>Email: {userData?.email}</Text>
          <Text style={styles.userInfo}>Role: {userData?.role}</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.guestContainer}>
          <Text style={styles.guestText}>You are currently not logged in.</Text>
          <Text style={styles.guestText}>
            Log in to access all your features.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings and Preferences */}
      <View style={styles.settingsCard}>
        <Text style={styles.cardTitle}>Settings</Text>
        <Text style={styles.cardSubtitle}>
          Manage your preferences and notifications.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Listings Section */}
      {isLoggedIn && (
        <View style={styles.savedContainer}>
          <Text style={styles.savedTitle}>Your Saved Listings</Text>
          <Text style={styles.savedText}>
            You can save properties here to view later.
          </Text>
          <Button title="View Saved Listings" onPress={() => {}} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  header: {
    backgroundColor: "#ff6347", // Warm gradient color for the header
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#d41340",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  guestContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  guestText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  settingsCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  savedContainer: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  savedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  savedText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
    textAlign: "center",
  },
});
