import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "../screens/Home";
import Results from "../screens/Results";
import Quiz from "../screens/Quiz";
import WelcomeScreen from "../screens/WelcomeScreen";
import SplashScreen from "../screens/SplashScreen";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function Navigator() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWelcomeScreen = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenWelcome');
        
        if (value === 'true') {
          setHasSeenWelcome(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    checkWelcomeScreen();
  }, []);

  useEffect(() => {
    const checkWelcomeScreen = async () => {
      try {
        let value = await AsyncStorage.getItem('hasSeenWelcome');
  
        if (value === null) {
          // If value is not found in AsyncStorage, set default to false
          value = 'false';
          await AsyncStorage.setItem('hasSeenWelcome', value);
        }
  
        setHasSeenWelcome(value === 'true'); // Set state based on the retrieved value
      } catch (error) {
        console.log(error);
      }
    };
  
    checkWelcomeScreen();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={hasSeenWelcome ? 'Home' : 'Welcome'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

export default Navigator;