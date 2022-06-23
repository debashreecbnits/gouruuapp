
   
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView,} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';


export default class Support extends Component {
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
                        <Text style={CommonStyles.htitle}>Support</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <ScrollView>
                    <View style={CommonStyles.container}> 
                        <Text style={[styles.pageheding]}>We Are Here For You</Text>                      
                        <Text style={[styles.ptext, {marginBottom:20}]}>Let us know how we can help.</Text> 
                            
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Customer Support</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>support@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Sales Inquiries</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>sales@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Press Inquiries</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>press@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Investors</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>investors@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Partnerships</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>partners@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardbody}>
                                <Text style={styles.pageheding}>Enterprise Solutions</Text>
                                <TouchableOpacity>
                                    <Text style={styles.supportmail}>solutions@gouruu.com</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
