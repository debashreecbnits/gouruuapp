
   
import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, Select, CheckIcon, KeyboardAvoidingView} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Contactus extends Component {
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
                        <Text style={CommonStyles.htitle}>Support</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView style={{flex:1}}>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding]}>Contact On Gouruu</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>We want to hear from you. Let us know how we can help.</Text> 
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="eg: Jhone Doe" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Full Name</Text>
                                </View>
                            </View>
                           
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="jhone@example.com" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Email Id</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>    
                                <View style={[CommonStyles.formcontrol, {width:'100%', paddingBottom:0, paddingTop:3}]}>                 
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="General Quiries"
                                            placeholder="Select one"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="Customer Support" value="Contact" />
                                            <Select.Item label="Press Inquiries" value="Press" />
                                            <Select.Item label="Sales Inquiries" value="Sales" />
                                            <Select.Item label="Partnerships" value="Partnerships" />
                                            <Select.Item label="Others" value="Others" />
                                    </Select>
                                    </View>      
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>General Quiries</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={[CommonStyles.formcontrol, {height:90}]} placeholder="Write Here" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Query</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.primarybutton}>
                                    <Text style={CommonStyles.btntext}>Submit</Text>
                                </TouchableOpacity>
                            </View> 
                        
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </NativeBaseProvider>
        );
    }
}
