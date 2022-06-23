import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { NativeBaseProvider, Checkbox } from 'native-base';
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
                        <Text style={CommonStyles.htitle}>Review & Finalize</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >

                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.h2]}>Review and finalize</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Kindly check one more time before submit and finalize.</Text>                      
                        
                         
                        <View style={styles.Bborder}>
                        <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />     
                            <View style={CommonStyles.formgroup}>
                                <Text style={[styles.formlabel, {marginBottom:0}]}>Service Title</Text>                               
                                <Text style={styles.smlabel}>Content Writing</Text> 
                            </View>
                          
                            <View style={[CommonStyles.formgroup, {marginBottom:0}]}>
                                <Text style={[styles.formlabel, {marginBottom:0}]}>Service Category</Text>                               
                                <Text style={styles.smlabel}>Graphic Design</Text>
                            </View>
                            </View>
                            <View style={styles.Bborder}>
                                <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Delivery Days</Text>                               
                                    <Text style={styles.smlabel}>25 Days </Text> 
                               </View>
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Number of Revisions</Text>                               
                                    <Text style={styles.smlabel}>5</Text> 
                               </View>
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Number of Initial Concepts</Text>                               
                                    <Text style={styles.smlabel}>2</Text> 
                               </View>
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Service Deliverables</Text>                               
                                    <Text style={styles.smlabel}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy </Text> 
                               </View>
                                <View style={[CommonStyles.formgroup, {marginBottom:0}]}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Project Price</Text>                               
                                    <Text style={styles.smlabel}>$250 (Fixed)</Text> 
                               </View>
                                                    
                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, {marginBottom:20}]}>Portfolio</Text>                               
                                <View style={[CommonStyles.row, {flexWrap:'wrap', marginRight:-43}]}>
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
                                <TouchableOpacity style={styles.imgbox}>
                                    <Image source={require('../../assets/images/list1.jpg')} resizeMode="cover" style={{width:'100%', height:150, borderRadius:9}} />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                                <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                      
                            </View>
                            <View style={styles.Bborder}>
                                <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                      
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Type of Project</Text>                               
                                    <Text style={styles.smlabel}>One-time project</Text> 
                                </View>
                                <View style={[CommonStyles.formgroup, {marginBottom:0}]}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Project summary</Text>
                                    <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntLorem ipsum dolor sit amet,</Text> 
                                </View>
                               
                                
                            </View>
                            
                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel]}>What do you need from client to start?</Text>                               
                                <Text style={styles.smlabel2}>Dummy Text Typing incididuntLorem ipsum.</Text> 
                                <Text style={styles.smlabel2}>Dummy Text Typing incididuntLorem.</Text> 
                                <Text style={styles.smlabel2}>Dummy Text Typing ipsum.</Text> 
                                <Text style={styles.smlabel2}>Dummy Text Typing incididuntLorem.</Text> 
                                <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                      
                            </View>

                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel, {marginBottom:0}]}>Maximum number of simultaneous projects</Text>                               
                                <Text style={styles.smlabel2}>How many projects can you handle at one time and still deliver great results?</Text> 
                                <Text style={styles.smlabel}>2</Text> 
                                <Image source={require('../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                      
                            </View>
                            <View style={styles.Bborder}>                                                   
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel, {marginBottom:0}]}>Copyright Notice</Text>                               
                                    <Text style={styles.smlabel}>By submitting your project, you declare that you either own or have rights to the material posted and that posting these materials does not infringe on any third party’s rights. You also acknowledge that you understand your project will be reviewed and evaluated by Gouruu equirements.</Text> 
                                </View>
                                <View style={CommonStyles.formgroup}>
                                    <Text style={[styles.formlabel]}>Terms of Service</Text>                               
                                    <View style={[CommonStyles.formgroup, {flexDirection:'row', paddingLeft:5}]}>
                                        <Checkbox  value="Terms of Service" accessibilityLabel="Terms of Service"
                                            defaultIsChecked     />
                                            <Text style={{fontSize:16, color:'#767676', marginLeft:10, marginTop:-3}}>I understand and agree to the Gouruu Terms of Service, including the User Agreement and Privacy Policy.</Text>
                                        </View>
                                    </View>
                                <View style={[CommonStyles.formgroup, {marginBottom:0}]}>
                                    <Text style={[styles.formlabel]}>Privacy Notice</Text>
                                    <View style={[CommonStyles.formgroup, {flexDirection:'row', paddingLeft:5}]}>
                                        <Checkbox  value="Privacy Notice" accessibilityLabel="Privacy Notice"
                                            defaultIsChecked     />
                                            <Text style={{fontSize:16, color:'#767676', marginLeft:10, marginTop:-3}}>By submitting this project and activating it, I understand that it will appear in gouruu search results visible to the general public and will show up in search engine results, even if my profile visibility is set to Private or Gouruu Users Only.</Text>
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
                                            <Text style={CommonStyles.btntext}>Submit</Text>
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

