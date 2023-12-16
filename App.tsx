import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './routes/homeStack';
import ScoreContext from './data/ScoreContext';
import InternetConnectionCheck from './checks/InternetConnectionCheck';

export default function App() {
  const [scores, setScores] = useState<number[]>([]);

  return (
    <InternetConnectionCheck>
      <ScoreContext.Provider value={{ scores, setScores }}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ScoreContext.Provider>
    </InternetConnectionCheck>
  );
};