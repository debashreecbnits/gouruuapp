
   
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
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
                        <View style={styles.reviewwrap}>
                                <View style={[CommonStyles.rowbetween, {marginBottom:25}]}>
                                    <Text style={[styles.headingtop,]}>Reviews</Text>
                                    <TouchableOpacity style={styles.ratebtn}>
                                        <Text style={{fontSize:16, textAlign:'center', color:'#242933'}}>
                                            Rate Here
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Dhiman Das</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt1.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Brain Lara</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt2.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Jublii Dhat</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Dhiman Das</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt1.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Brain Lara</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt2.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Jublii Dhat</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Dhiman Das</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt1.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Brain Lara</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>
                                <View style={styles.flexborder}>
                                    <Image style={{width:45,height:40, marginRight:10}} source={require('../../assets/images/avt2.png')} resizeMode="contain" />
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.rheading}>Jublii Dhat</Text>
                                        <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                    </View>
                                </View>


                            </View>
                        
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}