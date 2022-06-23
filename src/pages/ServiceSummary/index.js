import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,  ScrollView, 
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
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
                        <Text style={CommonStyles.htitle}>Service Summary</Text>
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

                        <View style={{marginTop:30}}>
                            <TouchableOpacity style={CommonStyles.primarybutton}>
                                <Text style={CommonStyles.btntext}>Continue to Check out</Text>
                            </TouchableOpacity>
                        </View>

                      
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}

