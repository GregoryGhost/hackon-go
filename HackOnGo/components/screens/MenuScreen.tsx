import React from 'react';
import { Component } from 'react';
import { View, Button } from 'react-native';
import {NavigationScreenProps} from 'react-navigation';


export default class MenuScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Главное меню'
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Выполнить задание"
          onPress={() => navigate('SortDevices')}
        />
      </View>
    );
  }
}