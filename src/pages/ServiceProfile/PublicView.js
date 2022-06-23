
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Progress, Select, CheckIcon} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import {updateProfile} from '../../Store/Actions/Action';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiCallWithToken} from '../../Api';
import {
  GET_FREELANCER_PROFILE_INFO,
  GET_PORTFOLIO,
} from '../../shared/allApiUrl';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';
class PublicView extends Component {
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
      company: '',
      workingFrom: '',
      workingTo: '',
      address: '',
      Review: [],
      Skills: [],
      
    };
    
  }

  componentDidMount() {
    this.getProfileInfo();
    this.getPortfolio();
    this.props.navigation.addListener('didFocus', () => {
      this.getProfileInfo();
    });
  }

  getProfileInfo = async () => {
   
    this.setState({isLoading: true});
    let data = {
      uid: this.props.userData.userDetails.data.id,
    };
    await apiCallWithToken(GET_FREELANCER_PROFILE_INFO, 'post', data)
      .then(res => {         
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
          Review: res.data.data.Review,
          Skills: res.data.data.User_Data.skill,
          isLoading: false,
        });
        this.props.updateProfile(res.data.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false});
      });
  };


  getPortfolio = async () => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    await apiCallWithToken(GET_PORTFOLIO, 'post', formData)
      .then(res => {
        this.setState({portfolioDetails: res.data.Data});
      })
      .catch(err => {
        console.log(err);
      });
  };

  
 


  render() {
    return (
      <NativeBaseProvider style={CommonStyles.wrapper}>
        <View style={CommonStyles.headerwrap}>
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
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
              <Image
                source={require('../../assets/images/notification.png')}
                resizeMode="contain"
                style={CommonStyles.ticon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <View style={CommonStyles.container}>
              <View style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                {this.state.profile_image ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.profilebox}>
                     
                        <Image
                          source={{uri: this.state.profile_image}}
                          resizeMode="cover"
                          style={styles.profileimg}
                        />
                    
                    </View>
                  </View>
                ) : (
                  <>
                   <Image
                          resizeMode="cover"
                          style={styles.profileimg}
                        />
                  </>
                )}
                <View style={styles.namebox}>
                 
                    <Text style={styles.name}>
                      {this.state.first_name} {this.state.last_name}
                    </Text>
                 
                
                 
                  {/* <TouchableOpacity>
                                    <Text style={[styles.ptext, CommonStyles.activetext]}>Check Avilability</Text>
                                </TouchableOpacity> */}
                </View>
              </View>

              <Text style={styles.pageheding}>Profile Info</Text>

              <View style={CommonStyles.hr}></View>

              <View style={styles.infowrap}>
                    <View style={CommonStyles.namerow}>
                      <Text style={CommonStyles.nametext}>Hourly Rate :</Text>
                      <Text
                        style={[
                          CommonStyles.namedata,
                          {fontSize: 22, color: '#3e1bee'},
                        ]}>
                        {this.state.hourly_rate}
                      </Text>
                    </View>
                    <View style={CommonStyles.namerow}>
                      <Text style={CommonStyles.nametext}>Service Cost :</Text>
                      <Text
                        style={[
                          CommonStyles.namedata,
                          {fontSize: 22, color: '#3e1bee'},
                        ]}>
                        {this.state.service_cost}
                      </Text>
                    </View>
              </View>
              <View style={CommonStyles.hr}></View>

              <View style={styles.infowrap}>
                    <View style={CommonStyles.namerow}>
                      <Text style={CommonStyles.nametext}>Category :</Text>
                      <Text style={CommonStyles.namedata}>
                        {this.state.category_name}
                      </Text>
                    </View>
              </View>
              <View style={CommonStyles.hr}></View>

              <View style={styles.infowrap}>
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
                      <Text style={CommonStyles.nametext}>Languages :</Text>
                      {this.state.language && this.state.language.length > 0 ? (
                        this.state.language.map((item, index) => {
                          return (
                            <>
                              <Text style={CommonStyles.namedata}>
                                {item.language__name}
                                {':'}
                                {'  '}
                                {item.level}
                                {'\n'}
                              </Text>
                            </>
                          );
                        })
                      ) : (
                        <View>
                          <Text>No languages selected</Text>
                        </View>
                      )}
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
              </View>
              <View style={CommonStyles.hr}></View>
                  <View
                    style={[
                      CommonStyles.rowbetween,
                      {marginBottom: 15, alignItems: 'center', marginTop: 25},
                    ]}>
                    <View>
                      <Text style={styles.pageheding}>
                        Professional Overview
                      </Text>
                    </View>
                  </View>
                  <View style={CommonStyles.formgroup}>
                    <Text style={styles.ptext}>{this.state.description}</Text>
                  </View>
            
              <View style={CommonStyles.hr}></View>
              <View
                style={[
                  CommonStyles.rowbetween,
                  {marginBottom: 15, alignItems: 'center', marginTop: 25},
                ]}>
                <View>
                  <Text style={styles.pageheding}>Skills</Text>
                </View>
              </View>
              {this.state.Skills && this.state.Skills.length > 1 ? (
                this.state.Skills.map((item, index) => {
                  return (
                    <View style={CommonStyles.tagswrap}>
                    <TouchableOpacity
                      style={{
                        width: 'auto',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        backgroundColor: 'blue',
                        marginRight: 10,
                        marginBottom: 8,
                        borderRadius: 35,
                      }}>
                      <Text style={{color: '#fff'}}>
                        {item.skill__title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  );
                })
              ) : (
                <View>
                  <Text>No data found</Text>
                </View>
              )}

              {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{padding: 10}}>
                  <Text
                    style={[
                      {fontSize: 16, fontWeight: 'bold'},
                      CommonStyles.activetext,
                    ]}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View> */}
              <View style={CommonStyles.hr}></View>
              {/* <View
                style={[
                  CommonStyles.rowbetween,
                  {marginBottom: 15, alignItems: 'center', marginTop: 25},
                ]}>
                <View>
                  <Text style={styles.pageheding}>My Skills</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/edit.png')}
                    resizeMode="contain"
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              </View> */}
              {/* <View style={CommonStyles.tagswrap}>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>HTML</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[CommonStyles.filltags, CommonStyles.activetag]}>
                  <Text style={[CommonStyles.tagtext, CommonStyles.whitetext]}>
                    Proofreading
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>Website Content </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>React Native </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>Translation </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>Css3 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.filltags}>
                  <Text style={CommonStyles.tagtext}>JS </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={{padding: 10}}>
                  <Text
                    style={[
                      {fontSize: 16, fontWeight: 'bold'},
                      CommonStyles.activetext,
                    ]}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={CommonStyles.hr}></View> */}
              <View
                style={[
                  CommonStyles.rowbetween,
                  {marginBottom: 15, alignItems: 'center', marginTop: 25},
                ]}>
                <View>
                  <Text style={styles.pageheding}>Employment History</Text>
                </View>
              </View>
              {this.state.Employment_History &&
              this.state.Employment_History.length > 0 ? this.state.Employment_History.map((item) => {
                return (
                  <>
                <Text style={styles.formlabel}>{item.company}</Text>
                <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
                  {item.category}
                </Text>
                <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
                  {item.start_date} - {item.end_date}
                </Text>
                <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
                  {item.country}
                </Text>
                <Text style={styles.ptext}>{item.description}</Text>
                </>
              )}) : (
                <View>
                  <Text>No data found</Text>
                </View>
              )}

              {/* <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <TouchableOpacity style={{padding:10}}>
                                    <Text style={[{fontSize:16, fontWeight:'bold'}, CommonStyles.activetext]}>See More</Text>
                                </TouchableOpacity>
                            </View> */}
              <View style={CommonStyles.hr}></View>
              <View
                style={[
                  CommonStyles.rowbetween,
                  {marginBottom: 15, alignItems: 'center', marginTop: 25},
                ]}>
                <View>
                  <Text style={styles.pageheding}>Portfolio</Text>
                </View>
              </View>

              {/* <TouchableOpacity style={styles.pfimgbox}>
                                        <Image source={require('../../assets/images/list1.jpg')} resizeMode="cover" style={styles.pfimg} />
                                    </TouchableOpacity> */}
              {this.state.portfolioDetails &&
              this.state.portfolioDetails.length > 0 ? this.state.portfolioDetails.map((item) => {
                return (
                    <>
                            <Text>{item.name}</Text>
                            <View
                            style={{
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              justifyContent: 'space-between',
                            }}>
                              
                            {item.images && item.images.length > 0 ? (
                              item.images.map(img => {
                                return (
                                  <TouchableOpacity style={styles.pfimgbox}>
                                    <Image
                                      source={{uri: img}}
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                        resizeMode: 'cover',
                                      }}
                                    />
                                  </TouchableOpacity>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </View>
                          </>
                )})
                           : (
                <>
                  <Text>No data found</Text>
                </>
              )}

              <View style={CommonStyles.hr}></View>

              <View
                style={[
                  CommonStyles.rowbetween,
                  {marginBottom: 15, alignItems: 'center', marginTop: 25},
                ]}>
                <View>
                  <Text style={styles.pageheding}>Reviews</Text>
                </View>
              </View>
              {this.state.Review &&
              this.state.Review.length > 0 ? this.state.Review.map((item) => {
                return (
                  <>
                <Text style={styles.ptext}>Name of the Reviewer:{'  '}{item.first_name}{' '}{item.last_name}</Text>
                <Text style={styles.ptext}>
                  Title of the Review:{'  '}{item.title}
                </Text>
                <Text style={styles.ptext}>
                  Review:{'  '}{item.description}
                </Text>
                <Text style={styles.ptext}>
                  Ratings:{'  '}{item.rating}
                </Text>
                </>
              )}) : (
                <View>
                  <Text>No data found</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicView);


