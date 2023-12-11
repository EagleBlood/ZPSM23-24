import React, {useState, useEffect, Component, useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles/styles';
import ScoreContext from '../data/ScoreContext';



function Home(this: any): JSX.Element {
    interface Quiz {
        id: string;
        name: string;
        level: string;
        numberOfTasks: number;
        description: string;
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
                            <Text style={styles.quizBoxHeaderText}>Trending Quizzes</Text>
                        </View>

                        {quizzes.map((quiz, index) => (
                            <View style={[styles.quizBox, {flex: 1}]} key={index}>
                                <View style={styles.title}>
                                    <View style={styles.titleText}>
                                        <Text style={styles.quizHeader}>{quiz.name}</Text>
                                        <Text style={styles.difficulty}>Level: {quiz.level}</Text>
                                    </View>

                                    <View style={styles.rightQuizButtons}>
                                        <Text style={[scores[quiz.id] === quiz.numberOfTasks ? styles.quizScoreMax : styles.quizScore]}>
                                            {(scores[quiz.id] || 0)}/{quiz.numberOfTasks}
                                        </Text>
                                        <TouchableOpacity>
                                            <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz', { id: quiz.id })}>BEGIN</Text>
                                        </TouchableOpacity>     
                                    </View>
                                </View>
                                <Text style={[styles.text, {flex: 1}]}>{quiz.description}</Text>
                            </View>
                        ))}

                        {/*Footer*/}
                        <View style={styles.quizBox}>
                            <Text style={styles.footer}>Couldn't find any quiz to partake?</Text>
                            <Text style={styles.footer}>Check your current results!</Text>
                            <View style={styles.footerButtons}>
                                <TouchableOpacity onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: false })}>
                                    <Text style={styles.footerButton}>RETURN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Results')}>
                                    <Text style={styles.footerButton}>RESULTS</Text>
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