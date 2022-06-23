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
                        <Text style={CommonStyles.htitle}>Project Description</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.h2]}>Project Description</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Discribe your project </Text>                      
                        
                         
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Project summary Briefly explain what sets you and your project apart.</Text>
                                <TextInput style={[styles.inputform, {height:90}]} placeholder="Write Here" placeholderTextColor="#ccc" />
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <View>
                                        <Text style={styles.grtext}>0/1200 characters (min. 120)</Text>
                                        <TouchableOpacity style={{marginTop:10}}>
                                                <Text style={[styles.boldtext]}>+ Add Step</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Step Name</Text>
                                <TextInput style={[styles.inputform]} placeholder="Write Here" placeholderTextColor="#ccc" />
                               
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Step Description</Text>
                                <TextInput style={[styles.inputform, {height:90}]} placeholder="Write Here" placeholderTextColor="#ccc" />
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <View>
                                        <Text style={styles.grtext}>0/250 characters (min. 50)</Text>

                                        <TouchableOpacity style={{marginTop:10}}>
                                                <Text style={[styles.boldtext]}>Remove step</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                            
                            

                            <View style={[CommonStyles.row, {marginTop:30}]}>
                                <View style={CommonStyles.col50}>
                                    <View style={CommonStyles.formgroup}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn} >
                                            <Text style={CommonStyles.outlinetext}>Back</Text>
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

