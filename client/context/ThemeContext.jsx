// components/CustomText.tsx
import React from "react";
import { Text } from "react-native";

// Custom Text component that automatically applies the Poppins font family
const CustomText = ({ style, ...props }) => {
  return <Text style={[{ fontFamily: "Poppins" }, style]} {...props} />;
};

export default CustomText;
