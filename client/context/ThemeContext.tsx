// components/CustomText.tsx
import React from "react";
import { Text, TextProps } from "react-native";

// Custom Text component that automatically applies the Poppins font family
const CustomText = ({ style, ...props }: TextProps) => {
  return <Text style={[{ fontFamily: "Poppins" }, style]} {...props} />;
};

export default CustomText;
