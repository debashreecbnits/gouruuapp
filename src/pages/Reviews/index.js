import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Reviews extends Component {
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
                        <Text style={CommonStyles.htitle}>Reviews</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding]}>Your Opinions Matter to Us</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>It only takes a minute! And your review will help other job seekers.</Text>                      
                        
                         <View style={[CommonStyles.row, {paddingTop:20}]}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput style={CommonStyles.formcontrol} placeholder="Jhone" placeholderTextColor="#ccc" />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>First Name</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput style={CommonStyles.formcontrol} placeholder="Doe" placeholderTextColor="#ccc" />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Last Name</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="jhone@example.com" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Email Id</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="Occupation" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Occupation</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={[CommonStyles.formcontrol, {height:90}]} placeholder="Write Here" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Feedback</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.primarybutton} onPress={() => this.props.navigation.navigate('SignUpNext')}>
                                    <Text style={CommonStyles.btntext}>Submit Feedback</Text>
                                </TouchableOpacity>
                            </View> 
                        
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}



