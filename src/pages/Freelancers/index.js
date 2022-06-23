import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import {
  Select,
  NativeBaseProvider,
  CheckIcon,
  Button,
  Radio,
} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { connect } from 'react-redux';
import { apiCallWithToken } from '../../Api';
import { GET_FREELANCER_LIST, MAKE_FAVOURITE } from '../../shared/allApiUrl';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RadioGroup from 'react-native-radio-buttons-group';
import Entypo from 'react-native-vector-icons/Entypo';
import { style } from 'styled-system';

class Freelancers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerListArray: [],
      isLoading: true,
      fitered: false,
      modalFlag: false,
      bookNowModalFlag: false,
      value: 'In Person',
      dataModal: [],
      modalIndex: 9999999999999999,

    };
  }

  componentDidMount() {
    this.getFreelancerList();

    this.props.navigation.addListener('didFocus', () => {
      // if (
      //   this.props.navigation.state &&
      //   this.props.navigation.state.params &&
      //   this.props.navigation.state.params.formdata
      // ) {
      this.getFreelancerList();
      // }
    });
  }

  ChatBlockBookNowModal = (data, index) => {
    //let temp = this.state.modalFlag;
    //this.setState({modalFlag: true, modalIndex:index, bookedFreelancer : data});
    this.setState({ modalFlag: !this.state.modalFlag, modalIndex: index, bookedFreelancer: data })
  };


  modalNavigation = (data, index) => {
    if (this.state.value === 'In Person') {
      if (this.props.userData.userDetails.data.is_admin_verified === true) {
        this.props.navigation.navigate('chat', {
          receiverid: data.user_id,
          name: data.first_name,
        });
        this.ChatBlockBookNowClose();
      }
      else if (this.props.userData.userDetails.data.is_admin_verified === false) {
        this.props.navigation.navigate('Identity', { identityVerificationId: this.props.userData.userDetails.data.id });
        this.ChatBlockBookNowClose();
      }
      //this.setState({isLoading:true});
    }
    else {
      this.props.navigation.navigate('FreelancerVirtuallyBook', { userId: data.user_id });
      this.ChatBlockBookNowClose();
      //this.setState({isLoading:true});
    }

  }

  ChatBlockBookNowClose = (data, index) => {
    this.setState({ modalFlag: false, modalIndex: index });
  };

  blockFreelancer = async (data) => {

    this.setState({ modalFlag: false })
    var formData = new FormData();
    formData.append('blockinguser_id', this.props.userData.userDetails.data.id);
    formData.append('blockeduser_id', data.user_id);
    await apiCallWithToken('insert_update_blocking_users', 'post', formData)
      .then(res => {
        this.getFreelancerList();
        Alert.alert(res.data.message)
      })
      .catch(err => {
        console.log(err);
      });
  }

  bookNowModal = (data) => {
    this.setState({ bookNowModalFlag: true });

  };

  getFreelancerList = async () => {

    this.setState({ isLoading: true });
    let formdata = {};

    if (
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.formdata
    ) {
      formdata =
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.formdata;
    } else if (
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.homeSearchData
    ) {
      formdata =
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.homeSearchData;
    } else {
      formdata = {
        userid: this.props.userData.userDetails.data.id,
        category: '',
        search: '',
        skill: '',
        experience: '',
        limit: 0,
        page_no: 0,
      };
    }
    await apiCallWithToken(GET_FREELANCER_LIST, 'post', formdata)
      .then(resp => {
        this.setState({ freelancerListArray: resp.data.data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  makeFavourite = async (freelancerId, index, isFav) => {
    this.setState({ isLoading: true });
    let tempArray = [...this.state.freelancerListArray];
    let data = {
      user_id: this.props.userData.userDetails.data.id,
      favid: freelancerId,
      is_active: isFav,
    };
    apiCallWithToken(MAKE_FAVOURITE, 'post', data)
      .then(res => {
        if ((res.status = 200)) {
          if (isFav == 1) {
            tempArray[index].isfav = 1;
          } else {
            tempArray[index].isfav = 0;
          }

          this.setState({ freelancerListArray: tempArray, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { freelancerListArray, isLoading, showFilterpage } = this.state;
    return (
      <>
        <NativeBaseProvider style={CommonStyles.wrapper}>

          <ImageBackground
            source={require('../../assets/images/headerbar.png')}
            style={CommonStyles.headerwrap}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/images/left-arrow.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Freelancers</Text>
            </View>
          </ImageBackground>
          <ScrollView>
            <View style={CommonStyles.container}>
              <View style={[CommonStyles.productrow]}>
                <View style={[CommonStyles.rowbetween, { paddingBottom: 10 }]}>
                  <TouchableOpacity
                    style={[CommonStyles.flexrow, CommonStyles.aligncenter]}
                    onPress={() => this.props.navigation.navigate('Filter')}>
                    <Image
                      source={require('../../assets/images/filter.png')}
                      resizeMode="contain"
                      style={{ width: 16, height: 16, marginRight: 5 }}
                    />
                    <Text style={styles.grtext}>Filter</Text>
                  </TouchableOpacity>
                  <View>
                    <Select
                      style={styles.sortselect}
                      onValueChange={selectValue =>
                        this.setState({ selectValue: selectValue }, () => {
                          this.getFreelancerList();
                        })
                      }
                      minWidth="100"
                      borderWidth="0"
                      accessibilityLabel="Sort By"
                      placeholder="Sort By"
                      _selectedItem={{
                        bg: 'indigo.600',
                        endIcon: <CheckIcon size={5} />,
                      }}>
                      <Select.Item label="Newest First" value={false} />
                      <Select.Item label="Popular" value={true} />
                    </Select>
                  </View>
                </View>
                {isLoading ? (
                  <Loader loading={true} />
                ) : (
                  <>
                    {freelancerListArray && freelancerListArray.length ? (
                      freelancerListArray.map((data, index) => {

                        return (
                          <View style={[CommonStyles.card, styles.fcard]}
                            key={index}>

                            {data.profile_image ? (
                              <Image
                                source={{ uri: data.profile_image }}
                                resizeMode="cover"
                                style={styles.thumb}
                              />
                            ) : (
                              <Image
                                source={require('../../assets/images/noimage.png')}
                                resizeMode="cover"
                                style={styles.thumb}
                              />
                            )}
                            {data.is_verified === true ? (
                              <Image
                                source={require('../../assets/images/verification.png')}
                                resizeMode="contain"
                                style={styles.verify}
                              />
                            ) : null}
                            <TouchableOpacity style={CommonStyles.favheart}>
                              {data.isfav == 0 ? (
                                <Icon
                                  name="heart-outline"
                                  size={14}
                                  color="#f00"
                                  onPress={() =>
                                    this.makeFavourite(data.user_id, index, 1)
                                  }
                                />
                              ) : (
                                <Icon
                                  name="heart"
                                  size={14}
                                  color="#f00"
                                  onPress={() =>
                                    this.makeFavourite(data.user_id, index, 0)
                                  }
                                />
                              )}
                            </TouchableOpacity>
                            <View style={styles.cardcontent}>
                              <Text style={styles.headingtop}>
                                {data.first_name} {data.last_name}
                              </Text>
                              {/* <Text style={styles.ptext}>{data.description && data.description.length < 150 ? data.description && data.description : data.description && data.description.substring(0, 150) + '...'}</Text> */}

                              <TouchableOpacity
                                style={styles.calicon}
                                onPress={() =>
                                  this.props.navigation.navigate('Calendar', {
                                    freelancerId: data.user_id,
                                  })
                                }>
                                <AntDesign
                                  name="calendar"
                                  size={20}
                                  color="#757575"
                                />
                              </TouchableOpacity>

                              <Text
                                style={[CommonStyles.para]}
                                numberOfLines={2}
                                ellipsizeMode="tail">
                                {data.description}
                              </Text>
                              <Text
                                style={[styles.ptext, CommonStyles.activetext]}>
                                Experience: {data.exp_lavel}
                              </Text>

                              <View
                                style={[
                                  CommonStyles.row,
                                  {
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  },
                                ]}>
                                <View style={CommonStyles.col50}>
                                  <TouchableOpacity
                                    style={[
                                      CommonStyles.outlinebtn,
                                      CommonStyles.btnsm,
                                    ]}
                                    onPress={() =>
                                      this.props.navigation.navigate(
                                        'FreelancerProfileDetails',
                                        { freelancerId: data.user_id },
                                      )
                                    }>
                                    <Text
                                      style={[
                                        CommonStyles.outlinetext,
                                        CommonStyles.btnsmtext,
                                      ]}>
                                      View Profile
                                    </Text>
                                  </TouchableOpacity>
                                </View>

                              </View>
                            </View>
                            <View >
                              {/* {this.state.modalFlag === true && this.state.modalIndex == index ? (
                                  <View style={[CommonStyles.dropmenubox]}>
                                    <TouchableOpacity style={CommonStyles.mlink}
                                      onPress={() =>
                                        this.props.navigation.navigate('chat', {
                                          receiverid: data.user_id,
                                          name: data.first_name,
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
                                        this.props.navigation.navigate('chat', {
                                          receiverid: data.user_id,
                                          name: data.first_name,
                                        })
                                      }>
                                      <Text style={CommonStyles.mlinktext}>
                                        Block
                                      </Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={()=>this.setState({modalFlag:false})}/>
                                    <TouchableOpacity style={styles.moredot}
                                    onPress={() =>
                                      this.ChatBlockBookNowClose(data,index)
                                    }>
                                    <Icon
                                      name="ellipsis-vertical"
                                      color="grey"
                                      size={24}
                                    />
                                  </TouchableOpacity> */}
                              {/* </View>  
                                ):<>
                                 <TouchableOpacity style={styles.moredot}
                                    onPress={() =>
                                      this.ChatBlockBookNowModal(data,index)
                                    }>
                                    <Icon
                                      name="ellipsis-vertical"
                                      color="grey"
                                      size={24}
                                    />
                                  </TouchableOpacity>
                                </>} */}
                              <TouchableOpacity
                                style={styles.moredot}

                                onPress={() =>

                                  this.ChatBlockBookNowModal(data, index)
                                }>
                                <Icon name="ellipsis-vertical" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                              </TouchableOpacity>
                              {this.state.modalFlag && this.state.modalIndex == index ? (
                                <View style={[CommonStyles.dropmenubox]}>
                                  <TouchableOpacity
                                    style={CommonStyles.mlink}
                                    onPress={() =>
                                      this.props.navigation.navigate('chat', {
                                        receiverid: data.user_id,
                                        name: data.first_name,
                                      },
                                      )
                                    }
                                  >
                                    <Text style={CommonStyles.mlinktext}>Chat With Me</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={CommonStyles.mlink}
                                    onPress={() => this.bookNowModal(data)}
                                  >
                                    <Text style={CommonStyles.mlinktext}>Book Now</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={CommonStyles.mlink}
                                    onPress={() => this.blockFreelancer(data)}
                                  >
                                    <Text style={CommonStyles.mlinktext}>{data.is_blocked === 0 ? 'Block' : 'Unblock'}</Text>
                                  </TouchableOpacity>
                                </View>
                              ) : null}
                            </View>

                          </View>
                        );
                      })
                    ) : (
                      <Text>No data found </Text>
                    )}
                  </>
                )}
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={this.state.bookNowModalFlag}
                  onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    this.setState({ bookNowModalFlag: !this.state.bookNowModalFlag })
                  }} >
                  <NativeBaseProvider>
                    <View style={CommonStyles.centeredView} >

                      <View style={CommonStyles.modalView}>
                        <TouchableOpacity
                          style={styles.modalCross}

                          onPress={() => this.setState({ bookNowModalFlag: !this.state.bookNowModalFlag, modalFlag: !this.state.modalFlag })}>
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
              </View>
            </View>

          </ScrollView>
        </NativeBaseProvider>

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps, null)(Freelancers);
