import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';

export default class Blog extends Component {
    constructor() {
        super();
        this.state = {};
    }


    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Blogs</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={CommonStyles.container}>

                        <View style={[CommonStyles.productrow]}>
                           
                            <View style={CommonStyles.card}>
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
                                    <Text style={CommonStyles.para}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type 
                                        specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type 
                                        specimen book Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type 
                                        specimen book. 
                                    </Text>
                                    
                                        <View style={[CommonStyles.flexrow, {borderTopWidth:1, borderTopColor:'#ddd', alignItems:'center', paddingTop:10}]}>
                                            <Text style={styles.posttext}>Posted by :</Text>
                                            <Text style={styles.name}>CHRISTOPHER RYAN</Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
