import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const toastConfig = {
  success: ({ text1, props }) => (
    <View style={[styles.toast, styles.success]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  error: ({ text1, props }) => (
    <View style={[styles.toast, styles.error]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
  info: ({ text1, props }) => (
    <View style={[styles.toast, styles.info]}>
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#FF5252",
  },
  info: {
    backgroundColor: "#2196F3",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
