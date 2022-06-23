import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView, ImageBackground
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiCallWithToken } from '../../Api';
import {ACCEPT_REJECT_JOB_PROPOSAL, FREELANCER_MYFEED} from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import CommonStyles from '../../../CommonStyles';
import { backgroundColor } from 'styled-system';




class MyFeedDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsArray: [],
            jobId:this.props?.navigation?.state?.params?.jobId,
            freelancerId:this.props?.navigation?.state?.params?.freelancerId,
            milestoneDetails: [],
            proposalId:[],
            startStatusStore:''
        };
    }




    componentDidMount() {
        this.myFeedDetails()
        

    }

    myFeedDetails = async () => {

        var formData = new FormData();
        let userId = this.props.userData.userDetails.data.id

        //formData.append('user_id',this.state.freelancerId);
        formData.append('user_id',userId);
        formData.append('job_id',this.state.jobId);
        console.log("JOBID+++++",formData);
        await apiCallWithToken(FREELANCER_MYFEED, 'post', formData)
            .then((resp) => {
                console.log("MY FEED DETAILS++++++++++++++",resp)
                if(resp.data.message.client_milestone_accept && resp.data.message.client_milestone_accept.length > 0){
                this.setState({ milestoneDetails: resp.data.message.client_milestone_accept });
                console.log("If part ==>",this.state.milestoneDetails)
                }
                else{
                this.setState({ milestoneDetails: resp.data.message.freelancer_milestone_accept });
                console.log("Else part ==>",this.state.milestoneDetails)
                //this.setState({ proposalId: resp.data.message.freelancer_milestone_accept });
                }
            }).catch(err => {
                console.log(err)
            })

    }


    // acceptProposalOnlyFeedNotification = async() => {
    //     console.log("FUNCTION HIT+++++++++++")
    //     var formData = new FormData();
    //     formData.append('user_id',this.state.freelancerId);
    //     formData.append('job_id',this.state.jobId);
    //     console.log("START JOB+++++FORMDATA",formData)
    //     await apiCallWithToken('myfeed_notification', 'post', formData)
    //         .then((resp) => {
    //             console.log("START JOB++++++++RES",resp)
    //             this.props.navigation.navigate('Dashboard');
              
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }


    acceptProposal = async() => {
        var formData = new FormData();
        formData.append('userid',this.state.freelancerId);
        // if (this.state?.milestoneDetails) 
        // {
        //     this.state.milestoneDetails.map(item =>
              formData.append('proposalid', this.state.milestoneDetails[0].proposal_id),
        //     );
        //   }
          formData.append('action_type','accept');
          formData.append('delivery_days',10);
        await apiCallWithToken('accept_reject_job_proposal/', 'post', formData)
            .then((resp) => {
                console.log("accept resp==>",resp)
                if(resp.data.status === 1){
                    this.myFeedDetails();
                    // var formData2 = new FormData();
                    // formData2.append('user_id',this.state.freelancerId);
                    // formData2.append('job_id',this.state.jobId);
                    // apiCallWithToken('myfeed_notification', 'post', formData)
                    //     .then((resp) => {
                    //           console.log("start resp==>",resp)
                    //           this.props.navigation.navigate('Dashboard');
                          
                    //     }).catch(err => {
                    //         console.log(err)
                    //     })
                }
              
            }).catch(err => {
                console.log(err)
            })
    }

    rejectProposal = async() => {
        console.log("REJECT FUNCTION+++++++++++++++++++++=")
        var formData = new FormData();
        formData.append('userid',this.state.freelancerId);
        // if (this.state?.milestoneDetails) 
        // {
        //     this.state.milestoneDetails.map(item =>
              formData.append('proposalid', this.state.milestoneDetails[0].proposal_id),
        //     );
        //   }
          formData.append('action_type','reject');
          formData.append('delivery_days',10);
        await apiCallWithToken('accept_reject_job_proposal/', 'post', formData)
            .then((resp) => {
                console.log("reject proposal==>",resp)
                this.myFeedDetails();
              
            }).catch(err => {
                console.log(err)
            })
    }

    startProposal = async() => {
       var formData2 = new FormData();
                    formData2.append('user_id',this.state.freelancerId);
                    formData2.append('job_id',this.state.jobId);
                    console.log("formData2===>",formData2)
                    apiCallWithToken('myfeed_notification', 'post', formData2)
                        .then((resp) => {
                              console.log("start resp==>",resp)
                              //this.props.navigation.navigate('Dashboard');
                          
                        }).catch(err => {
                            console.log(err)
                        })
    }

    

    render() {
        console.log("FEED DETAILS++++++JOB ID",this.state.jobId)
        return (
            <View style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>My Feed Details</Text>
                    </View>

                </ImageBackground>
                
                <ScrollView>
                    <View style={CommonStyles.container}>
                        {this.state.milestoneDetails && this.state.milestoneDetails.length>0? this.state.milestoneDetails.map((item, index) => 
                        (
                            <View key={index} style={[styles.transectionbox, CommonStyles.card2]}>
                            <View style={[styles.centercontent,]}>
                            <View style={CommonStyles.flexrow}>
                            <Text style={styles.headingmain}>Proposed Milestone By :</Text>
                            <TouchableOpacity
                             //onPress={() => this.props.navigation.navigate('FreelancerProfile',{ userId:this.state.userDetailsArray})}
                            >
                                <Text style={[styles.dtextbold, CommonStyles.activetext]}> ABCDEFGH </Text>
                                </TouchableOpacity>
                                </View>
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
                                        {/* {this.state.paymentDetails && this.state.paymentDetails.length != 0 ? this.state.paymentDetails.map((item, index) => {
                                    return ( */}

                                        <View style={CommonStyles.col502}>
                                            
                                        </View>
                                        
                                            <View style={CommonStyles.col502}>
                                                
                                            </View>
                                         

                                    </View>

                                </>

                            </View>
                        </View>
                        ))
                    :
                    (
                        <View>
                        <Text>NO DATA FOUND</Text>
                        </View>
                    )
                        }



                    </View>





                </ScrollView>
   

                <View  style={[CommonStyles.row, { marginBottom: 70 }]}>
                    {this.state.milestoneDetails[0]?.status != "Accepted" ?
                    <>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity
                                    onPress={() => 
                                        //this.state.milestoneDetails.status='Pending'?
                                        this.acceptProposal()
                                        //:
                                    //this.acceptProposalOnlyFeedNotification()
                                }
                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}> ACCEPT</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.col50}>
                                <TouchableOpacity
                                    //disabled= {true}
                                    onPress={()=>this.rejectProposal()}
                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0}]}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>REJECT</Text>

                                </TouchableOpacity>
                            </View>
                            </>
                              :
                            <View style={[CommonStyles.col50]}>
                                <TouchableOpacity
                                    //disabled= {true}
                                    onPress={() => this.startProposal()}
                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, {width:380,justifyContent:'center',alignItems:'center',margin:2,left:1}]}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>START</Text>

                                </TouchableOpacity>
                            </View>
    }
                </View> 
                        


            </View>
        );

    }
}
const mapStateToProps = (state) => {

    return {
        userData: state,
    };
};


export default connect(mapStateToProps)(MyFeedDetails);