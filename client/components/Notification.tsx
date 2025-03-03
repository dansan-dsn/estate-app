import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Notification = () => {
  return (
    <TouchableOpacity style={styles.notificationIcon}>
      <FontAwesome name="bell" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Notification;
