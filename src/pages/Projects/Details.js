import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, ImageBackground
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api';
import { GET_PROJECT_DETAILS, ESCROW_RELEASE } from '../../shared/allApiUrl';
import FlutterWavePayment from '../../components/FlutterWavePayment/index';
import { connect } from 'react-redux';

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetails: {},
            flutterValue: true,
            jobid: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.projectId,
            userid: this.props && this.props?.userData && this.props?.userData?.userDetails && this.props?.userData?.userDetails?.data?.id,
            fundreleaseStatus: "",
            transactionId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.transactionid
        };
    }

    componentDidMount() {
        this.getProjectDetails()
    }


    getProjectDetails = async () => {
        var formData = new FormData();
        formData.append('post_id', this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.projectId);
        await apiCallWithToken(GET_PROJECT_DETAILS, 'post', formData).then(res => {
            if (res.status = 200) {
                this.setState({ projectDetails: res?.data?.data });
            }
        }).catch(err => {
            console.log(err);
        })

    };
    escrowFunc = () => {

        const dataa = {
            transactionid: this.state.transactionId
        }
        apiCallWithToken(ESCROW_RELEASE, 'post', dataa).then(res => {
            if (res.status = 200) {
                //this.setState({ projectDetails: res?.data?.data }); 
            }
        }).catch(err => {
            console.log(err);
        })

    };


    render() {
        const { projectDetails } = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>               
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Details</Text>
                    </View>
                </ImageBackground>
                <View style={[CommonStyles.row, { backgroundColor: "#fff", marginLeft: 5, marginRight: 5 }]}>
                    <View style={CommonStyles.col50}>
                        <TouchableOpacity style={[CommonStyles.outlinebtn, CommonStyles.btnsm]}
                            //onPress={() => this.getFlutterwave() }
                            onPress={() => this.props.navigation.navigate('FlutterWavePayment', { jobid: this.state.jobid, userid: this.state.userid })}>
                            <Text style={[CommonStyles.outlinetext, CommonStyles.btnsmtext]}>Payment </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[CommonStyles.col50]}>
                        <TouchableOpacity style={[CommonStyles.outlinebtn, CommonStyles.btnsm]}
                            onPress={() => this.escrowFunc()}
                        >
                            <Text style={[CommonStyles.outlinetext, CommonStyles.btnsmtext]}>Fund Release </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={CommonStyles.container}>
                        <View style={[CommonStyles.productrow]}>
                            <View style={[CommonStyles.card, styles.h100]}>

                                <View style={styles.rhead}>
                                    <Text style={styles.rtext}>{projectDetails?.data?.category ? projectDetails?.data?.category?.category_name : 'No category'}</Text>
                                </View>
                                <View style={CommonStyles.cardcontent}>
                                    <Text style={CommonStyles.pheading}>{projectDetails?.title ? projectDetails?.title : 'No Title'}</Text>
                                    <Text style={styles.ptext}>{projectDetails?.description ? projectDetails?.description : 'No description'}  </Text>
                                    {projectDetails?.h_rate_min || projectDetails?.h_rate_max ?
                                        <Text style={{ fontWeight: 'bold', color: '#242933' }}>
                                            Hourly : $ {projectDetails?.h_rate_min ? projectDetails?.h_rate_min : 0}- $ {projectDetails?.h_rate_max ? projectDetails?.h_rate_max : 0}
                                        </Text>
                                        :
                                        <Text style={{ fontWeight: 'bold', color: '#242933' }}>
                                            Fixed Price : $ {projectDetails?.fixed_rate ? projectDetails?.fixed_rate : 0}
                                        </Text>
                                    }
                                    <View style={[CommonStyles.row, { marginTop: 15 }]}>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity style={[CommonStyles.outlinebtn, CommonStyles.btnsm]} onPress={() => this.props.navigation.goBack()}>
                                                <Text style={[CommonStyles.outlinetext, CommonStyles.btnsmtext]}>Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Status</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = state => {
    return {
        userData: state,
    };
};



export default connect(mapStateToProps)(ProjectDetails);