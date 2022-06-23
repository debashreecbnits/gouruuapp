import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { connect } from 'react-redux';
import {
  updateProfile, updateUserDetails
} from '../../../Store/Actions/Action';
import { apiCallWithToken } from '../../../Api';
import { GET_PROFILE_INFO, EDIT_CLIENT_PROFILE, PROFILE_UPLOAD } from '../../../shared/allApiUrl';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      facebook: '',
      gitlab: '',
      linkedin: '',
      userDetails: {},
      singleFile: "",
      profile_image: "",
      toggled_as: '',
    };
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo = async () => {
    let data = {
      client_id: this.props.userData.userDetails.data.id
    }
    await apiCallWithToken(GET_PROFILE_INFO, 'post', data)
      .then((res) => {

        this.setState({ first_name: res.data.data.first_name, last_name: res.data.data.last_name, email: res.data.data.email, phone_number: res.data.data.phone_number, address: res.data.data.address, facebook: res.data.data.facebook, gitlab: res.data.data.gitlab, linkedin: res.data.data.linkedin, profile_image: res.data.data.profile_image });
        this.props.updateProfile(res.data.data)
        this.props.updateUserDetails({ ...this.props.userData.userDetails.data, first_name: res.data.data.first_name, last_name: res.data.data.last_name, profile_image: res.data.data.profile_image });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateProfileInfo = async () => {
    let data = {
      client_id: this.props.userData.userDetails.data.id,
      fname: this.state.first_name,
      lname: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone_number,
      address: this.state.address,
      facebook: this.state.facebook,
      gitlab: this.state.gitlab,
      linkedin: this.state.linkedin,
    }


    await apiCallWithToken(EDIT_CLIENT_PROFILE, 'post', data)
      .then((res) => {
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
        this.setState({ editModal: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editProfileImage = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ singleFile: results[0] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

    var formData = new FormData();
    formData.append('user_id', this.props.userData.userDetails.data.id)
    formData.append('image', this.state.singleFile);
    await apiCallWithToken(PROFILE_UPLOAD, 'post', formData)
      .then((res) => {
        this.getProfileInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
        <NativeBaseProvider style={CommonStyles.wrapper}>
          <ImageBackground source={require('../../../assets/images/cbg.png')} style={[CommonStyles.dashbg, styles.profilebg]}>
            <View style={CommonStyles.headerwrap}>
              <View style={CommonStyles.Tlefticon}>
                <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                  <Image
                    source={require('../../../assets/images/menu.png')}
                    resizeMode="contain"
                    style={CommonStyles.ticon}
                  />
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.centerheading}>
                <Text style={CommonStyles.htitle}>Profile</Text>
              </View>
              <View style={CommonStyles.Trighticon}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationList')}>
                  <Image
                    source={require('../../../assets/images/notification.png')}
                    resizeMode="contain"
                    style={CommonStyles.ticon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.profilemain}>

              {this.state.profile_image ?
                <View style={CommonStyles.flexrow}>
                  <View style={styles.profilebox}>
                    {this.state.singleFile ?
                      <Image
                        source={{ uri: this.state.singleFile.uri }}
                        style={{ height: 100, width: 100 }}
                      />
                      : <Image
                        source={{ uri: this.state.profile_image }}
                        resizeMode="cover"
                        style={styles.profileimg}
                      />
                    }
                  </View>
                  <TouchableOpacity onPress={() => this.editProfileImage()} style={styles.editbtn}>
                    <Image
                      source={require('../../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 15, height: 15 }}
                    />

                  </TouchableOpacity>
                </View>
                :
                <View style={CommonStyles.flexrow}>
                  <View style={styles.profilebox}>
                    <Image
                      source={require('../../../assets/images/noimage.png')}
                      resizeMode="cover"
                      style={styles.profileimg}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.editProfileImage()} style={styles.editbtn}>
                    <Image
                      source={require('../../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 15, height: 15 }}
                    />

                  </TouchableOpacity>
                </View>
              }
              <View style={{ width: '75%', paddingTop: 20 }}>
                <Text style={styles.name}>
                  {this.state.first_name}{' '}
                  {this.state.last_name}
                </Text>
                <Text style={styles.ptext}>Marketing Manager</Text>
              </View>
            </View>
          </ImageBackground>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.keyboardContainer}
            enableAutomaticScroll={true}
            scrollEnabled={false}
            extraScrollHeight={200}
            behavior="padding"
            enabled
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
          >
            <ScrollView  keyboardShouldPersistTaps="always">
              <View style={CommonStyles.container}>
                <View
                  style={[
                    CommonStyles.rowbetween,
                    { marginBottom: 25, alignItems: 'center', marginTop: 15 },
                  ]}>
                  <View>
                    <Text style={styles.pageheding}>Profile Info</Text>
                  </View>
                  <TouchableOpacity onPress={() => { this.setState({ editModal: !this.state.editModal }); }}>
                    <Image
                      source={require('../../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />

                  </TouchableOpacity>
                </View>
                {!this.state.editModal ? (
                  <View style={styles.infowrap}>
                    <View style={styles.namerow}>
                      <Text style={CommonStyles.nametext}>Name :</Text>
                      <Text style={CommonStyles.namedata}>
                        {this.state.first_name}{' '}
                        {this.state.last_name}
                      </Text>
                    </View>
                    <View style={styles.nameroweven}>
                      <Text style={CommonStyles.nametext}>Email Id :</Text>
                      <Text style={CommonStyles.namedata}>
                        {this.state.email}
                      </Text>
                    </View>
                    <View style={styles.namerow}>
                      <Text style={CommonStyles.nametext}>Phone :</Text>
                      <Text style={CommonStyles.namedata}>
                        {' '}
                        {this.state.phone_number}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <View style={styles.mcard}>
                      <View style={[CommonStyles.row, { paddingTop: 20, }]}>
                        <View style={CommonStyles.col50}>
                          <View style={CommonStyles.formgroup}>
                            <TextInput
                              style={CommonStyles.formcontrol}
                              placeholder="Firstname"
                              placeholderTextColor="#ccc"
                              value={this.state.first_name}
                              onChangeText={(text) => this.setState({ first_name: text })}
                            />
                            <View style={CommonStyles.formtextwrap}>
                              <Text style={CommonStyles.formtext}>First Name</Text>
                            </View>
                          </View>
                        </View>
                        <View style={CommonStyles.col50}>
                          <View style={CommonStyles.formgroup}>
                            <TextInput
                              style={CommonStyles.formcontrol}
                              placeholder="LastName"
                              placeholderTextColor="#ccc"
                              value={this.state.last_name}
                              onChangeText={(text) => this.setState({ last_name: text })}
                            />
                            <View style={CommonStyles.formtextwrap}>
                              <Text style={CommonStyles.formtext}>Last Name</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={CommonStyles.formgroup}>
                        <TextInput
                          style={CommonStyles.formcontrol}
                          placeholder={this.state.email}
                          placeholderTextColor="#ccc"
                          editable={false}
                        />
                        <View style={CommonStyles.formtextwrap}>
                          <Text style={CommonStyles.formtext}>Email Id</Text>
                        </View>
                      </View>
                      <View style={CommonStyles.formgroup}>
                        <TextInput
                          style={CommonStyles.formcontrol}
                          placeholder="Contact Number"
                          keyboardType='phone-pad'
                          placeholderTextColor="#ccc"
                          returnKeyType='done'
                          value={this.state.phone_number.toString()}
                          onChangeText={(text) => this.setState({ phone_number: text })}
                        />
                        <View style={CommonStyles.formtextwrap}>
                          <Text style={CommonStyles.formtext}>Phone No</Text>
                        </View>
                      </View>
                      <View style={CommonStyles.formgroup}>
                        <TouchableOpacity
                          style={CommonStyles.primarybutton}
                          onPress={() =>
                            this.updateProfileInfo()
                          }>
                          <Text style={CommonStyles.btntext}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
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

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfile(data)),
  updateUserDetails: (data) => dispatch(updateUserDetails(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);