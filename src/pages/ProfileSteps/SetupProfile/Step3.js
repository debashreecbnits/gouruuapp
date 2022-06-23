import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  ImageBackground
} from 'react-native';
import { Select, NativeBaseProvider, CheckIcon } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import Autocomplete from 'react-native-autocomplete-input';
import { apiCallWithToken } from '../../../Api';
import { GET_ALL_CATEGORY, GET_ALL_SPECIALITY } from '../../../shared/allApiUrl';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Validator from '../../../shared/Validator';
import axios from 'axios';
import {connect} from 'react-redux';
import { apiBaseUrl} from '../../../shared/helpers';

class PostRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      company: '',
      companyError: '',
      selectedJobRole: [],
      selectedJobRoleError: '',
      selectedState: '',
      selectedStateError: '',
      selectedCity: 'Bangalore',
      selectedCityError: '',
      workingFrom: '',
      workingFromError: '',
      filteredJobCategoryError:'',
      workingTo: '',
      workingToError: '',
      workdescription: '',
      workDescriptionError: '',
      filteredJobCategory: [],
      jobCategory: [],
      experienceDetails: [],
      fields: {
        address: '',
      },
      selectedCountry: 'India',

      //state props
      educationalDetails: this.props?.navigation?.state?.params?.data?.educationDetails,
      school: this.props?.navigation?.state?.params?.data?.school,
      areaOfStudy: this.props?.navigation?.state?.params?.data?.areaOfStudy,
      degree: this.props?.navigation?.state?.params?.data?.degree,
      entryDate: this.props?.navigation?.state?.params?.data?.entryDate,
      passoutDate: this.props?.navigation?.state?.params?.data?.passoutDate,
      schooldescription: this.props?.navigation?.state?.params?.data?.schooldescription,
      selectedJobCategory:
        this.props?.navigation?.state?.params?.data?.selectedJobCategory,
      selectedKeyWord:
        this.props?.navigation?.state?.params?.data?.selectedKeyword,
      lookingForSkill:
        this.props?.navigation?.state?.params?.data?.lookingForSkill,
      service_type: this.props?.navigation?.state?.params?.data?.service_type,
      exp_level: this.props?.navigation?.state?.params?.data?.exp_level,
      fields: {
        address: ''
      },
      errors: {},
      textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
      textCategoryStoreNew: '',
      textCategoryMainStoreNew:'',
      UID:this.props?.navigation?.state?.params?.data?.UID,
      Token:this.props?.navigation?.state?.params?.data?.Token,
    };
  }

  componentDidMount() {
    this.getJobCategory();
    this.jobList();
    this.getSpecialitynSkill();
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  jobList = () => {
    this.setState({ filteredJobCategory: this.state.jobCategory });
  };

  findJobRollData = text => {
    if(this.state.filteredJobCategoryError){
      this.setState({filteredJobCategoryError:""})
  }
  let tempArr = text
        this.setState({ textCategoryStoreNew: tempArr })
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

  getJobCategory = async () => {
    if(this.props.userData?.userDetails?.accessToken &&
        this.props.userData?.userDetails?.accessToken.length){
    await apiCallWithToken(GET_ALL_CATEGORY, 'get')
        .then(res => {
            if (res.data) {
                this.setState({ jobCategory: res.data.data })
            }
        }).catch(err => {
            console.log(err)
        })
    }
        else{
            try {
              console.log("before...............")
              let res = await axios({
                  url: apiBaseUrl + GET_ALL_CATEGORY,
                  method: 'get',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                  //   'Content-Type': 'application/json',
                    'Authorization': 'Token '+ this.state.Token
                  }
                }
              );
            } catch (error) {
              console.error("error===========", error);
            }
          }
};
  getSpecialitynSkill = async newValue => {
    if (newValue.id !== null) {
      let tempArr = this.state.selectedJobRole;
      tempArr.push(newValue);
      this.setState({ selectedJobRole: tempArr, filteredJobCategory: [] });
      var formData = new FormData();
      formData.append('cat_id', newValue.id);
      if(this.props.userData?.userDetails?.accessToken &&
        this.props.userData?.userDetails?.accessToken.length){
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
        else{
          try {
            console.log("before...............")
            let res = await axios({
                url: apiBaseUrl + GET_ALL_SPECIALITY,
                method: 'post',
                data: formData,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                //   'Content-Type': 'application/json',
                  'Authorization': 'Token '+ this.state.Token
                }
              }
            );
            if (res.status == 200) {
              this.setState({
                specialityList: res.data.data.speciality,
                skillList: res.data.data.skill,
              });
            }
          } catch (error) {
            console.error("error===========", error);
          }
        }
    }
  };

  removeJobRole = index => {
    let tempArr = this.state.selectedJobRole;
    tempArr.splice(index);
    this.setState({ selectedJobRole: tempArr });
  };

  handleChange(value, name) {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
    var arr = [];
    arr = this.state.fields.address.split(',');
    var country = arr[arr.length - 1];
    if (arr.length > 1) {
      var city = arr[arr.length - 3]
        ? arr[arr.length - 3]
        : arr[arr.length - 2];
    }
    this.setState({selectedCountry: country});
    //this.setState({ selectedCountry: 'Bangalore' });
    this.setState({selectedCity: city});
    //this.setState({ selectedCity: 'India' });
      this.setState({
        errors: Validator.validateForm(
          null,
          this.state.fields,
          this.state.errors,
        ),
      })
      if (this.state.errors.formIsValid) {
        var arr = [];
        arr = this.state.fields.address.split(',');
        var country = arr[arr.length - 1];
        if (arr.length > 1) {
          var city = arr[arr.length - 3]
            ? arr[arr.length - 3]
            : arr[arr.length - 2];
        }
      }
  }

  onSubmit = async () => {
    
   
    if (this.state.company === '') {
      this.setState({ companyError: '***Please enter company name' });
    }
    else if (this.state.selectedJobRole.length === 0 && this.state.textCategoryMainStoreNew === "" ) {
      this.setState({ filteredJobCategoryError: '***Please select any Job Role' })
  }
  else if(this.state.fields.address === ''){
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    })
  }
  else if (this.state.workingFrom === '' ) {
    this.setState({ workingFromError: '***Please select entry year' })
}
else if (this.state.workingTo === '' ) {
  this.setState({ workingToError: '***Please select exit year' })
}

  

  
   
    else {
      this.setState({ companyError: '' });
      this.setState({ filteredJobCategory: "" })
      var emp = [];
      emp = this.state.experienceDetails;
      const e = {
        Company: this.state.company,
        JobRole: 
        this.state.selectedJobRole.length === 0 ? 
        this.state.textCategoryMainStoreNew:
        this.state?.selectedJobRole[0]?.name,
        //State: this.state.selectedState,
        City: this.state.selectedCity,
        Country: this.state.selectedCountry,
        workingFrom: this.state.workingFrom,
        workingTo: this.state.workingTo,
        workdescription: this.state.workdescription,
      };
      emp.push(e);
      //seteducationDetails(emp);
      this.setState({ experienceDetails: emp });
      // setEducation(!Education);
      // resetValues2();
      // setCreatStep(3);
      //this.resetValues()
      this.setState({ modalVisible: false });
    }
  };
  removeJobCategoryTextInput = () => {
    this.setState({ textCategoryMainStoreNew: "" })
   }
   AddTextCategory = () => {
    this.setState({ textCategoryMainStoreNew: this.state.textCategoryStoreNew })
    {
        this.state.selectedJobRole.length > 0 || this.state.textCategoryMainStoreNew != "" ?
            Alert.alert(
                "",
                "You only add one Job Category.",
                [
                    {
                        text: "OK",
                        onPress: () => this.setState({ textCategoryStoreNew: "" }),
                        style: "cancel",
                    },

                ],

            ) :
            <></>
    }
}
  onNext = () => {
    
    if (this.state.modalVisible === false && this.state.experienceDetails.length <= 0) {
      Alert.alert("Please fill the work experience details")
    }
    else {
      this.props.navigation.navigate('ProfileStep4', { data: this.state })
    }
  };
  render() {
    console.log("UID+++++++++=3",this.props?.navigation)
    const { modalVisible } = this.state;
    return (
      <NativeBaseProvider style={CommonStyles.wrapper}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../../assets/images/left-arrow.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Employment Details</Text>
            </View>
            {/* <View style={CommonStyles.Trighticon}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/images/notification.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View> */}
          </ImageBackground>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={CommonStyles.container}>
              <Text style={styles.h2}>Add Your past work experiance</Text>
              <Text style={[CommonStyles.para, { marginBottom: 20 }]}>
                Build your credibility by showcasing the projects or jobs you
                have completed.
              </Text>

              {this.state?.experienceDetails &&
                this.state?.experienceDetails.length != 0
                ? this.state.experienceDetails.map((item, idx) => {
                  return (
                    <View key={idx} style={[{ position: 'relative' }]}>
                      <View style={styles.deleterow}>
                        <TouchableOpacity style={styles.trbtn}>
                          <Icon name="ios-trash" color="#777" size={14} />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.formlabel}>{item.Company}</Text>
                      <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                        {item.JobRole}
                      </Text>
                      <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                        {item.workingFrom} to {item.workingTo}
                      </Text>
                      <Text style={[styles.ptext, { fontWeight: 'bold' }]}>
                        {item.City}{' ,'}{item.Country}
                      </Text>
                      <Text style={styles.ptext}>{item.workdescription}</Text>
                      <View style={CommonStyles.hr}></View>
                    </View>
                  )
                })
                : null}

              <View style={[CommonStyles.row, { marginTop: 25 }]}>
                <View style={CommonStyles.col50}>
                  <TouchableOpacity
                    style={CommonStyles.outlinebtn}
                    onPress={() => this.setModalVisible(true)}>
                    <Text style={CommonStyles.outlinetext}>+ Add More</Text>
                  </TouchableOpacity>
                </View>
                <View style={CommonStyles.col50}>
                  <TouchableOpacity
                    style={CommonStyles.primarybutton}
                    onPress={() => this.onNext()}>
                    <Text style={CommonStyles.btntext}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}>
                  <ScrollView keyboardShouldPersistTaps="always">
                    <KeyboardAvoidingView>
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
                              onChangeText={text =>{
                                if(this.state.companyError){
                                  this.setState({companyError:''})
                                }
                                this.setState({ company: text })
                              }}
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
                              job Role
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.formlabel}>Choose service you offer</Text>
                                    <TouchableOpacity style={{ marginLeft: 150, }}

                                        onPress={this.AddTextCategory}
                                    >
                                        <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                                    </TouchableOpacity>

                                </View>
                            <View style={CommonStyles.formgroup}>
                              <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                onFocus={() => this.jobList()}
                                containerStyle={styles.autocompleteContainer}
                                style={styles.autoComplete}
                                listStyle={{ zIndex: 1, position: 'relative' }}
                                data={this.state.filteredJobCategory}
                                onChangeText={text =>
                                  this.findJobRollData(text)
                                }
                                placeholder="Select job roll"
                                renderItem={({ item }) => (
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.getSpecialitynSkill(item)
                                    }>
                                    <Text style={styles.itemText}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              />
                             {this.state.selectedJobRole.length > 0 ?

                             <>
                              {this.state.selectedJobRole.length > 0 &&
                                this.state.selectedJobRole.map((val, index) => {
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
                                            this.removeJobRole(index)
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
                                </>
                                :
                                        <>

                                            {this.state.textCategoryMainStoreNew == "" ? null :
                                                <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                    <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                        <Text style={[CommonStyles.tagtext]}>{this.state.textCategoryMainStoreNew}</Text>
                                                        <TouchableOpacity
                                                            //onPress={() => this.removeJobCategory(index)}
                                                            onPress={() => this.removeJobCategoryTextInput()}
                                                        >
                                                            <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>
                                            }
                                        </>

                                    }
                              {this.state.filteredJobCategoryError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.filteredJobCategoryError}</Text>
                                    ) : null}
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
                          {this.state.errors['address'] ? (
                    <Text style={{ color: 'red', marginTop: -29 }}>
                      ***Please Enter Location
                    </Text>
                  ) : null}
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
                                    if(this.state.workingFromError){
                                      this.setState({workingFromError:''})
                                    }
                                    this.setState({ workingFrom: date });
                                  }}
                                />
                                 {this.state.workingFromError != '' ? (
                                                    <Text style={{ color: 'red' }}>{this.state.workingFromError}</Text>
                                                ) : null}
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
                                    if(this.state.workingToError){
                                      this.setState({ workingToError: '' })
                                    }
                                    this.setState({ workingTo: date });
                                  }}
                                />
                              </View>
                              {this.state.workingToError != '' ? (
                                                    <Text style={{ color: 'red' }}>{this.state.workingToError}</Text>
                                                ) : null}
                            </View>
                          </View>
                          <View style={CommonStyles.formgroup}>
                            <Text
                              style={[
                                CommonStyles.formtext,
                                { paddingBottom: 10, fontWeight: '600' },
                              ]}>
                              Work Description(optional)
                            </Text>
                            <TextInput
                              placeholder="Type here"
                              placeholderTextColor="#ddd"
                              style={[styles.inputform, { height: 69 }]}
                              value={this.state.workdescription}
                              onChangeText={text =>
                                this.setState({ workdescription: text })
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
                            {this.state.workDescriptionError != '' ? (
                                                    <Text style={{ color: 'red' }}>{this.state.workDescriptionError}</Text>
                                                ) : null}
                          </View>

                          <View style={[CommonStyles.row, { marginTop: 25 }]}>
                            <View style={CommonStyles.col50}>
                              <TouchableOpacity
                                style={CommonStyles.outlinebtn}
                                onPress={() =>
                                  this.setModalVisible(!modalVisible)
                                }>
                                <Text style={CommonStyles.outlinetext}>
                                  Cancel
                                </Text>
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
                    </KeyboardAvoidingView>
                  </ScrollView>
                </Modal>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps)(PostRequest);