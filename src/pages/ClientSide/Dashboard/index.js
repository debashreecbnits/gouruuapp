
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { connect } from 'react-redux';
import { updateDisableDashboard } from '../../../Store/Actions/Action';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_image: "",


    };
  }


  componentDidMount() {
    this.props.updateDisableDashboard(false);
    this.props.navigation.addListener('didFocus', () => {
    this.props.updateDisableDashboard(false);
    });
   

  }

 

  render() {

    return (
      <NativeBaseProvider style={CommonStyles.wrapper}>
        <ImageBackground source={require('../../../assets/images/cbg.png')} style={CommonStyles.dashbg}>
          <View style={[CommonStyles.headerwrap]}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity
                onPress={this.props.navigation.openDrawer}>
                <Image
                  source={require('../../../assets/images/menu.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.Trighticon}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('NotificationList')
                }>
                <Image
                  source={require('../../../assets/images/notification.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lastactive}>
            <View style={styles.centerheading}>
              <Text style={styles.htitle}>Dashboard</Text>
              {/* <Text style={styles.smtitle}>Last Login was 12th Feb</Text> */}
            </View>
          </View>


        </ImageBackground>
        <View style={[CommonStyles.container, styles.abscard]}>

          <View style={styles.whitecard}>
            <ScrollView>
              {/* <View style={{flex:1 , paddingTop:15}}>
            {this.props.userData.userDetails?.data?.user_type ===
                  'Client' ? (
                  <View style={[styles.pboxx]}>
                    {this.props.userData?.userDetails ?
                      <View style={styles.profilebox}>
                        <Image
                          source={{ uri: this.props.userData?.userDetails?.data?.profile_image }}
                          resizeMode="cover"
                          style={styles.profileimg}
                        />
                      </View>
                      :
                      <View style={styles.profilebox}>
                        <Image
                          source={require('../../../assets/images/noimage.png')}
                          resizeMode="cover"
                          style={styles.profileimg}
                        />
                      </View>
                    }
                    <View style={{ width: '70%', paddingLeft:15 }}>
                      <Text style={styles.name}>
                        {
                          this.props.userData?.userDetails?.data?.first_name +
                          ' ' +
                          this.props.userData?.userDetails?.data?.last_name}
                      </Text>
                      <Text style={styles.mutetext}>
                        {
                          this.props.userData?.userDetails?.data?.email}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.pboxx]}>
                    {
                      this.props.userData.userDetails ?
                        <View style={styles.profilebox}>
                          <Image
                            source={{ uri: this.props.userData.userDetails?.data?.profile_image }}
                            resizeMode="cover"
                            style={styles.profileimg}
                          />
                        </View>
                        :
                        <View style={styles.profilebox}>
                          <Image
                            source={require('../../../assets/images/noimage.png')}
                            resizeMode="cover"
                            style={styles.profileimg}
                          />
                        </View>
                    }
                    <View style={{ width: '70%', paddingLeft:15 }}>
                      <Text style={styles.name}>
                        {
                          this.props.userData.userDetails?.data?.first_name +
                          ' ' +
                          this.props.userData.userDetails?.data?.last_name}
                      </Text>
                      <Text style={styles.mutetext}>
                        {this.props.userData.userDetails?.data?.email}
                      </Text>
                    </View>
                  </View>
                )
                }
            </View>               
             */}
              {this.props.userData.userDetails?.data?.user_type ===
                'Client' ? (
                <View style={styles.menus}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('ProposalList')}>
                    <Image source={require('../../../assets/images/proposal.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={[styles.menulink]}>
                      Proposals
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() =>
                      this.props.navigation.navigate('PostJob')
                    }
                  >
                    <Image source={require('../../../assets/images/postjob.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Post a Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() =>
                      this.props.navigation.navigate('ProjectList')
                    }>
                    <Image source={require('../../../assets/images/project.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Projects</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('Freelancers')}>
                    <Image source={require('../../../assets/images/serviceprovider.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Service Providers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('FavouriteFreelancers')}>
                    <Image source={require('../../../assets/images/favorite.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>My Favorites</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuitem}>
                    <Image source={require('../../../assets/images/payment.png')} resizeMode="contain" style={styles.uimg} /> 
                      <Text style={styles.menulink}>Payments</Text>                      
                    </TouchableOpacity> */}
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('Identity')}>
                    <Image source={require('../../../assets/images/facedetection.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>
                      Identity Verification
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.menus}>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('FreelancerProfile')}>
                    <Image source={require('../../../assets/images/profile.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={[styles.menulink]}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() =>
                      this.props.navigation.navigate('chatList', { userId: this.props?.userData?.userDetails?.data?.id })
                    }>
                    <Image source={require('../../../assets/images/messages.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Messages</Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() =>
                      this.props.navigation.navigate('ProjectList')
                    }>
                    <Image source={require('../../../assets/images/project.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Projects</Text>

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuitem}
                    onPress={() => this.props.navigation.navigate('JobList')}>
                    <Image source={require('../../../assets/images/jobs.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Jobs</Text>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem} onPress={() => this.props.navigation.navigate('Identity')}>
                    <Image source={require('../../../assets/images/facedetection.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>
                      Identity Verification
                    </Text>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuitem}
                  //onPress={() => this.props.navigation.navigate('Payments')}
                  >
                    <Image source={require('../../../assets/images/payment.png')} resizeMode="contain" style={styles.uimg} />
                    <Text style={styles.menulink}>Payments</Text>
                  </TouchableOpacity>
                </View>
              )}




            </ScrollView>


          </View>

        </View>
      </NativeBaseProvider>
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
    updateDisableDashboard: data => dispatch(updateDisableDashboard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

