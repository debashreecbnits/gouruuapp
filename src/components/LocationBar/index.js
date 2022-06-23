import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput, } from 'react-native';
import CommonStyles from '../../../CommonStyles';

export default class LocationBar extends Component {
    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>
                <View style={CommonStyles.barwrap}>
                    <Image source={require('../../assets/images/location.png')} resizeMode="contain" style={CommonStyles.licon} />
                    <TextInput style={[CommonStyles.dottedsearch]} placeholder="Lagos,Nigeria" placeholderTextColor="#ddd" />
                    <TouchableOpacity style={CommonStyles.ricon}>
                    {/* <Image source={require('../../assets/images/bell.png')} resizeMode="contain" style={{width:22, height:28}} /> */}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
