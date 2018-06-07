import React from 'react';
import { Component } from 'react';
import { View, Text} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';


export default class InfoAboutPlayerScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Информация об игроке'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Скрин Информация об игроке.</Text>
      </View>
    );
  }
}