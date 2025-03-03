import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../screens/ExploreScreen";
import PropertyDetails from "../screens/PropertyDetails";

const ExploreStack = createStackNavigator();

const ExploreStackNavigator = () => (
  <ExploreStack.Navigator>
    <ExploreStack.Screen
      name="Explore"
      component={ExploreScreen}
      options={{ headerShown: false }} // Hide header in ExploreScreen
    />
    <ExploreStack.Screen
      name="PropertyDetails"
      component={PropertyDetails}
      options={{ headerTitle: "Property Details" }}
    />
  </ExploreStack.Navigator>
);

export default ExploreStackNavigator;
