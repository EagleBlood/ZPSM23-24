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
      <Image source={require('../img/logo4.png')} style={styles.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 50,
  },

  img: {
    width: 288,
    height: 230 ,
  }
});
export default SplashScreen;
