import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView,ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles'
import { apiCallWithToken } from '../../Api';
import { GET_PROPOSAL_DETAILS, ACCEPT_REJECT_JOB_PROPOSAL } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import moment from 'moment';
import Loader from '../../components/Loader';


class ProposalsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId: this.props?.navigation?.state?.params?.job_id ? this.props?.navigation?.state?.params?.job_id : this.props?.navigation?.state?.params?.jobId ? this.props?.navigation?.state?.params?.jobId : this.props?.navigation?.state?.params?.jobIdd,
            userid: this.props?.userData?.userDetails?.data?.id,
            proposalListArray: [],
            actionType: this.props?.navigation?.state?.params?.actionType,
            deliveryDays: this.props?.navigation?.state?.params?.deliveryDays,
            proposalId: this.props?.navigation?.state?.params?.proposalId,
        };
    }

    componentDidMount() {
        this.getProposalDetails()
    }


    getProposalDetails = async () => {
        this.setState({ isLoading: true })
        var formData = new FormData();
        formData.append('userid', this.state.userid);
        formData.append('jobid', this.state.jobId);
        await apiCallWithToken(GET_PROPOSAL_DETAILS, 'post', formData).then(res => {
            if (res.status == 200) {
                this.setState({ proposalListArray: res.data.Data, isLoading: false })
            }

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })

        })


    }

    acceptProposal = async () => {
        var formData2 = new FormData();
        formData2.append('userid', this.state.userid);
        formData2.append('proposalid', this.state.proposalId);
        formData2.append('delivery_days', this.state.deliveryDays);
        formData2.append('action_type', this.state.actionType);
        await apiCallWithToken(ACCEPT_REJECT_JOB_PROPOSAL, 'post', formData2).then(res => {
        }).catch(err => {
            console.log(err);
        })

    }


    render() {
        const { proposalListArray } = this.state
        return (
            <SafeAreaView style={CommonStyles.wrapper}>
                <View>
                {/* <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Proposals</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View> */}

                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Proposals</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ScrollView>
                    {proposalListArray && proposalListArray.length ? proposalListArray.map((data, index) => {
                        return (


                            <View style={CommonStyles.container}>
                                {/* <View style={[CommonStyles.row, { marginBottom: 20 }]}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Add Milstone</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, { marginTop: 0 }]}>
                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Accept Milstone</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View> */}
                                <View style={styles.transectionbox}>
                                    <View style={styles.centercontent}>
                                        <View style={[CommonStyles.flexrow]}>
                                            <Icon name="ios-time-outline" color="#777" size={14} />
                                            {/* <Text style={styles.msgtext}>Posted on: {moment(job__createdAt).format('LL')}</Text> */}
                                            <Text style={CommonStyles.para}>Posted on: {moment(data.job__createdAt).format('MMMM Do YYYY')}</Text>
                                        </View>
                                        <Text style={styles.headingmain}>{data.job__title}</Text>

                                        <View style={CommonStyles.namerow}>
                                            <Text style={CommonStyles.nametext}>Application By: </Text>
                                            <TouchableOpacity>
                                                <Text style={[CommonStyles.namedata, CommonStyles.activetext]}> {data.freelancer__first_name}{" "}{data.freelancer__last_name}</Text>
                                            </TouchableOpacity>

                                        </View>
                                        <View style={CommonStyles.flexrow}>
                                            <Text style={[CommonStyles.para]}>{data.category} </Text>
                                            <Text style={[CommonStyles.para]}>({data.rating}) {data.review} Reviews</Text>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.transectionbox}>
                                    <View style={styles.centercontent}>
                                        <Text style={styles.headingmain}>Description</Text>
                                        <Text style={[CommonStyles.para]}>{data.overview}</Text>
                                    </View>
                                </View>
                                {data.payment_type === "Project" ?
                                    <View style={styles.transectionbox}>
                                        <View style={styles.centercontent}>
                                            <Text style={styles.headingmain}>Proposed price</Text>
                                            <View style={styles.pbox}>
                                                <Text style={styles.dtextbold}>${data.amount}</Text>
                                            </View>
                                        </View>
                                    </View> : null
                                }

                                {data.payment_type === "Milestone" ?
                                    <View style={[CommonStyles.flexrow, styles.mb2]}>
                                        <View style={styles.centercontent}>
                                            <Text style={styles.headingmain}>Proposed Milestone</Text>

                                            <Text style={[CommonStyles.para]}>sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </Text>

                                            <>
                                                {data?.milestone && data?.milestone?.length > 0 ? data.milestone.map((item, idx) => (
                                                    <View style={styles.paybox} key={idx}>
                                                        <View style={[CommonStyles.rowbetween, styles.mb2]}>
                                                            <Text style={styles.dtextbold}>Payment Request </Text>
                                                            <Text style={[styles.dtext]}>{moment(item.date).format('MMMM Do YYYY')}</Text>
                                                        </View>
                                                        <View style={[CommonStyles.rowbetween, styles.mb2]}>
                                                            <Text style={styles.dtextbold}>Description</Text>
                                                            <Text style={[styles.dtext]}>{item.description}</Text>
                                                        </View>
                                                        <View style={[CommonStyles.rowbetween, styles.mb2]}>
                                                            <Text style={styles.dtextbold}>Milestone Amount </Text>
                                                            <Text style={[styles.dtext]}>{item.amount}</Text>
                                                        </View>
                                                        <View style={[CommonStyles.rowbetween, styles.mb2]}>
                                                            <Text style={styles.dtextbold}>Status </Text>
                                                            <Text style={[styles.dtext, { color: '#f00' }]}>{item.status}</Text>
                                                        </View>
                                                    </View>
                                                )) : null
                                                }



                                            </>

                                        </View>
                                    </View> : null
                                }

                                <TouchableOpacity
                                    onPress={() => this.acceptProposal()}
                                    style={[CommonStyles.primarybutton]}>
                                    <Text style={[CommonStyles.btntext]}>Accept Proposal</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }) :
                        <Text>No proposal found yet</Text>}
                </ScrollView>

                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps, null)(ProposalsDetails);