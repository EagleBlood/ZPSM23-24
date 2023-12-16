import React, { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const InternetConnectionCheck: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      }
    });
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default InternetConnectionCheck;