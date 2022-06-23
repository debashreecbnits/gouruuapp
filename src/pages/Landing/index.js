import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper'
import styles from './styles';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    console.log("Token information==>",this.props.userData)
    if (
      this.props.userData?.userDetails?.accessToken &&
      this.props.userData?.userDetails?.accessToken.length
    ) {

      this.props.navigation.navigate('Dashboard')
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <StatusBar hidden />
        <Swiper 
          //showsButtons={false} 
          loop={true} 
          autoplay={true}
          dot={<View style={{ backgroundColor: '#fdfdfd', width: 10, height: 10, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}
          activeDot={<View style={{ backgroundColor: '#3e1bee', width: 11, height: 11, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}
          >
          <ImageBackground source={require('../../assets/images/swiper3.png')} resizeMode="stretch" style={styles.slide1}>
            <Text style={styles.textheading}>Welcome</Text>
            <Text style={styles.text2}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et</Text>
          </ImageBackground>
          <ImageBackground source={require('../../assets/images/swiper2.png')} resizeMode="stretch" style={styles.slide2}>
            <Text style={styles.textheading}>Welcome</Text>
            <Text style={styles.text2}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et</Text>
          </ImageBackground>
          <ImageBackground source={require('../../assets/images/swiper1.png')} resizeMode="stretch" style={styles.slide3}>
          <Text style={styles.textheading}>Welcome</Text>
            <Text style={styles.text2}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor accusam et</Text>
          </ImageBackground>
        </Swiper>
        <View style={styles.bottomwrap}>
          {/* <TouchableOpacity style={styles.nxtbtn} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.ntext}>Next</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.nxtbtn} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.ntext}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => { 
  return {
    userData: state,
  };
};
export default connect(mapStateToProps, null)(Dashboard);
