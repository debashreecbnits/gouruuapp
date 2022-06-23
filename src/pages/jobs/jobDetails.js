import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api';
import { GET_JOB_DETAILS } from '../../shared/allApiUrl';
import Loader from "../../components/Loader";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId: this.props?.navigation?.state?.params?.postId,
            userId: this.props?.navigation?.state?.params?.userId,
            postDetails: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.getJobDetails()
    }


    getJobDetails = async () => {
        this.setState({ isLoading: true })
        var formData = new FormData();
        formData.append('post_id', this.state?.jobId);
        await apiCallWithToken(GET_JOB_DETAILS, 'post', formData).
            then((resp) => {
                console.log("GET JOB DETAILS RES ====", resp)
                this.setState({ postDetails: resp?.data?.data?.post, isLoading: false })
                console.log("post details store ==>", this.state.postDetails)
                console.log("expertise ==>", this.state.postDetails.expertise[0])
                console.log("props value==>", this.props)
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log("get err", err);
            })
    }

    render() {
        return (
            <NativeBaseProvider style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Jobs Details</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {this.state.isLoading ?
                        <Loader /> :
                        <View style={[CommonStyles.container, { backgroundColor: '#f2f2f2' }]}>

                            <View style={[styles.joblistwrap]}>
                                <View style={[styles.listwrap]}>
                                    
                                <TouchableOpacity style={{ marginLeft:"90%" }} onPress={() => this.props.navigation.goBack()}>
                                                <AntDesign name="closecircle" color="#2827CC" size={30} />
                                            </TouchableOpacity>
                                            
                                    <Text style={styles.ptext}>Posted 2 months ago</Text>
                                    <Text style={styles.headingtop}>Looking for {this.state.postDetails?.title}</Text>

                                    <Text style={styles.pageheding}>Required Skills </Text>

                                    <View style={[CommonStyles.tagswrap, { paddingVertical: 6 }]}>
                                        <View style={CommonStyles.filltags}>
                                            <Text style={CommonStyles.tagtext}>{this.state?.postDetails?.expertise}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.pageheding}>Job Description </Text>
                                    <Text style={styles.litext}>{this.state?.postDetails?.description}</Text>


                                    <View style={[{ marginTop: 15 }]}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('ApplyJobs', { userId: this.state.userId, jobId: this.state.jobId })}
                                            style={CommonStyles.primarybutton}>
                                            <Text style={CommonStyles.btntext}>Apply</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    }
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
