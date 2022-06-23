import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class ProjectCreation extends Component {
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
                        <Text style={CommonStyles.htitle}>Pricing</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.h2]}>Fill the below form to procced</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>It will help to understand the requirment.</Text>                      
                        
                         <View style={[CommonStyles.row, {paddingTop:20}]}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <Text style={styles.formlabel}>Delivery Days</Text>
                                        <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <Text style={styles.formlabel}>Project Type</Text>
                                        <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                                    </View>
                                </View>
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Number of Revisions</Text>
                                <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Number of Initial Concepts</Text>
                                <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Number of milestones</Text>
                                <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Service cost</Text>
                                <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Service Deliverables</Text>
                                <TextInput style={[styles.inputform, {height:90}]} placeholder="Enter Deliverables" placeholderTextColor="#ccc" />
                              </View>
                            

                            <View style={CommonStyles.row}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn} >
                                            <Text style={CommonStyles.outlinetext}>back</Text>
                                        </TouchableOpacity>
                                    </View> 
                                </View>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TouchableOpacity style={CommonStyles.primarybutton} >
                                            <Text style={CommonStyles.btntext}>Continue</Text>
                                        </TouchableOpacity>
                                    </View> 
                                </View>
                            </View>                           
                        
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}

