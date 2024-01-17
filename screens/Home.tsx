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
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {stylesHome} from '../styles/stylesHome';
import MyTab from '../components/BottomBar'

function Home(): React
    .JSX
    .Element {

        const menuOffset = useSharedValue(0);
        const [name, setName] = useState('');
        const [place, setPlace] = useState('');
        const [command, setCommand] = useState('');

        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: menuOffset.value
                    }
                ]
            };
        });

        const textAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: menuOffset.value >= 100
                    ? 1
                    : 0
            };
        });

        const gestureHandler = useAnimatedGestureHandler({
            onStart: (_, ctx) => {
                ctx.startY = menuOffset.value;
            },
            onActive: (event, ctx : any) => {
                menuOffset.value = ctx.startY + event.translationY;
            },
            onEnd: (_) => {
                if (menuOffset.value >= 100) {
                    menuOffset.value = withSpring(100);
                } else {
                    menuOffset.value = withSpring(0);
                }
            }
        });

        const [modalVisible, setModalVisible] = useState(false);

        const [items, setItems] = useState < {
            name: string;
            desc: string
        }[] > ([
            {
                name: 'Item 1',
                desc: 'desc'
            }, {
                name: 'Item 2',
                desc: 'desc'
            }
        ]);

        const addItem = (name : string, place : string, command : string) => {
            setItems([
                ...items, {
                    name,
                    desc: command
                }
            ]);
            setModalVisible(false);
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

                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View style={[stylesHome.menuBar, animatedStyle]}>
                            <Animated.View
                                style={[
                                    stylesHome.menuHiddenItems, {
                                        top: menuOffset.value >= 100
                                            ? 0
                                            : -100,
                                        bottom: menuOffset.value >= 100
                                            ? 0
                                            : '100%'
                                    }
                                ]}>
                                <View style={stylesHome.menuSelect}>
                                    <Text style={stylesHome.menuText}>Device:</Text>
                                    <Text style={stylesHome.menuDeviceText}>/name/</Text>
                                </View>
                                <View style={stylesHome.menuSelect}>
                                    <TouchableOpacity>
                                        <Text style={stylesHome.menuText}>Connect to new device</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>

                            <View style={stylesHome.menuSelect}>

                                <Text style={stylesHome.menuText}>Commands</Text>

                            </View>
                        </Animated.View>
                    </PanGestureHandler>

                    <View style={{
                            flex: 1
                        }}>
                        <ScrollView>
                            <View style={stylesHome.itemsContainer}>
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
                                                              onPress={() => item.name === '+'
                                                                  ? setModalVisible(true)
                                                                  : null}>
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