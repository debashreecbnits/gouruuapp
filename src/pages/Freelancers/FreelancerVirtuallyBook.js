import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  //ToastAndroid
} from 'react-native';
import { NativeBaseProvider, Progress } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { apiCallWithToken } from '../../Api';
import { BOOK_ALLOTEMENT } from '../../shared/allApiUrl';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { updateProfile } from '../../Store/Actions/Action';
import Toast from 'react-native-simple-toast';

class FreelancerVirtuallyBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      selectedDate: '',
      showStartTimePicker: false,
      startTime: '',
      showEndTimePicker: false,
      endTime: '',
      freelancerId: this.props?.navigation?.state?.params?.userId,
      timeArray: [],
      selectedDateError: '',
      selectedStartTimeError: '',
      selectedEndTimeError: '',
      buttonDisable: false,
      clientId: this.props?.userData?.userDetails?.data?.id,
      convertTime: "",
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
    this.setState({ startTime: (moment(date).format("HH:mm:ss.SSS")) })
    this.hideStartTimePicker();
  };


  hideEndTimePicker = () => {
    this.setState({ showEndTimePicker: false });
  };
  handleEndTimeConfirm = (date) => {
    this.setState({ endTime: (moment(date).format("HH:mm:ss.SSS")) })
    this.hideEndTimePicker();
  };



  onAdd = async () => {

    if (this.state.selectedDate === "") {
      this.setState({ selectedDateError: '***Please select date' })
    }
    else if (this.state.startTime === "") {
      this.setState({ selectedStartTimeError: '***Please select start time' })
    }
    else if (this.state.endTime === "") {
      this.setState({ selectedEndTimeError: '***Please select end time' })
    }
    else {
      this.setState({ selectedDateError: "" })
      this.setState({ selectedStartTimeError: "" })
      this.setState({ selectedEndTimeError: "" })


      var formData = new FormData();
      formData.append('clientid', this.state.clientId);
      formData.append('freelancerid', this.state.freelancerId);
      formData.append('txt', "");
      formData.append('date', this.state.selectedDate);
      formData.append('time_from', moment(this.state.startTime, 'HH:mm:ss').format("HH:mm"));
      formData.append('time_to', moment(this.state.endTime, 'HH:mm:ss').format("HH:mm"));


      this.props.navigation.navigate('Freelancers')
      await apiCallWithToken(BOOK_ALLOTEMENT, 'post', formData).
        then((resp) => {
          if (resp?.data?.status === 1) {
            //ToastAndroid.show(resp.data.message, ToastAndroid.SHORT)
            Toast.show(resp.data.message, Toast.LONG)
            this.setState({ buttonDisable: true })
          } else {
            //ToastAndroid.show("please try again")
            Toast.show("Please try again", Toast.LONG)
            this.setState({ buttonDisable: false })
          }
        }).catch(err => {
          console.log(err);

        })
    }

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
              <Text style={CommonStyles.htitle}> Book Availability</Text>
            </View>
          </ImageBackground>

          <View style={[styles.formpart, { top: 20 }]}>
            <ScrollView>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.headingtop}>
                  Fill the below details
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
                {this.state.selectedDate == "" && this.state.selectedDateError != '' ? (
                  <Text style={{ color: 'red' }}>{this.state.selectedDateError}</Text>
                ) : null}
              </View>

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
                {this.state.startTime == "" && this.state.selectedStartTimeError != '' ? (
                  <Text style={{ color: 'red' }}>{this.state.selectedStartTimeError}</Text>
                ) : null}
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
                {this.state.endTime == "" && this.state.selectedEndTimeError != '' ? (
                  <Text style={{ color: 'red' }}>{this.state.selectedEndTimeError}</Text>
                ) : null}
              </View>



              <View style={[styles.btnarea, { top: 20 }]}>
                <TouchableOpacity
                  style={[styles.redbtn, { backgroundColor: this.state.buttonDisable === true ? "#b2bec3" : "#6c5ce7" }]}
                  onPress={this.onAdd}
                  disabled={this.state.buttonDisable === true ? true : false}

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

const mapStateToProps = state => {
  return {
    userData: state,
  };
};

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(updateProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerVirtuallyBook);
