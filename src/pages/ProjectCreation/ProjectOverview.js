import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { NativeBaseProvider, Select, CheckIcon } from 'native-base';
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
                        <Text style={CommonStyles.htitle}>Project Overview</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.h2]}>Project Overview</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Start The Project quotation</Text>                      
                        
                         
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Name of project</Text>
                                <TextInput style={styles.inputform} placeholder="" placeholderTextColor="#ccc" />
                            </View>
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Type of work</Text>
                                <View style={styles.inputform}>
                                    <Select style={{width:'100%', fontSize:16, color:'#242933'}}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="work type"
                                            placeholder="choose Type of work"
                                            _selectedItem={{
                                                bg: "indigo.600",
                                                endIcon: <CheckIcon size={5} />,
                                              }} >

                                            <Select.Item label="Full Time" value="full time" />
                                            <Select.Item label="Part Time" value="part time" />
                                            <Select.Item label="Hourly basis" value="Hourly" />
                                            <Select.Item label="Fixed Price" value="Fixed" />
                                    </Select>
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

