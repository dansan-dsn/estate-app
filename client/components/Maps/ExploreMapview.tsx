// import { useState } from "react";
// import { View, Text, Platform } from "react-native";
// import MapView, { Region } from "react-native-maps";
// import { useThemeStore } from "@/stores/useTheme";

// export default function ExploreMapView() {
//   const { colors } = useThemeStore();
//   const [region, setRegion] = useState<Region>({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   const handleRegionChange = (newRegion: Region) => {
//     setRegion(newRegion);
//   };

//   if (Platform.OS === "web") {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ color: colors.error, fontWeight: "bold" }}>
//           Map is not supported on web yet.
//         </Text>
//         <Text style={{ color: colors.error }}>
//           Please use the mobile app to view the map.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={region}
//         onRegionChangeComplete={handleRegionChange}
//       />
//       <View style={{ position: "absolute", top: 50, left: 10 }}>
//         <Text style={{ fontSize: 16, color: colors.error, fontWeight: "bold" }}>
//           Lat: {region.latitude.toFixed(5)}
//         </Text>
//         <Text style={{ fontSize: 16, color: colors.error, fontWeight: "bold" }}>
//           Lng: {region.longitude.toFixed(5)}
//         </Text>
//       </View>
//     </View>
//   );
// }
