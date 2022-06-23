import React, { Component } from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    ImageBackground,
    Alert,
} from 'react-native';
import { Select, NativeBaseProvider, CheckIcon, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api';
import { GET_ALL_JOBS, MAKE_FAVOURITE } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import moment from 'moment';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';


class JobList extends Component {
    constructor() {
        super();
        this.state = {
            jobListArray: [],
            isLoading: false,
            bankDetailsStatus : "",
        };
    }

    componentDidMount() {

        this.getJobList()
        this.props.navigation.addListener('didFocus', () => {
            if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata || this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData) {
                this.getJobList()
            }
        })
    }

    getJobList = async () => {
        this.setState({ isLoading: true })
        var formData = new FormData();
        if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata) {
            // formdata = this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata

            formData.append('userid', this.props.userData.userDetails.data.id)
            formData.append('experience', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata.experience);
            formData.append('job_type', '');
            formData.append('search', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata.search);
            formData.append('skill', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata.skill);
            formData.append('category', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata.category);
            formData.append('limit', 20);
            formData.append('page_no', 0);
            formData.append('invite', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata.invite);
            formData.append('popular', this.state.selectValue);
        }
        else if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData) {
            formData.append('userid', this.props.userData.userDetails.data.id)
            formData.append('experience', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData.experience);
            formData.append('job_type', '');
            formData.append('search', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData.search);
            formData.append('skill', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData.skill);
            formData.append('category', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData.category);
            formData.append('limit', 20);
            formData.append('page_no', 0);
            formData.append('invite', this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.homeSearchData.invite);
            formData.append('popular', this.state.selectValue);
        }
        else {
            formData.append('userid', this.props.userData.userDetails.data.id)
            formData.append('experience', '');
            formData.append('job_type', '');
            formData.append('search', '');
            formData.append('skill', '');
            formData.append('category', '');
            formData.append('limit', 20);
            formData.append('page_no', 0);
            formData.append('invite', '');
            formData.append('popular', this.state.selectValue);
        }
        await apiCallWithToken(GET_ALL_JOBS, 'post', formData).
            then((resp) => {
                console.log("GET JOB LIST+++++++",resp)
                this.setState({ jobListArray: resp.data.data.job_list, isLoading: false });
                this.setState({ bankDetailsStatus :resp?.data?.data?.bank?.status});
                console.log("job list array==>",resp.data.data)
                console.log("bank status==>",this.state.bankDetailsStatus)
            }).catch(err => {
                this.setState({ isLoading: false })
                console.log(err);
            })
    }

    makeFavourite = async (jobId, index, isFav) => {
        this.setState({ isLoading: true })
        let tempArray = [...this.state.jobListArray]
        let data = {
            user_id: this.props.userData.userDetails.data.id,
            favid: jobId,
            is_active: isFav
        }
        apiCallWithToken(MAKE_FAVOURITE, 'post', data).then(res => {
            if (res.status = 200) {
                if (isFav == 1) {
                    tempArray[index].isfav = 1
                } else {
                    tempArray[index].isfav = 0
                }

                this.setState({ jobListArray: tempArray, isLoading: false })
            }

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })
    }

    showAlert = (jobDataId) =>
    Alert.alert(
        "",
        "Bank account details is missing please fill up for future purpose.",
        [
            {
                text: "Ok",
                onPress: () => this.props.navigation.navigate('BankDetails', { jobId: jobDataId}),
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
        const { jobListArray, isLoading } = this.state
        return (
            <NativeBaseProvider style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>


                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Jobs Lists</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={[CommonStyles.container, { backgroundColor: '#f2f2f2' }]}>

                        <View style={[CommonStyles.rowbetween, { paddingBottom: 10 }]}>
                            <TouchableOpacity style={[CommonStyles.flexrow, CommonStyles.aligncenter]} onPress={() => this.props.navigation.navigate('Filter')}>
                                <Image source={require('../../assets/images/filter.png')} resizeMode="contain" style={{ width: 16, height: 16, marginRight: 5 }} />
                                <Text style={styles.grtext}>Filter</Text>
                            </TouchableOpacity>
                            <View >
                                <Select style={styles.sortselect}
                                    onValueChange={(selectValue) => this.setState({ selectValue: selectValue }, () => {
                                        this.getJobList()
                                    })}
                                    minWidth="110"
                                    borderWidth="0"
                                    accessibilityLabel="Sort By"
                                    placeholder="Sort By"
                                    _selectedItem={{
                                        bg: "indigo.600",
                                        endIcon: <CheckIcon size={5}
                                        />,
                                    }}  >

                                    <Select.Item label="Newest First" value={false} />
                                    <Select.Item label="Popular" value={true} />

                                </Select>
                            </View>
                        </View>
                        {isLoading ?
                            <Loader /> :
                            <View style={styles.joblistwrap}>
                                {jobListArray && jobListArray.length ? jobListArray.map((jobData, index) => {
                                    return (
                                        <View style={styles.listwrap}>

                                            <Text style={styles.ptext}>Posted {moment(jobData.createdAt, "YYYYMMDD").fromNow()}</Text>
                                            <Text style={styles.headingtop}>{jobData.title}</Text>
                                            <TouchableOpacity style={{
                                                position: 'absolute',
                                                right: 15,
                                                top: 15,
                                                zIndex: 9
                                            }}>
                                                {jobData.isfav == 0 ?
                                                    <Icon name="heart-outline" size={20} color="#f00" onPress={() => this.makeFavourite(data.user_id, index, 1)} /> :
                                                    <Icon name="heart" size={20} color="#f00" onPress={() => this.makeFavourite(data.user_id, index, 0)} />
                                                }

                                            </TouchableOpacity>
                                            <View style={[CommonStyles.tagswrap, { paddingVertical: 6 }]}>
                                                <View style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>{jobData.exp_level} Level </Text>
                                                </View>

                                                {jobData.category_name &&
                                                    <View style={CommonStyles.filltags}>
                                                        <Text style={CommonStyles.tagtext}>{jobData.category_name} </Text>
                                                    </View>
                                                }
                                            </View>
                                            <Text style={styles.grtext}>{jobData.description}</Text>

                                            <View style={[CommonStyles.row, { marginTop: 15 }]}>
                                                <View style={CommonStyles.col50}>
                                                    <TouchableOpacity 
                                                    onPress={() => {this.props.navigation.navigate('Jobs',{userId:this.props.userData.userDetails.data.id,postId:jobData.id})} }
                                                    style={[CommonStyles.outlinebtn, CommonStyles.btnsm]}>
                                                        <Text style={[CommonStyles.outlinetext, CommonStyles.btnsmtext]}>View Details</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={CommonStyles.col50}>
                                                    <TouchableOpacity
                                                        style={[CommonStyles.primarybutton, CommonStyles.btnsm]}
                                                        onPress={() => this.props.navigation.navigate('ApplyJobs',{userId:this.props.userData.userDetails.data.id,jobId:jobData.id})}
                                                        //onPress={() => { this.state.bankDetailsStatus === "Success" ? this.props.navigation.navigate('ApplyJobs',{userId:this.props.userData.userDetails.data.id,jobId:jobData.id}) : this.showAlert(jobData.id)} }
                                                        //onPress={() => {this.showAlert(jobData.id)}}
                                                    >  
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Apply</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }) :
                                    <Text>No job list found</Text>}




                            </View>
                        }
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};
export default connect(mapStateToProps, null)(JobList);