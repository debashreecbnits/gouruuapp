import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Alert, ImageBackground } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import {apiCallWithOutToken} from '../../Api';
import {INSERT_TESTIMONY} from '../../shared/allApiUrl';
import CommonStyles from '../../../CommonStyles';


export default class AddTestimonial extends Component {
    constructor() {
        super();
        this.state = {
            userDetails: {},
            firstName: '',
            lastName: '',
            email: '',
            title: '',
            review: '',

        };
    }

    submitTestimony = async() => {
            var formData = new FormData();
            formData.append('first_name', this.state.firstName);
            formData.append('last_name', this.state.lastName);
            formData.append('title', this.state.title);
            formData.append('email', this.state.email);
            formData.append('description', this.state.review);
            await apiCallWithOutToken(INSERT_TESTIMONY, 'post', formData).then(res => {
                //setLoader(false);
                Alert.alert("TESTIMONY HAS BEEN CREATED");
                this.props.navigation.navigate("Testimonials");
            }).catch(err => {
                setLoader(false);
                console.log(err)
            })
    }

    

    render() {
        return (
            <ImageBackground source={require('../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg} style={{flex:1}}>
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Add Testimonials</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding]}>Your Opinions Matter to Us</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>It only takes a minute! And your review will help us to grow and serve you better.</Text>                      
                        
                         <View style={[CommonStyles.row, {paddingTop:20}]}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput 
                                        style={CommonStyles.formcontrol} 
                                        placeholder="Jhone" 
                                        placeholderTextColor="#ccc" 
                                        value={this.state.firstName}
                                        onChangeText={text => this.setState({firstName: text})}
                                        />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>First Name</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TextInput 
                                        style={CommonStyles.formcontrol} 
                                        placeholder="Doe" 
                                        placeholderTextColor="#ccc" 
                                        value={this.state.lastName}
                                        onChangeText={text => this.setState({lastName: text})}
                                        />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Last Name</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput 
                                style={CommonStyles.formcontrol} 
                                placeholder="jhone@example.com" 
                                placeholderTextColor="#ccc" 
                                value={this.state.email}
                                onChangeText={text => this.setState({email: text})}
                                />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Email Id</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput 
                                style={CommonStyles.formcontrol} 
                                placeholder="Occupation" 
                                placeholderTextColor="#ccc" 
                                value={this.state.title}
                                onChangeText={text => this.setState({title: text})}
                                />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Title of the Review</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TextInput 
                                style={[CommonStyles.formcontrol, {height:90}]} 
                                placeholder="Write Here" 
                                placeholderTextColor="#ccc" 
                                value={this.state.review}
                                onChangeText={text => this.setState({review: text})}
                                />
                                <View style={CommonStyles.formtextwrap}>
                                    <Text style={CommonStyles.formtext}>Reviews</Text>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.primarybutton} onPress={() => this.submitTestimony()}>
                                    <Text style={CommonStyles.btntext}>Submit</Text>
                                </TouchableOpacity>
                            </View> 
                    </View>
                </ScrollView>
            </NativeBaseProvider>
            </ImageBackground>
        );
    }
}

