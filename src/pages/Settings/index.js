import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { NativeBaseProvider, Avatar, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: {}
        };
    }

    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <View style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Settings</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <View style={styles.ullist}>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Account Setting</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Documents</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Payment method</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Nofification</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>My Address</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>My Favorites</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>My Coupons</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lilist}>
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/images/angle-right.png')} resizeMode="contain" style={{width:10, height:17}} />
                                </TouchableOpacity>
                                <View style={styles.siconbox}>
                                    <Icon name="ios-trash" color="#777" size={24} />
                                </View>
                                <TouchableOpacity style={styles.sheadbox}>
                                    <Text style={styles.pageheding}>Language</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                       
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}

