import React from 'react';
import { Component } from 'react';
import { View, Button, FlatList, ListRenderItem, FlatListProps } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ListItem } from 'react-native-elements';


export default class MenuScreen extends Component<NavigationScreenProps, any> {
  static navigationOptions = {
    title: 'Главное меню'
  };

  render() {
    const screens = [
      { key: "SortDevices" },
      { key: "AuthSocial" },
      { key: "InfoAboutPlayer" },
      { key: "ShopDevices" },
      { key: "MapTask" },
      { key: "Backpack" },
      { key: "SearchActiveObj" },
    ];
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={screens}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }

  renderItem = (item: { key: string }): JSX.Element => {
    const { navigate } = this.props.navigation;
    return <View style={{ flex: 2, flexDirection: "column", justifyContent: 'space-between', padding: 10 }}>
      <Button
        title={`Item: ${item.key}`}
        onPress={() => navigate(item.key)}
      />
    </View>
  }
}