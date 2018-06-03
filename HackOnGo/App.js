/**
 * Entry point of App
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import SortDevicesScreen from './components/screens/SortDevicesScreen';
import { createStackNavigator } from 'react-navigation';

class MenuScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Menu Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator({
  Menu: MenuScreen,
  SortDevices: SortDevicesScreen,
},
  {
    initialRouteName: 'SortDevices',
  }
);

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}