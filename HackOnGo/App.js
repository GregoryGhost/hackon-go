/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
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

import SortDevices from './components/screens/SortDevicesScreen';


export default class App extends Component {
  render() {
    return (
      <SortDevices />
    );
  }
}