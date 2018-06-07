import React from 'react';
import { Component } from 'react';
import { View, Text} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';


export default class SearchActiveObjScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Поиск активирующего объекта'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Скрин Поиск активирующего объекта.</Text>
      </View>
    );
  }
}