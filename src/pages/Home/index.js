import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,
    KeyboardAvoidingView, ScrollView, ImageBackground, StatusBar, TextInput, Alert
} from 'react-native';
import { Select, NativeBaseProvider, CheckIcon, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Swiper from 'react-native-swiper'
import LocationBar from '../../components/LocationBar/index';
import SearchBar from '../../components/Searchbar/index';
import { connect } from 'react-redux';
import {
    updateDisableDashboard
} from '../../Store/Actions/Action';
import { apiCallWithOutToken } from '../../Api';
import { PUBLIC_ALL_SERVICES } from '../../shared/allApiUrl';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { style } from 'styled-system';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store:"",
            miscellaneousList: [],
            professionalList: [],
           country: '',
            city: '',
            fields: {
                address: ''
            },

        };
    }

    componentDidMount() {
        this.props.updateDisableDashboard(true);
        this.getAllServices()
        //this.getRememberMe()

        this.props.navigation.addListener("didFocus", () => {
            this.props.updateDisableDashboard(true);
            this.getAllServices()
        });
    }


    getAllServices = async () => {
        //console.log("before sign in===>", "inside function"); 
        console.log("props value==>",this.props)
        let formData = new FormData()
        formData.append('userid', this.props?.userData?.userDetails?.data?.id ? this.props.userData.userDetails.data.id :"guest")
        console.log("formdata==>",formData)
        await apiCallWithOutToken(PUBLIC_ALL_SERVICES, "post", formData)
            .then((res) => {
                console.log("response home==>",res)
                this.setState({
                    miscellaneous: res.data.data.Miscellaneous,
                    professional: res.data.data.Technical,
                })
            })
            .catch((err) => {
                console.log(err);
            });

    };
   

    handleChange(value, name) {
        console.log("value ==>",value)
        console.log("name ==>",name)
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({ fields });
        console.log("fields==>", this.state.fields)
      }

    onSearch = () => {
        
        var arr = [];
      arr = this.state.fields.address.split(',');
      var country = arr[arr.length - 1];
      if (arr.length > 1) {
        var city = arr[arr.length - 3]
          ? arr[arr.length - 3]
          : arr[arr.length - 2];
      } 
       
         this.setState({ country: country})
         this.setState({city: city})            
        if (country === '' || city === '') {
            alert('Please Specifiy your Location');
        }
        else if (this.props.userData?.userDetails?.accessToken.length) {
            let userType = this.props.userData.userDetails.data.user_type;

            let homeSearchData = {
                userid: this.props.userData.userDetails.data.id,
                search: this.state.searchtext ? this.state.searchtext : '',
                country:country,
                city:city,
                skill: '',
                experience: '',
                limit: 0,
                page_no: 0,
                category: ''
            }

            if (userType === 'Client') {
                this.props.navigation.navigate('Freelancers', { homeSearchData: homeSearchData })
            
            }
            else {
                this.props.navigation.navigate('JobList', { homeSearchData: homeSearchData })
            }
        }

    }

    render() {
        const { miscellaneous, professional } = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                {/* <StatusBar backgroundColor={"#f9f9f9"} barStyle="dark-content" translucent /> */}
                <ScrollView keyboardShouldPersistTaps="always">
                    <KeyboardAvoidingView>
                    <ImageBackground source={require('../../assets/images/cbg.png')} style={CommonStyles.homeheaderwrap}>
           
              <View style={[CommonStyles.Tlefticon, {top:20}]}>
                <TouchableOpacity
                  onPress={this.props.navigation.openDrawer}>
                  <Image
                    source={require('../../assets/images/menu.png')}
                    resizeMode="contain"
                    style={CommonStyles.ticon}
                  />
                </TouchableOpacity>
              </View>  
              
              <View style={[CommonStyles.topbar]}>
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
                                        console.log("details===>",details)
                                        this.handleChange(details.formatted_address, 'address');
                                    }}
                                    // onPress={() => {
                                    //     console.log("googlemap==>","inside onpress google autocomplete")
                                    // }}
                                    getDefaultValue={() => ''}
                                    query={{
                                        // available options: https://developers.google.com/places/web-service/autocomplete
                                        key: 'AIzaSyAACgTdJ_FF55iFXrHmUH85Y34GjR4pOSg',
                                        language: 'en', // language of the results
                                    }}
                                    styles={{
                                        textInput: [
                                            CommonStyles.searchinput,
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
                                <TouchableOpacity 
                                onPress={() =>this.onSearch()}
                                style={CommonStyles.ricon}>
                                    <Image source={require('../../assets/images/search.png')} resizeMode="contain" style={{ width: 22, height: 28 }} />
                                </TouchableOpacity>

                                {/* <TextInput style={[CommonStyles.searchbartop]} placeholder="Search Freelancer”" placeholderTextColor="#ddd" onChangeText={(text) => this.setState({ searchtext: text })} />
                               
                                <TouchableOpacity style={styles.serachBtn} onPress={() =>this.onSearch()}>
                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Search</Text>
                                </TouchableOpacity> */}
                                
                                </View>            
                      
                        </ImageBackground>
                       
                        <View style={CommonStyles.container}>
                           
                           <View style={styles.homeslider}>
                                    <Swiper showsButtons={false} loop={true}  autoplay={true}
                                        dot={<View style={{ backgroundColor: '#fdfdfd', width: 10, height: 10, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}
                                        activeDot={<View style={{ backgroundColor: '#3e1bee', width: 11, height: 11, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}>
                                        <ImageBackground source={require('../../assets/images/adbanner.png')} resizeMode="cover" style={styles.slides}>
                                                <Text style={styles.textheading}>Popular  :</Text>   
                                                <View style={[CommonStyles.tagswrap]}>                            
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Web & mobile Development</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Business</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Content Writing</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Seo</Text>
                                                </TouchableOpacity>
                                                </View> 
                                        </ImageBackground>
                                        <ImageBackground source={require('../../assets/images/banner2.png')} resizeMode="cover" style={styles.slides}>
                                            <Text style={styles.textheading}>Welcome</Text>
                                            <Text style={styles.text2}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et</Text>
                                        </ImageBackground>
                                        <ImageBackground source={require('../../assets/images/adbanner.png')} resizeMode="cover" style={styles.slides}>
                                        <Text style={styles.textheading}>Welcome</Text>
                                            <Text style={styles.text2}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et</Text>
                                        </ImageBackground>
                                        </Swiper>
                           </View>

                           <View style={styles.welcomeg}>
                               <Text style={styles.heading}>Welcome To Gouruu </Text>
                               <Text style={styles.para} numberOfLines={4}>Lorem ipsum dolor sit amet, eirmod tempor accusam et, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et.</Text>
                           </View>

                            <View style={[CommonStyles.rowbetween]}>
                                <View style={{ marginLeft: 'auto' }}>
                                    <Select style={styles.sortselect}
                                        minWidth="110"
                                        width="100%"
                                        borderWidth="0"
                                        accessibilityLabel="Sort By"
                                        placeholder="Sort By"
                                        _selectedItem={{
                                            endIcon: <CheckIcon size={5} />,
                                        }}  >

                                        <Select.Item label="Newest First" value="ux" />
                                        <Select.Item label="Development" value="web" />
                                        <Select.Item label="Content Writer" value="content" />
                                        <Select.Item label="UI Designing" value="ui" />
                                        <Select.Item label="Backend Development" value="backend" />

                                    </Select>
                                </View>
                            </View>

                            <View style={[CommonStyles.productrow]}>
                                <View style={[CommonStyles.rowbetween, { marginBottom: 15 }]}>
                                    <Text style={CommonStyles.heading}>Popular Professional Services</Text>
                                    <TouchableOpacity>
                                        <Text style={CommonStyles.hedinglink}>Explore All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={{ marginLeft: -8 }}>
                                    {professional && professional.length ? professional.map((professionalData, index) => {
                                        return (
                                            <View style={CommonStyles.colbox} >
                                                <View style={[CommonStyles.card, { width: 220}, styles.hcardcontent]} key={index}>
                                                    <Image source={professionalData.profile_image ? { uri: professionalData.profile_image } : require('../../assets/images/list1.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                                    <View style={[CommonStyles.cardcontent,]}>
                                                        <Text style={CommonStyles.pheading}>{professionalData.first_name}{" "}{professionalData.last_name} </Text>
                                                        <Text style={[CommonStyles.para, ]} numberOfLines={3} ellipsizeMode="tail">{professionalData.description} </Text>
                                                        <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>{professionalData.hourly_rate ? professionalData.hourly_rate : 0}</Text></Text>
                                                        
                                                    </View>
                                                    {this.props.userData?.userDetails?.accessToken.length ?
                                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, styles.cbtn]} onPress={() =>
                                                            this.props.navigation.navigate(
                                                              'FreelancerProfileDetails',
                                                              {freelancerId: professionalData.user_id},
                                                            )
                                                          }>
                                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, styles.cbtn]} onPress={() => Alert.alert('You need to login first')}>
                                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                                        </TouchableOpacity>
                                    }
                                                </View>
                                            </View>
                                        )
                                    }) :
                                        <Text style={CommonStyles.notfoundtext}> No Professional Service Provider found</Text>}

                                </ScrollView>

                            </View>
                            <View style={[CommonStyles.productrow]}>
                                <View style={[CommonStyles.rowbetween, { marginBottom: 15 }]}>
                                    <Text style={CommonStyles.heading}>Popular miscellaneous Services</Text>
                                    <TouchableOpacity>
                                        <Text style={CommonStyles.hedinglink}>Explore All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={{ marginLeft: -8 }}>
                                    {miscellaneous && miscellaneous.length ? miscellaneous.map((miscellaneousData, index) => {
                                        return (
                                            <View style={CommonStyles.colbox}>
                                                <View style={[CommonStyles.card, { width: 220}, styles.hcardcontent]}>
                                                    <Image source={miscellaneousData.profile_image ? { uri: miscellaneousData.profile_image } : require('../../assets/images/cleaning.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                                    <View style={[CommonStyles.cardcontent, ]}>
                                                        <Text style={CommonStyles.pheading}>{miscellaneousData.first_name}{" "}{miscellaneousData.last_name}</Text>
                                                        <Text style={[CommonStyles.para, ]} numberOfLines={3} ellipsizeMode="tail">{miscellaneousData.description}</Text>
                                                        <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>${miscellaneousData.hourly_rate ? miscellaneousData.hourly_rate : 0}</Text></Text>
                                                       
                                                    </View>
                                                    {this.props.userData?.userDetails?.accessToken.length ?
                                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, styles.cbtn]} onPress={() =>
                                                            this.props.navigation.navigate(
                                                              'FreelancerProfileDetails',
                                                              {freelancerId: miscellaneousData.user_id},
                                                            )
                                                          }>
                                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm, styles.cbtn]} onPress={() => Alert.alert('You need to login first')}>
                                                            <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                                        </TouchableOpacity>
                                    }
                                                </View>
                                            </View>
                                        )
                                    }) :
                                        <Text style={CommonStyles.notfoundtext}> No miscellaneous Service Provider found</Text>}
                                </ScrollView>

                            </View>

                            <ImageBackground source={require('../../assets/images/learn-more.jpg')} resizeMode="cover" style={styles.morebg} >
                                <Text style={styles.bannertext} numberOfLines={5}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</Text>
                                <View style={CommonStyles.row}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={[CommonStyles.outlinebtn, CommonStyles.btnsm]}>
                                            <Text style={[CommonStyles.btntext]}>Know About</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                            <Text style={CommonStyles.btntext}>Contact Us</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                            <View style={{ paddingBottom: 15, marginRight: -15 }}>
                                <Text style={styles.headingtop}>News & Blogs</Text>
                                <ScrollView horizontal>
                                    <View style={[CommonStyles.card, styles.newscard]}>
                                        <Image source={require('../../assets/images/blog1.jpg')} resizeMode="cover" style={styles.cardthumb} />
                                        <View style={styles.date}>
                                            <Text style={styles.datetext}>02Dec 2021</Text>
                                        </View>
                                        <View style={styles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            <View style={CommonStyles.tagswrap}>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Trending</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Blog</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={CommonStyles.para}>when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>

                                            <View style={CommonStyles.row}>
                                                <View style={CommonStyles.col50}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 18 }}>
                                                        <Text style={styles.grtext2}>CHRISTOPHER RYAN</Text>
                                                    </View>
                                                </View>
                                                <View style={[CommonStyles.col50, { paddingLeft: 25 }]}>
                                                    <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]} 
                                                    //onPress={() => this.props.navigation.navigate('ServiceDetails')}
                                                   
                                                    >
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Read More</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[CommonStyles.card, styles.newscard]}>
                                        <Image source={require('../../assets/images/blog2.jpg')} resizeMode="cover" style={styles.cardthumb} />
                                        <View style={styles.date}>
                                            <Text style={styles.datetext}>02Dec 2021</Text>
                                        </View>
                                        <View style={styles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            <View style={CommonStyles.tagswrap}>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Trending</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Blog</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={CommonStyles.para}>when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>

                                            <View style={CommonStyles.row}>
                                                <View style={CommonStyles.col50}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 18 }}>
                                                        <Text style={styles.grtext2}>CHRISTOPHER RYAN</Text>
                                                    </View>
                                                </View>
                                                <View style={[CommonStyles.col50, { paddingLeft: 25 }]}>
                                                    <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Read More</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[CommonStyles.card, styles.newscard]}>
                                        <Image source={require('../../assets/images/blog1.jpg')} resizeMode="cover" style={styles.cardthumb} />
                                        <View style={styles.date}>
                                            <Text style={styles.datetext}>02Dec 2021</Text>
                                        </View>
                                        <View style={styles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            <View style={CommonStyles.tagswrap}>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Trending</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Blog</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={CommonStyles.para}>when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>

                                            <View style={CommonStyles.row}>
                                                <View style={CommonStyles.col50}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 18 }}>
                                                        <Text style={styles.grtext2}>CHRISTOPHER RYAN</Text>
                                                    </View>
                                                </View>
                                                <View style={[CommonStyles.col50, { paddingLeft: 25 }]}>
                                                    <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]} onPress={() => this.props.navigation.navigate('ServiceDetails')}>
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Read More</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[CommonStyles.card, styles.newscard]}>
                                        <Image source={require('../../assets/images/blog2.jpg')} resizeMode="cover" style={styles.cardthumb} />
                                        <View style={styles.date}>
                                            <Text style={styles.datetext}>02Dec 2021</Text>
                                        </View>
                                        <View style={styles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                            <View style={CommonStyles.tagswrap}>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Trending</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={CommonStyles.filltags}>
                                                    <Text style={CommonStyles.tagtext}>Blog</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={CommonStyles.para}>when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>

                                            <View style={CommonStyles.row}>
                                                <View style={CommonStyles.col50}>
                                                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 18 }}>
                                                        <Text style={styles.grtext2}>CHRISTOPHER RYAN</Text>
                                                    </View>
                                                </View>
                                                <View style={[CommonStyles.col50, { paddingLeft: 25 }]}>
                                                    <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Read More</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>

                            <View style={styles.faqhome}>
                                <Text style={styles.headingtop}>FAQ</Text>

                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                        <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={styles.faqbody}>
                                        <Text style={CommonStyles.para}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                        <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                <View style={styles.faqbox}>
                                    <View style={styles.faqheader}>
                                        <Image source={require('../../assets/images/angle-down.png')} style={styles.faqarrow} resizeMode="contain" />
                                        <TouchableOpacity>
                                            <Text style={styles.faqheading}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state,
        profileData: state.userDetails.profileDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDisableDashboard: (data) => dispatch(updateDisableDashboard(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);