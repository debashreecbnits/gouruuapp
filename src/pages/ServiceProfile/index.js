import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ImageBackground,
  TimePickerAndroid,
} from 'react-native';
import { NativeBaseProvider, Progress, Select, CheckIcon } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { updateProfile, updateUserDetails } from '../../Store/Actions/Action';
import Icon from 'react-native-vector-icons/Ionicons';
import { height, justifyContent } from 'styled-system';
import { apiCallWithToken } from '../../Api';
import { ProgressBar } from 'react-native-paper';
import {
  GET_ALL_CATEGORY,
  GET_ALL_SPECIALITY,
  EMPLOYMENT_HISTORY,
  PROFILE_UPLOAD,
  UPLOAD_PORTFOLIO,
} from '../../shared/allApiUrl';
import {
  GET_FREELANCER_PROFILE_INFO,
  EDIT_USER,
  GET_LANGUAGE_NAMES,
  GET_PORTFOLIO,
} from '../../shared/allApiUrl';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import EmploymentCard from '../../components/EmploymentCard';
import AddEmploymentCard from '../../components/EmploymentCard/addEmployment';
import PortfolioCard from '../../components/PortfolioCard';
import AddPortFolioCard from '../../components/PortfolioCard/addPortFolio';
import DocumentPicker from 'react-native-document-picker';
import Loader from '../../components/Loader';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

var suggestedKeyword = [];
class FreelancerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      email: '',
      phone_number: '',
      description: '',
      hourly_rate: '',
      phone_number: '',
      address: '',
      Profile_Completion: '',
      category_name: '',
      first_name: '',
      last_name: '',
      hourly_rate: '',
      service_cost: '',
      Employment_History: [],
      Work_History: [],
      language: [],
      portfolioDetails: [],
      profile_image: '',
      singleFile: '',
      jobCategory: [],
      filteredJobCategory: [],
      selectedJobCategory: [],
      jobSpeciality: [],
      jobSpecialList: false,
      filteredJobSpeciality: [],
      selectedJobSpeciality: [],
      jobSpecialityError: '',

      holder: [],
      suggestedKeywordError: '',
      speciality: [],
      skill: [],
      skillList: [],
      specialityList: [],
      jobList: false,
      company: '',
      companyError: '',
      selectedJobRole: [],
      selectedJobRoleError: '',
      selectedState: '',
      selectedStateError: '',
      selectedCity: '',
      selectedCityError: '',
      workingFrom: '',
      workingFromError: '',
      workingTo: '',
      workingToError: '',
      workExperience: '',
      workExperienceError: '',
      experienceDetails: [],
      JobCategoryName: this.props.userData?.userDetails?.profileDetails
        ?.User_Data?.category__name
        ? this.props.userData?.userDetails?.profileDetails?.User_Data
          ?.category__name
        : '',
      address: '',
      selectedCountry: '',
      selectedCity: '',
      editModal1: false,
      editModal2: false,
      editModal3: false,
      editPortfolio: false,
      addEmploymentModal: false,
      employmentHistoryItem: {},
      editEmploymentFlag: false,
      portfolioItem: {},
      editPortFolioFlag: false,
      addPortFolioModal: false,
      editModalNew: false,
      nameModal: false,
      languageName: '',
      languageModal: false,
      languageArray: [],
      toggled_as: '',
      skillHolder: [],
      selectedSkill: [],
      filteredSkill: [],

    };
  }

  componentDidMount() {
    this.getProfileInfo();
    this.getPortfolio();
    this.getJobCategory();
    this.getAllLanguage();
    this.jobList();
    this.getSpecialitynSkill();
    //this.getJobSpeciality();
    this.props.navigation.addListener('didFocus', () => {
      this.getProfileInfo();
    });
  }

  getProfileInfo = async () => {
    this.setState({ isLoading: true });
    let data = {
      //uid: this.props.navigation.state.params.userId? this.props.navigation.state.params.userId : this.props.userData.userDetails.data.id,
      uid: this.props.userData.userDetails.data.id
    };

    await apiCallWithToken(GET_FREELANCER_PROFILE_INFO, 'post', data)
      .then(res => {
        console.log("FREELANCER PROFILE INFO++++",res)
        this.setState({
          Profile_Completion: res.data.data.User_Data.Profile_Completion,
          address: res.data.data.User_Data.address,
          description: res.data.data.User_Data.description,
          email: res.data.data.User_Data.email,
          exp_lavel: res.data.data.User_Data.exp_lavel,
          first_name: res.data.data.User_Data.first_name,
          hourly_rate: res.data.data.User_Data.hourly_rate,
          last_name: res.data.data.User_Data.last_name,
          username: res.data.data.User_Data.username,
          phone_number: res.data.data.User_Data.phone_number,
          language: res.data.data.User_Data.language,
          profile_image: res.data.data.User_Data.profile_image,
          service_cost: res.data.data.User_Data.service_cost,
          category_name: res.data.data.User_Data.category__name,
          Work_History: res.data.data.Work_History,
          Employment_History: res.data.data.Employment_History,
          isLoading: false,
        });
        this.props.updateProfile(res.data.data);
        this.props.updateUserDetails({
          ...this.props.userData.userDetails.data,
          first_name: res.data.data.User_Data.first_name,
          last_name: res.data.data.User_Data.last_name,
          profile_image: res.data.data.profile_image,
          profile_image: res.data.data.User_Data.profile_image
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  AddItemsToArray = () => {

    //Adding Items To Array.
    suggestedKeyword.push(this.state.holder.toString());
    this.setState({ holder: suggestedKeyword })
    this.setState({ suggestedKeywordError: "" })
  }
  removeKeyword = (index) => {
    let tempArr = suggestedKeyword;
    tempArr.splice(index);
    this.setState({ holder: tempArr })
  }

  updateProfileInfo1 = async () => {
    let data = {
      uid: this.props.userData.userDetails.data.id,
      hrate: this.state.hourly_rate,
      sercicecost: this.state.service_cost,
      action_type: 'update',
    };

    await apiCallWithToken(EDIT_USER, 'post', data)
      .then(res => {
        this.setState({ editModal1: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };
  updateProfileInfo2 = async () => {
    var formData = new FormData();
    formData.append('uid', this.props.userData.userDetails.data.id);
    formData.append('action_type', 'update');
    if (this.state?.selectedJobCategory) {
      this.state.selectedJobCategory.map(item =>
        formData.append('category', item.name),
      );
    }
    if (this.state?.selectedSkill) {
      this.state.selectedSkill.map(item =>
        formData.append('skills', item.title),
      );
    }
    await apiCallWithToken(EDIT_USER, 'post', formData)
      .then(res => {
        this.setState({ editModal2: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateProfileInfoNew = async () => {
    var formData = new FormData();
    formData.append('uid', this.props.userData.userDetails.data.id);
    formData.append('address', this.state.address);
    formData.append('action_type', 'update');
    await apiCallWithToken(EDIT_USER, 'post', formData)
      .then(res => {
        this.setState({ editModalNew: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateLanguage = async () => {
    let arr = [];
    arr.push({
      id: this.state.otherLanguage,
      level: this.state.otherLanguageProficiaency,
    });

    var formData = new FormData();
    formData.append('uid', this.props.userData.userDetails.data.id);
    formData.append('lang', JSON.stringify(arr));
    formData.append('action_type', 'update');
    await apiCallWithToken(EDIT_USER, 'post', formData)
      .then(res => {
        this.setState({ languageModal: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateProfileInfo3 = async () => {
    let data = {
      uid: this.props.userData.userDetails.data.id,
      description: this.state.description,
      action_type: 'update',
    };

    await apiCallWithToken(EDIT_USER, 'post', data)
      .then(res => {
        this.setState({ editModal3: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateNameInfo = async () => {
    let data = {
      uid: this.props.userData.userDetails.data.id,
      fname: this.state.first_name,
      lname: this.state.last_name,
      action_type: 'update',
    };
    await apiCallWithToken(EDIT_USER, 'post', data)
      .then(res => {
        this.setState({ nameModal: false });
        this.setState({ userDetails: res.data.data });
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getPortfolio = async () => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    await apiCallWithToken(GET_PORTFOLIO, 'post', formData)
      .then(res => {

        this.setState({ portfolioDetails: res.data.Data });
      })
      .catch(err => {
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
    formData.append('user_id', this.props.userData.userDetails.data.id);
    formData.append('image', this.state.singleFile);
    await apiCallWithToken(PROFILE_UPLOAD, 'post', formData)
      .then(res => {
        this.getProfileInfo();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getJobCategory = async () => {
    await apiCallWithToken(GET_ALL_CATEGORY, 'get')
      .then(res => {
        if (res.data) {
          this.setState({ jobCategory: res.data.data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  jobList = () => {
    this.setState({ filteredJobCategory: this.state.jobCategory });
  };

  findJobCategoryData = text => {
    this.setState({ jobList: true });
    let jobCategoryData = this.state.jobCategory;
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
      let data = jobCategoryData.filter(obj => obj.name.search(regex) >= 0);
      this.setState({ filteredJobCategory: data });
    } else {
      this.setState({ filteredJobCategory: [] });
    }
  };



  findJobCategoryData = text => {
    this.setState({ jobList: true });
    let jobCategoryData = this.state.jobCategory;
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
      let data = jobCategoryData.filter(obj => obj.name.search(regex) >= 0);
      this.setState({ filteredJobCategory: data });
    } else {
      this.setState({ filteredJobCategory: [] });
    }
  };



  removeJobCategory = index => {
    let tempArr = this.state.selectedJobCategory;
    tempArr.splice(index);
    this.setState({ selectedJobCategory: tempArr });
  };



  skillList = () => {
    this.setState({ filteredSkill: this.state.skillList });
  };

  getSpecialitynSkill = async newValue => {
    if (newValue.id !== null) {
      let tempArr = this.state.selectedJobCategory;
      tempArr.push(newValue);
      this.setState({ selectedJobCategory: tempArr, filteredJobCategory: [] });
      var formData = new FormData();
      formData.append('cat_id', newValue.id);
      await apiCallWithToken(GET_ALL_SPECIALITY, 'post', formData)
        .then(res => {
          if (res.status == 200) {
            this.setState({
              specialityList: res.data.data.speciality,
              skillList: res.data.data.skill,
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getJobSpeciality = async (item) => {
    if (item !== null) {
      let tempArr = this.state.selectedSkill;
      tempArr.push(item)
      this.setState({ selectedSkill: tempArr });
      var formData = new FormData();
      if (this.state.selectedSkill) {
        this.state.selectedSkill.map(val4 =>
          formData.append('cat_id', val4.id),
          //formData.append('skills', val4.title),
        );
        if (this.state.selectedSkill) {
          this.state.selectedSkill.map(val4 =>
            //formData.append('cat_id', val4.id),
            formData.append('skills', val4.title),
          );
        }
      }

      await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
        .then((res) => {
          if (res.status == 200) {
            this.setState({ speciality: res.data.data.speciality, skillList: res.data.data.skill });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  editEmployment = item => {
    this.setState({
      employmentHistoryItem: item,
      addEmploymentModal: true,
      editEmploymentFlag: true,
    });
  };

  closeEmploymentModal = () => {
    this.setState({ addEmploymentModal: false });
  };

  deleteEmployment = async item => {
    var formData = new FormData();

    formData.append('uid', this.props.userData.userDetails.data.id);
    formData.append('emp_history_id', item.id);
    formData.append('action_type', 'delete');
    await apiCallWithToken(EMPLOYMENT_HISTORY, 'post', formData)
      .then(res => {
        if (res.data.status === 1) {
          this.getProfileInfo();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  AddSpecialityToArray = () => {
    this.state.selectedSkill.push(this.state.skillHolder);
  }

  addEmployment = () => {
    this.setState({
      addEmploymentModal: true,
      employmentHistoryItem: {},
      editEmploymentFlag: false,
    });
  };
  getAllLanguage = async () => {
    await apiCallWithToken(GET_LANGUAGE_NAMES, 'get')
      .then(res => {

        if ((res.status = 200)) {
          this.setState({ languageArray: res.data.Data });
        }

      })
      .catch(err => {
        console.log(err);
      });
  };
  editPortfolio = item => {
    this.setState({
      portfolioItem: item,
      addPortFolioModal: true,
      editPortFolioFlag: true,
    });
  };

  deletePortfolio = async item => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    formData.append('name', item.name);
    await apiCallWithToken('delete_portfolio', 'post', formData)
      .then(res => {
        this.getPortfolio();
      })
      .catch(err => {
        console.log(err);
      });
  };

  addPortfolio = () => {
    this.setState({
      addPortFolioModal: true,
      portfolioItem: {},
      editPortFolioFlag: false,
    });
  };
  closePortfolioModal = () => {
    this.setState({ addPortFolioModal: false });
  };

  render() {

    return (
      <ImageBackground source={require('../../assets/images/mainbg.png')} style={[CommonStyles.wrapperbg, { flex: 1 }]} >
        <NativeBaseProvider style={CommonStyles.wrapper}>
          <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Image
                  source={require('../../assets/images/menu.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Profile</Text>
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
          </ImageBackground>
          <ScrollView>
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <View style={[CommonStyles.container, CommonStyles.nobg]}>
                <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                  {this.state.profile_image ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.profilebox}>

                        {this.state.singleFile ? (
                          <Image
                            source={{ uri: this.state.singleFile.uri }}
                            style={{ height: 100, width: 100 }}
                          />
                        ) : (
                          <Image
                            source={{ uri: this.state.profile_image }}
                            resizeMode="cover"
                            style={styles.profileimg}
                          />
                        )}



                      </View>
                      <TouchableOpacity style={CommonStyles.editbtn} onPress={() => this.editProfileImage()}>
                        <Image
                          source={require('../../assets/images/edit.png')}
                          resizeMode="contain"
                          style={{ height: 15, width: 15 }}
                        />

                      </TouchableOpacity>
                      {this.props.userData?.userDetails?.profileDetails?.User_Data?.is_admin_verified ?
                        <Image style={styles.tick} source={require('../../assets/images/verification.png')} />
                        :
                        null}
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.profilebox}>
                        <Image
                          source={require('../../assets/images/noimage.png')}
                          resizeMode="cover"
                          style={styles.profileimg}
                        />
                      </View>
                      <TouchableOpacity style={CommonStyles.editbtn} onPress={() => this.editProfileImage()}>
                        <Image
                          source={require('../../assets/images/edit.png')}
                          resizeMode="contain"
                          style={{ width: 15, height: 15 }}
                        />

                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.namebox}>
                    <TouchableOpacity
                      style={CommonStyles.editbtn2}
                      onPress={() => {
                        this.setState({ nameModal: !this.state.nameModal });
                      }}>
                      <Image
                        source={require('../../assets/images/edit.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20 }}
                      />

                    </TouchableOpacity>
                    {!this.state.nameModal ? (
                      <Text style={styles.name}>
                        {this.state.first_name} {this.state.last_name}
                      </Text>
                    ) : (
                      <>
                        <View style={CommonStyles.col50}>
                          <View style={CommonStyles.formgroup}>
                            <TextInput
                              style={CommonStyles.formcontrol}
                              placeholder="Firstname"
                              placeholderTextColor="#ccc"
                              value={this.state.first_name}
                              onChangeText={text =>
                                this.setState({ first_name: text })
                              }
                            />
                            <View style={CommonStyles.formtextwrap}>
                              <Text style={CommonStyles.formtext}>
                                First Name
                              </Text>
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
                              onChangeText={text =>
                                this.setState({ last_name: text })
                              }
                            />
                            <View style={CommonStyles.formtextwrap}>
                              <Text style={CommonStyles.formtext}>Last Name</Text>
                            </View>
                          </View>
                        </View>
                        <View style={CommonStyles.formgroup}>
                          <TouchableOpacity
                            style={CommonStyles.primarybutton}
                            onPress={() => this.updateNameInfo()}>
                            <Text style={CommonStyles.btntext}>Save Changes</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                    <Text style={styles.ptext}>
                      Profile Complition is {this.state.Profile_Completion}%
                    </Text>
                    <View style={{ marginLeft: -15, paddingBottom: 5 }}>
                      <Progress colorScheme={this.state.Profile_Completion < 40 ? 'warning' : '#3e1bee'} value={this.state.Profile_Completion} mx="4" />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('PublicView')
                      }>
                      <Text style={[styles.ptext, CommonStyles.activetext]}>
                        View Profile as Public
                      </Text>
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={[CommonStyles.rowbetween, { marginTop: 25 }]}>
                  <Text style={styles.pageheding}>Profile Info</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('FreelancerAvilability', { userId: this.props?.userData?.userDetails?.data?.id })}>
                    <Text style={[styles.h4, CommonStyles.activetext]}>Check Avilability</Text>
                  </TouchableOpacity>
                </View>


                <View style={CommonStyles.hr}></View>

                <View style={styles.infowrap}>
                  <TouchableOpacity
                    style={CommonStyles.editbtn2}
                    onPress={() => {
                      this.setState({ editModal1: !this.state.editModal1 });
                    }}>
                    <Image
                      source={require('../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />

                  </TouchableOpacity>
                  {!this.state.editModal1 ? (
                    <>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Hourly Rate :</Text>
                        <Text
                          style={[
                            CommonStyles.namedata, { fontSize: 18, color: '#3e1bee', fontFamily: 'Lato-Bold' },
                          ]}>
                          {'$'}{this.state.hourly_rate ? this.state.hourly_rate : "Not Mentioned"}
                        </Text>
                      </View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Service Cost :</Text>
                        <Text
                          style={[
                            CommonStyles.namedata,
                            { fontSize: 18, color: '#3e1bee', fontFamily: 'Lato-Bold' },
                          ]}>
                          {'$'}{this.state.service_cost ? this.state.service_cost : "Not Mentioned"}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholder="Hourly rate"
                            placeholderTextColor="#ccc"
                            value={this.state.hourly_rate.toString()}
                            onChangeText={text =>
                              this.setState({ hourly_rate: text })
                            }
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Hourly Rate</Text>
                          </View>
                        </View>
                      </View>

                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholder="Service cost"
                            placeholderTextColor="#ccc"
                            value={this.state.service_cost.toString()}
                            onChangeText={text =>
                              this.setState({ service_cost: text })
                            }
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>
                              Service Cost
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={CommonStyles.formgroup}>
                        <TouchableOpacity
                          style={CommonStyles.primarybutton}
                          onPress={() => this.updateProfileInfo1()}>
                          <Text style={CommonStyles.btntext}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
                <View style={CommonStyles.hr}></View>

                <View style={styles.infowrap}>
                  <TouchableOpacity
                    style={CommonStyles.editbtn2}
                    onPress={() => {
                      this.setState({ editModal2: !this.state.editModal2 });
                    }}>
                    <Image
                      source={require('../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />

                  </TouchableOpacity>
                  {!this.state.editModal2 ? (
                    <>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Category :</Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.category_name}
                        </Text>
                      </View>

                    </>
                  ) : (
                    <>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => this.jobList()}
                            containerStyle={styles.autocompleteContainer}
                            style={styles.autoComplete}
                            listStyle={{ zIndex: 1, position: 'relative' }}
                            data={this.state.filteredJobCategory}
                            onChangeText={text => this.findJobCategoryData(text)}
                            placeholder="Enter job category"
                            defaultValue={this.state.JobCategoryName}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() => this.getSpecialitynSkill(item)}>
                                <Text style={styles.itemText}>{item.name}</Text>
                              </TouchableOpacity>
                            )}
                          />
                          {this.state.selectedJobCategory.length > 0 &&
                            this.state.selectedJobCategory.map((val, index) => {
                              return (
                                <View
                                  style={[
                                    CommonStyles.tagswrap,
                                    { paddingTop: 10 },
                                  ]}>
                                  <View
                                    style={[
                                      CommonStyles.tags,
                                      CommonStyles.activetag,
                                      CommonStyles.flexrow,
                                    ]}>
                                    <Text
                                      style={[
                                        CommonStyles.tagtext,
                                        CommonStyles.whitetext,
                                      ]}>
                                      {val.name}
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.removeJobCategory(index)
                                      }>
                                      <Icon
                                        name="close-circle"
                                        size={15}
                                        color="#fff"
                                        style={{ marginLeft: 5 }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            })}
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Category</Text>
                          </View>
                        </View>
                      </View>
                      <View style={CommonStyles.formgroup}>
                        <Text style={styles.formlabel}>Skills</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => this.skillList()}
                            containerStyle={styles.autocompleteContainer}
                            style={styles.autoComplete}
                            listStyle={{ zIndex: 1, position: 'relative' }}
                            data={this.state.filteredSkill}
                            //onChangeText={(text) => this.findJobSpecialityData(text)}
                            onChangeText={(TextInputValue) => this.setState({ skillHolder: TextInputValue })

                            }

                            placeholder="Select Skill"
                            renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => this.getJobSpeciality(item)}
                              >
                                <Text style={styles.itemText}>

                                  {item.title}

                                </Text>
                              </TouchableOpacity>
                            )}
                          />

                          <TouchableOpacity style={{ marginTop: 10, marginLeft: -40 }}
                            onPress={this.AddSpecialityToArray}
                          >
                            <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                          </TouchableOpacity>
                        </View>
                        {
                          this.state.selectedSkill && this.state.selectedSkill.length > 0 ? this.state.selectedSkill.map((val2, index) => {
                            return (
                              <>
                                {val2 === undefined ? null :
                                  <View key={index} style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>


                                    <View style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                                      <Text style={[CommonStyles.tagtext, CommonStyles.whitetext]}>{val2.title}</Text>
                                      <TouchableOpacity onPress={() => this.removeSkill(index)}>
                                        <Icon name="close-circle" size={15} color="#fff" style={{ marginLeft: 5 }} />
                                      </TouchableOpacity>

                                    </View>
                                  </View>
                                }
                              </>
                            )
                          }) : null
                        }
                      </View>

                      <View style={CommonStyles.formgroup}>
                        <TouchableOpacity
                          style={CommonStyles.primarybutton}
                          onPress={() => this.updateProfileInfo2()}>
                          <Text style={CommonStyles.btntext}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
                <View style={CommonStyles.hr}></View>
                <View style={styles.infowrap}>
                  <TouchableOpacity
                    style={CommonStyles.editbtn2}
                    onPress={() => {
                      this.setState({ editModalNew: !this.state.editModalNew });
                    }}>
                    <Image
                      source={require('../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />

                  </TouchableOpacity>
                  {!this.state.editModalNew ? (
                    <>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>User Name : </Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.username}
                        </Text>
                      </View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Email Id :</Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.email}
                        </Text>
                      </View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Phone :</Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.phone_number}
                        </Text>
                      </View>

                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Time Zone :</Text>
                        <Text style={CommonStyles.namedata}>
                          {' '}
                          Nigeria (GMT+1)Thursday, 18 March 2021, 5:46 am{' '}
                        </Text>
                      </View>
                      <View style={CommonStyles.namerow}>
                        <Text style={CommonStyles.nametext}>Address :</Text>
                        <Text style={CommonStyles.namedata}>
                          {this.state.address}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholder={this.state.username}
                            placeholderTextColor="#ccc"
                            editable={false}
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>User Name</Text>
                          </View>
                        </View>
                      </View>
                      <View style={CommonStyles.col50}>
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
                      </View>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholderTextColor="#ccc"
                            placeholder="Contact Number"
                            keyboardType="phone-pad"
                            value={this.state.phone_number.toString()}
                            onChangeText={text =>
                              this.setState({ phone_number: text })
                            }
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Phone</Text>
                          </View>
                        </View>
                      </View>

                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholder="Hourly rate"
                            placeholderTextColor="#ccc"
                            value={this.state.hourly_rate}
                            onChangeText={text =>
                              this.setState({ hourly_rate: text })
                            }
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Hourly Rate</Text>
                          </View>
                        </View>
                      </View>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <TextInput
                            style={CommonStyles.formcontrol}
                            placeholder="Address"
                            placeholderTextColor="#ccc"
                            value={this.state.address}
                            onChangeText={text => this.setState({ address: text })}
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Adress</Text>
                          </View>
                        </View>
                      </View>

                      <View style={CommonStyles.formgroup}>
                        <TouchableOpacity
                          style={CommonStyles.primarybutton}
                          onPress={() => this.updateProfileInfoNew()}>
                          <Text style={CommonStyles.btntext}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
                <View style={CommonStyles.hr}></View>
                {!this.state.languageModal ? (
                  <>
                    <View
                      style={[
                        CommonStyles.rowbetween,
                        { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                      ]}>
                      <View>
                        <Text style={styles.pageheding}>Languages</Text>
                      </View>

                      <TouchableOpacity
                        style={CommonStyles.editbtn2}
                        onPress={() => {
                          this.setState({
                            languageModal: !this.state.languageModal,
                          });
                        }}>
                        <Image
                          source={require('../../assets/images/edit.png')}
                          resizeMode="contain"
                          style={{ width: 20, height: 20 }}
                        />

                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%' }}>

                      {this.state.language && this.state.language.length > 0 ? (
                        this.state.language.map((item, index) => {
                          return (
                            <>
                              <View style={CommonStyles.namerow}>
                                <Text style={CommonStyles.nametext}>{item.language__name} : </Text>
                                <Text style={CommonStyles.namedata}>{item.level}</Text>

                              </View>
                            </>
                          );
                        })
                      ) : (
                        <View>
                          <Text>No languages selected</Text>
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    <View style={CommonStyles.row}>
                      <View style={CommonStyles.col50}>
                        <View style={CommonStyles.formgroup}>
                          <Select
                            minWidth="100%"
                            accessibilityLabel="language"
                            placeholder="language"
                            _selectedItem={{
                              bg: 'primary.600',
                              endIcon: <CheckIcon size={5} />,
                            }}
                            style={styles.formlabel}
                            selectedValue={this.state.otherLanguage}
                            onValueChange={value =>
                              this.setState({ otherLanguage: value })
                            }>
                            {this.state.languageArray &&
                              this.state.languageArray.map((data, index) => {
                                return (
                                  <Select.Item label={data.name} value={data.id} />
                                );
                              })}
                          </Select>

                          <Text style={CommonStyles.formtext}>Language</Text>
                        </View>
                        <View style={CommonStyles.formgroup}>
                          <Select
                            minWidth="100%"
                            accessibilityLabel="language"
                            placeholder="proficiaency"
                            _selectedItem={{
                              bg: 'primary.600',
                              endIcon: <CheckIcon size={5} />,
                            }}
                            style={styles.formlabel}
                            selectedValue={this.state.otherLanguageProficiaency}
                            onValueChange={value =>
                              this.setState({ otherLanguageProficiaency: value })
                            }>
                            <Select.Item label="Basic" value="Basic" />
                            <Select.Item
                              label="Intermidiate"
                              value="Intermidiate"
                            />
                            <Select.Item label="flaunt" value="flaunt" />
                          </Select>
                        </View>
                      </View>

                    </View>

                    <View style={CommonStyles.formgroup}>
                      <TouchableOpacity
                        style={CommonStyles.primarybutton}
                        onPress={() => this.updateLanguage()}>
                        <Text style={CommonStyles.btntext}>Save Changes</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                <View style={CommonStyles.hr}></View>
                {!this.state.editModal3 ? (
                  <>
                    <View
                      style={[
                        CommonStyles.rowbetween,
                        { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                      ]}>
                      <View>
                        <Text style={styles.pageheding}>
                          Professional Overview
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={CommonStyles.editbtn2}
                        onPress={() => {
                          this.setState({ editModal3: !this.state.editModal3 });
                        }}>
                        <Image
                          source={require('../../assets/images/edit.png')}
                          resizeMode="contain"
                          style={{ width: 20, height: 20 }}
                        />

                      </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.formgroup}>
                      <Text style={styles.ptext}>{this.state.description}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={CommonStyles.col50}>
                      <View style={CommonStyles.formgroup}>
                        <TextInput
                          style={CommonStyles.formcontrol}
                          placeholder="Hourly rate"
                          placeholderTextColor="#ccc"
                          value={this.state.description}
                          onChangeText={text =>
                            this.setState({ description: text })
                          }
                        />
                        <View style={CommonStyles.formtextwrap}>
                          <Text style={CommonStyles.formtext}>
                            Professional Over..
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={CommonStyles.formgroup}>
                      <TouchableOpacity
                        style={CommonStyles.primarybutton}
                        onPress={() => this.updateProfileInfo3()}>
                        <Text style={CommonStyles.btntext}>Save Changes</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                <View style={CommonStyles.hr}></View>
                <View
                  style={[
                    CommonStyles.rowbetween,
                    { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                  ]}>
                  <View>
                    <Text style={styles.pageheding}>Work History</Text>
                  </View>
                  <TouchableOpacity style={CommonStyles.editbtn2}>
                    <Image
                      source={require('../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{ width: 20, height: 20 }}
                    />

                  </TouchableOpacity>
                </View>
                {this.state.Work_History && this.state.Work_History.length > 0 ? (
                  this.state.Work_History.map((item, index) => {
                    return (
                      <View style={[{ position: 'relative' }]}>
                        <View style={styles.deleterow}>
                          <TouchableOpacity style={styles.trbtn}>
                            <Icon name="ios-trash" color="#777" size={14} />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.trbtn}>
                            <Icon name="ios-trash" color="#777" size={14} />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.formlabel}>
                          React Native App Cleanup
                        </Text>
                        <View
                          style={[
                            CommonStyles.flexrow,
                            CommonStyles.aligncenter,
                          ]}>
                          <Text
                            style={[
                              styles.ptext,
                              {
                                fontWeight: 'bold',
                                fontSize: 25,
                                paddingBottom: 0,
                              },
                            ]}>
                            *****
                          </Text>
                          <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                            {' '}
                            (5.0)
                          </Text>
                        </View>

                        <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                          17jun 2021- 26jun 2021
                        </Text>
                        <Text style={styles.ptext}>
                          In programming, just like in algebra, we use variables
                          (like price1) to hold values. In programming, just like
                          in algebra, we use variables in expressions
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View>
                    <Text>No data found</Text>
                  </View>
                )}

                <View style={CommonStyles.hr}></View>
                <View
                  style={[
                    CommonStyles.rowbetween,
                    { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                  ]}>
                  <View>
                    <Text style={styles.pageheding}>Employment History</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.addEmployment()}>
                    <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                  </TouchableOpacity>
                </View>
                {this.state.Employment_History &&
                  this.state.Employment_History.length > 0 ? (
                  <EmploymentCard
                    data={this.state.Employment_History}
                    onRef={ref => (
                      (this.editEmploymentHistory = ref),
                      (this.deleteEmploymentHistory = ref)
                    )}
                    editEmploymentHistory={this.editEmployment.bind(this)}
                    deleteEmploymentHistory={this.deleteEmployment.bind(this)}
                  />
                ) : (
                  <View>
                    <Text>No data found</Text>
                  </View>
                )}

                <View style={CommonStyles.hr}></View>
                <View
                  style={[
                    CommonStyles.rowbetween,
                    { marginBottom: 15, alignItems: 'center', marginTop: 25 },
                  ]}>
                  <View>
                    <Text style={styles.pageheding}>Portfolio</Text>
                  </View>
                  <TouchableOpacity onPress={() => this.addPortfolio()}>
                    <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                  </TouchableOpacity>
                </View>

                {this.state.portfolioDetails &&
                  this.state.portfolioDetails.length > 0 ? (
                  <PortfolioCard
                    data={this.state.portfolioDetails}
                    onRef={ref => (
                      (this.editPortFolio = ref), (this.deletePortFolio = ref)
                    )}
                    editPortFolio={this.editPortfolio.bind(this)}
                    deletePortFolio={this.deletePortfolio.bind(this)}
                  />
                ) : (
                  <>
                    <Text>No data found</Text>
                  </>
                )}

                <View style={CommonStyles.hr}></View>
              </View>
            )}
          </ScrollView>
          <Modal
            animationType="fade"
            //transparent={true}
            visible={this.state.addEmploymentModal}>
            <ScrollView keyboardShouldPersistTaps="always">
              <KeyboardAvoidingView>
                <AddEmploymentCard
                  data={this.state.employmentHistoryItem}
                  editable={this.state.editEmploymentFlag}
                  onRef={ref => (
                    (this.closeEmploymentModall = ref),
                    (this.updateEmploymentHistory = ref)
                  )}
                  closeEmploymentModall={this.closeEmploymentModal.bind(this)}
                  updateEmploymentHistory={this.getProfileInfo.bind(this)}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </Modal>
          <Modal
            animationType="fade"
            //transparent={true}
            visible={this.state.addPortFolioModal}>
            <ScrollView keyboardShouldPersistTaps="always">
              <KeyboardAvoidingView>
                <AddPortFolioCard
                  data={this.state.portfolioItem}
                  editable={this.state.editPortFolioFlag}
                  onRef={ref => (
                    (this.closePortfolioModall = ref),
                    (this.updatePortfolioHistory = ref)
                  )}
                  closePortfolioModall={this.closePortfolioModal.bind(this)}
                  updatePortfolioHistory={this.getPortfolio.bind(this)}
                />
              </KeyboardAvoidingView>
            </ScrollView>
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

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(updateProfile(data)),
  updateUserDetails: data => dispatch(updateUserDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreelancerProfile);
