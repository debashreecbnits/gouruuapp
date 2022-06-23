import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles'
import { connect } from 'react-redux';
import { apiCallWithToken } from '../../Api';
import { GET_PROPOSAL_LIST } from '../../shared/allApiUrl';
import moment from 'moment'
import Loader from '../../components/Loader';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proposalArray: [],
            actionType: this.props?.navigation?.state?.params?.action_type,
            deliveryDays: this.props?.navigation?.state?.params?.delivery_days,
            proposalId: this.props?.navigation?.state?.params?.proposalid,
        };
    }


    componentDidMount() {
        this.getProposalList()
    }

    getProposalList = async () => {
        this.setState({ isLoading: true })

        let data = {
            userid: this.props.userData.userDetails.data.id,
        }

        await apiCallWithToken(GET_PROPOSAL_LIST, 'post', data).
            then((resp) => {
                this.setState({ proposalArray: resp.data.Data, isLoading: false });               
            }).catch(err => {
                console.log(err);
                this.setState({ isLoading: false })
            })

    }

    render() {
        const { proposalArray, isLoading } = this.state

        return (
            // <SafeAreaView style={CommonStyles.wrapper}>
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
                    {isLoading ?
                        <Loader loading={true} />
                        :
                        <View style={CommonStyles.container}>
                            {proposalArray && proposalArray.length > 0 ? proposalArray.map((proposalItem, index) => {
                                return (
                                    <TouchableOpacity style={styles.transectionbox} key={index}>
                                        <View style={styles.centercontent}>                                       
                                            <View style={[CommonStyles.namerow, {paddingBottom:0}]}>
                                                <Icon name="ios-time-outline" color="#777" size={14} />
                                                <Text style={styles.msgtext}>Posted on: {moment(proposalItem.createdAt).startOf('day').fromNow()}</Text>
                                            </View>
                                            <Text style={styles.headingmain} numberOfLines={1} >{proposalItem.title}</Text>
                                          
                                            <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>                                                 
                                                <Text style={CommonStyles.para} numberOfLines={5}>{proposalItem.description}</Text>
                                            </View>
                                            <View style={[CommonStyles.flexrow, CommonStyles.aligncenter, styles.my2]}>
                                                <View style={styles.pcountbox}>
                                                    <Text style={styles.pcount}>{proposalItem.count} Proposals</Text>
                                                </View>                                               
                                                <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.flexrow, { width: 'auto', marginLeft:10, paddingHorizontal:10, paddingVertical:3, borderRadius:35 }]} onPress={() => this.props.navigation.navigate('ProposalsDetails', { job_id: proposalItem.id, actionType: this.state.actionType, deliveryDays: this.state.deliveryDays, proposalId: this.state.proposalId })}>
                                                        <Icon name="eye" color="#fff" size={18} /> 
                                                        <Text style={[CommonStyles.btnsmtext, CommonStyles.whitetext, {marginLeft:5}]}>View</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }) :
                                <Text>No data found </Text>
                            }

                        </View>
                    }
                </ScrollView>
            </View>
            /* </SafeAreaView> */ 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps, null)(Index);