import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView,  } from 'react-native';
import { Select, NativeBaseProvider, CheckIcon, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import LocationBar from '../../components/LocationBar/index';
import SearchBar from '../../components/Searchbar/index';

export default class SearchPage extends Component {
    constructor() {
        super();
        this.state = {};
    }

   
    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={CommonStyles.container}>
                            <View style={CommonStyles.topbar}>
                                <LocationBar />
                                <SearchBar />
                                <Text style={styles.ptext}>Popular  :</Text>
                                <View style={CommonStyles.tagswrap}>
                                    <TouchableOpacity style={CommonStyles.tags}>
                                        <Text style={CommonStyles.tagstext}>Web & mobile Development</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={CommonStyles.tags}>
                                        <Text style={CommonStyles.tagstext}>Business</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={CommonStyles.tags}>
                                        <Text style={CommonStyles.tagstext}>Content Writing</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={CommonStyles.tags}>
                                        <Text style={CommonStyles.tagstext}>Seo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={[CommonStyles.rowbetween]}>
                                <TouchableOpacity style={[CommonStyles.flexrow, CommonStyles.aligncenter]}>
                                    <Image source={require('../../assets/images/filter.png')} resizeMode="contain" style={{width:16, height:16, marginRight:5}} />
                                    <Text style={styles.grtext}>Filter</Text>
                                </TouchableOpacity>
                                <View >
                                    <Select style={styles.sortselect}
                                            minWidth="100"
                                            borderWidth="0"
                                            accessibilityLabel="Sort By"
                                            placeholder="Sort By"
                                            _selectedItem={{
                                                bg: "indigo.600",
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

                            <View style={[CommonStyles.productrow, {paddingTop:10}]}>                               
                                <View style={CommonStyles.fullbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/list1.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                              <Text style={CommonStyles.pheading}>Website Designing</Text>
                                              <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                              <View style={CommonStyles.rowbetween}>
                                                  <View>
                                                    <Text style={CommonStyles.pricetext}>Starting at  <Text style={{fontWeight:'bold', color:'#242933'}}>$99</Text></Text>
                                                  </View>
                                                  <View style={CommonStyles.flexrow}>
                                                      
                                                  </View>
                                              </View>                                              
                                       
                                              <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                              </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.fullbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/list2.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                              <Text style={CommonStyles.pheading}>Content Writing</Text>
                                              <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                              <Text style={CommonStyles.pricetext}>Starting at  <Text style={{fontWeight:'bold', color:'#242933'}}>$99</Text></Text>
                                       
                                              <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                              </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={CommonStyles.fullbox}>
                                    <View style={CommonStyles.card}>
                                        <Image source={require('../../assets/images/list3.jpg')} resizeMode="cover" style={CommonStyles.cardthumb} />
                                        <View style={CommonStyles.cardcontent}>
                                              <Text style={CommonStyles.pheading}>Digital Marketing</Text>
                                              <Text style={CommonStyles.para}>Lorem ipsum dolor sit amet consetetur sadipscing. </Text>
                                              <Text style={CommonStyles.pricetext}>Starting at  <Text style={{fontWeight:'bold', color:'#242933'}}>$99</Text></Text>
                                       
                                              <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]}>
                                                    <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                              </TouchableOpacity>
                                        </View>
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
