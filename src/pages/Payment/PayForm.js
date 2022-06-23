import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, Checkbox, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class PaymentPage extends Component {
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
                        <Text style={CommonStyles.htitle}>Payment Method</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding ,{marginBottom:30}]}>Credit card/ Debit Card</Text>                      
                        
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="Enter Card no" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Card No</Text>
                                </View>
                            </View>
                         <View style={[CommonStyles.row]}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput style={CommonStyles.formcontrol} placeholder="" placeholderTextColor="#ccc" />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Expiry Date</Text>
                                        </View>
                                        <Text style={{fontSize:13, paddingLeft:10, color:'#767676'}}>validity of your card</Text>
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput style={CommonStyles.formcontrol} placeholder="" placeholderTextColor="#ccc" />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>CVV</Text>
                                        </View>
                                        <Text style={{fontSize:13, paddingLeft:10, color:'#767676'}}>Displayed back side on your card</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={CommonStyles.formgroup}>
                                <TextInput style={CommonStyles.formcontrol} placeholder="Eg: Jone Doe" placeholderTextColor="#ccc" />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Name on Card</Text>
                                </View>
                            </View>

                            
                            <View style={[CommonStyles.formgroup,]}>
                                <TouchableOpacity style={CommonStyles.primarybutton}>
                                    <Text style={CommonStyles.btntext}>Pay Now</Text>
                                </TouchableOpacity>
                            </View> 
                            <View style={[CommonStyles.formgroup, {flexDirection:'row', paddingLeft:5}]}>
                            <Checkbox  value="Save this Card" accessibilityLabel="save card"
                                defaultIsChecked     />
                                <Text style={{fontSize:18, color:'#767676', marginLeft:10, marginTop:-3}}>Save This Card</Text>
                            </View>
                            <View style={[CommonStyles.formgroup, {flexDirection:'row', paddingLeft:5}]}>
                            <Checkbox  value="Save this" accessibilityLabel="save card" />
                                <Text style={{fontSize:18, color:'#767676', marginLeft:10, marginTop:-3}}>Save this card as primary</Text>
                            </View>
                        
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}



