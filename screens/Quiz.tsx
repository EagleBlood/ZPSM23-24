import React, {useState, useEffect, Component, useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import {styles} from '../styles/styles';
import {stylesQuiz} from '../styles/stylesQuiz';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import QuizData from '../data/quizData';
import ScoreContext from '../data/ScoreContext';


type RootStackParamList = {
    Home: undefined;
    Results: undefined;
    Quiz: { quizIndex: number }; // Define params for 'Quiz' route
};


const QuizView: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
    const quizIndex = route.params?.quizIndex ?? 0;
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const { scores, setScores } = React.useContext(ScoreContext);
    const score = scores[quizIndex] || 0;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Quiz'>>();
    const windowDimensions = useWindowDimensions();
    const isLandscape = windowDimensions.width > windowDimensions.height;
    const landscapeStyles = isLandscape
        ? {
            head: styles.landscapeHead,
            body: styles.landscapeBody
        }
        : {};

    const currentQuiz = QuizData[quizIndex];
    const currentQuestion = currentQuiz?.tasks[currentQuestionIndex];
    const [currentScore, setCurrentScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);


    useEffect(() => {
        if (currentQuestionIndex === currentQuiz?.tasks.length) {
            setScores(prevScores => {
                const newScores = [...prevScores];
                const highestScore = newScores[quizIndex] || 0;
                newScores[quizIndex] = Math.max(highestScore, currentScore);
                return newScores;
            });
            setCurrentQuestionIndex(0); // Reset for the next quiz
            setQuizCompleted(true); // Set quizCompleted to true
        }
    }, [currentQuestionIndex]);
    
    useEffect(() => {
        if (quizCompleted) {
            // Show the alert with the score from the current quiz attempt
            Alert.alert(`Quiz completed! Your score is ${currentScore}.`);
            setCurrentScore(0); // Reset the current score for the next attempt
            navigation.navigate('Home');
        }
    }, [quizCompleted, currentScore]);

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={currentQuestion.duration}
            size={290}
            strokeWidth={20}
            colors={'#54BF72'}
            onComplete={() => {
                // Move to the next question when the timer ends
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
            >
            {
                ({remainingTime}) => (
                    <Text
                        style={{
                            color: '#FFFFFF'
                        }}>
                        {remainingTime}
                    </Text>
                )
            }
        </CountdownCircleTimer>
    );

    const handleAnswerClick = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        // Check if the selected answer is correct
        if (currentQuestion.answers[answerIndex].isCorrect) {
            setCurrentScore(currentScore + 1);
        }
        // Check if the quiz is finished
        if (currentQuestionIndex === currentQuiz.tasks.length) {
            setScores(prevScores => {
                const newScores = [...prevScores];
                const highestScore = newScores[quizIndex] || 0;
                newScores[quizIndex] = Math.max(highestScore, currentScore);
                return newScores;
            });
            // Reset the current score for the next attempt
            setCurrentScore(0);
        }
        // Move to the next question after a delay
        setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }, 100);
    };
    if (!currentQuestion) {
        return null;
    }


    return (
        <SafeAreaView style={[styles.head, landscapeStyles.head]}>
            <View style={styles.body}>

                <View style={stylesQuiz.quizTestHeaderBox}>
                    <View style={stylesQuiz.quizTestHeaderItems}>
                        
                        <View style={stylesQuiz.quizTestHeaderResignButton}>
                            <TouchableOpacity>
                                <Text
                                    style={stylesQuiz.quizTestHeaderResignText}
                                    onPress={() => navigation.navigate('Home')}>
                                    Resign
                                </Text>
                                </TouchableOpacity>
                        </View>
                        
                        <Text style={stylesQuiz.quizTestHeaderText}>Quiz</Text>

                        <View style={stylesQuiz.quizTestHeaderScoreCount}>
                            <Text style={stylesQuiz.quizTestHeaderScoreText}>
                                {currentQuestionIndex + 1} / {currentQuiz?.tasks.length}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={stylesQuiz.quizTestBox}>
                    <Text style={stylesQuiz.quizHeader}>{currentQuestion.question}</Text>

                    <View style={stylesQuiz.quizTestTimerBody}>
                        <View style={stylesQuiz.quizTestTimer}>
                            <UrgeWithPleasureComponent></UrgeWithPleasureComponent>
                        </View>

                        <View style={stylesQuiz.quizTestAnserwsBody}>
                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                {currentQuestion.answers.slice(0, 2).map((answer, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleAnswerClick(index)}>
                                        <Text style={stylesQuiz.quizTextButton}>{['A', 'B'][index]}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                {currentQuestion.answers.slice(2, 4).map((answer, index) => (
                                    <TouchableOpacity key={index + 2} onPress={() => handleAnswerClick(index + 2)}>
                                        <Text style={stylesQuiz.quizTextButton}>{['C', 'D'][index]}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </View>

                    <View style={stylesQuiz.quizTestAnserwsBody}>
                        <View style={stylesQuiz.quizTestAnserwsRow}>
                            <Text style={stylesQuiz.quizText}>A: {currentQuestion.answers[0]?.content}</Text>
                            <Text style={stylesQuiz.quizText}>B: {currentQuestion.answers[1]?.content}</Text>
                        </View>
                        <View style={stylesQuiz.quizTestAnserwsRow}>
                            <Text style={stylesQuiz.quizText}>C: {currentQuestion.answers[2]?.content}</Text>
                            <Text style={stylesQuiz.quizText}>D: {currentQuestion.answers[3]?.content}</Text>
                        </View>
                    </View>         
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QuizView;
