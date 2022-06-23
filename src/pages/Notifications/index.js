import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../../CommonStyles';
import {apiCallWithToken, ACCEPT_REJECT_JOB_PROPOSAL} from '../../Api';
import {get_notification, NOTIFICATION_STATUS} from '../../shared/allApiUrl';
import styles from './style';
import {GET_NOTIFICATION} from '../../shared/allApiUrl';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from 'native-base';
import Icons from 'react-native-vector-icons/EvilIcons';

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationArray: [],
      showButtonsModal: false,
      type1:
        this.props.userData.userDetails.data.user_type === 'Client'
          ? 'Job'
          : 'Schedule',
      type2: 'Appointment',
      showButtonsModalS: false,
      cancelValue: false,
      staticValue: false,
      userId: this.props?.userData?.userDetails?.data?.id,
      acceptItem: [],
      buttonDisable:'ABC',
      modalIndex:99999,
      requestId: '',
      acceptBtn: false,
      rejectBtn: false,
      btnStatus:'',
      jobId:'',
      freelancerId:'',
      alldetails:[]
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      
      this.getNotification();
    
  });
  }

  getNotification = async () => {
    let formdata = new FormData();
    formdata.append('userid', this.props.userData.userDetails.data.id);
    await apiCallWithToken(GET_NOTIFICATION, 'post', formdata)
      .then(res => {
        console.log("NOTIFICATION RESPONSE++++++++++++++",res)
        let results = res.data.data;
        this.setState({notificationArray: res.data.data});
        console.log("notification array==>",this.state.notificationArray)
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false});
      });
  };

  acceptModal = async (item,index) => {
    this.setState({showButtonsModalS: true, acceptItem: item, modalIndex:index});
  };

  acceptGreenTick = async (request_id, index) => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    formData.append('request_id', request_id);
    formData.append('status', 'Accept');
    await apiCallWithToken(NOTIFICATION_STATUS, 'post', formData)
      .then(res => {
        if(res.data.status===1){
          this.setState({btnStatus:'Accepted',acceptBtn:true,rejectBtn:true,})
          }
      })
      .catch(err => {
        console.log(err);
      });
  };

  rejectRedTick = async (request_id) => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    formData.append('request_id', request_id);
    formData.append('status', 'Reject');
    await apiCallWithToken(NOTIFICATION_STATUS, 'post', formData)
      .then(res => {
        if(res.data.status===1){
        this.setState({btnStatus:'Rejected',acceptBtn:true,rejectBtn:true,})
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  rejectProposal = async proposalid => {
    var formData2 = new FormData();
    formData2.append('userid', this.state.userId);
    formData2.append('proposalid', '3da66e12317f4fd9876f6fe9953dafa0');
    formData2.append('delivery_days', '10');
    formData2.append('action_type', 'reject');
    await apiCallWithToken(ACCEPT_REJECT_JOB_PROPOSAL, 'post', formData2)
      .then(res => {})
      .catch(err => {
        console.log('error==>', err);
      });
  };

  notificationType = type => {
    if (type == 'Job') {
      this.setState({type1: 'Job'});
    } else if (type == 'Milestone') {
      this.setState({type1: 'Milestone'});
    } else if (type == 'Schedule') {
      this.setState({type1: 'Schedule'});
    } else if (type == 'Appointment') {
      this.setState({type1: 'Appointment'});
    }
  };

  acceptRejectModal=(item,index) =>{
    if(this.state.type1 == 'Schedule') {
      // this.acceptModal(item,index)
      if(item.status == 'Accepted') {
        this.setState({ requestId: item.link, acceptBtn:true,rejectBtn:true,btnStatus:'Accepted'},()=>{
          this.setState({showButtonsModalS: true})
        });
      }else if(item.status == 'Rejected') {
        this.setState({ requestId: item.link, acceptBtn:true,rejectBtn:true,btnStatus:'Rejected'},()=>{
          this.setState({showButtonsModalS: true})
        });
      } else {
        this.setState({ requestId: item.link, acceptBtn:false,rejectBtn:false,btnStatus:''},()=>{
          this.setState({showButtonsModalS: true})
        });
      }
    }else {
      
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/mainbg.png')}
        style={CommonStyles.wrapperbg}>
        <NativeBaseProvider>
          {/* <SafeAreaView style={CommonStyles.wrappernobg}> */}
          <ImageBackground
            source={require('../../assets/images/headerbar.png')}
            style={[CommonStyles.headerwrap, CommonStyles.tabheader]}>
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
              <Text style={CommonStyles.htitle}>Notifications</Text>
            </View>
            <View style={CommonStyles.Trighticon}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/notification.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            {this.props.userData.userDetails.data.user_type === 'Client' ? (
              <View style={[CommonStyles.tabview]}>
                <TouchableOpacity
                  onPress={() => this.notificationType('Job')}
                  style={
                    this.state.type1 == 'Job'
                      ? [CommonStyles.tabbtn, CommonStyles.activetab]
                      : [CommonStyles.tabbtn]
                  }>
                  <Text
                    style={
                      this.state.type1 == 'Job'
                        ? [CommonStyles.tabtext]
                        : [CommonStyles.tabtext]
                    }>
                    Job
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.notificationType('Milestone')}
                  style={
                    this.state.type1 == 'Milestone'
                      ? [CommonStyles.tabbtn, CommonStyles.activetab]
                      : [CommonStyles.tabbtn]
                  }>
                  <Text
                    style={
                      this.state.type1 == 'Milestone'
                        ? [CommonStyles.tabtext]
                        : [CommonStyles.tabtext]
                    }>
                    Milestone
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[CommonStyles.tabview]}>
                <TouchableOpacity
                  onPress={() => this.notificationType('Schedule')}
                  style={
                    this.state.type1 == 'Schedule'
                      ? [CommonStyles.tabbtn, CommonStyles.activetab]
                      : [CommonStyles.tabbtn]
                  }>
                  <Text
                    style={
                      this.state.type1 == 'Schedule'
                        ? [CommonStyles.tabtext]
                        : [CommonStyles.tabtext]
                    }>
                    Booking Request
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.notificationType('Job')}
                  style={
                    this.state.type1 == 'Job'
                      ? [CommonStyles.tabbtn, CommonStyles.activetab]
                      : [CommonStyles.tabbtn]
                  }>
                  <Text
                    style={
                      this.state.type1 == 'Job'
                        ? [CommonStyles.tabtext]
                        : [CommonStyles.tabtext]
                    }>
                    Job
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.notificationType('Milestone')}
                  style={
                    this.state.type1 == 'Milestone'
                      ? [CommonStyles.tabbtn, CommonStyles.activetab]
                      : [CommonStyles.tabbtn]
                  }>
                  <Text
                    style={
                      this.state.type1 == 'Milestone'
                        ? [CommonStyles.tabtext]
                        : [CommonStyles.tabtext]
                    }>
                    Milestone
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>

          {/* <Modal isOpen={this.state.showButtonsModal} onClose={() => this.setState({ showButtonsModal: false })}>
              <Modal.Content style={styles.nmodal}>
                <Modal.CloseButton />

                <Modal.Body>
                  <Button.Group space={2}>
                    {this.state.staticValue === true ?
                      <Button
                      //onPress={() => {this.setState({ showButtonsModal: false }) }}
                      // onPress={() => this.props.navigation.navigate('AddMilestone', { freelancerId: this.state.acceptItem.source_id, clientId: this.state.acceptItem.target_id, jobId: this.state.acceptItem.job_id, proposalId: this.state.acceptItem.link })

                      // }

                      >
                        Add milestone

                      </Button> : <></>
                    }

                    <Button
                      onPress={() => {
                       
                          // this.acceptGreenTick(this.state.acceptItem.link)
                       
                      }}
                      colorScheme="green"
                    >
                      <Icons name="check" size={25} color="white" />
                    </Button>
                    <Button
                      onPress={() => {
                        this.rejectProposal(this.state.acceptItem.link)
                      }}
                      colorScheme="red"
                    >
                      <Icons name="close-o" size={25} color="white" />
                    </Button>

                    <Button
                      onPress={() => {
                        this.setState({ showButtonsModal: false });
                      }}
                      colorScheme="violet"
                    >
                      <Icons name="eye" size={25} color="white" />
                    </Button>
                  </Button.Group>
                </Modal.Body>

              </Modal.Content>
            </Modal> */}


          <ScrollView>
            <View style={[CommonStyles.container]}>
              {/* <View style={[CommonStyles.rowbetween, CommonStyles.tabview, { top: 10 }]}>
              {this.props.userData.userDetails.data.user_type === "Service Provider" ?
                <TouchableOpacity onPress={() => this.notificationType('Schedule')} style={this.state.type1 == "Schedule" ? [CommonStyles.tags, CommonStyles.activetag] : [CommonStyles.tags]}>
                  <Text style={this.state.type1 == "Schedule" ? [CommonStyles.tagtext, CommonStyles.whitetext] : [CommonStyles.tagtext]}>Booking Request</Text>

                </TouchableOpacity>
                : null}
        
            </View> */}

              <View style={{flex: 1}}>
                {this.state.notificationArray.length > 0 ? (
                  this.state.notificationArray.map((item, index) => {
                    if (item.type == this.state.type1) {
                      return this.state.type1 == 'Job' ? (
                        // <TouchableOpacity style={styles.notificationbox} onPress={() => this.acceptModal(item, index)}>
                        <View>
                          <TouchableOpacity
                            style={styles.notificationbox}
                            onPress={() =>
                              this.props.navigation.navigate(
                                'NotificationDetails',
                                {
                                  freelancerId: item.source_id,
                                  jobId: item.job_id,
                                  alldetails: item,
                                },
                              )
                            }>
                            <View style={[styles.avtbox]}>
                              <View style={styles.avatar}>
                                <Image
                                  source={require('../../assets/images/noti1.png')}
                                  style={styles.avtimage}
                                />
                              </View>
                            </View>
                            <View style={styles.centercontent}>
                              <Text
                                style={styles.headingmain}
                                numberOfLines={2}>
                                {item.content}
                              </Text>
                              <View style={CommonStyles.flexrow}>
                                <View style={styles.datebox}>
                                  <Icon
                                    name="ios-time-outline"
                                    color="#777"
                                    size={14}
                                  />
                                  <Text style={styles.msgtext}>
                                    {moment(item.created_at).format('LL')}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* <TouchableOpacity style={styles.colicon} onPress={() => this.acceptModal(item, index)}>
                                <Icon name="ellipsis-vertical" color="#3e1bee" size={24} />
                              </TouchableOpacity> */}
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity
                            style={styles.notificationbox}
                            //onPress={() =>this.acceptRejectModal(item,index) }
                            onPress={() => this.props.navigation.navigate('MyFeedDetails',
                             { freelancerId: item.source_id, jobId: item.job_id, alldetails:
                               item })}
                          >
                            <View style={styles.avtbox}>
                              <View style={styles.avatar}>
                                <Image
                                  source={require('../../assets/images/milestone.png')}
                                  style={styles.avtimage}
                                />
                              </View>
                            </View>
                            <View style={styles.centercontent}>
                              <Text
                                style={styles.headingmain}
                                numberOfLines={2}>
                                {item.content}
                              </Text>
                              <View style={CommonStyles.flexrow}>
                                <View style={styles.datebox}>
                                  <Icon
                                    name="ios-time-outline"
                                    color="#777"
                                    size={14}
                                  />
                                  <Text style={styles.msgtext}>
                                    {moment(item.created_at).format('LL')}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* <TouchableOpacity style={styles.colicon} onPress={() => this.setState({ showButtonsModalS: true })}>
                                <Icon name="ellipsis-vertical" color="#3e1bee" size={24} />
                              </TouchableOpacity> */}
                          </TouchableOpacity>
                         
                        </View>
                      );
                    }
                  })
                ) : (
                  <Text>No notification found</Text>
                )
                
                }
              </View>
            </View>
          </ScrollView>
          {/* </SafeAreaView> */}
          <Modal
            isOpen={this.state.showButtonsModalS}
            onClose={() => this.setState({showButtonsModalS: false})}>
            <Modal.Content style={styles.nmodal}>
              <Modal.CloseButton />

              <Modal.Body>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.acceptGreenTick(this.state.requestId);
                    }}
                    disabled={this.state.acceptBtn}
                    style={{
                      backgroundColor: '#3e1bee',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      margin: 8,
                      width: '50%',
                      borderRadius: 8,
                    }}>
                      {this.state.btnStatus === 'Accepted' ?
                    <Text style={[CommonStyles.btntext]}>Accepted</Text>
                     : 
                     <Text style={[CommonStyles.btntext]}>Accept</Text>
                  }
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.rejectRedTick(this.state.requestId);
                    }}
                    disabled={this.state.rejectBtn}
                    style={{
                      backgroundColor: '#3e1bee',
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      margin: 8,
                      width: '50%',
                      borderRadius: 8,
                    }}>
                      {this.state.btnStatus === 'Rejected' ?
                    <Text style={[CommonStyles.btntext]}>Rejected</Text>
                     : 
                     <Text style={[CommonStyles.btntext]}>Reject</Text>
                  }
                  </TouchableOpacity>
                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </NativeBaseProvider>
      </ImageBackground>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps, null)(NotificationList);
