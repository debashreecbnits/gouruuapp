
   
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, Select, CheckIcon, KeyboardAvoidingView} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Help extends Component {
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
                        <Text style={CommonStyles.htitle}>Help & Support</Text>
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
                        <Text style={[styles.pageheding]}>We are here to help You</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Let us know how we can help.</Text> 
                           
                            <View style={CommonStyles.formgroup}>    
                                <View style={[CommonStyles.formcontrol, {width:'100%', paddingBottom:0, paddingTop:3}]}>                 
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="account type"
                                            placeholder="Select one"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="Client" value="Client" />
                                            <Select.Item label="Service Provider" value="freelancer" />                                           
                                        </Select>
                                    </View>      
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Choose account type</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>    
                                <View style={[CommonStyles.formcontrol, {width:'100%', paddingBottom:0, paddingTop:0}]}>                 
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="Payment Issues"
                                            placeholder="Select one"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="Payment issues" value="pay" />
                                            <Select.Item label="Account issues" value="account" />                                            
                                            <Select.Item label="Others" value="Others" />
                                    </Select>
                                    </View>      
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>What can we help you with?</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>    
                                <View style={[CommonStyles.formcontrol, {width:'100%', paddingBottom:0, paddingTop:0}]}>                 
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="Payment Issues"
                                            placeholder="Select one"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="Payment related" value="pay" />
                                            <Select.Item label="order updates" value="account" />                                            
                                            <Select.Item label="Others" value="Others" />
                                    </Select>
                                    </View>      
                                <View style={[CommonStyles.formtextwrap,{width:'92%'}]}>
                                    <Text style={[CommonStyles.formtext, ]}>What kind of issue are you having with this order?</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>    
                                <View style={[CommonStyles.formcontrol, {width:'100%', paddingBottom:0, paddingTop:0}]}>                 
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="order-status"
                                            placeholder="Select one"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="I want to cancel my order" value="cancel" />
                                            <Select.Item label="I want refund" value="refund" />                                            
                                            <Select.Item label="Others" value="Others" />
                                    </Select>
                                    </View>      
                                <View style={[CommonStyles.formtextwrap]}>
                                    <Text style={[CommonStyles.formtext, ]}>what do you want with?</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={[CommonStyles.formcontrol, {height:90}]} placeholder="Write Here" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Description</Text>
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
