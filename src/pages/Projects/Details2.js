import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView, ImageBackground
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { apiCallWithToken } from '../../Api';
import { ACCEPT_REJECT_JOB_PROPOSAL, NOTIFICATION_DETAILS, GET_PROJECT_DETAILS, ESCROW_RELEASE } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import CommonStyles from '../../../CommonStyles';


class ProjectDetails2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsArray: [],
            milestoneArray: [],
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
            //transactionId: this.props?.navigation?.state?.params?.transactionId,
            projectDetails: {},
            freelancerName: '',
            paymentDetails: [],
            escrowDetails: [],
            amount:'',
            milestoneId:'',

        };
    }




    componentDidMount() {
        //this.getMilestoneDetails()
        this.props.navigation.addListener('didFocus', () => {
            this.getMilestoneDetails();
          });

    }



    getPayMentText = (id) => {
        let paidArray = this.state.paymentDetails;
        var item  = paidArray.find(item => item.milestone_id === id);       
        
        if(item) {
            return "PAID";
        } else {
            return "PAY";
        }
    }

    getButton = (id) => {
        let paidArray = this.state.paymentDetails;
        var item  = paidArray.find(item => item.milestone_id === id);        
        if(item) {
            return true;
        } else {
            return false;
        }
    }

    getEscrowRelease = (id) => {
        let paidArray = this.state.paymentDetails;
        var item  = paidArray.find(item => item.milestone_id === id);
        
        if(item) {
            if(item.is_active === true)
            {
            return 'RELEASE';
            }
            else{
                return 'RELEASED';
            }
        } 
        
        else {
            return 'RELEASE';
        }
    }

    getReleaseColor = (id) => {
        let paidArray = this.state.paymentDetails;
        var item  = paidArray.find(item => item.milestone_id === id);
        
        if(item) {
            return 'blue';
        } else {
            return 'grey';
        }
    }

    getReleaseButton = (id) => {
        let paidArray = this.state.paymentDetails;
        var item  = paidArray.find(item => item.milestone_id === id );
        
        if(item) {
            if(item.is_active === true)
            {
            return false;
            }
            else{
                return true;
            }
        } 
        else {
            return true;
        }
    }

   
    


    getMilestoneDetails = async () => {

        var formData = new FormData();
        formData.append('freelancer_id', this.state.freelancerId);
        formData.append('job_id', this.state.jobId);
        await apiCallWithToken(NOTIFICATION_DETAILS, 'post', formData).then(res => {
            this.setState({ milestoneArray: res?.data?.message?.acceptmilestone_list })
            this.setState({ freelancerName: res?.data?.message?.user_list?.first_name })
            this.setState({ paymentDetails: res?.data?.message?.payment_list })
            this.setState({ escrowDetails: res?.data?.message?.payment_list })
        }).catch(err => {
            console.log("error==>", err);
        })
    }


    escrowFunc = () => {

        // const dataa = {
        //     transaction_id: this.props?.navigation?.state?.params?.transactionId
        // }
        var formData = new FormData();
        formData.append('transaction_id', this.props?.navigation?.state?.params?.transactionId);

        



        apiCallWithToken(ESCROW_RELEASE, 'post', formData).then(res => {

            if (res.status = 200) {
                this.getMilestoneDetails();
            }
        }).catch(err => {
            console.log(err);
        })

    };

    showAlert = () =>
    Alert.alert(
        "",
        "Bank account details is missing please fill up for future purpose.",
        [
            {
                text: "Ok",
                onPress: () => this.props.navigation.navigate('BankDetails', { jobId: this.state.jobId}),
                //onPress: () => this.props.navigation.navigate('AddMoney'),
                style: "cancel",
            },
            {
                text: "Cancel",
                //onPress: () => this.acceptProposal2(),
                //onPress: () => this.NewAlertttt(),
                style: "cancel",
            },
        ],

    );

    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Project Details</Text>
                    </View>

                </ImageBackground>
                <ScrollView>



                    <View style={CommonStyles.container}>

                        {this.state.milestoneArray && this.state.milestoneArray.length > 0 ? this.state.milestoneArray.map((item, index) => 
                        (
                            
                            <View key={index} style={[styles.transectionbox, CommonStyles.card2]}>
                                <View style={[styles.centercontent,]}>
                                <View style={CommonStyles.flexrow}>
                                <Text style={styles.headingmain}>Proposed Milestone By :</Text>
                                <TouchableOpacity
                                 onPress={() => this.props.navigation.navigate('FreelancerProfile',{ userId:this.state.userDetailsArray})}
                                >
                                    <Text style={[styles.dtextbold, CommonStyles.activetext]}> {this.state.freelancerName}</Text>
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
                                                <TouchableOpacity
                                                    disabled={this.getButton(item.id)}
                                                    onPress={this.showAlert}
                                                    //onPress={() => this.props.navigation.navigate('FlutterWavePayment', { jobid: this.state.jobId, userid: this.state.userId, freelancerId: this.state.freelancerId, amount:item.amount, milestoneId:item.id })}
                                                    style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}
                                                >
                                                    {/* <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{this.getPayMentText(item.id)}</Text> */}
                                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>PAY</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                                {/* <View style={CommonStyles.col502}>
                                                    <TouchableOpacity
                                                        disabled={this.getReleaseButton(item.id,item.is_active)}
                                                        //onPress={this.rejectProposal}
                                                        onPress={() => this.escrowFunc()}
                                                        style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 } , {backgroundColor:this.getReleaseColor(item.id)}]}>
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>{this.getEscrowRelease(item.id)}</Text>

                                                    </TouchableOpacity>
                                                </View> */}
                                             

                                        </View>

                                    </>

                                </View>
                            </View>


                        )) :
                            <Text>No accepted job found yet</Text>}

                    </View>





                </ScrollView>


            </SafeAreaView>
        );

    }
}
const mapStateToProps = (state) => {

    return {
        userData: state,
    };
};


export default connect(mapStateToProps, null)(ProjectDetails2);