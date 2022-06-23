import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput, ImageBackground, Alert,
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { apiCallWithToken } from '../../../Api/index';
import { EDIT_USER } from '../../../shared/allApiUrl';
import { connect } from 'react-redux';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/helpers';

class PostRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {

            school: this.props?.navigation?.state?.params?.data?.school,
            areaOfStudy: this.props?.navigation?.state?.params?.data?.areaOfStudy,
            degree: this.props?.navigation?.state?.params?.data?.degree,
            entryDate: this.props?.navigation?.state?.params?.data?.entryDate,
            passoutDate: this.props?.navigation?.state?.params?.data?.passoutDate,
            schooldescription: this.props?.navigation?.state?.params?.data?.schooldescription,
            selectedJobCategory: this.props?.navigation?.state?.params?.data?.selectedJobCategory,
            selectedKeyWord: this.props?.navigation?.state?.params?.data?.selectedKeyWord,
            lookingForSkill: this.props?.navigation?.state?.params?.data?.lookingForSkill,
            exp_level: this.props?.navigation?.state?.params?.data?.exp_level,
            company: this.props?.navigation?.state?.params?.data?.company,
            selectedJobRole: this.props?.navigation?.state?.params?.data?.selectedJobRole,
            workingFrom: this.props?.navigation?.state?.params?.data?.workingFrom,
            workingTo: this.props?.navigation?.state?.params?.data?.workingTo,
            workdescription: this.props?.navigation?.state?.params?.data?.workdescription,
            engProficiaency: this.props?.navigation?.state?.params?.data?.engProficiaency,
            otherLanguage: this.props?.navigation?.state?.params?.data?.otherLanguage,
            otherLanguageProficiaency: this.props?.navigation?.state?.params?.data?.otherLanguageProficiaency,
            professionalOverview: this.props?.navigation?.state?.params?.data?.professionalOverview,
            city: this.props?.navigation?.state?.params?.data?.city,
            country: this.props?.navigation?.state?.params?.data?.country,
            educationalDetails: this.props?.navigation?.state?.params?.data?.educationalDetails,
            service_type: this.props?.navigation?.state?.params?.data?.service_type,
            workExperienceDetails: this.props?.navigation?.state?.params?.data?.workExperienceDetails,
            textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
            textCategoryStoreNew: this.props?.navigation?.state?.params?.data?.textCategoryStoreNew,
            //new
            totalAmount: '',
            totalAmountError: '',
            serviceFee: "",
            receiveAmount: '',
            UID: this.props?.navigation?.state?.params?.data?.UID,
            Token: this.props?.navigation?.state?.params?.data?.Token,
        };
    }



    onNext = async () => {
        if (this.state.totalAmount === "") {
            this.setState({ totalAmountError: '***Please enter amount' })
        }

        else {
            this.setState({ totalAmountError: '' })

            let arr = [];
            arr.push({

                name: this.state.otherLanguage[0].name,
                id: this.state.otherLanguage[0].id,
                level: this.state.otherLanguageProficiaency,
            });

            let educationarr = [];
            educationarr.push({

                school: this.state.school,
                AreaOfStudy: this.state.areaOfStudy,
                Degree: this.state.degree,
                start_date: this.state.entryDate,
                end_date: this.state.passoutDate,
                description: this.state.schooldescription,
            });



            let employmentarr = [];
            employmentarr.push({

                company: this.state.company,
                description: this.state.workdescription,
                category:
                    this.state?.selectedJobRole.length === 0 ?
                        this.state.textCategoryStoreNew
                        :
                        this.state.selectedJobRole[0].id,
                start_date: this.state.workingFrom,
                end_date: this.state.workingTo,
                city: this.state.city,
                location: this.state.country,
            });


            var formData = new FormData();
            this.props?.userData?.userDetails?.data?.id ?
                formData.append('uid', this.props?.userData?.userDetails?.data?.id)
                :
                formData.append('uid', this.state.UID);

            formData.append("action_type", "add",);
            formData.append("skills", this.state.selectedKeyWord.toString());
            formData.append('hrate', this.state.totalAmount);
            //formData.append("srv_cost" ,"");
            //formData.append("avail" ,"");
            formData.append("lang", JSON.stringify(arr));
            //formData.append("location","kolkata");
            formData.append("provider_type", this.state.service_type);
            formData.append("keyword", "test");
            // formData.append("timezone", "");
            //formData.append( "address" ,"");
            //formData.append("phone","");
            formData.append("description", this.state.professionalOverview);
            formData.append("lavel", this.state.exp_level);
            //formData.append("category",this.state.selectedJobCategory[0].name);
            {
                this.state?.selectedJobCategory.length === 0 ?
                    formData.append('category', this.state.textCategoryStore) :
                    formData.append('category', this.state.selectedJobCategory[0].name)
            };



            //formData.append("title","test title");
            formData.append("education", JSON.stringify(educationarr));
            formData.append("employment", JSON.stringify(employmentarr));
            // formData.append("exp_lavel","");
            console.log("profile setup formdata==>", formData)

            if (this.props.userData?.userDetails?.accessToken &&
                this.props.userData?.userDetails?.accessToken.length) {
                await apiCallWithToken(EDIT_USER, 'post', formData)
                    .then(res => {
                        console.log("PROFILE SETUP RESPONSE+++++++++++++++++++", res)
                        Alert.alert("Profile Setup Completed")
                        //this.props.navigation.navigate('FreelancerProfile')
                        this.props.navigation.navigate('Dashboard')
                    })
                    .catch(err => {
                        console.log("error name", err);
                    });

            }
            else {

                try {
                    console.log("before...............")
                    let res = await axios({
                        url: apiBaseUrl + EDIT_USER,
                        method: 'post',
                        data: formData,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                            //   'Content-Type': 'application/json',
                            'Authorization': 'Token ' + this.state.Token
                        }
                    }
                    );
                    console.log("res ProfileSetUp====>", res)
                    console.log("PROFILE SETUP RESPONSE+++++++++++++++++++", res)
                    Alert.alert("Profile Setup Completed")
                    this.props.navigation.navigate('SignIn')
                } catch (error) {
                    console.error("error===========", error);
                }

            }
        }
    };




    render() {
        console.log("UID+++++++++5TOKEN=", this.props?.navigation?.state?.params?.data?.Token)
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Service Cost</Text>
                        </View>
                        {/* <View style={CommonStyles.Trighticon}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                    <ScrollView>
                        <View style={CommonStyles.container}>
                            <Text style={styles.h2}>Service Cost</Text>
                            <Text style={[styles.ptext, { marginBottom: 20 }]}>Clients will see this rate on your profile and in serach results once you publish your profile. you can adjust your rate every time you submit any proposal.</Text>


                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Hourly Rate</Text>
                                <Text style={styles.smlabel}>Total Amount that client will see</Text>
                                <TextInput placeholder={this.props?.userData?.userDetails?.data?.currency
                                    + " " + "25hr"
                                } placeholderTextColor="#ddd"
                                    style=
                                    {[styles.inputform, styles.absinput, { width: 100 }]}
                                    keyboardType={'numeric'}
                                    value={this.state.totalAmount}
                                    onChangeText={(text) => {
                                        if (this.state.totalAmountError) {
                                            this.setState({ totalAmountError: '' })
                                        }
                                        this.setState({ totalAmount: text })
                                    }}
                                />
                                {this.state.totalAmountError != '' ? (
                                    <Text style={{ color: 'red' }}>
                                        {this.state.totalAmountError}
                                    </Text>
                                ) : null}
                            </View>


                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Gouruu Service Fee</Text>
                                <Text style={styles.smlabel}>The Gouruu Service fee is 20% when you begin a contract with a new client.</Text>
                                <TextInput placeholder="$ 25hr" placeholderTextColor="#ddd" style={[styles.inputform, styles.absinput]}

                                >
                                    {this.props.userData.userDetails.data.currency}{' '}{this.state.totalAmount * 0.20}


                                </TextInput>

                            </View>
                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>You Will Receive</Text>
                                <Text style={styles.smlabel}>The estimated amount you will receive after service fee is</Text>
                                <TextInput placeholderTextColor="#ddd"
                                    style={[styles.inputform, styles.absinput]}>
                                    {this.props.userData.userDetails.data.currency}{' '}{this.state.totalAmount * 0.8}
                                </TextInput>
                            </View>




                            <View style={[CommonStyles.row, CommonStyles.formgroup, { marginTop: 30 }]}>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.goBack()}
                                        style={CommonStyles.outlinebtn2}>
                                        <Text style={CommonStyles.outlinetext2}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.primarybutton}
                                        onPress={() => this.onNext()}
                                    >
                                        <Text style={CommonStyles.btntext}>Go To profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = state => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps)(PostRequest);