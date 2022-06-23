import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { NativeBaseProvider, Radio, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Payment extends Component {
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
                        <Text style={styles.pageheding}>we accept multiple payment option</Text>
                        <Radio.Group name="myRadioGroup" accessibilityLabel="Payment options">
                            <Radio value="one" my={2}>
                                <Text style={styles.radiotext}>Credit card/ Debit Card</Text>
                            </Radio>

                            <Radio value="two" my={2}>
                                <Text style={styles.radiotext}>Netbanking</Text>
                            </Radio>
                            <Radio value="three" my={2}>
                                <Image source={require('../../assets/images/paypal.png')} resizeMode="contain" style={{ height: 24, width: 120 }} />
                            </Radio>
                            <Radio value="four" my={2}>
                                <Image source={require('../../assets/images/flutterwave.png')} resizeMode="contain" style={{ height: 24, width: 145 }} />
                            </Radio>
                            <Radio value="five" my={2}>
                                <Image source={require('../../assets/images/paystack.png')} resizeMode="contain" style={{ height: 24, width: 150 }} />
                            </Radio>
                        </Radio.Group>

                        <View style={[CommonStyles.formgroup, {marginTop:50}]}>
                                <TouchableOpacity style={CommonStyles.primarybutton} onPress={()=>this.props.navigation.navigate('PaymentPage')}>
                                    <Text style={CommonStyles.btntext}>Continue</Text>
                                </TouchableOpacity>
                            </View> 
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}

