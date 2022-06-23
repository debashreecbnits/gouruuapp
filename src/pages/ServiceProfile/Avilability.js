import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert
} from 'react-native';
import { NativeBaseProvider, Progress } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { apiCallWithToken } from '../../Api';
import { AVAILABILITY_SERVICE_PROVIDER } from '../../shared/allApiUrl';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FreelancerAvilability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      selectedDate: "",
      showStartTimePicker: false,
      startTime: "",
      showEndTimePicker: false,
      endTime: [],
      userId: this.props?.navigation?.state?.params?.userId,
      timeArray: [],
      store: [],
      timeArray2:[]
    };
  }

  hideDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  handleConfirm = (date) => {
    this.setState({ selectedDate: (moment(date).format("YYYY-MM-DD")) })
    this.hideDatePicker();
  };


  hideStartTimePicker = () => {
    this.setState({ showStartTimePicker: false });
  };

  handleStartTimeConfirm = (date) => {
    // this.setState({ startTime: (moment(date).format("HH:mm:ss.SSS")) })
    // this.hideStartTimePicker();
    this.setState({ startTime: (moment(date).format("HH:mm:ss.SSS")) })
    // let inputArr = [...this.state.timeArray];
    // inputArr[0].starttime = this.state.startTime;
    // this.setState({ timeArray: inputArr });
  };


  hideEndTimePicker = () => {
    this.setState({ showEndTimePicker: false });
  };
  handleEndTimeConfirm = (date) => {
    // this.setState({ endTime: (moment(date).format("HH:mm:ss.SSS")) })
    // this.hideEndTimePicker();
    this.setState({ endTime: (moment(date).format("HH:mm:ss.SSS")) })
    // let inputArr = [...this.state.timeArray];
    // inputArr[0].endtime = this.state.endTime;
    // this.setState({ timeArray: inputArr });

  };


  handleChangeName = (text, index) => {
    let inputArr = [...this.state.milestoneArray];
    inputArr[index].description = text;
    this.setState({ milestoneArray: inputArr });
  };
  onAdd = () => {
    Alert.alert(
      "",
      "Do you want to add more time slot?",
      [
          {
              text: "YES",
              //onPress: () => this.setState({ textCategoryMainStore: "" }),
              style: "cancel",
          },
          {
            text: "NO",
            onPress: () => {this.onAdd2()},
            style: "cancel",
        },
      ],

  )    
    const Time = this.state.startTime + '-' + this.state.endTime;
    if (Time) {
      this.setState({
        timeArray: [
          ...this.state.timeArray, Time
        ]
      })
    }
    
      
    
    this.setState({ startTime: '' });
    this.setState({ endTime: '' });
    this.hideStartTimePicker();
    this.hideEndTimePicker();


  };

  removeJobSpeciality = (index) => {
    let tempArr = this.state.timeArray;
    tempArr.splice(index);
    this.setState({ timeArray: tempArr })
}

  onAdd2 = async () => {
   var formData = new FormData();
    //let userId = this.props.userData.userDetails.data.id

    formData.append('userid', this.state.userId);
    formData.append('date', this.state.selectedDate);
    formData.append('times', JSON.stringify(this.state.timeArray));
    formData.append('action_type','add');

    await apiCallWithToken(AVAILABILITY_SERVICE_PROVIDER, 'post', formData).
      then((resp) => {
      }).catch(err => {
        console.log(err);

      })

  }

  render() {    
    return (
      <NativeBaseProvider
        style={{ backgroundColor: '#f7f7f7' }}>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.keyboardContainer}
          enableAutomaticScroll={true}
          scrollEnabled={true}
          extraScrollHeight={60}
          behavior="padding"
          enabled
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none">

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
              <Text style={CommonStyles.htitle}>Add Availability</Text>
            </View>
          </ImageBackground>

          <View style={[styles.formpart, { top: 20 }]}>
            <ScrollView>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.headingtop}>
                  Fill the below details to Add Availability
                </Text>

                <Text style={styles.labeltext}>Date:</Text>
                <TouchableOpacity style={styles.pickermenu} onPress={() => this.setState({ showDatePicker: true })}>
                  <Text style={styles.dttext}>{this.state.selectedDate ? this.state.selectedDate : 'select Date'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showDatePicker}
                  mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={this.hideDatePicker}
                  minimumDate={new Date()}
                />

              </View>

              {/* <TouchableOpacity style={CommonStyles.formgroup}
                onPress={() => this.addMoreTime()}
              >
                <Text style={[CommonStyles.heading, CommonStyles.activetext, { textAlign: 'right' }]}>+ Add more time</Text>
              </TouchableOpacity> */}

            
              {
                this.state.timeArray && this.state.timeArray.length >= 0 ? this.state.timeArray.map((val, index) => {
                  return (
                    <>
                      {val === undefined ? null :
                        <View key={index} style={[CommonStyles.tagswrap, { bottom: 10 }]}>
                          <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                            <Text style={[CommonStyles.tagtext]}>{val}</Text>
                            <TouchableOpacity onPress={() => this.removeJobSpeciality(index)}>
                              <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                            </TouchableOpacity>

                          </View>
                        </View>
                      }
                    </>
                  )
                }) : null
              }

              <View style={[styles.formgroup, { bottom: 10 }]}>

                <Text style={styles.labeltext}>Start Time:</Text>

                <TouchableOpacity style={styles.pickermenu} onPress={() => this.setState({ showStartTimePicker: true })}>
                  <Text style={styles.dttext}>{this.state.startTime ? this.state.startTime : 'select Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showStartTimePicker}
                  mode="time"
                  onConfirm={this.handleStartTimeConfirm}
                  onCancel={this.hideStartTimePicker}
                  minimumDate={new Date()}
                />

              </View>


              <View style={styles.formgroup}>
                <Text style={styles.labeltext}>End Time:</Text>
                <TouchableOpacity style={styles.pickermenu} onPress={() => this.setState({ showEndTimePicker: true })}>
                  <Text style={styles.dttext}>{this.state.endTime ? this.state.endTime : 'select Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.showEndTimePicker}
                  mode="time"
                  onConfirm={this.handleEndTimeConfirm}
                  onCancel={this.hideEndTimePicker}
                  minimumDate={new Date()}
                />

              </View>

              



              <View style={[styles.btnarea2, { top: 20, }]}>
                <TouchableOpacity
                  style={styles.redbtn}
                  onPress={this.onAdd}

                >
                  <Text style={styles.btntext}>Add</Text>
                </TouchableOpacity>
              </View>


            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </NativeBaseProvider>

    );
  }
}