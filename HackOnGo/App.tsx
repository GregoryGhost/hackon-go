/**
 * Entry point of App
 */

import React from 'react';
import { Component } from  'react';
import {
  Animated,
  Button,
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
import MenuScreen from './components/screens/MenuScreen';

const RootStack = createStackNavigator({
  Menu: MenuScreen,
  SortDevices: SortDevicesScreen,
},
  {
    initialRouteName: 'Menu',
  }
);

export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}