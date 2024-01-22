import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { stylesHome as styles } from '../styles/stylesHome';
import {stylesDevice} from '../styles/stylesDevice';
import { BleManager, Device } from 'react-native-ble-plx';

function Devices() {
  const [device, setDevice] = useState({
    id: '00:13:AA:00:B4:62',
    serviceUUID: 'FFE0',
    characteristicUUID: 'FFE1',
  });
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const manager = new BleManager();

  useEffect(() => {
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
    return () => subscription.remove();
  }, []);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      if (device && device.name === 'GR_6') {
        console.log('Device found');
        manager.stopDeviceScan();
        device.connect();
        setDevices(prevDevices => [...prevDevices, device]);
      }
    });
  };

  const handleDevicePress = (device: Device) => {
    setSelectedDevice(device);
    console.log('Selected device', device);
    setDevice(prevDevice => ({ ...prevDevice, id: device.id }));
  };


  return (
    <View style={styles.body}>
      <View style={styles.itemsContainer}>
        <View style={stylesDevice.row}>
          <Text style={styles.menuText}>Search for devices</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.itemsGrid}
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDevicePress(item)}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Devices;