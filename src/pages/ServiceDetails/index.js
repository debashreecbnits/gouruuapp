import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView,ImageBackground} from 'react-native';
import { NativeBaseProvider, Progress, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Swiper from 'react-native-swiper'


export default class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>                
                 <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Details</Text>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <Swiper showsButtons={false} loop={true} style={{ height: 260 }}
                        dot={<View style={{ backgroundColor: '#fdfdfd', width: 10, height: 10, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}
                        activeDot={<View style={{ backgroundColor: '#3e1bee', width: 11, height: 11, borderRadius: 100, marginLeft: 2, marginRight: 2 }} />}>
                        <Image source={require('../../assets/images/blog1.jpg')} resizeMode="cover" style={styles.slide1} />
                        <Image source={require('../../assets/images/blog2.jpg')} resizeMode="cover" style={styles.slide2} />
                        <Image source={require('../../assets/images/blog1.jpg')} resizeMode="cover" style={styles.slide3} />
                    </Swiper>
                    <View style={[CommonStyles.container, { backgroundColor: '#fff' }]}>
                        <View style={{ flex: 1, paddingBottom: 20, position: 'relative' }}>
                            <TouchableOpacity style={[CommonStyles.primarybutton, styles.hirebtn]}>
                                <Text style={[CommonStyles.btntext, { color: '#fff', fontSize: 15 }]}>Hire Me</Text>
                            </TouchableOpacity>
                            <Text style={styles.ptext}>Roselin</Text>
                            <Text style={styles.headingtop}>Content Writer</Text>
                            <Text style={styles.grtext}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est </Text>
                        </View>

                        <View style={styles.mapbox}>
                            <Image source={require('../../assets/images/map.jpg')} resizeMode="cover" style={styles.slide2} />
                        </View>
                        <View style={{ paddingBottom: 20 }}>
                            <Text style={styles.headingtop}>Related Tags</Text>
                            <View style={[CommonStyles.tagswrap, {paddingTop:15}]}>
                                <TouchableOpacity style={CommonStyles.tags}>
                                    <Text style={CommonStyles.tagtext}>Web Design</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[CommonStyles.tags, CommonStyles.activetag]}>
                                    <Text style={CommonStyles.whitetext}>Graphic Design</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={CommonStyles.tags}>
                                    <Text style={CommonStyles.tagtext}>Seo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={CommonStyles.tags}>
                                    <Text style={CommonStyles.tagtext}>SMM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                                    <Text style={[CommonStyles.activetext, { fontSize: 18, fontWeight: 'bold' }]}>+ See More</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[CommonStyles.productrow]}>
                            <View style={[CommonStyles.rowbetween, { marginBottom: 15 }]}>
                                <Text style={CommonStyles.heading}>Recommended Services for you</Text>
                                <TouchableOpacity>
                                    <Text style={CommonStyles.hedinglink}>Explore All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true} style={{ marginLeft: -8 }}>
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/cleaning.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>House Cleaning</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/plumbing.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Plumbing</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/cleaner.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Wall Painting</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.reviewwrap}>
                            <View style={[CommonStyles.rowbetween, { marginBottom: 25 }]}>
                                <Text style={[styles.headingtop,]}>Reviews</Text>
                                <TouchableOpacity style={styles.ratebtn}>
                                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#242933' }}>
                                        Rate Service
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[CommonStyles.row, { marginBottom: 35, alignItems:'center' }]}>
                                <View style={styles.col20}>
                                    <View style={[CommonStyles.rowcenter]}>
                                        <View>
                                            <Text style={{ fontSize: 28, color: '#242933', fontWeight: 'bold', textAlign: 'center' }}>4.4</Text>
                                            <Text style={[CommonStyles.para, { textAlign: 'center', marginBottom: 0 }]}>252 Reviews</Text>
                                            <Text style={[CommonStyles.para, { textAlign: 'center' }]}>2125 Ratings</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.col80}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.prow}>
                                            <Text style={styles.stratext}>5*</Text>
                                            <View style={{ width: '80%' }}>
                                                <Progress colorScheme="emerald" value={85} />
                                            </View>
                                        </View>
                                        <View style={styles.prow}>
                                            <Text style={styles.stratext}>4*</Text>
                                            <View style={{ width: '80%' }}>
                                                <Progress colorScheme="teal" value={65} />
                                            </View>

                                        </View>
                                        <View style={styles.prow}>
                                            <Text style={styles.stratext}>3*</Text>
                                            <View style={{ width: '80%' }}>
                                                <Progress colorScheme="warning" value={55} />
                                            </View>
                                        </View>
                                        <View style={styles.prow}>
                                            <Text style={styles.stratext}>2*</Text>
                                            <View style={{ width: '80%' }}>
                                                <Progress colorScheme="info" value={65} />
                                            </View>
                                        </View>
                                        <View style={styles.prow}>
                                            <Text style={styles.stratext}>1*</Text>
                                            <View style={{ width: '80%' }}>
                                                <Progress colorScheme="light" value={15} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.flexborder}>
                                <Image style={{ width: 45, height: 40, marginRight: 10 }} source={require('../../assets/images/avt.png')} resizeMode="contain" />
                                <View style={{ width: '85%' }}>
                                    <Text style={styles.rheading}>Dhiman Das</Text>
                                    <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                </View>
                            </View>
                            <View style={styles.flexborder}>
                                <Image style={{ width: 45, height: 40, marginRight: 10 }} source={require('../../assets/images/avt1.png')} resizeMode="contain" />
                                <View style={{ width: '85%' }}>
                                    <Text style={styles.rheading}>Brain Lara</Text>
                                    <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                </View>
                            </View>
                            <View style={styles.flexborder}>
                                <Image style={{ width: 45, height: 40, marginRight: 10 }} source={require('../../assets/images/avt2.png')} resizeMode="contain" />
                                <View style={{ width: '85%' }}>
                                    <Text style={styles.rheading}>Jublii Dhat</Text>
                                    <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing ipsum dolor sit amet. </Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{ paddingHorizontal: 12 }}>
                                <Text style={[CommonStyles.activetext, { fontSize: 18, fontWeight: 'bold' }]}>+ See More</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[CommonStyles.productrow, {marginTop:30}]}>
                            <View style={[CommonStyles.rowbetween, { marginBottom: 15 }]}>
                                <Text style={CommonStyles.heading}>Related Services</Text>
                                <TouchableOpacity>
                                    <Text style={CommonStyles.hedinglink}>Explore All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true} style={{ marginLeft: -8 }}>
                                
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/plumbing.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Plumbing</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/cleaner.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>Wall Painting</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.colbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/cleaning.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                            <Text style={CommonStyles.pheading}>House Cleaning</Text>
                                            <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                            <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$99</Text></Text>

                                            <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
