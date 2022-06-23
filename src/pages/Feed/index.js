import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, } from 'react-native';
import { NativeBaseProvider, Select, CheckIcon } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/Searchbar/index';
import { connect } from 'react-redux';
import { GET_FEED } from '../../shared/allApiUrl';
import { apiCallWithToken } from '../../Api';
import moment from 'moment';

class Feed extends Component {
    constructor() {
        super();
        this.state = {
            feedListArray: [],
            postId:'',
            freelancerId:'',
        };
    }

    componentDidMount() {
        this.getmyfeed()
    }
    getmyfeed = async () => {

        var formData = new FormData();
        let userId = this.props.userData.userDetails.data.id

        formData.append('userid', userId);
        formData.append('search', '');
        await apiCallWithToken(GET_FEED, 'post', formData)
            .then((resp) => {
                
                this.setState({ feedListArray: resp.data.data.applied_list });
            }).catch(err => {
                console.log(err)
            })

    }



    render() {
        const { feedListArray } = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                            <Image source={require('../../assets/images/menu.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>My Feeds</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    
                </ImageBackground>

                <ScrollView>
                    <View style={CommonStyles.container}>                        
                        <View >
                            {feedListArray && feedListArray.length ? feedListArray.map((feedData, index) => {
                                return (
                                    <TouchableOpacity 
                                    //onPress={() => this.myFeedDetails(feedData.post_id,feedData.freelancer_id)}
                                    onPress={() => this.props.navigation.navigate('MyFeedDetails',{jobId:feedData.post_id,freelancerId:feedData.freelancer_id})}
                                   //onPress={() => this.props.navigation.navigate('Calendar')}
                                    style={CommonStyles.card}>
                                        <View style={CommonStyles.cardbody}>
                                            <Text style={styles.grtext}>Posted {moment(feedData.createdAt, "YYYYMMDD").fromNow()}</Text>
                                            <View style={CommonStyles.rowbetween}>
                                                <Text style={styles.pageheding}>{feedData.title}</Text>

                                            </View>
                                            <Text style={CommonStyles.para}>{feedData.description}</Text>
                                            <View style={[CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                                <View style={[CommonStyles.flexrow, { marginRight: 15 }]}>
                                                    {/* <Text style={styles.boldtext}>Fixed Price :{feedData.fixed_rate} </Text> */}
                                                    {feedData.r_rate &&
                                                        <Text style={styles.ptext}> Budget {feedData.r_rate}$</Text>
                                                    }
                                                </View>
                                                {/* <View style={[CommonStyles.flexrow, CommonStyles.aligncenter,]}>
                                                <Image source={require('../../assets/images/verification.png')} resizeMode="contain" style={{ width: 20, height: 20, marginRight: 5 }} />
                                                <Text style={styles.ptext}>verified</Text>
                                            </View> */}
                                            </View>

                                            {/* <View style={{ marginTop: 20 }}>
                                            <TouchableOpacity style={CommonStyles.primarybutton}>
                                                <Text style={CommonStyles.btntext}>Send Proposals</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                        </View>
                                    </TouchableOpacity>
                                )

                            }) :
                                <Text>No job list found</Text>}

                        </View>
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
export default connect(mapStateToProps, null)(Feed);
