import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView, ImageBackground,ActivityIndicator
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiCallWithToken } from '../../Api';
import { ACCEPT_REJECT_JOB_PROPOSAL, NOTIFICATION_DETAILS } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import CommonStyles from '../../../CommonStyles';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

class NotificationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsArray: [],
            milestoneArray: [],
            userDetailsArray: [],
            showButtonsModal: false,
            type1: "Schedule",
            type2: "Appointment",
            showButtonsModalS: false,
            cancelValue: false,
            staticValue: false,
            userId: this.props?.userData?.userDetails?.data?.id,
            jobId: this.props?.navigation?.state?.params?.jobId,
            freelancerId: this.props?.navigation?.state?.params?.freelancerId,
            clientId: this.props?.navigation?.state?.params?.alldetails?.target_id,
            proposalId: this.props?.navigation?.state?.params?.alldetails?.link,
            acceptStatus: false,
            transactionId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.transactionid,
            statusStore: '',
            disabledIndicator: false,

        };
    }

    componentDidMount() {
        this.getNotificationDetails();
    }

    getNotificationDetails = async () => {


        var formData = new FormData();
        formData.append('freelancer_id', this.state.freelancerId);
        formData.append('job_id', this.state.jobId);

        await apiCallWithToken(NOTIFICATION_DETAILS, 'post', formData).then(res => {
            this.setState({
                userDetailsArray: res.data.message.user_list,
                detailsArray: res.data.message.proposal_list,
                milestoneArray: res.data.message.freelancer_milestonelist,
                statusStore: res?.data?.message?.freelancer_milestonelist[0]?.status,
            })
            console.log("res?.data?.message?",res.data.message)
        }).catch(err => {
            console.log("error==>", err);
        })
    }

    acceptProposal = (e) => {
        //let e = this.state.acceptItem
        this.setState({ acceptItem: item })
    }

    rejectProposal = async (item) => {
        this.setState({ disabledIndicator:true})
        var formData2 = new FormData();
        formData2.append('userid', this.state.userId);
        formData2.append('proposalid', this.state.proposalId);
        formData2.append('delivery_days', '10');
        formData2.append('action_type', 'reject');
        await apiCallWithToken(ACCEPT_REJECT_JOB_PROPOSAL, 'post', formData2).then(res => {
            this.setState({ disabledIndicator:false})
            console.log("reject res===>", res)
            this.getNotificationDetails();
        }).catch(err => {
            this.setState({ disabledIndicator:false})
            console.log("error==>", err);
        })
    }

    rejectProposalNew = async (item) => {
        //this.showAlert();
        var formData2 = new FormData();
        formData2.append('userid', this.state.userId);
        formData2.append('proposalid', this.state.proposalId);
        formData2.append('delivery_days', '10');
        formData2.append('action_type', 'reject');
        formData2.append('delete_milestone', 'delete');
        
        await apiCallWithToken(ACCEPT_REJECT_JOB_PROPOSAL, 'post', formData2).then(res => {
            //this.showAlert();
            this.props.navigation.navigate('AddMilestone', { freelancerId: this.state.freelancerId, clientId: this.state.clientId, jobId: this.state.jobId, proposalId: this.state.proposalId })
            this.getNotificationDetails();
        }).catch(err => {
            console.log("error==>", err);
        })
    }

    acceptProposal2 = async () => {
        this.setState({ disabledIndicator:true})
        var formData2 = new FormData();
        formData2.append('userid', this.state.userId);
        formData2.append('proposalid', this.state.proposalId);
        formData2.append('delivery_days', '10');
        formData2.append('action_type', 'accept');

        await apiCallWithToken(ACCEPT_REJECT_JOB_PROPOSAL, 'post', formData2).then(res => {
            this.setState({ disabledIndicator:false})
            this.setState({ acceptStatus: true })
            this.getNotificationDetails();
        }).catch(err => {
            this.setState({ disabledIndicator:false})
            console.log(err);
        })

    }




    showAlert = () =>{
        Alert.alert(
            "",
            "Do you want to add Milestone?",
            [
                {
                    text: "Yes",
                    //onPress: () => this.props.navigation.navigate('AddMilestone', { freelancerId: this.state.freelancerId, clientId: this.state.clientId, jobId: this.state.jobId, proposalId: this.state.proposalId }),
                    onPress:()=> this.rejectProposalNew(),
                    style: "cancel",
                },
                {
                    text: "No",
                    //onPress: () => this.acceptProposal2(),
                    //onPress: () => this.NewAlertttt(),
                    style: "cancel",
                },
            ],

        );
    }


    NewAlertttt = () =>
        Alert.alert(
            "",
            "You have to press REJECT button",
            [
                {
                    text: "OK",
                    //onPress: () => this.rejectProposal(),
                    style: "cancel",
                },
                // {
                //     text: "No",
                //     //onPress: () => this.acceptProposal2(),
                //     style: "cancel",
                // },
            ],

        );

    newAlert = () =>{
        // Alert.alert(
        //     "",
        //     "Do you want to add Milestone?",
        //     [
        //         {
        //             text: "Yes",
        //             onPress: () => this.addNewMilestone(),
        //             style: "cancel",
        //         },
        //         {
        //             text: "No",
        //             onPress: () => this.acceptProposal2(),
        //             style: "cancel",
        //         },
        //     ],

        // );
        this.acceptProposal2()
    }

    addNewMilestone = () =>
        Alert.alert(
            "",
            "You have to first reject existing milestone to add new",
            [
                {
                    text: "Ok",
                    style: "cancel",
                },
            ],

        );

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
        return (
            <View>
                {/* <SafeAreaView style={CommonStyles.wrapper}> */}
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Notification Details</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ScrollView>

                    <View style={CommonStyles.container}>
                        <View style={[CommonStyles.card]}>
                            <View style={[CommonStyles.cardcontent,]}>
                                <View style={[CommonStyles.postedrow]}>
                                    <Icon name="ios-time-outline" color="#777" size={14} />
                                    {/* <Text style={styles.msgtext}>Posted on: {moment(job__createdAt).format('LL')}</Text> */}
                                    {/* <Text style={styles.msgtext}>Posted on: {moment(data.job__createdAt).format('MMMM Do YYYY')}</Text> */}
                                    <Text style={CommonStyles.posttext}>Posted on: 16.02.2022</Text>
                                </View>

                                {this.state.detailsArray && this.state.detailsArray.length > 0 ? this.state.detailsArray.map((item, index) => (
                                    <View style={CommonStyles.flexrow}>
                                        {/* <Text style={[CommonStyles.para]}>Title: 
                                    {item.title}
                                    </Text> */}

                                        <Text style={[CommonStyles.para]}>Title:
                                            {item.title}
                                        </Text>
                                    </View>
                                )) : <></>
                                }

                                {this.state.userDetailsArray && this.state.userDetailsArray.length > 0 ? this.state.userDetailsArray.map((item, index) => (
                                    <View style={CommonStyles.flexrow}>
                                        <Text style={styles.dtextbold}>Application By: </Text>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('FreelancerProfileDetails', { freelancerId: item.user_id })}
                                        >
                                            {/* <Text style={[styles.dtext, CommonStyles.activetext]}> {data.freelancer__first_name}{" "}{data.freelancer__last_name}</Text>  */}
                                            {/* <Text style={styles.dtextbold}>{item.first_name}{' '}{item.last_name}</Text> */}
                                            <Text style={[styles.dtextbold, CommonStyles.activetext]}>{item.first_name}{' '}{item.last_name}</Text>
                                        </TouchableOpacity>

                                    </View>
                                )) : <></>
                                }

                                <View style={CommonStyles.flexrow}>
                                    <Text style={[CommonStyles.para]}>Reviews: 5</Text>

                                </View>
                            </View>
                        </View>



                        {this.state.milestoneArray && this.state.milestoneArray.length > 0 ? this.state.milestoneArray.map((item, index) => {
                            return (
                                <View key={index} style={[CommonStyles.card]}>
                                    <View style={[CommonStyles.cardcontent,]}>
                                        <Text style={styles.headingmain}>Proposed Milestone</Text>

                                        <Text style={[CommonStyles.para]}>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </Text>

                                        <>




                                            <View style={styles.namerow}>
                                                <Text style={CommonStyles.nametext}>Payment Request :</Text>
                                                <Text style={CommonStyles.namedata}>
                                                    {item.date}
                                                </Text>
                                            </View>
                                            <View style={styles.nameroweven}>
                                                <Text style={CommonStyles.nametext}>Desccription :</Text>
                                                <Text style={CommonStyles.namedata}>
                                                    {item.description}
                                                </Text>
                                            </View>
                                            <View style={styles.namerow}>
                                                <Text style={CommonStyles.nametext}>Milstone :</Text>
                                                <Text style={CommonStyles.namedata}>
                                                    {item.amount}
                                                </Text>
                                            </View>
                                            <View style={styles.nameroweven}>
                                                <Text style={CommonStyles.nametext}>Status :</Text>
                                                <Text style={CommonStyles.namedata}>
                                                    {item.status}
                                                </Text>
                                            </View>

                                            <View style={[CommonStyles.row, { marginBottom: 20, left: 10 }]}>



                                            </View>







                                        </>

                                    </View>
                                </View>

                            )

                        }) :
                            <Text>No data found yet</Text>

                        }

                        {/* 
                           <View style={[CommonStyles.row, { marginBottom: 70 }]}>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity
                                    disabled={item.status === 'accept' ? true : false}
                                    // onPress={item.status==='reject'?this.showAlert:this.showAlert}
                                    onPress={item.status === 'reject' ? this.showAlert : this.newAlert}
                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{item.status === 'accept' ? "ACCEPTED" : "ACCEPT"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity
                                    disabled={item.status === 'reject' || item.status === 'accept' ? true : false}
                                    onPress={this.rejectProposal}
                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{item.status === 'reject' ? 'REJECTED' : 'REJECT'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View> 
                        */}
                    </View>

                    <View >
                        <TouchableOpacity
                            disabled={this.state.statusStore === 'reject' || this.state.statusStore === 'accept' ? true : false}
                            //onPress={this.rejectProposalNew}
                            onPress={this.showAlert}
                            style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>REJECT MILESTONE</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={[CommonStyles.row, { marginBottom: 70, padding: 10 }]}>
                        <View style={CommonStyles.col50}>
                            <TouchableOpacity
                                disabled={this.state.statusStore === 'accept' || this.state.statusStore === 'reject' ? true : false}
                                // onPress={this.state.statusStore==='reject'?this.showAlert:this.showAlert}

                                onPress={this.state.statusStore === 'reject' ? this.showAlert : this.newAlert}

                                style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                    {this.state.disabledIndicator === true ?
                                    (<ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                    ) : (
                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{this.state.statusStore === 'accept' ? "ACCEPTED" : "ACCEPT"}</Text>
                                    )}
                               
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.col50}>
                            <TouchableOpacity
                                disabled={this.state.statusStore === 'reject' || this.state.statusStore === 'accept' ? true : false}
                                onPress={this.rejectProposal}
                                style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}
                                >
                                {this.state.disabledIndicator === true ?
                                    (<ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                    ) : (
                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{this.state.statusStore === 'reject' ? 'REJECTED' : 'REJECT'}</Text>
                                    )}
                                
                                
                              

                            </TouchableOpacity>
                        </View>




                    </View>



                </ScrollView>






            </View>
        );

    }
}
const mapStateToProps = (state) => {

    return {
        userData: state,
    };
};


export default connect(mapStateToProps, null)(NotificationDetails);
