import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import PropertyDetails from "../screens/PropertyDetails";

const Stack = createStackNavigator()

const MainStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
    </Stack.Navigator>
  );
  
  export default MainStackNavigator;
  