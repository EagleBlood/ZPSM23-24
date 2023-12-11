import React from 'react';

type ScoreContextType = {
  scores: { [quizId: string]: number };
  setScores: React.Dispatch<React.SetStateAction<{ [quizId: string]: number }>>;
};

const ScoreContext = React.createContext<ScoreContextType>({ scores: {}, setScores: () => {} });

export default ScoreContext;