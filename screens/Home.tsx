import React, {useState} from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {stylesHome} from '../styles/stylesHome';
import { StackNavigationProp } from '@react-navigation/stack';
import {stylesDevice} from '../styles/stylesDevice';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type RootStackParamList = {
    Home: undefined;
    Devices: undefined;
  };

  function Home({ navigation}: Props): React.JSX.Element {

        const menuOffset = useSharedValue(0);
        const [name, setName] = useState('');
        const [place, setPlace] = useState('');
        const [command, setCommand] = useState('');

        const [modalVisible, setModalVisible] = useState(false);

        const [items, setItems] = useState<{ name: string; desc: string }[]>([]);

        const addItem = (name : string, place : string, command : string) => {
            setItems([
              ...items, {
                name,
                desc: command
              }
            ]);
            setModalVisible(false);
        
            sendCommand('00:13:AA:00:B4:62', 'FFE0', 'FFE1', command);
          };

        const manager = new BleManager();

        const sendCommand = async (deviceId: string, serviceUUID: string, characteristicUUID: string, command: string) => {
            try {
              // Connect to the device
              const device = await manager.connectToDevice(deviceId);
              console.log('Connected to device', device.id);
          
              // Discover all services and characteristics
              await manager.discoverAllServicesAndCharacteristicsForDevice(deviceId);
              console.log('Discovered all services and characteristics');
          
              const base64Command = Buffer.from(command).toString('base64');
              await manager.writeCharacteristicWithResponseForDevice(
                deviceId,
                serviceUUID,
                characteristicUUID,
                base64Command
              );
              console.log('Command sent');
          
              // Disconnect from the device
              await manager.cancelDeviceConnection(deviceId);
              console.log('Disconnected from device', deviceId);
            } catch (error) {
              console.log('Failed to send command', error);
            }
          };


        return (
            <GestureHandlerRootView style={{
                    flex: 1
                }}>
                <SafeAreaView style={stylesHome.body}>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={stylesHome.centeredView}>
                            <View style={stylesHome.modalView}>
                                <Text style={stylesHome.modalText}>Create new command for device</Text>
                                <TextInput
                                    style={stylesHome.modalInput}
                                    placeholder="Name"
                                    onChangeText={setName}/>
                                <TextInput
                                    style={stylesHome.modalInput}
                                    placeholder="Place"
                                    onChangeText={setPlace}/>
                                <TextInput
                                    style={stylesHome.modalInput}
                                    placeholder="Command"
                                    onChangeText={setCommand}/>

                                <View style={stylesHome.modalButtons}>
                                    <TouchableOpacity
                                        style={stylesHome.buttonClose}
                                        onPress={() => addItem(name, place, command)}>
                                        <Text style={stylesHome.textStyle}>Add</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={stylesHome.buttonClose}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={stylesHome.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <View style={{
                            flex: 1
                        }}>
                        <ScrollView>
                            <View style={stylesHome.itemsContainer}>
                                <View style={stylesDevice.row}>
                                    <Text style={stylesHome.menuText}>Commands</Text>
                                </View>
                                
                                <View style={stylesHome.itemsGrid}>
                                    {
                                        [
                                            ...items, {
                                                name: '+',
                                                desc: ''
                                            }
                                        ]
                                            .reduce((acc, item, index) => {
                                                if (index % 2 === 0) {
                                                    acc.push([item]);
                                                } else {
                                                    acc[acc.length - 1].push(item);
                                                }
                                                return acc;
                                            }, [])
                                            .map((pair, index) => (
                                                <View key={index} style={stylesHome.items}>
                                                    {
                                                        pair.map((item, index) => (
                                                            <TouchableOpacity
                                                            key={index}
                                                            style={stylesHome.item}
                                                            onPress={() => {
                                                                if (item.name === '+') {
                                                                setModalVisible(true);
                                                                } else {
                                                                sendCommand('00:13:AA:00:B4:62', 'FFE0', 'FFE1', item.desc);
                                                                }
                                                            }}>
                                                            <Text style={stylesHome.itemName}>{item.name}</Text>
                                                            {item.name === '+' ? <View /> : <Text style={stylesHome.itemDesc}>{item.desc}</Text>}
                                                            </TouchableOpacity>
                                                        ))
                                                    }
                                                </View>
                                            ))
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    
                </SafeAreaView>
            </GestureHandlerRootView>

            
        );
    }

    export default Home;