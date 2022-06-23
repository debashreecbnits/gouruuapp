import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, Image, TextInput, } from 'react-native';
import CommonStyles from '../../../CommonStyles';

export default class SearchBar extends Component {
    render() {
        return (
            
            <View style={CommonStyles.barwrap}>                   
                <TextInput style={[CommonStyles.searchbartop]} placeholder="Search Freelancer”" placeholderTextColor="#ddd" />
                <TouchableOpacity style={CommonStyles.ricon}>
                <Image source={require('../../assets/images/search.png')} resizeMode="contain" style={{width:22, height:28}} />
                </TouchableOpacity>
            </View>
        );
    }
}
