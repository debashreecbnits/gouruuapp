import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Alert, Modal } from 'react-native';
import { NativeBaseProvider, Progress, Radio } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { apiCallWithToken } from '../../Api';
import { GET_PUBLIC_PROFILE, GET_PORTFOLIO } from '../../shared/allApiUrl';
import Loader from '../../components/Loader';
import moment from 'moment';
import { backgroundColor } from 'styled-system';
import RadioGroup from 'react-native-radio-buttons-group';
import Entypo from 'react-native-vector-icons/Entypo'



class FreelancerProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        freelancerId: '',
        freelancerBasicDetails: {},
        freelancerEmploymentHistory: [],
        freelancerReview: [],
      },
      school: this.props?.navigation?.state?.params?.data?.schoolName,
      areaOfStudy: this.props?.navigation?.state?.params?.data?.areaOfStudy,
      degree: this.props?.navigation?.state?.params?.data?.degree,
      entryDate: this.props?.navigation?.state?.params?.data?.entryDate,
      passoutDate: this.props?.navigation?.state?.params?.data?.passoutDate,
      description: this.props?.navigation?.state?.params?.data?.description,
      selectedJobCategory:
        this.props?.navigation?.state?.params?.data?.selectedJobCategory,
      selectedKeyWord:
        this.props?.navigation?.state?.params?.data?.selectedKeyword,
      lookingForSkill:
        this.props?.navigation?.state?.params?.data?.lookingForSkill,
      expLevel: this.props?.navigation?.state?.params?.data?.expLevel,
      compant: this.props?.navigation?.state?.params?.data?.company,
      selectedJobRole:
        this.props?.navigation?.state?.params?.data?.selectedJobRole,
      city: this.props?.navigation?.state?.params?.data?.city,
      workingFrom: this.props?.navigation?.state?.params?.data?.workingFrom,
      workingTo: this.props?.navigation?.state?.params?.data?.workingTo,
      description: this.props?.navigation?.state?.params?.data?.description,
      engProficiaency:
        this.props?.navigation?.state?.params?.data?.engProficiaency,
      otherLanguage: this.props?.navigation?.state?.params?.data?.otherLanguage,
      otherLanguageProficiaency:
        this.props?.navigation?.state?.params?.data?.otherLanguageProficiaency,
      professionalOverview:
        this.props?.navigation?.state?.params?.data?.professionalOverview,
      totalAmount: this.props?.navigation?.state?.params?.data?.totalAmount,
      name: this.props?.userData?.userDetails?.data?.first_name,
      portfolioDetails: [],

      modalVisible: false,
      value: 'In Person',
      showDropdown: false,
      modalFlag: false,
      bookNowModalFlag: false,
    };
  }

  componentDidMount() {
    this.getServiceProviderDetails();
    //this.getPortfolio();
  }

  // getPortfolio = async () => {
  //   var formData = new FormData();
  //   formData.append('userid', this.props.navigation.state.params.freelancerId);
  //   await apiCallWithToken(GET_PORTFOLIO, 'post', formData)
  //     .then(res => {
  //       this.setState({ portfolioDetails: res.data.Data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  getServiceProviderDetails = async () => {
    this.setState({ isLoading: true });

    let data = {};
    if (this.props?.userData?.userDetails?.data?.user_type === 'Client') {
      data = {
        clientid: this.props?.userData?.userDetails?.data?.id,
        uid:
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.freelancerId,
      };
    } else {
      data = {
        uid: this.props?.userData?.userDetails?.data?.id,
      };
    }
    await apiCallWithToken(GET_PUBLIC_PROFILE, 'post', data)
      .then(res => {
        this.setState({
          freelancerBasicDetails: res.data.data.User_Data,
          freelancerEmploymentHistory: res.data.data.Employment_History,
          freelancerReview: res.data.data.Review,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };



  onPressRadioButton(radioButtonsArray) {
    this.setState({ radioButtons: radioButtonsArray });
  }

  bookNowAlert = () => {

    Alert.alert(
      "Book Service Provider",
      "Will this person be completed in person or virtually?",
      [


        <RadioGroup
          radioButtons={this.state.radioButtons}
          onPress={this.onPressRadioButton}
        />,


        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "BOOK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }

  bookNowModal = () => {
    this.setState({ bookNowModalFlag: true });
  };

  modalNavigation = () => {
    if (this.state.value === 'In Person') {
      if (this.props.userData.userDetails.data.is_admin_verified === true) {
        this.props.navigation.navigate('chat', {
          receiverid: freelancerBasicDetails.user_id,
          name: freelancerBasicDetails.first_name,
        });
        //this.setState({isLoading:true});
      }
      else if (this.props.userData.userDetails.data.is_admin_verified === false) {
        this.props.navigation.navigate('Identity', { identityVerificationId: this.props.userData.userDetails.data.id });
        //this.setState({isLoading:true});
      }
      //this.setState({isLoading:true});
    }
    else {
      this.props.navigation.navigate('FreelancerVirtuallyBook');
      //this.setState({isLoading:true})
    }

  }

  blockFreelancer = async () => {
    var formData = new FormData();
    formData.append('blockinguser_id', this.props.userData.userDetails.data.id);
    formData.append('blockeduser_id', freelancerBasicDetails.user_id);
    await apiCallWithToken('insert_update_blocking_users', 'post', formData)
      .then(res => {
        Alert.alert(res.data.message)
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      freelancerBasicDetails,
      freelancerEmploymentHistory,
      freelancerReview,
      isLoading,
    } = this.state;
    return (
      <>
        <NativeBaseProvider style={CommonStyles.wrapper}>
          <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>

            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Profile</Text>
            </View>
            <View style={CommonStyles.Trighticon}>
              <TouchableOpacity style={styles.moredot} onPress={() => this.setState({ showDropdown: !this.state.showDropdown })}>
                <Icon
                  name="ellipsis-vertical"
                  color="#fff"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {this.state.showDropdown ?
            <View style={[CommonStyles.dropmenubox, { top: 40, right: 25 }]}>
              <TouchableOpacity style={CommonStyles.mlink}
                onPress={() =>
                  this.props.navigation.navigate('chat', {
                    receiverid: freelancerBasicDetails.user_id,
                    name: freelancerBasicDetails.first_name,
                  })
                }>
                <Text style={[CommonStyles.mlinktext]}>
                  Chat With Me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={CommonStyles.mlink}
                onPress={() => this.bookNowModal()
                }>
                <Text style={CommonStyles.mlinktext}>
                  Book Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={CommonStyles.mlink}
                onPress={() =>
                  this.blockFreelancer()
                }>
                <Text style={CommonStyles.mlinktext}>
                  Block
                </Text>
              </TouchableOpacity>
            </View> :
            null}

          <ImageBackground source={require('../../assets/images/mainbg.png')} style={CommonStyles.wrapper}>

            <ScrollView>
              {isLoading ? (
                <Loader loading={true} />
              ) : (

                <View style={[CommonStyles.container, { backgroundColor: 'transparent' }]}>

                  <View style={styles.tprofile}>

                    <View style={styles.profilebox}>

                      {freelancerBasicDetails &&
                        freelancerBasicDetails.profile_image ?
                        (
                          <Image
                            source={{ uri: freelancerBasicDetails.profile_image }}
                            style={styles.profileimg}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={{ uri: this.state.profile_image }}
                            resizeMode="cover"
                            style={styles.profileimg}
                          />
                        )
                      }
                      {freelancerBasicDetails?.is_admin_verified === true ? (
                        <View style={[styles.verifybox]}>
                          <Image
                            source={require('../../assets/images/verification.png')}
                            resizeMode="contain"
                            style={{ width: 20, height: 20 }}
                          />
                        </View>
                      ) : null}

                    </View>

                    <View style={styles.namebox}>
                      <Text style={styles.name}>
                        {freelancerBasicDetails &&
                          freelancerBasicDetails.first_name}{' '}
                        {freelancerBasicDetails && freelancerBasicDetails.last_name}
                      </Text>
                      {/* <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}
                        style={[CommonStyles.btnsm, CommonStyles.primarybutton]}>
                        <Text style={CommonStyles.btntext}>
                          Book Now
                        </Text>
                      </TouchableOpacity> */}

                    </View>

                  </View>
                  <View
                    style={[
                      CommonStyles.rowbetween,
                      { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                    ]}>
                    <View>
                      <Text style={styles.pageheding}>Profile Info</Text>
                    </View>

                  </View>

                  <View style={styles.infowrap}>
                    <View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Hourly Rate :</Text>
                        <Text
                          style={[
                            CommonStyles.namedata,
                            { fontSize: 22, color: '#3e1bee' },
                          ]}>
                          $
                          {freelancerBasicDetails &&
                            freelancerBasicDetails.hourly_rate
                            ? freelancerBasicDetails &&
                            freelancerBasicDetails.hourly_rate
                            : 'Not mentioned'}
                        </Text>
                      </View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Service Cost :</Text>
                        <Text
                          style={[
                            CommonStyles.namedata,
                            { fontSize: 22, color: '#3e1bee' },
                          ]}>
                          $
                          {freelancerBasicDetails &&
                            freelancerBasicDetails.service_cost
                            ? freelancerBasicDetails &&
                            freelancerBasicDetails.service_cost
                            : 'Not mentioned'}
                        </Text>
                      </View>

                      <View style={CommonStyles.hr}></View>
                    </View>

                    <View style={[CommonStyles.namerow, { flexDirection: 'column' }]}>
                      <Text style={styles.pageheding}>Languages : </Text>
                      <View style={{ marginTop: 10 }}>
                        {freelancerBasicDetails &&
                          freelancerBasicDetails.language &&
                          freelancerBasicDetails.language.length ? (
                          freelancerBasicDetails.language.map(
                            (languageName, index) => {
                              return (
                                <View style={CommonStyles.namerow}>
                                  <Text style={CommonStyles.nametext}>
                                    {languageName.language__name &&
                                      languageName.language__name}{' '}
                                    :
                                  </Text>
                                  <Text style={CommonStyles.namedata}>
                                    {' '}
                                    {languageName.level && languageName.level}{' '}
                                  </Text>
                                </View>
                              );
                            },
                          )
                        ) : (
                          <Text style={CommonStyles.namedata}>None </Text>
                        )}

                        <Text style={CommonStyles.namedata}>
                          {this.state.otherLanguage}
                        </Text>
                      </View>
                    </View>
                    {freelancerBasicDetails && freelancerBasicDetails.timezone ? (
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Time Zone :</Text>
                        <Text style={CommonStyles.namedata}>
                          {' '}
                          {freelancerBasicDetails.timezone &&
                            freelancerBasicDetails.timezone}
                        </Text>
                      </View>
                    ) : null}
                    {this.props.userData.userDetails?.data?.user_type ===
                      'Client' ? null : (
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Address :</Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.city}{' '}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={CommonStyles.hr}></View>

                  <View>
                    <Text style={styles.pageheding}>Professional Overview</Text>
                    <Text style={CommonStyles.para}>
                      {freelancerBasicDetails &&
                        freelancerBasicDetails.description}
                    </Text>
                  </View>
                  <View style={CommonStyles.formgroup}>
                    <Text style={styles.ptext}>
                      {this.state?.professionalOverview}
                    </Text>
                  </View>
                  <View style={CommonStyles.hr}></View>
                  <View
                    style={[
                      CommonStyles.rowbetween,
                      { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                    ]}>
                    <View>
                      <Text style={styles.pageheding}>Employment History</Text>
                    </View>

                  </View>
                  {freelancerEmploymentHistory && freelancerEmploymentHistory.length ? (
                    freelancerEmploymentHistory.map((work, index) => {
                      return (
                        <View style={{ paddingBottom: 25 }} key={index}>
                          <Text style={styles.formlabel}>{work.company}</Text>


                          <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                            {moment(work.start_date).format('MMMM Do YYYY')}-{' '}
                            {moment(work.end_date).format('MMMM Do YYYY')}
                          </Text>
                          <Text style={styles.ptext}>{work.category}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <Text>No data found</Text>
                  )}

                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ padding: 10 }}>
                      <Text
                        style={[
                          { fontSize: 16, fontWeight: 'bold' },
                          CommonStyles.activetext,
                        ]}>
                        {freelancerEmploymentHistory && freelancerEmploymentHistory.length
                          ? 'See More'
                          : ''}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={CommonStyles.hr}></View>
                  <View
                    style={[
                      CommonStyles.rowbetween,
                      { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                    ]}>
                    <View>
                      <Text style={styles.pageheding}>My Skills</Text>
                    </View>

                  </View>
                  <View style={CommonStyles.tagswrap}>
                    {freelancerBasicDetails &&
                      freelancerBasicDetails.skill &&
                      freelancerBasicDetails.skill.length ? (
                      freelancerBasicDetails.skill.map((skillItem, index) => {
                        return (

                          <TouchableOpacity
                            style={CommonStyles.filltags}>
                            <Text style={CommonStyles.tagtext}>
                              {skillItem.skill__title}
                            </Text>
                          </TouchableOpacity>

                        );
                      })
                    ) : (
                      <Text>No skill found</Text>
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ padding: 10 }}>
                      <Text
                        style={[
                          { fontSize: 16, fontWeight: 'bold' },
                          CommonStyles.activetext,
                        ]}>
                        See More
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={CommonStyles.hr}></View>
                  <View
                    style={[
                      CommonStyles.rowbetween,
                      { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                    ]}>
                    <View>
                      <Text style={styles.pageheding}>Portfolio</Text>
                    </View>

                  </View>

                  {this.state.portfolioDetails && this.state.portfolioDetails.length > 0 ? this.state.portfolioDetails.map((item, index) => {
                    return (
                      <>
                        <Text>{item.name}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                          }}>
                          {item.images && item.images.length > 0 ? (
                            item.images.map(img => {
                              return (
                                <TouchableOpacity style={styles.pfimgbox}>
                                  <Image
                                    source={{ uri: img }}
                                    style={{
                                      height: '100%',
                                      width: '100%',
                                      resizeMode: 'cover',
                                    }}
                                  />
                                </TouchableOpacity>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </View>
                      </>
                    );
                  }) : <><Text>No data found</Text></>}

                  <View style={CommonStyles.hr}></View>
                </View>

              )}
            </ScrollView>
          </ImageBackground>
        </NativeBaseProvider>

        <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.bookNowModalFlag}
                  onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    this.setState({ bookNowModalFlag: !this.state.bookNowModalFlag })
                  }}
                  
                  >
                  <NativeBaseProvider>
                    <View style={CommonStyles.centeredView} >

                      <View style={CommonStyles.modalView}>
                        <TouchableOpacity
                          style={styles.modalCross}

                          onPress={() => this.setState({ bookNowModalFlag: !this.state.bookNowModalFlag, modalFlag:!this.state.modalFlag })}>
                          <Entypo
                            name="circle-with-cross"
                            color="blue"
                            size={35}
                          />
                        </TouchableOpacity>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                          <Text style={styles.headingtop}>
                            Book Service Provider
                          </Text>
                          <Text style={CommonStyles.para}>
                            Will this service be completed in person
                            or virtually?{' '}
                          </Text>
                        </View>

                        <Radio.Group
                          name="myRadioGroup2"
                          defaultValue={this.state.value}
                          onChange={(nextValue) => {
                            this.setState({ value: nextValue });
                          }}
                        >

                          <ImageBackground source={require('../../assets/images/radiobg.png')} style={CommonStyles.radiobg} resizeMode="stretch">

                            <Radio value="In Person" mx={2}>
                              <Text style={styles.label2}>
                                In Person{' '}
                              </Text>
                            </Radio>
                          </ImageBackground>
                          <ImageBackground source={require('../../assets/images/radiobg.png')} style={CommonStyles.radiobg} resizeMode="stretch">

                            <Radio value="In Virtual" mx={2}>
                              <Text style={styles.label2}>
                                In Virtual
                              </Text>
                            </Radio>
                          </ImageBackground>
                        </Radio.Group>

                        <View style={{ marginTop: 30, width: '100%' }}>
                          <TouchableOpacity
                            //onPress={() => this.setState({ visibility: 'Anyone' })}
                            onPress={() =>
                              this.modalNavigation(this.state.bookedFreelancer)
                            }
                            style={[CommonStyles.primarybutton]}>
                            <Text
                              style={[CommonStyles.btntext]}>
                              BOOK
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </NativeBaseProvider>

                </Modal>

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps, null)(FreelancerProfileDetails);
