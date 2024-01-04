/* Naprawić QuizDetails bo jest 15 tych samych rekordów, naprawić pobieranie w Quiz pytań*/

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
import NetInfo from "@react-native-community/netinfo";
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles/styles';
import ScoreContext from '../data/ScoreContext';
import SQLite from 'react-native-sqlite-2'



function Home(this: any): JSX.Element {
    interface Quiz {
        id: string;
        name: string;
        level: string;
        numberOfTasks: number;
        description: string;
        tags: string[];
        // add other properties as needed
    }

    interface Scores {
        [key: string]: number;
    }
    
    type RootStackParamList = {
        Welcome: undefined;
        Home: undefined;
        Results: undefined;
        Quiz: { id: string };
        Search: undefined;
    };
    
    const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
    //const quizIndex = route.params?.quizIndex ?? 0;
    const windowDimensions = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
    const menuItems: { [K in keyof RootStackParamList]?: RootStackParamList[K] } = {
        Search: undefined,
        Results: undefined,
      };
    const scrollViewRef = useRef<ScrollView>(null);
    const { scores } = React.useContext(ScoreContext);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const fetchQuizzes = () => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Alert.alert('Brak internetu!', 'Prosze sprawdz swoje połączenie i spróbuj ponownie.');
            } else {
                fetch('http://tgryl.pl/quiz/tests')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const db = SQLite.openDatabase('test.db', '1.0', '', 1);
                        db.transaction(function(txn) {
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS Quizzes(id TEXT PRIMARY KEY NOT NULL, name TEXT, level TEXT, numberOfTasks INTEGER, description TEXT, tags TEXT);',
                                []
                            );
    
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS QuizDetails(quizId TEXT, question TEXT, answers TEXT, duration INTEGER);',
                                []
                            );
    
                            txn.executeSql(
                                'SELECT * FROM Quizzes;',
                                [],
                                (tx, resultSet) => {
                                    if (JSON.stringify(resultSet.rows) !== JSON.stringify(data)) {
                                        txn.executeSql(
                                            'DELETE FROM Quizzes;',
                                            [],
                                            (tx, resultSet) => {
                                                console.log('Deleted old data from Quizzes');
                                            },
                                            (tx, error) => {
                                                console.log('Deletion error: ', error);
                                                return true;
                                            }
                                        );
    
                                        txn.executeSql(
                                            'DELETE FROM QuizDetails;',
                                            [],
                                            (tx, resultSet) => {
                                                console.log('Deleted old data from QuizDetails');
                                            },
                                            (tx, error) => {
                                                console.log('Deletion error: ', error);
                                                return true;
                                            }
                                        );
    
                                        data.forEach((quiz: Quiz) => {
                                            const tagsString = JSON.stringify(quiz.tags);
                                            console.log('Inserting quiz: ', quiz);
    
                                            txn.executeSql(
                                                'INSERT INTO Quizzes (id, name, level, numberOfTasks, description, tags) VALUES (?, ?, ?, ?, ?, ?)',
                                                [quiz.id, quiz.name, quiz.level, quiz.numberOfTasks, quiz.description, tagsString],
                                                (tx, resultSet) => {
                                                    console.log('Insertion result: ', resultSet);
                                                },
                                                (tx, error) => {
                                                    console.log('Insertion error: ', error);
                                                    return true;
                                                }
                                            );
    
                                            fetch(`http://tgryl.pl/quiz/test/${quiz.id}`)
                                                .then(response => response.json())
                                                .then(quizDetail => {
                                                    db.transaction(function(innerTxn) {
                                                        quizDetail.tasks.forEach((task: any) => {
                                                            const answersString = JSON.stringify(task.answers);
                                                            console.log('Inserting quiz detail: ', task);
    
                                                            innerTxn.executeSql(
                                                                'INSERT INTO QuizDetails (quizId, question, answers, duration) VALUES (?, ?, ?, ?)',
                                                                [quiz.id, task.question, answersString, task.duration],
                                                                (tx, resultSet) => {
                                                                    console.log('Insertion result: ', resultSet);
                                                                },
                                                                (tx, error) => {
                                                                    console.log('Insertion error: ', error);
                                                                    return true;
                                                                }
                                                            );
                                                        });
                                                    });
                                                })
                                                .catch(error => console.error(error));
                                        });
                                    }
                                },
                                (tx, error) => {
                                    console.log('Selection error: ', error);
                                    return true;
                                }
                            );
                        });
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    


    const createQuizDetailsTable = () => {
        const db = SQLite.openDatabase('test.db', '1.0', '', 1);
        db.transaction(function(txn) {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS QuizDetails(quizId TEXT, question TEXT, answers TEXT, duration INTEGER);',
                []
            );
        });
    };
    
    // Call this function when your app starts or in an appropriate initialization section.
    createQuizDetailsTable();

    const logQuizzes = () => {
        const db = SQLite.openDatabase('test.db', '1.0', '', 1);
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM Quizzes', [], (tx, res) => {
                const quizzes: Quiz[] = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    const item = res.rows.item(i);
                    const parsedTags = JSON.parse(item.tags || '[]'); // Parse the tags string back to an array
                    const quizWithTags = { ...item, tags: parsedTags }; // Replace the tags string with parsed array
                    quizzes.push(quizWithTags);
                }
                // Log the quizzes
                console.log(quizzes);
            });
        });
    };

    const logQuizDetails = () => {
        // Open the SQLite database
        const db = SQLite.openDatabase('test.db', '1.0', '', 1);
        db.transaction(function(txn) {
            // Select all details for the specified quiz from the QuizDetails table
            txn.executeSql('SELECT * FROM QuizDetails', [], function(tx, res) {
                const quizDetails: any[] = [];
                for (let i = 0; i < res.rows.length; ++i) {
                    quizDetails.push(res.rows.item(i));
                }
                // Log the quiz details
                console.log(quizDetails);
            }, function(tx, error) {
                // Log the error
                console.log('Error executing SQL: ', error);
                // Return false to roll back the transaction
                return false;
            });
        });
    };
    

    useEffect(() => {
        fetchQuizzes(); // Fetch quizzes on component mount
    }, []);
        

    useEffect(() => {
        fetch('http://tgryl.pl/quiz/tests')
            .then(response => response.json())
            .then(data => setQuizzes(data))
            .catch(error => console.error(error));
    }, []);

    const isLandscape = windowDimensions.width > windowDimensions.height;
    const landscapeStyles = isLandscape
        ? {
            head: styles.landscapeHead,
            body: styles.landscapeBody,
        }
        : {};

    return (
        <SafeAreaView style={[styles.head, landscapeStyles.head]}>
            
            <View style={styles.body}>

                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View style={styles.menuBar}>
                        <View style={styles.menuSelect}>

                            <TouchableOpacity>
                                <Text style={styles.menuText}>Img_User</Text>
                            </TouchableOpacity>


                            <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                                <View style={styles.menuImg}>
                                    <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                                        <Text style={styles.menuText}>Menu</Text>
                                    </TouchableOpacity>
                                    {menuVisible && (
                                        <View style={styles.menu}>
                                            {Object.entries(menuItems).map(([item, params], index) => (
                                                <TouchableOpacity 
                                                    key={index} 
                                                    onPress={() => {
                                                        setMenuVisible(false); // Hide the menu
                                                        navigation.navigate(item as keyof RootStackParamList, params);
                                                    }}
                                                >
                                                    <Text style={styles.menuItem}>{item}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                            

                            <TouchableOpacity>
                                <Text style={styles.menuText}>Value_User</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>


                <View style={styles.listQuiz}>
                    <ScrollView ref={scrollViewRef}>  
                        <View style={styles.quizBoxHeader}>
                            <Text style={styles.quizBoxHeaderText}>Popularne Quizy</Text>
                            <View style={styles.headerButtons}>
                                <TouchableOpacity onPress={() => {
                                    const randomQuizIndex = Math.floor(Math.random() * quizzes.length);
                                    const selectedQuiz = quizzes[randomQuizIndex];
                                    navigation.navigate('Quiz', { id: selectedQuiz.id });
                                }}>
                                    <Text style={styles.footerButton}>Szczęśliwy traf</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={fetchQuizzes}>
                                    <Text style={styles.footerButton}>Odśwież Quizy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {quizzes.map((quiz, index) => (
                            <View style={[styles.quizBox, {flex: 1}]} key={index}>
                                <View style={styles.title}>
                                    <View style={styles.titleText}>
                                        <Text style={styles.quizHeader}>{quiz.name}</Text>
                                        <Text style={styles.difficulty}>Poziom: {quiz.level}</Text>
                                    </View>

                                    <View style={styles.rightQuizButtons}>
                                        <Text style={[scores[quiz.id] === quiz.numberOfTasks ? styles.quizScoreMax : styles.quizScore]}>
                                            {(scores[quiz.id] || 0)}/{quiz.numberOfTasks}
                                        </Text>
                                        <TouchableOpacity>
                                            <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz', { id: quiz.id })}>Start</Text>
                                        </TouchableOpacity>     
                                    </View>
                                </View>
                                <Text style={[styles.text, {flex: 1}]}>{quiz.description}</Text>
                            </View>
                        ))}

                        {/*Footer*/}
                        <View style={styles.quizBox}>
                            <Text style={styles.footer}>Nie znalazłeś odpowiedniego quizu?</Text>
                            <Text style={styles.footer}>Sprawdz swoje wyniki!</Text>
                            <View style={styles.footerButtons}>
                                <TouchableOpacity onPress={() => {
                                    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
                                    logQuizzes();
                                    //logQuizDetails();
                                }}>
                                    <Text style={styles.footerButton}>Powrót</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Results')}>
                                    <Text style={styles.footerButton}>Wyniki</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;