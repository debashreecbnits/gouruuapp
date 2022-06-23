import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, TextInput,
} from 'react-native';
import { NativeBaseProvider, Radio, Checkbox } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import SearchBar from '../../components/Searchbar/index';
import { apiCallWithToken } from '../../Api';
import { GET_SERVICE_CATEGORY, GET_ALL_SPECIALITY } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';

class FilterCategoryList extends Component {
    constructor() {
        super();
        this.state = {
            jobCategoryListArray: [],
            categoryID: '',
            seeMore: false,
            isLoading: false,            
        };
    }


    componentDidMount() {
        this.getJobCategoryList()
    }

    getJobCategoryList = async () => {
        await apiCallWithToken(GET_SERVICE_CATEGORY, 'get').then(res => {
            if (res.status = 200) {
                this.setState({ jobCategoryListArray: res.data.data });
            }
        }).catch(err => {
            console.log(err);
        })
    }

    getcatValue = (catId) => {
        this.setState({ categoryID: catId })    
    }

    filteredData = () => {
    
        let formdata = {
            search: this.state.categoryID ? this.state.categoryID  : '',
            limit: 10,
            page_no: 0
        }
        this.props.navigation.navigate('ServiceList', { formdata: formdata})
    }    

    render() {
        const { jobCategoryListArray, seeMore, isLoading} = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Filter</Text>
                    </View>
                </View>
                <ScrollView>
                    {isLoading ?
                        <Loader /> :
                        <View style={CommonStyles.container}>                            
                           
                            <View style={styles.catBox}>
                                <Text style={{ fontSize: 18, color: '#242933', fontWeight: 'bold' }}>Categories</Text>
                                {!seeMore ?
                                    <Radio.Group
                                        defaultValue="1"
                                        name="myRadioGroup"
                                        accessibilityLabel="Pick your favorite number"
                                    >
                                        {jobCategoryListArray && jobCategoryListArray.length ? jobCategoryListArray.slice(0, 6).map((data, index) => {
                                            return (
                                                <Radio value={data.id} key={index} onPress={() => this.getcatValue(data.id)}>
                                                    {data.name}
                                                </Radio>
                                            )
                                        }) :
                                            <Text>No category found</Text>
                                        }
                                    </Radio.Group>
                                    :
                                    <Radio.Group
                                        defaultValue="1"
                                        name="myRadioGroup"
                                        accessibilityLabel="Pick your favorite number"
                                    >
                                        {jobCategoryListArray && jobCategoryListArray.length ? jobCategoryListArray.map((data, index) => {
                                            return (
                                                <Radio value={data.id} key={index} onPress={() => this.getcatValue(data.id)}>
                                                    {data.name}
                                                </Radio>
                                            )
                                        }) :
                                            <Text>No category found</Text>
                                        }
                                    </Radio.Group>
                                }

                                <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => this.setState({ seeMore: !this.state.seeMore })}>
                                    <Text style={{ fontSize: 18, color: '#3e1bee', fontWeight: 'bold' }}>{!seeMore ? 'See More' : 'See Less'}</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[CommonStyles.row, CommonStyles.formgroup, { marginTop: 30 }]}>                            
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.primarybutton} onPress={() => this.filteredData()}>
                                        <Text style={CommonStyles.btntext}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps, null)(FilterCategoryList);