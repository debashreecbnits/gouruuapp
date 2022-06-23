import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles'

export default class Details extends Component {
      constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>                
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Transection Details</Text>  
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>     
                <ScrollView>     
                    <View style={CommonStyles.container}>
                        <View style={[styles.transectionbox, {borderBottomColor:'transparent', marginBottom:40}]}>                            
                            <View style={styles.centercontent}>
                                <Text style={styles.headingmain} numberOfLines={1} >ID: #1234567890</Text>
                                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    <Text style={styles.msgtext}> 6 June at 8.45 pm</Text>
                                </View>    
                                <View style={[styles.statusbox1]}>
                                    <Text style={[styles.stext,]}>Ongoing</Text>
                                </View>                                   
                            </View>
                            <View style={styles.tdeatils}>
                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor, sed diam voluptua.</Text>                         
                                <View style={styles.trow}>
                                    <Text style={styles.dtextbold}>Transaction Amount</Text>
                                    <Text style={styles.dtext}>R 2000</Text>
                                </View>
                                <View style={styles.trow}>
                                    <Text style={styles.dtextbold}>Paid Amount</Text>
                                    <Text style={styles.dtext}>R 1500</Text>
                                </View>
                                <View style={styles.trow}>
                                    <Text style={styles.dtextbold}>balance Amount</Text>
                                    <Text style={styles.dtext}>R 500</Text>
                                </View>
                            </View>  
                        </View>

                        <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.primarybutton}>
                                    <Text style={CommonStyles.btntext}>Check Milestone</Text>
                                </TouchableOpacity>
                            </View> 
                        <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.outlinebtn}>
                                    <Text style={CommonStyles.outlinetext}>Go Back</Text>
                                </TouchableOpacity>
                            </View> 
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
