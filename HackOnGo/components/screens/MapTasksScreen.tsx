import React from 'react';
import { Component } from 'react';
import { View, Text} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';


export default class MapTasksScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Карта заданий'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Скрин Карта заданий.</Text>
      </View>
    );
  }
}