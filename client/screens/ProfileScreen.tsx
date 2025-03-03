import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
