import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home";
import Results from "../screens/Results";
import Quiz from "../screens/Quiz";

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
      <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} />
      <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Navigator;