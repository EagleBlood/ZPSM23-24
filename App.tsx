import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from './routes/homeStack';
import ScoreContext from './data/ScoreContext';

export default function App() {
  const [scores, setScores] = useState<number[]>([]);

  return (
    <ScoreContext.Provider value={{ scores, setScores }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </ScoreContext.Provider>
  );
};