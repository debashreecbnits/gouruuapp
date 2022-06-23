import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import {Select, NativeBaseProvider, CheckIcon} from 'native-base';
import styles from './Styles';
import {Picker} from '@react-native-picker/picker';
import CommonStyles from '../../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiCallWithOutToken} from '../../../Api';
import {GET_LANGUAGE_NAMES} from '../../../shared/allApiUrl';

export default class PostRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: this.props?.navigation?.state?.params?.data?.school,
      areaOfStudy: this.props?.navigation?.state?.params?.data?.areaOfStudy,
      degree: this.props?.navigation?.state?.params?.data?.degree,
      entryDate: this.props?.navigation?.state?.params?.data?.entryDate,
      passoutDate: this.props?.navigation?.state?.params?.data?.passoutDate,
      schooldescription: this.props?.navigation?.state?.params?.data?.schooldescription,
      selectedJobCategory:
        this.props?.navigation?.state?.params?.data?.selectedJobCategory,
      selectedKeyWord:
        this.props?.navigation?.state?.params?.data?.selectedKeyWord,
      lookingForSkill:
        this.props?.navigation?.state?.params?.data?.lookingForSkill,
      exp_level: this.props?.navigation?.state?.params?.data?.exp_level,
      company: this.props?.navigation?.state?.params?.data?.company,
      selectedJobRole:
        this.props?.navigation?.state?.params?.data?.selectedJobRole,
      workingFrom: this.props?.navigation?.state?.params?.data?.workingFrom,
      workingTo: this.props?.navigation?.state?.params?.data?.workingTo,
      workdescription: this.props?.navigation?.state?.params?.data?.workdescription,
      city: this.props?.navigation?.state?.params?.data?.selectedCity,
      country: this.props?.navigation?.state?.params?.data?.selectedCountry,
      educationalDetails:this.props?.navigation?.state?.params?.data?.educationalDetails,
      workExperienceDetails:this.props?.navigation?.state?.params?.data?.experienceDetails,
      textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
      textCategoryStoreNew: this.props?.navigation?.state?.params?.data?.textCategoryMainStoreNew,

      //new
      service_type: this.props?.navigation?.state?.params?.data?.service_type,
      engProficiaency: '',
      otherLanguage: [],
      otherLanguageProficiaency: '',
      professionalOverview: '',
      languageStore: [],
      store: '',
      selectedValue:'',
      professionalOverviewError:'',
      UID:this.props?.navigation?.state?.params?.data?.UID,
      Token:this.props?.navigation?.state?.params?.data?.Token,
    };
  }
  componentDidMount() {
    this.getLanguageName();
  }

  getLanguageName = async () => {
    console.log("LANGUAGE+++++++===")
    await apiCallWithOutToken(GET_LANGUAGE_NAMES, 'get')
      .then(res => {
        console.log("LANGUAGE++++++",res)
        this.setState({languageStore: res?.data?.Data});
      })
      .catch(err => {
        console.log('error==>', err);
      });
  };

  onNext = () => {
    if(this.state.professionalOverview===''){
      this.setState({professionalOverviewError:"***Please write professional overview"})
    }
    else{
      this.setState({professionalOverviewError:''})
    this.state.languageStore.map((val, index) => {
      {
        val.name === this.state.otherLanguage
          ? this.setState({store: val.id})
          : this.setState({store: ''});
      }
    });
    this.props.navigation.navigate('ProfileStep5', {data: this.state});
    }
  };

  render() {
    console.log("UID+++++++++4=",this.props?.navigation)
    return (
      <NativeBaseProvider style={CommonStyles.wrapper}>
        <KeyboardAvoidingView style={{flex: 1}}>
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
              <Text style={CommonStyles.htitle}>Professional Overview</Text>
            </View>
            {/* <View style={CommonStyles.Trighticon}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View> */}
          </ImageBackground>
          <ScrollView>
            <View style={CommonStyles.container}>
              {/* <View style={[{ position: 'relative', paddingBottom:20 }]}>
                                <View style={[styles.deleterow, ]}>
                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={14} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.trbtn}>
                                        <Icon name="ios-trash" color="#777" size={14} />
                                    </TouchableOpacity>
                                </View>
                            </View>                            */}

              <View style={CommonStyles.formgroup}>
                <Text style={[styles.formlabel]}>
                  What is your english proficiaency
                </Text>
                <Picker
                  // minWidth="100%"
                  // accessibilityLabel="language"
                  // placeholder="Choose proficiaency"
                  // _selectedItem={{
                  //   bg: 'primary.600',
                  //   endIcon: <CheckIcon size={5} />,
                  // }}
                  // style={styles.formlabel}
                  minWidth="100%"
                  accessibilityLabel="language"
                  placeholder="proficiaency"
                  _selectedItem={{
                    bg: 'primary.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  style={styles.formlabel}
                  selectedValue={this.state.engProficiaency}
                  onValueChange={value =>
                    this.setState({engProficiaency: value})
                  }>
                  <Picker.Item label="Basic" value="Basic" />
                  <Picker.Item label="Intermidiate" value="Intermidiate" />
                  <Picker.Item label="flaunt" value="flaunt" />
                </Picker>
              </View>
              <View>
                <Text style={[styles.formlabel]}>
                  What other Language do you speak
                </Text>
              </View>
              <View style={[CommonStyles.row]}>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                     {/* <Select
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
                        this.setState({otherLanguage: value})
                      }>
                      {this.state.languageStore && this.state.languageStore.map((item, idx) => {
                      
                      return(
                        <Select.Item label={item.name} value={item.id} />
                      )})}
                    </Select>  */}
                    <Picker
                      minWidth="100%"
                      accessibilityLabel="language"
                      placeholder="language"
                      _selectedItem={{
                        bg: 'primary.600',
                        endIcon: <CheckIcon size={5} />,
                      }}
                      style={styles.formlabel}
                      selectedValue={this.state.selectedValue}
                      onValueChange={(itemValue, itemIndex) =>
                        {
                      this.setState({otherLanguage: [{name:this.state.languageStore[itemIndex].name,id:itemValue}],selectedValue:itemValue},()=>{
                        
                      })
                     
                      }
                      }>
                      {this.state.languageStore &&
                        this.state.languageStore.map((item, idx) => {
                          return (
                            <Picker.Item label={item.name} value={item.id} />
                          );
                        })}
                    </Picker>
                  </View>
                </View>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <Picker
                      minWidth="100%"
                      accessibilityLabel="language"
                      placeholder="proficiaency"
                      _selectedItem={{
                        bg: 'primary.600',
                        endIcon: <CheckIcon size={5} />,
                      }}
                      style={styles.formlabel}
                      selectedValue={this.state.otherLanguageProficiaency}
                      onValueChange={(itemValue, index) =>
                        this.setState({otherLanguageProficiaency: itemValue})
                      }>
                      <Picker.Item label="Basic" value="Basic" />
                      <Picker.Item label="Intermediate" value="Intermediate" />
                      <Picker.Item label="flaunt" value="flaunt" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* <View style={CommonStyles.hr}></View> */}

              <View style={CommonStyles.formgroup}>
                <Text
                  style={[
                    CommonStyles.formtext,
                    {paddingBottom: 10, fontWeight: '600'},
                  ]}>
                  Professional Overview
                </Text>
                <TextInput
                  placeholder="Write here"
                  placeholderTextColor="#ddd"
                  style={[styles.inputform, {height: 69}]}
                  value={this.state.professionalOverview}
                  onChangeText={text =>{
                    if(this.state.professionalOverviewError){
                      this.setState({professionalOverviewError:''})
                    }
                    this.setState({professionalOverview: text})
                  }
                  }
                />
                 {this.state.professionalOverviewError != '' ? (
                         <Text style={{ color: 'red' }}>
                                {this.state.professionalOverviewError}
                              </Text>
                            ) : null}   
                <Text
                  style={{textAlign: 'right', color: '#757575', fontSize: 13}}>
                  0/120 characters (min. 10)
                </Text>
              </View>

              <View style={[CommonStyles.row, {marginTop: 25}]}>
                <View style={CommonStyles.col50}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={CommonStyles.outlinebtn2}>
                    <Text style={CommonStyles.outlinetext2}>Back</Text>
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    );
  }
}
