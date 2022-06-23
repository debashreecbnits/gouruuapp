import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
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
                        <Text style={CommonStyles.htitle}>Project Gallery</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.h2]}>Create a stunning image gallery</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Upload images (JPEG or PNG) that are under 10 MB and have a 4:3 aspect ratio.</Text>                      
                        
                        <View style={[CommonStyles.row, {flexWrap:'wrap'}]}>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity style={styles.imgbox}>
                                    <Image source={require('../../assets/images/list1.jpg')} resizeMode="cover" style={{width:'100%', height:150, borderRadius:9}} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity style={styles.imgbox}>
                                    <Image source={require('../../assets/images/list3.jpg')} resizeMode="cover" style={{width:'100%', height:150, borderRadius:9}} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity style={styles.imgbox}>
                                    <Image source={require('../../assets/images/list2.jpg')} resizeMode="cover" style={{width:'100%', height:150, borderRadius:9}} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity style={styles.uploadpic}>
                                    <Image source={require('../../assets/images/gallery.png')} resizeMode="cover" style={{width:45, height:45,}} />
                                    <Text style={{fontSize:15, color:'#666'}}>Click here to upload</Text>                                    
                                </TouchableOpacity>
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

