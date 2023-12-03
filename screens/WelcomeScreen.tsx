import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions,
    Image,
    TouchableWithoutFeedback,
    Button,
    Switch
  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { stylesWelcomeScreen } from '../styles/stylesWelcomeScreen';

type RootStackParamList = {
  Home: undefined;
  Results: undefined;
  Quiz: undefined;
};



type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const [isSelected, setSelection] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      navigation.navigate('Home'); // Attempting to navigate to 'Home'
    } catch (error) {
      console.log(error);
    }
  };

  return (
    

    <SafeAreaView style={styles.body}>
      <ScrollView>
        <View style={stylesWelcomeScreen.welcomeBox}>
          <Text style={stylesWelcomeScreen.welcomeBoxHeaderText}>Greetings!</Text>
        </View>

        <View style={stylesWelcomeScreen.welcomeBox}>
          <Text style={stylesWelcomeScreen.welcomeBoxHeaderText}>Carefully read all the rules:</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>1. Respect Others: Treat fellow players with courtesy and respect in all interactions.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>2. Play Fair: Avoid cheating or using external aids to gain an unfair advantage.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>3. No Spamming: Refrain from flooding the app with repetitive or irrelevant content.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>4. Be Polite: Maintain a friendly and positive attitude towards all users.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>5. Follow Guidelines: Adhere to the app's community guidelines and rules.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>6. Avoid Inappropriate Content: Refrain from sharing or creating inappropriate or offensive content.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>7. Respect Intellectual Property: Do not plagiarize or infringe upon copyrighted material.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>8. Keep it Relevant: Stay on topic and relevant to the quiz content and discussions.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>9. No Hate Speech: Do not engage in hate speech, bullying, or discrimination.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>10. Mind Language & Tone: Use appropriate language and tone in all communications.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>11. Report Issues: Report any bugs, issues, or violations observed in the app promptly.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>12. No Spoilers: Refrain from sharing quiz answers or solutions to maintain the challenge.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>13. Respect Privacy: Do not share personal information or violate others' privacy.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>14. Be Patient: Avoid spamming requests for assistance; be patient for responses.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>15. Help Others: Assist fellow users respectfully if they need help or guidance.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>16. Keep it Clean: Avoid using profanity or offensive language in any form.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>17. No Bots or Automation: Do not use automated scripts or bots to interact with the app.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>18. Listen to Moderators: Follow instructions given by app moderators or administrators.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>19. Be Responsible: Take responsibility for your actions and contributions.</Text>
          <Text style={stylesWelcomeScreen.welcomeBoxText}>20. Have Fun: Enjoy the app and the quizzes while respecting others' experiences.</Text>
        </View>

        <View style={stylesWelcomeScreen.welcomeBox}>
          <Text style={stylesWelcomeScreen.welcomeBoxHeaderText}>By continuing, you agree to abide by the following rules and guidelines.</Text>

          <View style={stylesWelcomeScreen.welcomeCheckBoxView}>
            <Switch
              trackColor={{ false: "#767577", true: "#54BF72" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={stylesWelcomeScreen.welcomeBoxText}>I know wtf im doing!</Text>
          </View>

          <TouchableOpacity onPress={handleContinue} disabled={!isEnabled}>
            <View style={isEnabled ? stylesWelcomeScreen.welcomeBoxButtonOn : stylesWelcomeScreen.welcomeBoxButtonOff}>
              <Text style={isEnabled ? stylesWelcomeScreen.welcomeBoxButtonOnText : stylesWelcomeScreen.welcomeBoxButtonOffText}>
                Let me thru the gates!
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>

    
  );
};

export default WelcomeScreen;