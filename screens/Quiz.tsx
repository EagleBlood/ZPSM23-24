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
import {styles} from '../styles/styles';
import {stylesQuiz} from '../styles/stylesQuiz';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'

const QuizView: React.FC = () => {
    const windowDimensions = useWindowDimensions();
    const isLandscape = windowDimensions.width > windowDimensions.height;
    const landscapeStyles = isLandscape
        ? {
            head: styles.landscapeHead,
            body: styles.landscapeBody
        }
        : {};

    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
            isPlaying
            duration={10}
            size={290}
            strokeWidth={20}
            colors={'#54BF72'}>
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

    return (
        <SafeAreaView style={[styles.head, landscapeStyles.head]}>
            <View style={styles.body}>

                <View style={stylesQuiz.quizTestHeaderBox}>
                    <View style={stylesQuiz.quizTestHeaderItems}>
                        <Text style={stylesQuiz.quizTestHeaderText}>Resign</Text>
                        <Text style={stylesQuiz.quizTestHeaderText}>Quiz</Text>
                        <Text style={stylesQuiz.quizTestHeaderText}>Score</Text>
                    </View>
                </View>

                <View style={stylesQuiz.quizTestBox}>
                    <Text style={stylesQuiz.quizHeader}>Long ass question can you guess lol</Text>

                    <View style={stylesQuiz.quizTestTimerBody}>
                        <View style={stylesQuiz.quizTestTimer}>
                            <UrgeWithPleasureComponent></UrgeWithPleasureComponent>
                        </View>

                        <View style={stylesQuiz.quizTestAnserwsBody}>
                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                <TouchableOpacity>
                                    <Text style={stylesQuiz.quizTextButton}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={stylesQuiz.quizTextButton}>B</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesQuiz.quizTestAnserwsRow}>
                                <TouchableOpacity>
                                    <Text style={stylesQuiz.quizTextButton}>C</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={stylesQuiz.quizTextButton}>D</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <Text style={stylesQuiz.quizText}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                        nunc, eget aliquam nisl nunc eget nisl.</Text>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default QuizView;