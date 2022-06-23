import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView,} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Feed extends Component {
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
                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                            <Image source={require('../../assets/images/menu.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Manage Request</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}>                       
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text Type testing Industry</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={CommonStyles.card}>
                            <View style={styles.cardbody}>                               
                                <View style={CommonStyles.rowbetween}>
                                    <View style={{width:'85%'}}>
                                        <Text style={styles.pageheding}>Project Name</Text>
                                        <Text style={styles.ptext}>Lorem Ipsum Dummy Text</Text>
                                    </View>

                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={28} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}



