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

class MenuScreen extends Component {
  static navigationOptions = {
    title: 'Главное меню'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Выполнить задание"
          onPress={() => this.props.navigation.navigate('SortDevices')}
        />
      </View>
    );
  }
}

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