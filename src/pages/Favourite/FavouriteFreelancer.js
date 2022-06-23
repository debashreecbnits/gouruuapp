import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, ImageBackground,} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { connect } from 'react-redux';
import { apiCallWithToken } from '../../Api';
import { GET_FAVOURITE_LIST, MAKE_FAVOURITE } from '../../shared/allApiUrl';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';

class FavouriteFreelancers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freelancerListArray: []
        }
    }

    componentDidMount() {
        this.getFavouriteList()
    }



    getFavouriteList = async () => {
        var formData = new FormData();
        let userId = this.props.userData.userDetails.data.id
        this.setState({ isLoading: true })
        formData.append('user_id', userId);
        formData.append('limit', 0);
        formData.append('page_no', 0);
        await apiCallWithToken(GET_FAVOURITE_LIST, 'post', formData).then(res => {
            if (res.status = 200) {
                this.setState({ freelancerListArray: res.data.data, isLoading: false });
                console.log("FreeLancer List Array==>",this.state.freelancerListArray)
            }
        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })

    };


    deleteFromFavourite = async (freelancerId, index, isFav) => {
        let data = {
            user_id: this.props.userData.userDetails.data.id,
            favid: freelancerId,
            is_active: isFav
        }
        apiCallWithToken(MAKE_FAVOURITE, 'post', data).then(res => {
            if (res.status = 200) {
                this.getFavouriteList()
            }

        }).catch(err => {
            console.log(err);
            setLoader(false);
        })
    }

    render() {
        const { freelancerListArray, isLoading } = this.state
        return (
            <ImageBackground source={require('../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Favorite Freelancers</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ScrollView>

                    <View style={CommonStyles.container}>
                        {isLoading ?
                            <Loader loading={true} />
                            :
                            <View style={[CommonStyles.productrow]}>

                                {freelancerListArray && freelancerListArray.length > 0 ? freelancerListArray.map((data, index) => {
                                   return (
                                        <View style={[CommonStyles.card, styles.fcard]} >
                                            {data.is_admin_verified === true ? (
                              <Image
                                source={require('../../assets/images/verification.png')}
                                resizeMode="contain"
                                style={styles.verify}
                              />
                            ) : null}
                                            <Image source={require('../../assets/images/cleaning.jpg')} resizeMode="cover" style={styles.thumb} />
                                            <TouchableOpacity style={CommonStyles.favheart}>
                                                <Icon name="heart" size={14} color="#f00" onPress={() => this.deleteFromFavourite(data.user_id, index, 0)} />
                                            </TouchableOpacity>
                                            <View style={styles.cardcontent}>
                                                <Text style={styles.headingtop}>{data.first_name} {data.last_name}</Text>
                                                {/* <Text style={styles.ptext}>{data.description.length < 150 ?  data.description : data.description.substring(0, 150)+'...' }</Text> */}
                                                <Text style={[CommonStyles.para]} numberOfLines={2} ellipsizeMode="tail">{data.description}</Text>
                                                <Text style={[styles.ptext, CommonStyles.activetext]}>Experience: </Text>

                                                <View style={[CommonStyles.row,]}>
                                                    <View style={CommonStyles.col50}>
                                                        <TouchableOpacity style={[CommonStyles.outlinebtn, CommonStyles.btnsm]} onPress={() => 
                                                            this.props.navigation.navigate('FreelancerProfileDetails', { freelancerId: data.user_id })}>
                                                            <Text style={[CommonStyles.outlinetext, CommonStyles.btnsmtext]}>View Profile</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={CommonStyles.col50}>
                                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}
                                                         onPress={() =>
                                                            this.props.navigation.navigate('chat', {
                                                              receiverid: data.user_id,
                                                              name: data.first_name,
                                                            },
                                                            )
                                                          }
                                                        >
                                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Hire Me</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    )
                                }) :
                                    <Text>No data found </Text>
                                }


                            </View>
                        }
                    </View>

                </ScrollView>
            </NativeBaseProvider>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps, null)(FavouriteFreelancers);