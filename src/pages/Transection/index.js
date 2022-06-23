import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles'

export default class Transaction extends Component {
      constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>                
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Transections List</Text>  
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('TransactionDetails')}>
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>     
                <ScrollView>     
                    <View style={CommonStyles.container}>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #1234567890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox, {backgroundColor:'#28a745'}]}>
                                    <Text style={[styles.stext, {color:'#fff'}]}>Completed</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #1299967890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox, {backgroundColor:'#f00'}]}>
                                    <Text style={[styles.stext, {color:'#fff'}]}>Cancelled</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #1234567890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox, {backgroundColor:'#28a745'}]}>
                                    <Text style={[styles.stext, {color:'#fff'}]}>Completed</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #12890bgdf</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox, {backgroundColor:'#ffc107'}]}>
                                    <Text style={[styles.stext]}>Pending</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #12345sd67890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox,]}>
                                    <Text style={[styles.stext]}>Ongoing</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transectionbox}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #1234567890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox, {backgroundColor:'#28a745'}]}>
                                    <Text style={[styles.stext, {color:'#fff'}]}>Completed</Text>
                                </View>                            
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
