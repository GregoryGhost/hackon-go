import React from 'react';
import { Component } from 'react';
import { View, Text} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';


export default class AuthSocialScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Авторизация'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Скрин Авторизации игрока.</Text>
      </View>
    );
  }
}