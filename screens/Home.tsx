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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from '../styles/styles';
import QuizData from '../data/quizData';
import ScoreContext from '../data/ScoreContext';



function Home(this: any): JSX.Element {
    type RootStackParamList = {
        Welcome: undefined;
        Home: undefined;
        Results: undefined;
        Quiz: { quizIndex: number };
        Search: undefined;
      };
    const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
    const quizIndex = route.params?.quizIndex ?? 0;
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

      const handleReset = async () => {
        try {
          await AsyncStorage.setItem('hasSeenWelcome', 'false');
          navigation.navigate('Welcome');
        } catch (error) {
          console.log(error);
        }
      };


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
                                            <TouchableOpacity key={index} onPress={() => navigation.navigate(item as keyof RootStackParamList, params)}>
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

                        {QuizData.map((quiz, index) => (
                            <View style={styles.quizBox} key={index}>
                                <View style={styles.title}>
                                    <View style={styles.titleText}>
                                        <Text style={styles.header}>{quiz.title}</Text>
                                        <Text style={styles.difficulty}>Type: {quiz.type}</Text>
                                    </View>

                                    <View style={styles.rightQuizButtons}>
                                        <Text style={[scores[index] === quiz.tasks.length ? styles.quizScoreMax : styles.quizScore, {marginRight: 10}]}>
                                            {scores[index] || 0}/{quiz.tasks.length}
                                        </Text>

                                        <TouchableOpacity>
                                            <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz', { quizIndex: index })}>BEGIN</Text>
                                        </TouchableOpacity>     
                                    </View>
                                </View>
                                <Text style={styles.text}>{quiz.description}</Text>
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
                                <TouchableOpacity onPress={handleReset}>
                                    <Text style={styles.footerButton}>RESET WELCOME SCREEN</Text>
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