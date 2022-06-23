import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, 
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import SearchBar from '../../components/Searchbar/index';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>FAQ</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>                    
                        <View style={CommonStyles.container}>
                            <View style={CommonStyles.topbar}>                               
                                <SearchBar />
                            </View>                

                            <View style={styles.faqlist}>
                                <Text style={styles.headingtop}>FAQ</Text>

                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>
                                    <View style={styles.faqbody}>
                                        <Text style={CommonStyles.para}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>

                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity> 
                                        
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                       <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
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
