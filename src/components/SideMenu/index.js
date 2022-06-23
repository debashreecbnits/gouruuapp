import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { logout, updateUserDetails } from '../../Store/Actions/Action';
import { apiCallWithToken } from '../../Api/index';
import { USER_TOGGLE } from '../../shared/allApiUrl';
import { marginRight } from 'styled-system';
import { Switch } from 'react-native-switch';
import CommonStyles from '../../../CommonStyles';

class SideMenuAfterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonial: false,
      setting: false,
      toggle: false,
      toggleFreelancer: false,
      toggleChangeFirstTime: false
    };
  }

  LogOut = () => {
    this.props.logout();
    this.props.navigation.navigate('Home');
  };



  handleSwitch = async () => {
    {
      this.state.toggleChangeFirstTime === false ?
      <> {this.props.userData.userDetails.data.user_type === 'Client' ?

        Alert.alert(
          "",
          "Do you want to be a Freelancer?",
          [
            {
              text: "Yes",
              onPress: () => { this.switchFreelancer() },
              style: "cancel",
            },
            {
              text: "No",
              style: "cancel",
              onPress: () => { this.setState({ toggle: false }) }

            },
          ],

        )
        :
        Alert.alert(
          "",
          "Do you want to be a Client?",
          [
            {
              text: "Yes",
              onPress: () => { this.handleSwitch2() },
              style: "cancel",
            },
            {
              text: "No",
              style: "cancel",
              onPress: () => { this.setState({ toggle: false }) }

            },
          ],

        )} </>
      : <>{this.handleSwitch2()} </>


    }
  }


  switchFreelancer = () => {
    if (this.props.userData.userDetails.data.user_type === 'Client' && this.props.userData.userDetails.data.profile_completion < 40) {
      this.props.navigation.navigate('ProfileSetUp')
      this.setState({ toggle: false })
      this.props.updateUserDetails({
        ...this.props.userData.userDetails.data,
        profile_completion: '70'
      });
      // if(this.props.userData.userDetails.data.user_type === 'Client' && this.props.userData.userDetails.data.profile_completion > 40){
      //   this.handleSwitch2()
      //     //this.setState({toggle:true})
      // }
    }
    else {
      this.handleSwitch2()
    }
  }


  handleSwitch2 = async () => {
    this.setState({ toggleChangeFirstTime: true })
    var formData = new FormData();
    formData.append('userid', this.props?.userData?.userDetails?.data?.id);

    await apiCallWithToken(USER_TOGGLE, 'post', formData)
      .then(res => {
        if (
          res.data.status === 1 &&
          this.props.userData.userDetails.data.user_type === 'Client'
        ) {
          this.props.updateUserDetails({
            ...this.props.userData.userDetails.data,
            user_type: 'Service Provider',
          });
          // if(this.props.userData.userDetails.data.profile_completion < 40){
          //   this.setState({toggleChangeFirstTime: false})
          //   this.props.navigation.navigate('ProfileSetUp');
          // }
          this.props.navigation.navigate('Dashboard');
          this.setState({ toggle: !this.state.toggle });
        }
        else {
          this.props.updateUserDetails({
            ...this.props.userData.userDetails.data,
            user_type: 'Client',
          });
          this.props.navigation.navigate('Dashboard');
          this.setState({ toggle: !this.state.toggle });
        }
      })
      .catch(err => {
        console.log(err);
      });

    //this.setState ( {toggle : !this.state.toggle})
  };

  showDeleteAlert = () =>
    Alert.alert(
      "",
      "Are you sure? Your account will be permanently deleted",
      [
        {
          text: "Yes",
          onPress: () => this.deleteAccount(),
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],

    );

  deleteAccount = async () => {
    var formData = new FormData();
    formData.append('user_id', this.props?.userData?.userDetails?.data?.id);

    await apiCallWithToken('delete_account', 'post', formData).then(res => {
      if (res.data.status === 1) {
        this.LogOut();
      }
    }).catch(err => {
      console.log(err, "error console")
    })
  }





  render() {
    return this.props.userData?.userDetails?.accessToken &&
      this.props.userData?.userDetails?.accessToken.length ? (
      this.props.userData.userDetails?.data?.user_type === 'Client' ? (
        <ImageBackground source={require('../../assets/images/sidebarbg.png')} style={styles.sidebarwrap}>
          <View style={styles.sidebar}>
            <ImageBackground source={require('../../assets/images/profilewrap.png')} style={styles.profilewrap}>
              <View style={CommonStyles.flexrow}>
                {this.props.userData.userDetails ?
                  <View style={styles.pimgbox}>
                    <Image
                      source={{ uri: this.props.userData.userDetails?.data?.profile_image }}
                      resizeMode="cover"
                      style={styles.profileimage}
                    />
                  </View>
                  :
                  <View style={styles.pimgbox}>
                    <Image
                      source={require('../../assets/images/noimage.png')}
                      resizeMode="cover"
                      style={styles.profileimage}
                    />
                  </View>
                }
                <View style={styles.procontent}>
                  <Text style={[styles.uname,]}>
                    {
                      // this.props.profileData != null
                      // ? this.props.profileData?.User_Data?.first_name +
                      // ' ' +
                      // this.props.profileData?.User_Data?.last_name
                      // :  
                      this.props.userData.userDetails?.data.first_name +
                      ' ' +
                      this.props.userData.userDetails?.data.last_name}
                  </Text>
                  <Text style={styles.usertype}>
                    {this.props.userData.userDetails?.data?.user_type}


                  </Text>
                </View>
              </View>

              <View style={styles.uswitch}>

                <Text style={styles.alabel}>Switch Account</Text>

                <Switch

                  circleSize={25}
                  barHeight={30}
                  circleBorderWidth={3}
                  backgroundActive={'#fff'}
                  backgroundInactive={'#ddd'}
                  circleActiveColor={'#3e1bee'}
                  circleInActiveColor={'#111'}
                  circleBorderActiveColor={'#ddd'}
                  circleBorderInactiveColor={'#757676'}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2.2}
                  switchRightPx={2.4}
                  switchWidthMultiplier={2}
                  switchBorderRadius={50}
                  onValueChange={this.handleSwitch}
                  value={this.state.toggle}

                />

              </View>





            </ImageBackground>
            {this.props.userData.userDetails.disableDashboard ? (
              <ScrollView>
                <View style={styles.menuwrap}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Icon name="ios-documents" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Dasboard</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('FavouriteFreelancers')}>
                    <Icon name="heart" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Favourites</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ testimonial: !this.state.testimonial })}>
                    <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Explore</Text>
                  </TouchableOpacity>
                  {this.state.testimonial ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('Testimonials')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>TestimonialList</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('AddTestimonial')}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Add Testimonials</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('PostJob')}
                  >
                    <Icon name="create" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Post a Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="swap-horizontal" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>My Transaction</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="reader" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Billing & payment info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="receipt" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Invoices</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() =>
                      this.props.navigation.navigate('NotificationList')
                    }>
                    <Icon name="notifications" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Notification</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('Support')}>
                    <Icon name="help-circle" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Help & Support</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.LogOut()}>
                    <Icon name="power" size={20} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <ScrollView>
                <View style={styles.menuwrap}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Icon name="home" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Icon name="people" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Profile</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                        style={styles.menuitem}
                        onPress={() => this.props.navigation.navigate('ServiceList')}>
                          <Icon name="layers" size={18} color="#3e1bee" style={{marginRight:5}} />
                        <Text style={styles.menulink}>Services</Text>
                      </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Icon name="ios-documents" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Dasboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('chatList', { userId: this.props?.userData?.userDetails?.data?.id })}>
                    <Icon name="ios-mail" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Inbox</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('ProjectList')}>
                    <Icon name="ios-file-tray-stacked" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Projects</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ testimonial: !this.state.testimonial })}>
                    <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Explore</Text>
                  </TouchableOpacity>
                  {this.state.testimonial ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('Testimonials')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>TestimonialList</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('AddTestimonial')}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Add Testimonials</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('Freelancers')}>
                    <Icon name="md-person-circle" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Service Providers</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('Payments')}>
                      <Icon name="card" size={18} color="#3e1bee" style={{marginRight:5}} />
                        <Text style={styles.menulink}>Payments </Text>
                      </TouchableOpacity> */}
                  {/* <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('ChangePasswordAfterLogin')}>
                      <Icon name="cog" size={18} color="#3e1bee" style={{marginRight:5}} />
                        <Text style={styles.menulink}>Settings</Text>
                      </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ setting: !this.state.setting })}>
                    <Icon name="cog" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Setting</Text>
                  </TouchableOpacity>
                  {this.state.setting ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('ChangePasswordAfterLogin')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>ChangePassword</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.showDeleteAlert()}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Delete Account</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.LogOut()}>
                    <Icon name="power" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </ImageBackground>

      ) : (
        <ImageBackground source={require('../../assets/images/sidebarbg.png')} style={styles.sidebarwrap}>
          <View style={styles.sidebar}>
            <ImageBackground source={require('../../assets/images/profilewrap.png')} style={styles.profilewrap}>

              <View style={CommonStyles.flexrow}>
                {/* {this.props.profileData && this.props.profileData?.User_Data?.profile_image ?
              <View style={styles.pimgbox}>
                <Image
                  source={{ uri: this.props.profileData?.User_Data?.profile_image }}
                  resizeMode="cover"
                  style={styles.profileimage}
                />
              </View>
              : */}
                {this.props.userData.userDetails ?
                  <View style={styles.pimgbox}>
                    <Image
                      source={{ uri: this.props.userData.userDetails?.data?.profile_image }}
                      resizeMode="cover"
                      style={styles.profileimage}
                    />
                  </View>
                  :
                  <View style={styles.pimgbox}>
                    <Image
                      source={require('../../assets/images/noimage.png')}
                      resizeMode="cover"
                      style={styles.profileimage}
                    />
                  </View>
                }
                <View style={styles.procontent}>
                  <Text style={[styles.uname,]}>
                    {
                      // this.props.profileData != null || this.props.profileData != undefined
                      //   ? this.props.profileData?.User_Data?.first_name +
                      //   ' ' +
                      //   this.props.profileData?.User_Data?.last_name
                      //   : 
                      this.props.userData.userDetails?.data?.first_name +
                      ' ' +
                      this.props.userData.userDetails?.data?.last_name}
                  </Text>
                  <Text style={styles.usertype}>
                    {this.props.userData.userDetails?.data?.user_type}
                  </Text>
                </View>
              </View>
              <View style={styles.uswitch}>
                <Text style={styles.alabel}>Switch Account</Text>

                <Switch
                  circleSize={25}
                  barHeight={30}
                  circleBorderWidth={3}
                  backgroundActive={'#fff'}
                  backgroundInactive={'#ddd'}
                  circleActiveColor={'#3e1bee'}
                  circleInActiveColor={'#111'}
                  circleBorderActiveColor={'#ddd'}
                  circleBorderInactiveColor={'#757676'}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={2.2}
                  switchRightPx={2.4}
                  switchWidthMultiplier={2}
                  switchBorderRadius={50}
                  //ios_backgroundColor="gray"
                  //onValueChange={(value) => this.setState({ toggle: value })}
                  onValueChange={this.handleSwitch}
                  value={this.state.toggle}
                />

              </View>
            </ImageBackground>

            {this.props.userData.userDetails.disableDashboard ? (
              <ScrollView>
                <View style={styles.menuwrap}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Icon name="ios-documents" size={18} color="#3e1bee" style={{ marginRight: 5 }}/>
                    <Text style={styles.menulink}>Dasboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('JobList')}>
                    <Icon name="briefcase" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Jobs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ testimonial: !this.state.testimonial })}>
                    <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Explore</Text>
                  </TouchableOpacity>
                  {this.state.testimonial ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('Testimonials')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>TestimonialList</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('AddTestimonial')}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Add Testimonials</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Favourites')}>
                    <Icon name="heart" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Favourites</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="briefcase" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Career</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Transaction')}>
                    <Icon name="swap-horizontal" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>My Transaction</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="reader" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Billing & Payment Info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="receipt" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Invoices</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('NotificationList')}>
                    <Icon name="notifications" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Notification</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="help-circle" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Help & Support</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.LogOut()}>
                    <Icon name="power" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <ScrollView>
                <View style={styles.menuwrap}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Dashboard')}>
                    <Icon name="ios-documents" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Dasboard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Myfeed')}>
                    <Icon name="newspaper" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>My Feed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ testimonial: !this.state.testimonial })}>
                    <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Explore</Text>
                  </TouchableOpacity>
                  {this.state.testimonial ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('Testimonials')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>TestimonialList</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('AddTestimonial')}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Add Testimonials</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('BestMatch')}>
                    <Icon name="options" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Best Matches</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('chatList', { userId: this.props?.userData?.userDetails?.data?.id })}>
                    <Icon name="mail" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Inbox</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('ProjectList')}>
                    <Icon name="ios-file-tray-stacked" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Projects</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('FreelancerProfile')}>
                    <Icon name="person-circle" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}>
                    <Icon name="key" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Identity Verification</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuitem}>
                <Icon name="card" size={18} color="#3e1bee" style={{marginRight:5}} />
                  <Text style={styles.menulink}>Payments</Text>
                </TouchableOpacity> */}
                  {/* <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('ChangePasswordAfterLogin')}>
                <Icon name="cog" size={18} color="#3e1bee" style={{marginRight:5}} />
                  <Text style={styles.menulink}>Settings</Text>
                </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.setState({ setting: !this.state.setting })}>
                    <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Settings</Text>
                  </TouchableOpacity>
                  {this.state.setting ? (
                    <View style={{ paddingLeft: 15 }}>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.props.navigation.navigate('ChangePasswordAfterLogin')}>
                        <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>ChangePassword</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuLabel}
                        onPress={() => this.showDeleteAlert()}>
                        <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                        <Text style={styles.menulink}>Delete Account</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.LogOut()}>
                    <Icon name="power" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </ImageBackground>
      )
    ) : (
      <ImageBackground source={require('../../assets/images/sidebarbg.png')} style={styles.sidebarwrap}>
        <View style={styles.sidebar}>
          <View style={styles.sideMenuTop}>
            <Image source={require('../../assets/images/logo.png')} style={{ width: 70, height: 55, marginBottom: 5 }} resizeMode='contain' />
            <Text style={styles.uname2}>Have a Good Day...</Text>
          </View>
          <ScrollView>
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                style={styles.menuLabel}
                onPress={() =>
                  this.props.navigation.navigate('JobList')
                }>
                <Icon name="briefcase" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                <Text style={styles.menulink}>Jobs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuLabel}
                onPress={() => this.setState({ testimonial: !this.state.testimonial })}>
                <Icon name="globe" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                <Text style={styles.menulink}>Explore</Text>
              </TouchableOpacity>
              {this.state.testimonial ? (
                <View style={{ paddingLeft: 15 }}>
                  <TouchableOpacity
                    style={styles.menuLabel}
                    onPress={() => this.props.navigation.navigate('Testimonials')}>
                    <Icon name="ios-chatbubble-ellipses" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>TestimonialList</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuLabel}
                    onPress={() => this.props.navigation.navigate('AddTestimonial')}>
                    <Icon name="ios-create" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                    <Text style={styles.menulink}>Add Testimonials</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={styles.menuLabel}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Icon name="ios-log-in" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                <Text style={styles.menulink}>SignIn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuLabel}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Icon name="log-in-sharp" size={18} color="#3e1bee" style={{ marginRight: 5 }} />
                <Text style={styles.menulink}>SignUp</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );

  }
}
const mapStateToProps = state => {
  return {
    userData: state,
    profileData: state.userDetails.profileDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUserDetails: data => dispatch(updateUserDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuAfterLogin);
