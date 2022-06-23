import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../../CommonStyles';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from 'react-native-vector-icons/AntDesign';
import { GET_ALL_CATEGORY, GET_ALL_SPECIALITY, EMPLOYMENT_HISTORY, UPLOAD_PORTFOLIO, GET_FREELANCER_PROFILE_INFO } from '../../shared/allApiUrl';
import { apiCallWithToken } from '../../Api';
import { connect } from 'react-redux';
import { updateProfile } from '../../Store/Actions/Action';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddEmploymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Employment_History: this.props.data,
      item: this.props.data,
      userDetails: {},
      description: this.props.data.description ? this.props.data.description : '',
      //jobCategory : this.props.data.category ? this.props.data.category : '',
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
      company: this.props.data ? this.props.data.company : '',
      companyError: "",
      selectedState: this.props.data ? this.props.data.country : '',
      selectedStateError: "",
      selectedCity: this.props.data ? this.props.data.city : '',
      selectedCityError: "",
      workingFrom: this.props.data ? this.props.data.start_date : '',
      workingFromError: "",
      workingTo: this.props.data ? this.props.data.end_date : '',
      workingToError: "",
      workExperience: "",
      workExperienceError: "",
      experienceDetails: [],
      selectedCountry: this.props.data ? this.props.data.selectedCountry : '',
      selectedCity: '',
      editModal1: false,
      editModal2: false,
      editModal3: false,
      editPortfolio: false,
      addEmploymentModal: false,
      //addPortfolio: false,
      employmentHistoryItem: {},
      fields: {
        address: ''
      },
      editEmploymentFlag: this.props.editEmploymentFlag,
      jobCategoryName: this.props.data ? this.props.data.category : ''
    };
  }

  componentDidMount() {
    this.getJobCategory();
    this.jobList();
    this.getSpecialitynSkill();
    this.getJobSpeciality();
  }

  getProfileInfo = async () => {
    let data = {
      uid: this.props.userData.userDetails.data.id,
    };
    await apiCallWithToken(GET_FREELANCER_PROFILE_INFO, 'post', data)
      .then(res => {
        this.setState({
          Employment_History: res.data.data.Employment_History,
        });
        this.props.updateProfile(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange(value, name) {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });

  }

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

  jobList = () => {
    this.setState({ filteredJobCategory: this.state.jobCategory });
  };


  findJobSpecialityData = text => {
    this.setState({ jobSpecialList: true });
    let jobSpecialData = this.state.jobCategory;
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
      let data = jobSpecialData.filter(obj => obj.name.search(regex) >= 0);
      this.setState({ filteredJobSpeciality: data });
    } else {
      this.setState({ filteredJobSpeciality: [] });
    }
  };

  removeJobCategory = index => {
    let tempArr = this.state.selectedJobCategory;
    tempArr.splice(index);
    this.setState({ selectedJobCategory: tempArr });
  };

  removeJobSpeciality = index => {
    let tempArr = this.state.selectedJobSpeciality;
    tempArr.splice(index);
    this.setState({ selectedJobSpeciality: tempArr });
  };

  jobSpecialList = () => {
    this.setState({ filteredJobSpeciality: this.state.jobSpeciality });
  };
  getSpecialitynSkill = async newValue => {
    //this.setState({category_name :newValue.name, editModal2: !this.state.editModal2})
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



  getJobSpeciality = async newValue => {
    if (newValue.id !== null) {
      let tempArr = this.state.selectedJobSpeciality;
      tempArr.push(newValue);
      this.setState({
        selectedJobSpeciality: tempArr,
        filteredJobSpeciality: [],
      });
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



  onSubmit = async () => {
    var arr = [];
    arr = this.state.fields.address.split(',');
    var country = arr[arr.length - 1];
    if (arr.length > 1) {
      var city = arr[arr.length - 3]
        ? arr[arr.length - 3]
        : arr[arr.length - 2];
    }

    this.setState({ country: country })
    this.setState({ city: city })
    var formData = new FormData();
    formData.append("uid", this.props.userData.userDetails.data.id);
    formData.append("company", this.state.company);
    if (this.state?.selectedJobCategory) {
      this.state.selectedJobCategory.map((item) => formData.append('category', item.id))
    };
    formData.append("description", this.state.description);
    formData.append("start_date", this.state.workingFrom);
    formData.append("end_date", this.state.workingTo);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("emp_history_id", this.props.data.id);
    formData.append("action_type", this.props.editable ? "update" : "add");
    await apiCallWithToken(EMPLOYMENT_HISTORY, "post", formData)
      .then((res) => {

        if ((res.data.status == 1)) {

          this.props.updateEmploymentHistory();
          this.props.closeEmploymentModall();
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  closeModal = () => {
    this.props.closeEmploymentModall();
  }


  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.keyboardContainer}
        enableAutomaticScroll={true}
        scrollEnabled={false}
        extraScrollHeight={60}
        behavior="padding"
        enabled
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={CommonStyles.formgroup}>
              <Text
                style={[
                  CommonStyles.formtext,
                  { paddingBottom: 10, fontWeight: '600' },
                ]}>
                Company
              </Text>
              <TextInput
                placeholder="Eg:Abc pvt ltd"
                placeholderTextColor="#ddd"
                style={styles.inputform}
                value={this.state.company}
                onChangeText={text => this.setState({ company: text })}
              />
              {this.state.companyError != '' ? (
                <Text style={{ color: 'red' }}>
                  {this.state.companyError}
                </Text>
              ) : null}
            </View>
            <View style={CommonStyles.formgroup}>
              <Text
                style={[
                  CommonStyles.formtext,
                  { paddingBottom: 10, fontWeight: '600' },
                ]}>
                Job Role
              </Text>
              <View style={CommonStyles.formgroup}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  defaultValue={this.state.jobCategoryName}
                  onFocus={() => this.jobList()}
                  containerStyle={styles.autocompleteContainer}
                  style={styles.autoComplete}
                  listStyle={{ zIndex: 1, position: 'relative' }}
                  data={this.state.filteredJobCategory}
                  onChangeText={text => this.findJobCategoryData(text)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.getSpecialitynSkill(item)}>
                      <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                {this.state.selectedJobCategory && this.state.selectedJobCategory.length > 0 &&
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
                            onPress={() => this.removeJobCategory(index)}>
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
                {/* {this.state.filteredJobCategoryError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.filteredJobCategoryError}</Text>
                                    ) : null} */}
              </View>
            </View>

            <View style={[CommonStyles.row]}>
              <View style={CommonStyles.formgroup}>
                <Text
                  style={[
                    CommonStyles.formtext,
                    { paddingBottom: 10, fontWeight: '600' },
                  ]}>
                  Location
                </Text>
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                  listViewDisplayed={false} // true/false/undefined
                  fetchDetails={true}
                  renderDescription={row => row.description} // custom description render
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    this.handleChange(
                      details.formatted_address,
                      'address',
                    );
                  }}
                  getDefaultValue={() => ''}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyAACgTdJ_FF55iFXrHmUH85Y34GjR4pOSg',
                    language: 'en', // language of the results
                  }}
                  styles={{
                    textInput: [
                      CommonStyles.formcontrol,
                      // this.state.errors['address']
                      //     ? { borderColor: 'red' }
                      //     : null,
                    ],
                    textInputContainer: CommonStyles.formgroup,
                  }}
                  currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Current location"
                  nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  GoogleReverseGeocodingQuery={
                    {
                      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }
                  }
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'food',
                  }}
                  GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                  }}
                  filterReverseGeocodingByTypes={[
                    'locality',
                    'administrative_area_level_3',
                  ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                  predefinedPlaces={[]}
                  enablePoweredByContainer={false}
                  debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                  renderLeftButton={() => { }}
                  renderRightButton={() => { }}
                />
              </View>
            </View>
            <View style={[CommonStyles.row]}>
              <View style={CommonStyles.col50}>
                <View style={CommonStyles.formgroup}>
                  <Text
                    style={[
                      CommonStyles.formtext,
                      { paddingBottom: 10, fontWeight: '600' },
                    ]}>
                    Working From
                  </Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.workingFrom} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 5,
                        top: 4,
                        right: 10,
                      },
                      dateInput: {
                        marginLeft: 10,
                      },
                    }}
                    onDateChange={date => {
                      this.setState({ workingFrom: date });
                    }}
                  />
                </View>
              </View>
              <View style={CommonStyles.col50}>
                <View style={CommonStyles.formgroup}>
                  <Text
                    style={[
                      CommonStyles.formtext,
                      { paddingBottom: 10, fontWeight: '600' },
                    ]}>
                    Working To
                  </Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={this.state.workingTo} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate="2050-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: 'absolute',
                        left: 5,
                        top: 4,
                        right: 10,
                      },
                      dateInput: {
                        marginLeft: 10,
                      },
                    }}
                    onDateChange={date => {
                      this.setState({ workingTo: date });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={CommonStyles.formgroup}>
              <Text
                style={[
                  CommonStyles.formtext,
                  { paddingBottom: 10, fontWeight: '600' },
                ]}>
                Work Description
              </Text>
              <TextInput
                placeholder="Type here"
                placeholderTextColor="#ddd"
                style={[styles.inputform, { height: 69 }]}
                value={this.state.description}
                onChangeText={text =>
                  this.setState({ description: text })
                }
              />
              <Text
                style={{
                  textAlign: 'right',
                  color: '#757575',
                  fontSize: 13,
                }}>
                0/120 characters (min. 10)
              </Text>
            </View>

            <View style={[CommonStyles.row, { marginTop: 25 }]}>
              <View style={CommonStyles.col50}>
                <TouchableOpacity
                  style={CommonStyles.outlinebtn}
                  onPress={() =>
                    this.closeModal()
                  }>
                  <Text style={CommonStyles.outlinetext}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.col50}>
                <TouchableOpacity
                  style={CommonStyles.primarybutton}
                  onPress={() => this.onSubmit()}>
                  <Text style={CommonStyles.btntext}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmploymentCard);
