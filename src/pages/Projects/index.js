import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView,ImageBackground} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import {apiCallWithToken} from '../../Api';
import {GET_ALL_PROJECTS} from '../../shared/allApiUrl';
import {connect} from 'react-redux';
import Loader from '../../components/Loader';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectListArray: [],
    };
  }

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = async () => {
    this.setState({isLoading: true});
    var formData = new FormData();
    formData.append('user_id', this.props.userData.userDetails.data.id);
    formData.append('search', '');
    formData.append('limit', 0);
    formData.append('page_no', 0);
    await apiCallWithToken(GET_ALL_PROJECTS, 'post', formData)
      .then(res => {
        if ((res.status = 200)) {
          this.setState({projectListArray: res.data.data});
          this.setState({isLoading: false});
          console.log("projectListArray==>",this.state.projectListArray)
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false});
      });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <NativeBaseProvider style={CommonStyles.wrapper}>
        {/* <View style={CommonStyles.headerwrap}>
          <View style={CommonStyles.Tlefticon}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../assets/images/left-arrow.png')}
                resizeMode="contain"
                style={CommonStyles.ticon}
              />
            </TouchableOpacity>
          </View>
          <View style={CommonStyles.centerheading}>
            <Text style={CommonStyles.htitle}>Project List</Text>
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
        </View> */}
           <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Project List</Text>
                    </View>
                </ImageBackground>
        <ScrollView>
        {isLoading ? (
            <Loader loading={true} />
          ) : (
          <View style={CommonStyles.container}>
            <View style={[CommonStyles.productrow]}>
              <View style={styles.projectListRow}>
                {this.state.projectListArray &&
                  this.state.projectListArray.map((projectItem, index) => (
                    //return (
                 
                      <View style={[styles.projectListCard]} key={index}>
                        <View style={styles.cardcontent}>
                          <View>
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={CommonStyles.pheading}>
                              {projectItem.title}
                            </Text>
                            <View>
                              <Text
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={[CommonStyles.para]}>
                                {projectItem.description}{' '}
                              </Text>
                            </View>
                          </View>
                          <View>
                            {projectItem.h_rate_min ||
                            projectItem.h_rate_max ? (
                              <Text style={{fontWeight: 'bold', color: '#242933'}}>
                                Hourly : ${' '}
                                {projectItem.h_rate_min
                                  ? projectItem.h_rate_min
                                  : 0}
                                - ${' '}
                                {projectItem.h_rate_max
                                  ? projectItem.h_rate_max
                                  : 0}
                              </Text>
                            ) : (
                              <Text style={{fontWeight: 'bold', color: '#242933'}}>
                                Fixed Price : ${' '}
                                {projectItem.fixed_rate
                                  ? projectItem.fixed_rate
                                  : 0}
                              </Text>
                            )}
                            <TouchableOpacity
                              style={[
                                CommonStyles.primarybutton,
                                CommonStyles.btnsm,
                              ]}
                              onPress={() =>
                                //this.props.navigation.navigate('ProjectDetails2', {projectId: projectItem.id})
                                this.props.navigation.navigate('MilestoneList', {projectId: projectItem.id})
                              }>
                              <Text
                                style={[
                                  CommonStyles.btntext,
                                  CommonStyles.btnsmtext,
                                ]}
                                onPress={() => {
                                  //this.props.navigation.navigate('ProjectDetails2',{projectId: projectItem.id});
                                  this.props.navigation.navigate('MilestoneList', {projectId: projectItem.id})
                                }}>
                                Explore
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                  ))}
              </View>
            </View>
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
export default connect(mapStateToProps, null)(ProjectList);
