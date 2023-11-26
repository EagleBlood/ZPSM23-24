import React, {useState, useEffect, Component, useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image
} from 'react-native';
import SplashScreen from './SplashScreen';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';



function Home(this: any): JSX.Element {
    type RootStackParamList = {
        Home: undefined;
        Results: undefined;
        Quiz: undefined;
      };

    const windowDimensions = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
    const menuItems = ['Home', 'Results'];
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Simulate loading or initialization process
        setTimeout(() => {
          setLoading(false); // Set loading to false when loading is complete
        }, 3000); // Adjust the delay as needed
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
        {loading ? (
            <SplashScreen /> // Render the splash screen while loading
        ) : (
            // Render your main content when loading is complete
            <View style={styles.body}>

                <View style={styles.menuBar}>
                    <View style={styles.menuSelect}>

                        <TouchableOpacity>
                            <Text style={styles.menuText}>Img_User</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                            <View style={styles.menuImg}>
                                 <Text style={styles.menuText}>Menu</Text>
                            </View>
                            {menuVisible && (
                                <View style={styles.menu}>
                                    {menuItems.map((item, index) => (
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate(item as keyof RootStackParamList)}>
                                            <Text style={styles.menuItem}>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                        

                        <TouchableOpacity>
                            <Text style={styles.menuText}>Value_User</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                

                <View style={styles.listQuiz}>
                    <ScrollView ref={scrollViewRef}>         
                        <View style={styles.quizBox}>
                            <View style={styles.title}>
                                <View style={styles.titleText}>
                                    <Text style={styles.header}>Quiz #1</Text>
                                    <Text style={styles.difficulty}>Level: Easy</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz')}>BEGIN</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.</Text>
                        </View>

                        <View style={styles.quizBox}>
                            <View style={styles.title}>
                                <View style={styles.titleText}>
                                    <Text style={styles.header}>Quiz #1</Text>
                                    <Text style={styles.difficulty}>Level: Easy</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz')}>BEGIN</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.</Text>
                        </View>

                        <View style={styles.quizBox}>
                            <View style={styles.title}>
                                <View style={styles.titleText}>
                                    <Text style={styles.header}>Quiz #2</Text>
                                    <Text style={styles.difficulty}>Level: Medium</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz')}>BEGIN</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.</Text>
                        </View>
                        
                        <View style={styles.quizBox}>
                            <View style={styles.title}>
                                <View style={styles.titleText}>
                                    <Text style={styles.header}>Quiz #3</Text>
                                    <Text style={styles.difficulty}>Level: Hard</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz')}>BEGIN</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.</Text>
                        </View>

                        <View style={styles.quizBox}>
                            <View style={styles.title}>
                                <View style={styles.titleText}>
                                    <Text style={styles.header}>Quiz #4</Text>
                                    <Text style={styles.difficulty}>Level: Easy</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.enterButton} onPress={() => navigation.navigate('Quiz')}>BEGIN</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.</Text>
                        </View>

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
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    head: {
        flex: 1,
        backgroundColor: 'white'
    },

    body: {
        flex: 1,
        backgroundColor: '#F3CA4D30',
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },

    difficulty: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        fontStyle: 'italic',
    },
    
    text: {
        fontSize: 16,
        marginTop: 10,
        
    },

    menuText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },

    listQuiz: {
        flex: 1,
        zIndex: -1,
        paddingRight: 15,
        paddingLeft: 15,
    },



    quizBox: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
    },

    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titleText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    footer: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
    },

    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 15,
        marginLeft: 80,
        marginRight: 80,
    },

    footerButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',
        backgroundColor: '#54BF72',
        padding: 10,
        borderRadius: 15,
    },

    enterButton: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',
        backgroundColor: '#54BF72',
        padding: 15,
        borderRadius: 15,
    },

    menuBar: {
        flex: 0.1,
        backgroundColor: '#54BF72',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },

    menuImg: {

    },

    menuSelect: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    menu: {
        backgroundColor: '#EDEDED',
        borderRadius: 15,
        padding: 10,
        elevation: 3,
        zIndex: 1,
        position: 'absolute',
        alignSelf: 'center',
        top: 30,
        width: 'auto',
        height: 'auto',
        minWidth: 100,
        alignItems: 'center',
    },

      menuItem: {
        padding: 15,
        fontWeight: 'bold',
        color: 'black',
        
      },


    // Landscape
    landscapeHead: {
        flex: 1
    },
    landscapeBody: {
        flex: 1
    },

    

});

export default Home;