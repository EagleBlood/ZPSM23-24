import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: 'Home',

        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;