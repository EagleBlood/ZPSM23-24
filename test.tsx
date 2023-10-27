import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

function App(): JSX.Element {
  const windowDimensions = useWindowDimensions();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonPress = (value: string) => {
    if (value === '') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch (error) {
        setResult('Invalid Input');
      }
    } else {
      setInput(input + value);
    }
  };

  const isLandscape = windowDimensions.width > windowDimensions.height;

  useEffect(() => {
    // Add any additional logic for orientation change here, if needed
  }, [isLandscape]);

  const landscapeStyles = isLandscape
    ? {
        container: styles.landscapeContainer,
        row: styles.landscapeRow,
        button: styles.landscapeButton,
        buttonSpecial: styles.landscapeButtonSpecial,
      }
    : {};

  return (
    <SafeAreaView style={[styles.container, landscapeStyles.container]}>
      <View style={styles.display}>
        <Text style={styles.inputText}>{input === '' ? '0' : input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={[styles.buttons, landscapeStyles.row]}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonSpecial, landscapeStyles.buttonSpecial]} onPress={() => handleButtonPress('*')}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonSpecial, landscapeStyles.buttonSpecial]} onPress={() => handleButtonPress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonSpecial, landscapeStyles.buttonSpecial]} onPress={() => handleButtonPress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, landscapeStyles.button]} onPress={() => handleButtonPress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonSpecial, landscapeStyles.buttonSpecial]} onPress={() => handleButtonPress('=')}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputText: {
    fontSize: 40,
  },
  resultText: {
    fontSize: 70,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  buttons: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  button: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 20,
  },
  buttonSpecial: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
  },
  buttonText: {
    fontSize: 30,
  },
  landscapeRow: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  landscapeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 20,
  },
  landscapeButtonSpecial: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 20,
  },
});

export default App;
