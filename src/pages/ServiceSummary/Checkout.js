import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { NativeBaseProvider, Radio, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Services extends Component {
    constructor() {
        super();
        this.state = {};
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
                        <Text style={CommonStyles.htitle}>Checkout</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>                   
                    <View style={[CommonStyles.container]}>
                        <View style={styles.mapbox}>
                            <Image source={require('../../assets/images/list3.jpg')} resizeMode="cover" style={styles.serviceimage} />
                            <View style={{width:160, paddingTop:10}}>
                                <Text style={styles.headingtop}>Content Writing</Text>
                                <Text style={[styles.grtext, CommonStyles.activetext]}>5* (25 Reviews)</Text>
                            </View>
                        </View>
                            <Text style={styles.grtext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                            <Text style={[styles.ptext, {marginBottom:30}]}>Expected Delivery date 16.3.2021</Text>
                       

                       <View style={[CommonStyles.rowbetween, styles.aligncenter]}>
                            <Text style={styles.grtext}>Subtotal</Text>
                            <Text style={styles.grtext}>500 $</Text>
                       </View>
                       <View style={[styles.flexborder, styles.aligncenter]}>
                            <Text style={styles.grtext}>Service fee</Text>
                            <Text style={styles.grtext}>70 $</Text>
                       </View>
                       <View style={[CommonStyles.rowbetween, styles.aligncenter]}>
                            <Text style={styles.boldtext}>Subtotal</Text>
                            <Text style={[styles.boldtext]}>570 $</Text>
                       </View>


                       <Text style={[styles.headingtop, {marginTop:40}]}>payment option</Text>
                        <Radio.Group name="myRadioGroup" accessibilityLabel="Payment options">
                            <Radio value="one" my={2}>
                                <Text style={styles.radiotext}>Credit card/ Debit Card</Text>
                            </Radio>

                            <Radio value="two" my={2}>
                                <Text style={styles.radiotext}>Netbanking</Text>
                            </Radio>
                            <Radio value="three" my={2} >
                                <Image source={require('../../assets/images/paypal.png')} resizeMode="contain" style={{ height: 24, width: 120 }} />
                            </Radio>
                            <Radio value="four" my={2}>
                                <Image source={require('../../assets/images/flutterwave.png')} resizeMode="contain" style={{ height: 24, width: 145 }} />
                            </Radio>
                            <Radio value="five" my={2}>
                                <Image source={require('../../assets/images/paystack.png')} resizeMode="contain" style={{ height: 24, width: 150 }} />
                            </Radio>
                        </Radio.Group>
                        <View style={{marginTop:30}}>
                            <TouchableOpacity style={CommonStyles.primarybutton}>
                                <Text style={CommonStyles.btntext}>Continue with credit/debit card</Text>
                            </TouchableOpacity>
                        </View>

                      
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}