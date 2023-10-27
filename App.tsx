import React, {useState, Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
import Orientation from 'react-native-orientation';

class YourComponent extends Component {
    componentDidMount() {
      // Add orientation change event listener
      Orientation.addOrientationListener(this.handleOrientationChange);
    }
  
    componentWillUnmount() {
      // Remove the orientation change event listener
      Orientation.removeOrientationListener(this.handleOrientationChange);
    }
  
    handleOrientationChange = (orientation: string) => {
      if (orientation === 'LANDSCAPE') {
        // Device is in landscape mode, you can show the second View
        this.setState({ isLandscape: true });
      } else {
        // Device is in portrait mode, hide the second View
        this.setState({ isLandscape: false });
      }
    }
}



function App(this: any): JSX.Element {
    const windowDimensions = useWindowDimensions();
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonPress = (value: string) => {
        if (value === '') {
            setInput('');
            setResult('');
        } else if (value === '=') {
            try {
                const modifiedInput = input
                    .replace(/\^/g, '**')
                    .replace(/x!/g, 'calculateFactorial')
                    .replace(/log10\(/g, 'Math.log10(')
                    .replace(/π/g, 'Math.PI')
                    .replace(/sqrt\(/g, 'Math.sqrt(');
                const evalResult = eval(modifiedInput);
                setResult(evalResult.toString());
            } catch (error) {
                setResult('Invalid Input');
            }
        } else {
            setInput(input + value);
        }
    };
    
    // Function to calculate factorial
    const calculateFactorial = (num: number): number => {
        if (num === 0 || num === 1) {
            return 1;
        } else {
            return num * calculateFactorial(num - 1);
        }
    };

    const isLandscape = windowDimensions.width > windowDimensions.height;


    const landscapeStyles = isLandscape
        ? {
            container: styles.landscapeContainer,
            row: styles.landscapeButtons,
            inputText: styles.landscapeInputText,
            resultText: styles.landscapeResultText
        }
        : {};

    return (
        <SafeAreaView style={[styles.container, landscapeStyles.container]}>
            <View style={styles.display}>
                <Text style={[styles.inputText, landscapeStyles.inputText]}>
                    {
                        input === ''
                            ? '0'
                            : input
                    }
                </Text>
                <Text style={[styles.resultText, landscapeStyles.resultText]}>{result}</Text>
            </View>

            <View style={styles.container4Buttons}>
                <View style={[styles.buttons, landscapeStyles.row]}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>AC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSpecial}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSpecial}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('/')}>
                            <Text style={styles.buttonText}>/</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('7')}>
                            <Text style={styles.buttonText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('8')}>
                            <Text style={styles.buttonText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('9')}>
                            <Text style={styles.buttonText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('*')}>
                            <Text style={styles.buttonText}>x</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('4')}>
                            <Text style={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('5')}>
                            <Text style={styles.buttonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('6')}>
                            <Text style={styles.buttonText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('-')}>
                            <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('1')}>
                            <Text style={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('2')}>
                            <Text style={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('3')}>
                            <Text style={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('+')}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('0')}>
                            <Text style={styles.buttonText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleButtonPress('.')}>
                            <Text style={styles.buttonText}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('=')}>
                            <Text style={styles.buttonText}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                {isLandscape && (
                <View style={styles.buttons}>
                    
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('(')}>
                            <Text style={styles.buttonText}>(</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress(')')}>
                            <Text style={styles.buttonText}>)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>mc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>m+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>mc-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>mr</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>2nd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('^2')}>
                            <Text style={styles.buttonText}>x^2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('^3')}>
                            <Text style={styles.buttonText}>x^3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('^')}>
                            <Text style={styles.buttonText}>x^y</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>e^x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>10^</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>1/x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('sqrt(')}>
                            <Text style={styles.buttonText}>√2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>√3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('sqrt(')}>
                            <Text style={styles.buttonText}>√x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('log10(')}>
                            <Text style={styles.buttonText}>log10</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('!')}>
                            <Text style={styles.buttonText}>!x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>sin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>cos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>tan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>EE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>Rad</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>sinh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>cosh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>tanh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('π')}>
                            <Text style={styles.buttonText}>π</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSpecial}
                            onPress={() => handleButtonPress('')}>
                            <Text style={styles.buttonText}>Rand</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container4Buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
    },


    inputText: {
        fontSize: 30
    },
    resultText: {
        fontSize: 50,
        color: 'black'
    },
    container: {
        flex: 1
    },

    display: {
        padding: 20,
    },
    buttons: {
        flex: 1,
        backgroundColor: 'red',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'white',
        
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        flexGrow: 1,
    },
    buttonSpecial: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        flexGrow: 1,
    },
    buttonText: {
        fontSize: 20
    },




    landscapeContainer: {
        flex: 1
    },
    landscapeButtons: {
        flex: 1,
        backgroundColor: 'white',
    },

    landscapeInputText: {
        fontSize: 20
    },
    landscapeResultText: {
        fontSize: 40,
        color: 'black'
    }
});

export default App;
