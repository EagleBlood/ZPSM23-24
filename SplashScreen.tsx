import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from '@iconify/react';

const SplashScreen = () => {
  useEffect(() => {
    // Simulate some loading or initialization process
    setTimeout(() => {
      // After a delay, navigate to the main screen or hide the splash screen
      // For example, you can use navigation.navigate('MainScreen') or hide the splash screen
    }, 3000); // Adjust the delay as needed
  }, []);

  return (
    <View style={styles.container}>
      {/* Add your splash screen content here */}
      <Image source={require('./Calculator-icon.png')} style={styles.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Customize the background color
  },

  img: {
    width: 200,
    height: 200,
  }
});

export default SplashScreen;
