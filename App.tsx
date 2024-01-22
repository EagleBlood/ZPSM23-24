import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Devices from './screens/Devices';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Define your screens
// Home and Devices are already defined in their respective files

// Create a type for your tab navigation prop
type BottomTabParamList = {
  Home: undefined;
  Devices: undefined;
};

// Create your bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Devices" component={Devices} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}