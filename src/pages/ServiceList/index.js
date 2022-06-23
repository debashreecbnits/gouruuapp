import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Select, NativeBaseProvider, CheckIcon, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api/index';
import { GET_SERVICE_BY_CATEGORY, GET_SERVICE_CATEGORY } from '../../shared/allApiUrl';
import Loader from '../../components/Loader';


export default class ServiceList extends Component {
    constructor() {
        super();
        this.state = {

            serviceCategoryList: [],
            providerList: [],
            isLoading: false

        };
    }

    componentDidMount() {

        this.getServiceCategoryList()
        this.props.navigation.addListener('didFocus', () => {
            if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata) {
                this.getServicesByCategory()
            }
        })
        console.log("service list==>",this.state.providerList)
    }

    getServicesByCategory = async (catId, index) => {
        this.setState({ isLoading: true })
        let formdata = {}
        if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata) {
            formdata = this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.formdata
        } else {
            formdata = {
                search: '',
                limit: 90,
                page_no: 0
            }
        }
        await apiCallWithToken(GET_SERVICE_BY_CATEGORY, 'post', formdata).then(res => {
            if (res.status = 200) {
                this.setState({ providerList: res.data.data, isLoading: false });
               
            }

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false })
        })
    }

    getServiceCategoryList = async () => {
        await apiCallWithToken(GET_SERVICE_CATEGORY, 'get').then(res => {
            if (res.status = 200) {
                this.getServicesByCategory('', 9999999)
               }
        }).catch(err => {
            console.log(err);
        })
    }




    render() {
        const { isLoading, providerList } = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Services List</Text>
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
                            <View style={[CommonStyles.rowbetween, { paddingBottom: 10 }]}>
                                <TouchableOpacity style={[CommonStyles.flexrow, CommonStyles.aligncenter]} onPress={() => this.props.navigation.navigate("FilterCategoryList")}>
                                    <Image source={require('../../assets/images/filter.png')} resizeMode="contain" style={{ width: 16, height: 16, marginRight: 5 }} />
                                    <Text style={styles.grtext}>Filter</Text>
                                </TouchableOpacity>
                            </View>

                            {isLoading ?
                                <Loader /> :
                                <View style={[CommonStyles.row, { flexWrap: 'wrap' }]}>
                                    {providerList && providerList.length > 0 ? providerList.map((item, idx) => (
                                        <View key={idx} style={CommonStyles.col50}>
                                            <View style={CommonStyles.card}>
                                                <Image source={{ uri: item.profile_image }} resizeMode="cover" style={CommonStyles.cardthumb} />
                                                <View style={CommonStyles.cardcontent}>
                                                    <Text numberOfLines={1} style={CommonStyles.pheading}>{item.title}</Text>
                                                    <Text numberOfLines={3} style={CommonStyles.para}>{item.description}</Text>
                                                    <Text style={CommonStyles.pricetext}>Starting at  <Text style={{ fontWeight: 'bold', color: '#242933' }}>$ {item.hourly_rate != "" ? item.hourly_rate : item.service_cost}</Text></Text>

                                                    <TouchableOpacity style={[CommonStyles.primarybutton, CommonStyles.btnsm]} onPress={() => this.props.navigation.navigate('ServiceDetails')}>
                                                        <Text style={[CommonStyles.btntext, CommonStyles.btnsmtext]}>Explore</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>

                                    )) : <Text>No data found</Text>
                                    }

                                </View>
                            }

                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
