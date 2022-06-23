import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,
    KeyboardAvoidingView, ScrollView, TextInput, ImageBackground, Alert
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { apiCallWithToken } from '../../../Api';
import { GET_ALL_CATEGORY, GET_ALL_SPECIALITY, GET_DRAFT_LIST_DETAILS } from '../../../shared/allApiUrl';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons';

var suggestedKeyword = [];

export default class PostStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobName: this.props?.navigation?.state?.params?.draftValueDetails ? this.props?.navigation?.state?.params?.draftValueDetails.title : '',
            jobnameError: '',
            jobCategory: [],
            filteredJobCategory: [],
            filteredJobCategoryError: '',
            selectedJobCategory: [],
            jobSpeciality: [],
            jobSpecialList: false,
            filteredJobSpeciality: [],
            //selectedJobSpeciality: [],
            selectedJobSpeciality: this.props?.navigation?.state?.params?.draftValueDetails?.speciality_name ? this.props?.navigation?.state?.params?.draftValueDetails?.speciality_name.split(',') : [],
            jobSpecialityError: "",

            holder: [],
            specialityHolder: [],
            suggestedKeywordError: '',
            speciality: [],
            skill: [],
            skillList: [],
            specialityList: [],
            jobList: false,
            term: this.props?.navigation?.state?.params?.data?.value,
            userId: this.props?.navigation?.state?.params?.data?.userId,
            textCategoryStore: "",
            textCategoryMainStore: this.props?.navigation?.state?.params?.draftValueDetails ? this.props?.navigation?.state?.params?.draftValueDetails.category_name : "",
            draftPostId: this.props?.navigation?.state?.params?.draftPostId,
            draftUserId: this.props?.navigation?.state?.params?.draftUserId,
            draftValueDetails: this.props?.navigation?.state?.params?.draftValueDetails

        };

    }

    componentDidMount() {
        this.getJobCategory();
        this.jobList();
        this.getSpecialitynSkill();
        this.getJobSpeciality();

    }


    AddItemsToArray = () => {

        //Adding Items To Array.
        suggestedKeyword.push(this.state.holder.toString());
        this.setState({ holder: suggestedKeyword })
        this.setState({ suggestedKeywordError: "" })
    }

    AddTextCategory = () => {
        this.setState({ textCategoryMainStore: this.state.textCategoryStore })
        {
            this.state.selectedJobCategory.length > 0 || this.state.textCategoryMainStore != "" ?
                Alert.alert(
                    "",
                    "You only add one Job Category.",
                    [
                        {
                            text: "OK",
                            onPress: () => this.setState({ textCategoryMainStore: "" }),
                            style: "cancel",
                        },

                    ],

                ) :
                <></>
        }
    }

    AddSpecialityToArray = () => {

        //Adding Items To Array.

        this.state.selectedJobSpeciality.push(this.state.specialityHolder.toString());
        this.setState({
            selectedJobSpeciality: this.state.selectedJobSpeciality.filter(function (element) {
                return element !== undefined;
            })
        })
        
        this.setState({ jobSpecialityError: "" })

    }

    getJobCategory = async () => {

        await apiCallWithToken(GET_ALL_CATEGORY, 'get')
            .then(res => {
                if (res.data) {
                    this.setState({ jobCategory: res.data.data })
                }
            }).catch(err => {
                console.log(err)
            })


    };


    getDraftInformation = async () => {
        var formData = new FormData();
        formData.append('user_id', this.state.draftUserId);
        formData.append('pid', this.state.draftPostId)

        
        await apiCallWithToken(GET_DRAFT_LIST_DETAILS, 'post', formData).then(res => {
            
        }).catch(err => {
            console.log(err)
        })

    }

    findJobCategoryData = (text) => {
        let tempArr = text

        this.setState({ textCategoryStore: tempArr })
        this.setState({ jobList: true })

        let jobCategoryData = this.state.jobCategory;
        if (text) {
            const regex = new RegExp(`${text.trim()}`, 'i');
            let data = jobCategoryData.filter((obj) => obj.name.search(regex) >= 0)
            this.setState({ filteredJobCategory: data })
        } else {
            this.setState({ filteredJobCategory: [] })
        }

    }

    findJobSpecialityData = (text) => {
        this.setState({ jobSpecialList: true })
        let jobSpecialData = this.state.selectedJobSpeciality;
        if (text) {
            const regex = new RegExp(`${text.trim()}`, 'i');
            let data = jobSpecialData.filter((obj) => obj.name.search(regex) >= 0)
            this.setState({ specialityHolder: data })

        } else {
            this.setState({ specialityHolder: [] })
        }
    }
    jobSpecialList = () => {
        this.setState({ filteredJobSpeciality: this.state.specialityList })
    }

    removeJobCategory = (index) => {
        let tempArr = this.state.selectedJobCategory;
        tempArr.splice(index);
        this.setState({ selectedJobCategory: tempArr })
        this.setState({ textCategoryStore: "" })

    }

    removeJobCategoryTextInput = () => {
        this.setState({ textCategoryMainStore: "" })
    }


    removeJobSpeciality = (index) => {
        let tempArr = this.state.selectedJobSpeciality;
        tempArr.splice(index);
        this.setState({ selectedJobSpeciality: tempArr })
    }

    removeKeyword = (index) => {
        let tempArr = suggestedKeyword;
        tempArr.splice(index);
        this.setState({ holder: tempArr })
    }


    jobList = () => {
        this.setState({ filteredJobCategory: this.state.jobCategory })
    }


    getSpecialitynSkill = async (newValue) => {
        if (newValue.id !== null) {
            let tempArr = this.state.selectedJobCategory;
            tempArr.push(newValue)
            this.setState({ selectedJobCategory: tempArr, filteredJobCategory: [] });
            var formData = new FormData();
            formData.append("cat_id", newValue.id);


            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


    getJobSpeciality = async (newValueid, newValuename) => {
       
        if (newValueid !== "") {
            let tempArr = this.state.selectedJobSpeciality;
            tempArr.push(newValuename)
            this.setState({ selectedJobSpeciality: tempArr, filteredJobSpeciality: [] });
            this.setState({
                selectedJobSpeciality: this.state.selectedJobSpeciality.filter(function (element) {
                    return element !== undefined;
                })
            })
            var formData = new FormData();
            formData.append("cat_id", newValueid);
            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


    onNext = () => {
        
      
        if (this.state.jobName === "") {
            this.setState({ jobnameError: 'Please enter job title' })
        }
        else if (this.state.selectedJobCategory.length === 0 && this.state.textCategoryMainStore === "") {
            this.setState({ filteredJobCategoryError: 'Please select any Job category' })
        }
        else if (this.state.selectedJobSpeciality.length === 0) {
            this.setState({ jobSpecialityError: 'Please select any job speciality' })
        }
        else if (this.state.suggestedKeywordError.length < 0) {
            this.setState({ suggestedKeywordError: 'Please type any keyword' })
        }

        else {
            this.setState({ jobnameError: "" })
            this.setState({ filteredJobCategoryError: "" })
            this.setState({ suggestedKeywordError: "" })
            this.setState({ jobSpecialityError: "" })


            this.props.navigation.navigate('PostStep2', { data: this.state })
            this.setState({ holder: "" })
        }


    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
                <NativeBaseProvider style={CommonStyles.wrapper}>
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                        {/* <View style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Title</Text>
                        </View>
                    </View> */}
                        <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                            <View style={CommonStyles.Tlefticon}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.centerheading}>
                                <Text style={CommonStyles.htitle}>Title</Text>
                            </View>
                        </ImageBackground>
                        <ScrollView
                            keyboardShouldPersistTaps='always'>
                            <View style={CommonStyles.container}>
                                <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                    <Text style={styles.h2}>Project Title</Text>
                                    <View style={styles.stepbg}>
                                        <Text style={[styles.ptext]}>Step 1 of 7</Text>
                                    </View>

                                </View>


                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Enter the name of your job post</Text>
                                    <TextInput placeholder="eg: Graphic Designer" placeholderTextColor="#ddd" style={styles.inputform}
                                        value={this.state.jobName}
                                        onChangeText={(text) => this.setState({ jobName: text })}
                                    />
                                    {this.state.jobName === "" && this.state.jobnameError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.jobnameError}</Text>
                                    ) : null}
                                </View>
                                <View style={[CommonStyles.formgroup]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.formlabel}>Job Category</Text>
                                        <TouchableOpacity style={{ marginLeft: 215, }}

                                            onPress={this.AddTextCategory}
                                        >
                                            <Icon name="add-circle-outline" size={24} color="#3e1bee" />
                                        </TouchableOpacity>
                                    </View>
                                    <Autocomplete
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => this.jobList()}
                                        containerStyle={styles.autocompleteContainer}
                                        inputContainerStyle={[styles.autoComplete]}
                                        listStyle={{ zIndex: 1, position: 'relative' }}
                                        data={this.state.filteredJobCategory}
                                        onChangeText={(text) => this.findJobCategoryData(text)}
                                        placeholder="Enter job category"
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                disabled={this.state.selectedJobCategory.length != 0 ? true : false}
                                                onPress={() => this.getSpecialitynSkill(item)}
                                            >
                                                <Text style={[styles.itemText]}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />

                                    {/* 
                                    {
                                        this.state.selectedJobCategory.length > 0 && this.state.selectedJobCategory.map((val, index) => {
                                            return (
                                                <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                    <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                        <Text style={[CommonStyles.tagtext]}>{val.name}</Text>
                                                        <TouchableOpacity onPress={() => this.removeJobCategory(index)}>
                                                            <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }  
                                    */}

                                    {this.state.selectedJobCategory.length > 0 ?
                                        <>
                                            {
                                                this.state.selectedJobCategory.map((val, index) => {
                                                    return (
                                                        <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                            <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                                <Text style={[CommonStyles.tagtext]}>{val.name}</Text>
                                                                <TouchableOpacity onPress={() => this.removeJobCategory(index)}>
                                                                    <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </>


                                        :
                                        <>

                                            {this.state.textCategoryMainStore == "" ? null :
                                                <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                    <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                        <Text style={[CommonStyles.tagtext]}>{this.state.textCategoryMainStore}</Text>
                                                        <TouchableOpacity
                                                            //onPress={() => this.removeJobCategory(index)}
                                                            onPress={() => this.removeJobCategoryTextInput()}
                                                        >
                                                            <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>
                                            }
                                        </>



                                    }


                                    {this.state.selectedJobCategory[0]?.name === "" || this.state.textCategoryMainStore == "" && this.state.filteredJobCategoryError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.filteredJobCategoryError}</Text>
                                    ) : null}

                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Job Speciality</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Autocomplete
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onFocus={() => this.jobSpecialList()}
                                            containerStyle={styles.autocompleteContainer}
                                            inputContainerStyle={styles.autoComplete}
                                            listStyle={{ zIndex: 1, position: 'relative' }}
                                            data={this.state.filteredJobSpeciality}
                                            //onChangeText={(text) => this.findJobSpecialityData(text)}
                                            onChangeText={(TextInputValue) => this.setState({ specialityHolder: TextInputValue })

                                            }

                                            placeholder="Enter job speciality"
                                            renderItem={({ item }) => (
                                                <TouchableOpacity onPress={() => this.getJobSpeciality(item.id, item.name)}
                                                >
                                                    <Text style={styles.itemText}>

                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                        <TouchableOpacity style={{ marginTop: 10, marginLeft: -30 }}
                                            onPress={this.AddSpecialityToArray}
                                        >
                                            <Icon name="add-circle-outline" size={24} color="#3e1bee" />
                                        </TouchableOpacity>
                                    </View>


                                    {
                                        this.state.selectedJobSpeciality && this.state.selectedJobSpeciality.length > 0 ? this.state.selectedJobSpeciality.map((val2, index) => {
                                            return (
                                                <>
                                                    {val2 === undefined ? null :
                                                        <View key={index} style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                            <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                                <Text style={[CommonStyles.tagtext]}>{val2}</Text>
                                                                <TouchableOpacity onPress={() => this.removeJobSpeciality(index)}>
                                                                    <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                                </TouchableOpacity>

                                                            </View>
                                                        </View>
                                                    }
                                                </>
                                            )
                                        }) : null
                                    }

                                    {this.state.selectedJobSpeciality.length === 0 && this.state.jobSpecialityError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.jobSpecialityError}</Text>
                                    ) : null}

                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Suggested Keyword</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput placeholder="eg: Designer" placeholderTextColor="#ddd" style={styles.inputform}
                                            value={this.state.holder}
                                            onChangeText={(TextInputValue) => this.setState({ holder: TextInputValue })}
                                        />
                                        <TouchableOpacity style={{ marginTop: 10, marginLeft: -30 }} onPress={this.AddItemsToArray}>
                                            <Icon name="add-circle-outline" size={24} color="#3e1bee" />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        suggestedKeyword && suggestedKeyword.map((val, index) => {
                                            return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                <View key={index} style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                    <Text key={index} style={[CommonStyles.tagtext]}>#{val}</Text>
                                                    <TouchableOpacity onPress={() => this.removeKeyword(index)}>
                                                        <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            )
                                        })
                                    }
                                    {this.state.suggestedKeywordError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.suggestedKeywordError}</Text>
                                    ) : null}

                                </View>



                                <View style={[CommonStyles.row, styles.mt40]}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn}
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <Text style={CommonStyles.outlinetext}>Back</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn3} onPress={() => this.onNext()}>
                                            <Text style={CommonStyles.btntext}>Next</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </NativeBaseProvider>
            </ImageBackground>
        );
    }
}