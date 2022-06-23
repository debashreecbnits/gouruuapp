import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, } from 'react-native';
import { NativeBaseProvider, Avatar, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import {GET_TESTIMONY} from '../../shared/allApiUrl'
import { apiCallWithOutToken } from '../../Api';
import moment from "moment"


export default class Testimonials extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: {},
            testimony:[],
        };
    }

componentDidMount(){
    this.getTestimonials();
}

    getTestimonials = async () => {
        await apiCallWithOutToken(GET_TESTIMONY, 'get').
            then((res) => {
                this.setState({testimony:res.data.Data});
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }

    render() {
        return (
            <ImageBackground source={require('../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg} style={{flex:1}}>
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Testimonials</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding, {marginBottom:20}]}>What our customers are saying</Text> 
                        {this.state.testimony && this.state.testimony.length>0 ? this.state.testimony.map((item,index)=>{
                            return (
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.flexrow}>
                                    <Avatar bg="amber.500" source={require('../../assets/images/list1.jpg')} > </Avatar>
                                    <View style={{paddingLeft:15, width:'85%'}}>
                                        <Text style={styles.unmae}>{item.first_name + ' '  + item.last_name}</Text>
                                    </View>
                                </View>
                                <View style={{width:'100%', marginTop:5}}>
                                    <Text style={styles.para}>{item.description}</Text>
                                </View>
                            </View>
                            <View style={styles.cardfooter}>
                                <Text style={styles.ptext}>{moment(item.createdAt).format('LL')}</Text>
                            </View>
                        </View>
                            )}):<Text>No notification found</Text>}
                    </View>
                </ScrollView>
            </NativeBaseProvider>
            </ImageBackground>
        );
    }
}

