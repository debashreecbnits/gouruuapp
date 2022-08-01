import React, { Component } from 'react'
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import CommonStyles from '../../../CommonStyles';

export default class AboutUs extends Component {
    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}> 
                <View style={CommonStyles.headerwrap}>
                    
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>About Us</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={CommonStyles.cmsbanner}>
                        <Image source={require('../../assets/images/about-banner.jpg')} resizeMode="cover" style={CommonStyles.banner} />
                    </View>
                    <View style={CommonStyles.container}>
                        <Text style={CommonStyles.heading2}>About Gouruu</Text>
                        <Text style={CommonStyles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                        <Text style={CommonStyles.para}>the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</Text>
                        <Text style={CommonStyles.para}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                        
                        <View style={CommonStyles.visonmission}>
                            <Text style={[CommonStyles.heading2, CommonStyles.activetext]}>Our Vison</Text>
                            <Text style={CommonStyles.missiontext}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                        </View>
                        <View style={[CommonStyles.row, {flexWrap:'wrap'}]}>
                                <View style={[CommonStyles.rowcenter, {width:'100%', paddingTop:30, paddingBottom:10}]}>
                                    <Text style={[CommonStyles.heading2]}>Our Teams</Text>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.pfimgbox}>
                                        <Image source={require('../../assets/images/p1.jpg')} resizeMode="cover" style={CommonStyles.pfimg} />
                                    </TouchableOpacity>
                                    <View style={CommonStyles.pfoot}>
                                        <Text style={[CommonStyles.boldtext, {textAlign:'center'}]}>PAUL LARSON</Text>
                                        <Text style={[CommonStyles.para2]}>FOUNDER & CEO</Text>
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.pfimgbox}>
                                        <Image source={require('../../assets/images/p2.jpg')} resizeMode="cover" style={CommonStyles.pfimg} />
                                    </TouchableOpacity>
                                    <View style={CommonStyles.pfoot}>
                                        <Text style={[CommonStyles.boldtext, {textAlign:'center'}]}>NINA SCAVO</Text>
                                        <Text style={[CommonStyles.para2]}>QUALITY ASSISTANCE MANAGER</Text>
                                    </View>
                                </View>
                                
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.pfimgbox}>
                                        <Image source={require('../../assets/images/p3.jpg')} resizeMode="cover" style={CommonStyles.pfimg} />
                                    </TouchableOpacity>
                                    <View style={CommonStyles.pfoot}>
                                    <Text style={[CommonStyles.boldtext, {textAlign:'center'}]}>NICK PERRY</Text>
                                        <Text style={[CommonStyles.para2]}>USER SUPPORT MANAGER</Text>
                                    </View>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.pfimgbox}>
                                        <Image source={require('../../assets/images/p1.jpg')} resizeMode="cover" style={CommonStyles.pfimg} />
                                    </TouchableOpacity>
                                    <View style={CommonStyles.pfoot}>
                                    <Text style={[CommonStyles.boldtext, {textAlign:'center'}]}>PAUL LARSON</Text>
                                        <Text style={[CommonStyles.para2]}>FOUNDER & CEO</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={CommonStyles.visonmission}>
                            <Text style={[CommonStyles.heading2, CommonStyles.activetext]}>Our Mission</Text>
                            <Text style={CommonStyles.missiontext}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                        </View>
                   
                    </View>
                </ScrollView>
               
            </SafeAreaView>
        )
    }
}

