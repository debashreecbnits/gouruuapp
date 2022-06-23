import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, ScrollView, TextInput, Switch, ImageBackground,
} from 'react-native';
import { NativeBaseProvider, Radio, Checkbox } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import SearchBar from '../../components/Searchbar/index';
import { apiCallWithToken } from '../../Api';
import { GET_SERVICE_CATEGORY, GET_ALL_SPECIALITY } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            jobCategoryListArray: [],
            skillsSetArray: [],
            categoryID: '',
            seeMore: false,
            skillArray: [],
            groupValues: [],
            experience: '',
            searchtext: '',
            isLoading: false,
            ExperienceList:
                [
                    { 'id': 1, 'level': 'Entry', 'value': 'Entry' },
                    { 'id': 2, 'level': 'Intermediate', 'value': 'Intermediate' },
                    { 'id': 3, 'level': 'Expert', 'value': 'Expert' },
                ],
            isEnabled: false
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
            console.log("job category list==>",this.state.jobCategoryListArray);
        }).catch(err => {
            console.log(err);
        })
    }

    getcatValue = (catId) => {
        this.setState({ categoryID: catId })
        this.getskillList(catId)
    }

    getskillList = async (catId) => {

        var formData = new FormData();
        formData.append('cat_id', catId);

        await apiCallWithToken(GET_ALL_SPECIALITY, 'post', formData).then(res => {
            if (res.status == 200) {
                this.setState({ skillsSetArray: res.data.data.skill });
            }

        }).catch(err => {
            console.log(err)
        })

    }

    filteredData = () => {

        let formdata = {
            userid: this.props.userData.userDetails.data.id,
            category: this.state.categoryID ? this.state.categoryID : '',
            search: this.state.searchtext ? this.state.searchtext : '',
            skill: this.state.groupValues ? this.state.groupValues.toString() : [],
            experience: this.state.experience ? this.state.experience : '',
            limit: 0,
            page_no: 0,
            invite: this.state.isEnabled ? this.state.isEnabled : ''
        }
        if (this.props.userData.userDetails.data.user_type == 'Client') {
            this.props.navigation.navigate('Freelancers', { formdata: formdata, fitered: true })
        } else {
            this.props.navigation.navigate('JobList', { formdata: formdata, fitered: true })
        }
    }

    resetField = () => {

        this.setState({ isLoading: true }, () => {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 50)
        })

    }
    toggleSwitch = () => {
        this.setState({ isEnabled: !this.state.isEnabled })
    }

    render() {
        const { jobCategoryListArray, skillsSetArray, seeMore, groupValues, ExperienceList, isLoading, isEnabled } = this.state
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                {/* <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Filter</Text>
                    </View>
                </View> */}
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Filter</Text>
                    </View>
                </ImageBackground>
                <ScrollView>
                    {isLoading ?
                        <Loader /> :
                        <View style={CommonStyles.container}>
                            <View style={{}}>
                                {/* <SearchBar />
                             */}
                                <View style={CommonStyles.barwrap}>
                                    <TextInput style={[CommonStyles.searchbartop]} placeholder="Search Freelancer”" placeholderTextColor="#ddd" onChangeText={(text) => this.setState({ searchtext: text })} />
                                    <TouchableOpacity style={CommonStyles.ricon}>
                                        <Image source={require('../../assets/images/search.png')} resizeMode="contain" style={{ width: 22, height: 28 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {this.props.userData.userDetails.data.user_type != 'Client' ?
                                <View style={[styles.catBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={{ fontSize: 18, color: '#242933', fontWeight: 'bold' }}>Invite Only</Text>

                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={"#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View> : null}
                            <View style={styles.catBox}>
                                <Text style={{ fontSize: 18, color: '#242933', fontWeight: 'bold', marginBottom: 10 }}>Experience</Text>
                                <Radio.Group
                                    defaultValue="1"
                                    name="myRadioGroup"
                                    accessibilityLabel="Pick your favorite number"
                                >
                                    {ExperienceList && ExperienceList.map((data, index) => {
                                        return (
                                            <Radio value={data.value} key={index} onPress={() => this.setState({ experience: data.value })} mb={1}>
                                                {data.level}
                                            </Radio>
                                        )
                                    })}
                                </Radio.Group>
                                <TouchableOpacity style={{ paddingTop: 15 }}>
                                    <Text style={{ fontSize: 18, color: '#3e1bee', fontWeight: 'bold' }}>See More</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.catBox}>
                                <Text style={{ fontSize: 18, color: '#242933', fontWeight: 'bold', marginBottom: 10 }}>Categories</Text>
                                {!seeMore ?
                                    jobCategoryListArray.length != 0 ? jobCategoryListArray.slice(0,6).map((data, index) => {
                                        return (
                                            <Radio.Group
                                                defaultValue="1"
                                                name="myRadioGroup"
                                                accessibilityLabel="Pick your favorite number"
                                            >

                                                <Radio value={data.id} key={index} onPress={() => this.getcatValue(data.id)} mb={1}>
                                                    {data.name}
                                                </Radio>


                                            </Radio.Group>
                                        )
                                    })
                                        :
                                        <Text>No category found</Text>

                                    :
                                    jobCategoryListArray && jobCategoryListArray.length ? jobCategoryListArray.map((data, index) => {
                                        return (
                                            <Radio.Group
                                                defaultValue="1"
                                                name="myRadioGroup"
                                                accessibilityLabel="Pick your favorite number"
                                            >

                                                <Radio value={data.id} key={index} onPress={() => this.getcatValue(data.id)} mb={1}>
                                                    {data.name}
                                                </Radio>

                                            </Radio.Group>
                                        )
                                    }) :
                                        <Text>No category found</Text>
                                }


                                <TouchableOpacity style={{ paddingTop: 15 }} onPress={() => this.setState({ seeMore: !this.state.seeMore })}>
                                    <Text style={{ fontSize: 18, color: '#3e1bee', fontWeight: 'bold' }}>{!seeMore ? 'See More' : 'See Less'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.catBox}>
                                <Text style={{ fontSize: 18, color: '#242933', fontWeight: 'bold', marginBottom: 10 }}>Skills</Text>

                                <Checkbox.Group accessibilityLabel="choose values"
                                    onChange={(value) => this.setState({ groupValues: value })} value={groupValues}
                                >
                                    {skillsSetArray && skillsSetArray.length ? skillsSetArray.map((data, index) => {
                                        return (
                                            <Checkbox value={data.id} key={index} my={2}>
                                                {data.title}
                                            </Checkbox>
                                        )
                                    }) :
                                        <Text>No Skill found</Text>}


                                </Checkbox.Group>
                            </View>

                            <View style={[CommonStyles.row, CommonStyles.formgroup, { marginTop: 30 }]}>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.outlinebtn} onPress={() => this.resetField()}>
                                        <Text style={CommonStyles.outlinetext}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
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

export default connect(mapStateToProps, null)(Filter);