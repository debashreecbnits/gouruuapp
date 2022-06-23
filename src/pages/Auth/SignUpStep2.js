
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  //ToastAndroid,
  ImageBackground,
  Alert,
  Keyboard
} from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { apiCallWithOutToken } from '../../Api/index';
import { SIGNUP_URL } from '../../shared/allApiUrl';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Validator from '../../shared/Validator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import {
  storeAccessToken
} from '../../Store/Actions/Action';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        address: '',
        password: '',
        con_password: '',
      },
      errors: {},
      UserType: 'client',
      checked: false,
      showBorder1:false,
      showBorder2:false,
      disabled:false,
      USERID:'',
      Token:'',
    };
  }
  onSubmit = async () => {
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    });
    if (this.state.errors.formIsValid) {
      var arr = [];
      arr = this.state.fields.address.split(',');
      var country = arr[arr.length - 1];
      if (arr.length > 1) {
        var city = arr[arr.length - 3]
          ? arr[arr.length - 3]
          : arr[arr.length - 2];
      }
      var formData = new FormData();
      formData.append("email", this.props.navigation.state.params.data.fields.email)
      formData.append("first_name", this.props.navigation.state.params.data.fields.first_name)
      formData.append("last_name", this.props.navigation.state.params.data.fields.last_name)
      formData.append("password", this.state.fields.password)
      formData.append("phone_number", this.props.navigation.state.params.data.fields.phone)
      formData.append("city", city)
      formData.append("country", country.trim())
      formData.append("user_type",  this.state.UserType)
      formData.append("username", this.props.navigation.state.params.data.fields.user_name)
      this.setState({ disabled:true})
      await apiCallWithOutToken(SIGNUP_URL, 'POST', formData)
        .then(res => {
          this.setState({ disabled:false})
          console.log("SIGNUP RESPONSE+++++",res)
          if (res.data.status === 1) {
            
            if (this.state.UserType == 'client'){
              Alert.alert("You have successfully created you account")
            this.props.navigation.navigate('SignIn');
            }else {
              console.log("res.data.data.Token==============>",res.data.data.Token)
              Alert.alert("You have successfully created you account");
              this.props.navigation.navigate('ProfileSetUp',{USERID:res.data.data.user_id, Token:res.data.data.Token});

            }
          }
          else {
            //ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
            Toast.show(res.data.message, Toast.LONG)

          }
           
        })
        .catch(err => {
          console.log(err);
          this.setState({ disabled:false})
          //ToastAndroid.show(err.data.message, ToastAndroid.SHORT)
          Toast.show(err.data.message, Toast.LONG)
        });
    }
  };
  changePass = data => {
    this.setState({ password: data });
  };
  _changeFormValue = (value, attr) => {
    this.setState({ checked: value });
  };

  handleChange(value, name) {
    
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
    this.setState({
      errors: Validator.validateForm(
        name,
        this.state.fields,
        this.state.errors,
      ),
    });
  }


  render() {
    return (
      <SafeAreaView style={CommonStyles.wrapper}>
        <ScrollView keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView>
            <View style={CommonStyles.container}>
           
            <View style={
                {
                  position: Platform.OS == "android"
                    ? 'absolute' : 'relative',
                  left: 15,
                  top: 18,
                }
              }>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign
                                  name="arrowleft"
                                  size={30}
                                  color="#eeeee"
                                />
                        </TouchableOpacity>
                    </View>
              <View style={CommonStyles.rowcenter}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={{ width: 90, height: 90 }}
                  resizeMode="contain"
                />
                </TouchableOpacity>
              </View>
            
              <Text style={styles.headingtop}>Sign Up to Gouruu</Text>

              <View style={{ marginTop: 20 }}>
                <View style={CommonStyles.formgroup}>
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
                      this.handleChange(details.formatted_address, 'address');
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
                        this.state.errors['address']
                          ? { borderColor: 'red' }
                          : null,
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
                  <View style={CommonStyles.formtextwrap}>
                    <Text style={CommonStyles.formtext}>Location*</Text>
                  </View>
                  {this.state.errors['address'] ? (
                    <Text style={{ color: 'red', marginTop: -29 }}>
                      Enter Address*
                    </Text>
                  ) : null}
                </View>
              </View>
             
             
              <View style={CommonStyles.row}>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TextInput
                      style={[
                        CommonStyles.formcontrol,
                        this.state.errors['password'] === 'blank' ||
                          this.state.errors['password'] === 'length'
                          ? { borderColor: 'red' }
                          : null,
                      ]}
                      placeholder="*******"
                      placeholderTextColor="#ccc"
                      secureTextEntry={true}
                      value={this.state.fields.password}
                      onChangeText={text => this.handleChange(text, 'password')}
                      errorMessage={this.state.errors['password']}
                      returnKeyType="next"
                      blurOnSubmit={false}
                    />
                    <View style={CommonStyles.formtextwrap}>
                      <Text style={CommonStyles.formtext}>Password*</Text>
                    </View>
                    {this.state.errors['password'] === 'blank' ? (
                      <Text style={{ color: 'red' }}>Enter Password*</Text>
                    ) : this.state.errors['password'] ? (
                      <Text style={{ color: 'red' }}>Password length should be greater than 8 characters/numbers*</Text>
                    ) : null}
                    
                  </View>
                </View>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TextInput
                      style={[
                        CommonStyles.formcontrol,
                        this.state.errors['con_password'] === 'blank' ||
                          this.state.errors['con_password'] === 'not matched'
                          ? { borderColor: 'red' }
                          : null,
                      ]}
                      secureTextEntry={true}
                      value={this.state.fields.con_password}
                      onChangeText={text =>
                        this.handleChange(text, 'con_password')
                      }
                      errorMessage={this.state.errors['con_password']}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      placeholder="********"
                      placeholderTextColor="#ccc"
                    />
                    <View style={CommonStyles.formtextwrap}>
                      <Text style={CommonStyles.formtext}>
                        Confirm Password*
                      </Text>
                    </View>
                    {this.state.errors['con_password'] === 'blank' ? (
                      <Text style={{ color: 'red' }}>
                        Enter Confirm Password*
                      </Text>
                    ) : this.state.errors['con_password'] === 'not matched' ? (
                      <Text style={{ color: 'red' }}>Password Not Matched*</Text>
                    ) : null}
                  </View>
                </View>
              </View>
              <View style={CommonStyles.row}>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TouchableOpacity
                      style={[this.state.showBorder1 ? styles.selectedborderbox:styles.borderbox]}
                      onPress={() => this.setState({UserType:'client',showBorder2:false,showBorder1:true})}>
                      <Image
                        source={require('../../assets/images/client.png')}
                        resizeMode="contain"
                        style={{ width: 45, height: 45 }}
                      />
                      <Text style={[CommonStyles.formtext, { marginTop: 5 }]}>
                        Client
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TouchableOpacity
                      style={[this.state.showBorder2 ? styles.selectedborderbox:styles.borderbox]}
                      onPress={() =>
                        this.setState({ UserType: 'serviceprovider',showBorder2:true,showBorder1:false })
                      }>
                      <Image
                        source={require('../../assets/images/freelancer.png')}
                        resizeMode="contain"
                        style={{ width: 45, height: 45 }}
                      />
                      <Text style={[CommonStyles.formtext, { marginTop: 5 }]}>
                        Freelancer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={[CommonStyles.rowcenter, CommonStyles.formgroup]}>
                <TouchableOpacity
                  style={{ width: '95%', justifyContent: 'center' }}>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#3e1bee"
                    unfillColor="#ccc"
                    text="By signing up, you agree to Gouruu Terms & Conditions"
                    iconStyle={{ borderColor: 'black' }}
                    textStyle={[
                      CommonStyles.ftext,
                      {
                        width: '90%',
                        flexWrap: 'wrap',
                        textDecorationLine: 'none',
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>

              <View style={CommonStyles.formgroup}>
                <TouchableOpacity
                  style={CommonStyles.primarybutton}
                  disabled={this.state.disabled}
                  onPress={() => this.onSubmit()}>
                  {this.state.disabled === true ?
                    (<ActivityIndicator
                      size="small"
                      color="#fff"
                    />
                    ) : (
                      <Text style={CommonStyles.btntext}>Sign Up</Text>
                    )}
                  
                  
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


