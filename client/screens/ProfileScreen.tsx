import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/estate.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      {/* Account Options */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>My Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Saved Searches & Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Support & Help</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
  },
  sectionContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#de7935",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
