import React, { Component } from 'react';
import {
    View, Text, Image, } from 'react-native';
import { NativeBaseProvider,} from 'native-base';
import styles from './Styles';

export default class PostRequest extends Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <NativeBaseProvider style={{flex:1}}>
                <View style={styles.wrapper}>
                <View style={{flex:1}}>
                            <Image source={require('../../../assets/images/Icon-suitcase.png')} style={{width:100, height:80, marginLeft:'auto', marginRight:'auto'}} resizeMode="contain" />
                            <Text style={styles.jtext}>Your Job Request has Successfully Submitted</Text>
                        </View>
                </View>
                        
            </NativeBaseProvider>
        );
    }
}

