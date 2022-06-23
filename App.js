import React, { Component } from 'react';
import {
  SafeAreaView, StatusBar, AppRegistry,
  StyleSheet, View, Platform
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { store, persistor } from './src/Store/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox, YellowBox } from "react-native";

console.disableYellowBox = true;
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {

    const MyStatusBar = ({ backgroundColor, ...props }) => (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
          <StatusBar backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
      </View>
    );
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex:1}}>
            <MyStatusBar backgroundColor="#5828fa" barStyle="light-content"   />
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  statusBar: {   
    ...Platform.select({
      ios: {
        height: STATUSBAR_HEIGHT,
      },
     
    })
  },
});

AppRegistry.registerComponent('App', () => DarkTheme);
