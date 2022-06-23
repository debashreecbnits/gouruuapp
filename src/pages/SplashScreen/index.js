import React, { Component } from 'react';
import { View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';

export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Landing');
    }, 2500);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>      
       <StatusBar translucent  backgroundColor={'transparent'} barStyle="light-content" /> 
        
          <ImageBackground source={require('../../assets/images/splash.png')} resizeMode="stretch" style={{ flex:1, height:'100%', width:'100%' }} ></ImageBackground>
      
      </SafeAreaView>
    );
  }
}
