import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from '@iconify/react';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
    }, 3000);
  }, []);

  return (
    //Splash Screen View
    <View style={styles.container}>
      <Image source={require('./Calculator-icon.png')} style={styles.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  img: {
    width: 200,
    height: 200,
  }
});

export default SplashScreen;
