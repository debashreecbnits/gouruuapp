import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, ImageBackground
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Style';
import CommonStyles from '../../../CommonStyles';

export default class ProfileSetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleFreelancer : this.props?.navigation?.state?.params?.toggleFreelancer,
            toggleUserType : this.props?.navigation?.state?.params?.toggleUserType,
            USERID: this.props?.navigation?.state?.params?.USERID,
            Token: this.props?.navigation?.state?.params?.Token,
        };
    }

    render() {
        console.log("UIDINDEX+++++++++=",this.props?.navigation?.state?.params?.USERID)
        return (
            <NativeBaseProvider style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}
                >
                
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Setup Profile</Text>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={[CommonStyles.container, { backgroundColor: '#f2f2f2' }]}>
                        <View style={[CommonStyles.card, {flex:1}]}>
                            <View style={styles.cardbody}>
                                    <Text style={styles.pageheding}>Getting Started</Text>
                                    <Text style={styles.litext}>How would you like to fill your profile?</Text>
                                    <Text style={styles.ptext}>To speed this up you can connect your linkedin account or upload your resume. You can edit after importing.</Text>

                                    <View style={styles.btnbox}>
                                                <TouchableOpacity style={[CommonStyles.linkdinbtn, styles.mb15]} onPress={() => this.props.navigation.navigate('ServiceDetails')}>
                                                    <Text style={[CommonStyles.linkdintext]}> Continue with Linkedin Profile</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[CommonStyles.outlinebtn, styles.mb15]} onPress={() => this.props.navigation.navigate('ServiceDetails')}>
                                                    <Text style={[CommonStyles.outlinetext]}> Upload Your Resume</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[CommonStyles.outlinebtn, styles.mb15]} onPress={() => this.props.navigation.navigate('ProfileStep',this.state)}>
                                                    <Text style={[CommonStyles.outlinetext]}> Fill Out Manually</Text>
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
