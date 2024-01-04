import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Alert
} from 'react-native';
import {styles} from '../styles/styles';
import {stylesQuiz} from '../styles/stylesQuiz';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScoreContext from '../data/ScoreContext';
import { ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-2'

type RootStackParamList = {
    Home: undefined;
    Results: undefined;
    Quiz: { id: string };
};

interface Answer {
    content: string;
    isCorrect: boolean;
  }
  
  interface Task {
    question: string;
    answers: Answer[];
    duration: number;
  }
  
  interface Quiz {
    tags: string[];
    tasks: Task[];
    name: string;
    description: string;
    level: string;
    id: string;
  }


const QuizView: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
    const quizId = route.params?.id;
    const [quizData, setQuizData] = useState<Quiz | null>(null);

    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const { scores, setScores } = React.useContext(ScoreContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Quiz'>>();
    const windowDimensions = useWindowDimensions();
    const isLandscape = windowDimensions.width > windowDimensions.height;
    const landscapeStyles = isLandscape
        ? {
            head: styles.landscapeHead,
            body: styles.landscapeBody
        }
        : {};

    const currentQuiz = quizData;
    const [currentQuestion, setCurrentQuestion] = useState<Task | null>(null);
    const [currentScore, setCurrentScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    
    

    useEffect(() => {
        if (quizData && quizData.tasks && currentQuestionIndex < quizData.tasks.length) {
            setCurrentQuestion(quizData.tasks[currentQuestionIndex]);
        }
    }, [currentQuestionIndex]);


    /*useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://tgryl.pl/quiz/test/${quizId}`);
                const data = await response.json();
                if (!data || !data.tasks) {
                    console.error('Invalid data:', data);
                    return;
                }
                // Shuffle the answers for each question
                data.tasks.forEach((task: Task) => {
                    task.answers = shuffleArray(task.answers);
                });
                setQuizData(data);
                setCurrentQuestion(data.tasks[0]);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [quizId]);*/

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching all records from the database...');
            const db = SQLite.openDatabase('test.db', '1.0', '', 1);
            console.log('Database opened');
    
            // Fetch all records from the Quizzes table
            db.transaction(txn => {
                txn.executeSql('SELECT * FROM Quizzes', [], (tx, res) => {
                    console.log('All records fetched from the Quizzes table:', res);
                });
            });
    
            console.log('Fetching data for quiz with ID:', quizId);
    
            return new Promise<Quiz>((resolve, reject) => {
                db.transaction(txn => {
                    console.log('Starting transaction...');
                    txn.executeSql('SELECT * FROM Quizzes WHERE id = ?', [quizId], (tx, res) => {
                        console.log('Query executed');
                        console.log('Result:', res);
                        if (res.rows.length > 0) {
                            const quiz: Quiz = res.rows.item(0);
                            console.log('Retrieved quiz:', quiz);
    
                            // Fetch tasks for the quiz
                            txn.executeSql(
                                'SELECT * FROM QuizDetails WHERE quizId = ?',
                                [quiz.id],
                                (_, taskResult) => {
                                    const tasks = [];
                                    for (let i = 0; i < taskResult.rows.length; i++) {
                                        const task = taskResult.rows.item(i);
                                        task.answers = JSON.parse(task.answers); // Parse answers from JSON string to array
                                        tasks.push(task);
                                    }
    
                                    // Now tasks is an array of task objects
                                    console.log('Tasks:', tasks);
    
                                    // Process tasks...
                                    tasks.forEach((task: Task) => {
                                        // rest of the code...
                                    });
    
                                    quiz.tasks = tasks; // Assign tasks to quiz
                                    console.log('Quiz data:', quiz);
                                    resolve(quiz);
                                }
                            );
                        } else {
                            console.error('No quiz found with id:', quizId);
                            reject('No quiz found');
                        }
                    }, (tx, error) => {
                        console.error('Error executing SQL: ', error);
                        reject(error);
                        return false;
                    });
                });
            }).then((quiz) => {
                setQuizData(quiz);
                setCurrentQuestion(quiz.tasks[0]);
                setIsLoading(false); // Set isLoading to false after successfully fetching data
            }).catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set isLoading to false even if there was an error
            });
        };
    
        fetchData();
    }, [quizId]);
    

    useEffect(() => {
        if (!currentQuiz || !currentQuiz.tasks || currentQuestionIndex < currentQuiz.tasks.length) {
            return;
        }
        if (currentQuestionIndex === currentQuiz.tasks.length) {
            setScores(prevScores => {
                const existingScore = prevScores[quizId] || 0;
                return {...prevScores, [quizId]: Math.max(existingScore, currentScore)};
            });
            setQuizCompleted(true);
        }
    }, [currentQuestionIndex, currentScore, currentQuiz]);
    
    useEffect(() => {
        const sendQuizResults = async () => {
            if (!currentQuiz) {
                console.log('currentQuiz is not defined yet.');
                return;
            }
    
            console.log('currentQuiz:', currentQuiz);
            console.log('currentQuiz.tags:', currentQuiz.tags);
    
            Alert.alert(
                "Quiz Completed",
                `You scored ${currentScore} out of ${currentQuiz.tasks.length}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
    
            const quizResults = {
                nick: 'uuuuuuu',
                score: currentScore,
                total: currentQuiz.tasks.length,
                type: currentQuiz.name,
            };
    
            console.log('Sending quiz results:', quizResults);
    
            try {
                const response = await fetch('https://tgryl.pl/quiz/result', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(quizResults),
                });
    
                if (response.ok) {
                    console.log('Quiz results sent successfully!');
                } else {
                    console.error('Error sending quiz results:', response.status);
                }
            } catch (error) {
                console.error('Error sending quiz results:', error);
            }
        };
    
        if (quizCompleted) {
            sendQuizResults();
            navigation.navigate('Home');
            setCurrentScore(0);
            setCurrentQuestionIndex(0);
        }
    }, [quizCompleted, currentScore, currentQuiz]); 
    


    if (isLoading || !currentQuestion) {
        return <Text>Loading...</Text>;
    }

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={currentQuestion.duration}
            size={290}
            strokeWidth={20}
            colors={'#54BF72'}
            onComplete={() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }}
        >
            {({remainingTime}) => (
                <Text
                    style={{
                        color: '#FFFFFF'
                    }}>
                    {remainingTime}
                </Text>
            )}
        </CountdownCircleTimer>
    );

    const handleAnswerClick = (answerIndex: number) => {
        if (!currentQuestion || !currentQuiz || !currentQuiz.tasks) {
            return;
        }
        const answer = currentQuestion.answers[answerIndex];
        if (!answer) {
            console.error('Invalid answer index:', answerIndex);
            return;
        }
        setSelectedAnswer(answerIndex);
        if (answer.isCorrect) {
            setCurrentScore(currentScore + 1);
        }
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
    };

    function shuffleArray(array: any[]) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    if (!currentQuestion) {
        return null;
    }


    return (
        <SafeAreaView style={[styles.head, landscapeStyles.head]}>
            <View style={styles.body}>
                <ScrollView> 
                    <View style={stylesQuiz.quizTestHeaderBox}>
                        <View style={stylesQuiz.quizTestHeaderItems}>
                            <View style={stylesQuiz.quizTestHeaderResignButton}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={stylesQuiz.quizTestHeaderResignText}>
                                        Resign
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={stylesQuiz.quizTestHeaderScoreCount}>
                                <Text style={stylesQuiz.quizTestHeaderScoreText}>
                                    {currentQuestionIndex} / {currentQuiz?.tasks.length}
                                </Text>
                            </View>
                        </View>

                        <View style={stylesQuiz.quizHeaderTextBox}>
                            <Text style={stylesQuiz.quizTestHeaderText}>{currentQuiz?.name}</Text>
                        </View>
                    </View>
                         
                    <View style={stylesQuiz.quizTestBox}>
                        <Text style={stylesQuiz.quizQuestionText}>{currentQuestion.question}</Text>

                        <View style={stylesQuiz.quizTestTimerBody}>
                            <View style={stylesQuiz.quizTestTimer}>
                                <UrgeWithPleasureComponent></UrgeWithPleasureComponent>
                            </View>

                            <View style={stylesQuiz.quizTestAnserwsBody}>
                                <View style={stylesQuiz.quizTestAnserwsRow}>
                                    {currentQuestion.answers?.slice(0, 2).map((_, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleAnswerClick(index)}>
                                            <Text style={stylesQuiz.quizTextButton}>{['A', 'B'][index]}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={stylesQuiz.quizTestAnserwsRow}>
                                    {currentQuestion.answers?.slice(2, 4).map((_, index) => (
                                        <TouchableOpacity key={index + 2} onPress={() => handleAnswerClick(index + 2)}>
                                            <Text style={stylesQuiz.quizTextButton}>{['C', 'D'][index]}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={stylesQuiz.quizTestAnserwsBody}>
                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                {currentQuestion.answers?.slice(0, 2).map((answer, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleAnswerClick(index)} style={{ flex: 1 }}>
                                        <Text style={stylesQuiz.quizText}>{answer.content}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                {currentQuestion.answers?.slice(2, 4).map((answer, index) => (
                                    <TouchableOpacity key={index + 2} onPress={() => handleAnswerClick(index + 2)} style={{ flex: 1 }}>
                                        <Text style={stylesQuiz.quizText}>{answer.content}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default QuizView;