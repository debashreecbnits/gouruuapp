import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    //ToastAndroid,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { POST_JOB_REQUEST } from '../../../shared/allApiUrl';
import { apiCallWithToken } from '../../../Api/index';
import { connect } from 'react-redux';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';


export default class PostStep7 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            payForJob: this.props?.navigation?.state?.params?.data?.payForJob,
            hourRateFrom: this.props?.navigation?.state?.params?.data?.hourRateFrom,
            specificBudget: this.props?.navigation?.state?.params?.data?.specificBudget,
            projectDuration: this.props?.navigation?.state?.params?.data?.projectDuration,
            timeRequirement: this.props?.navigation?.state?.params?.data?.timeRequirement,
            categoryCart: [{}],
            //9 field
            selectedExpLevel: this.props?.navigation?.state?.params?.data?.selectedExpLevel,
            selectedItem: this.props?.navigation?.state?.params?.data?.selectedItem,
            selectedTerm: this.props?.navigation?.state?.params?.data?.selectedTerm,
            selectedTitle: this.props?.navigation?.state?.params?.data?.selectedTitle,
            selectedCategory: this.props?.navigation?.state?.params?.data?.selectedCategory,
            selectedJobSpeciality: this.props?.navigation?.state?.params?.data?.selectedJobSpeciality,
            selectedKeyWord: this.props?.navigation?.state?.params?.data?.selectedKeyWord,
            selectedDescription: this.props?.navigation?.state?.params?.data?.selectedDescription,
            project_type_details: this.props?.navigation?.state?.params?.data?.project_type_details,
            visibility: this.props?.navigation?.state?.params?.data?.visibility,
            people_need: this.props?.navigation?.state?.params?.data?.people_need,
            selectedMultipleFile: this.props?.navigation?.state?.params?.data?.selectedMultipleFile,
            userId: this.props?.navigation?.state?.params?.data?.userId,
            projectSpecification: this.props?.navigation?.state?.params?.data?.projectSpecification,
            projectLocation: this.props?.navigation?.state?.params?.data?.projectLocation,
            textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
            disabled: false,
            address: this.props?.navigation?.state?.params?.data?.address,
            pid: this.props?.navigation?.state?.params?.data?.pid ? this.props.navigation.state.params.data.pid : ""
        };
    }


    onSubmit = async () => {

        var arr = [];
        arr = this.state?.address?.split(',');
        var country = arr[arr.length - 1];
        if (arr.length > 1) {
            var city = arr[arr.length - 3]
                ? arr[arr.length - 3]
                : arr[arr.length - 2];
        }

        var formData = new FormData();
        formData.append('uid', this.state.userId);

        formData.append('term', this.state.selectedTerm);
        formData.append('title', this.state.selectedTitle);
        //formData.append('category', this.state.selectedCategory[0].name)
        {
            this.state?.selectedCategory.length === 0 ?
                formData.append('category', this.state.textCategoryStore) :
                formData.append('category', this.state.selectedCategory[0].name)
        };

        formData.append('speciality', JSON.stringify(this.state.selectedJobSpeciality));
        formData.append('description', this.state.selectedDescription);
        formData.append('details', this.state.project_type_details);
        if (this.state?.selectedItem) {
            this.state.selectedItem.map((item) => formData.append('expertise', item))
        };

        formData.append('exp_level', this.state.selectedExpLevel);
        formData.append('h_rate_min', this.state?.hourRateFrom);
        formData.append('h_rate_max', "");
        formData.append('fixed_rate', this.state?.specificBudget);
        //formData.append('duration', this.state.projectDuration);
        { this.state.people_need === "One Gouruu" ? formData.append('people_need', 1) : formData.append('people_need', 2) };
        formData.append('time_requirment', this.state.timeRequirement);
        {
            this.state.visibility === "Anyone" ? formData.append('visibility', 1) :
                this.state.visibility === "Only for Gouruu" ? formData.append('visibility', 2) :
                    formData.append('visibility', 3)
        };

        if (this.state?.selectedKeyWord) {
            this.state.selectedKeyWord.map((item) => formData.append('searchkeyword', item))
        };
        formData.append('job_type', this.state.projectSpecification);
        formData.append('invited_freelancers', "");
        formData.append('image', "");
        { this.state.address != "" ? formData.append('city', city) : formData.append("locationasprofile", 1) };
        { this.state.address != "" ? formData.append('country', country) : formData.append("locationasprofile", 1) };
        { this.state.pid != "" ? formData.append("action_type", "update") : formData.append("action_type", "add") };
        formData.append('pid', this.state.pid);

        this.setState({ disabled: true })
        await apiCallWithToken(POST_JOB_REQUEST, 'post', formData).then(res => {
            this.setState({ disabled: false })
            if (res.data.status == 1) {
                //ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
                Toast.show(res.data.message, Toast.LONG)
                this.props.navigation.navigate("ProjectList")
                //this.props.navigation.navigate("JobList")
            }
        }).catch(err => {
            console.log(err)
            this.setState({ disabled: false })
            //ToastAndroid.show(err.data.message, ToastAndroid.SHORT)
            Toast.show(err.data.message, Toast.LONG)
        })

    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/images/mainbg.png')} style={[CommonStyles.wrapperbg, { flex: 1 }]} >
                <NativeBaseProvider style={CommonStyles.wrapper}>
                    {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}


                    <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>

                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>



                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Review and Post</Text>
                        </View>
                    </ImageBackground>

                    <ScrollView>
                        <View style={CommonStyles.container}>
                            <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                <Text style={styles.h2}>Review the details</Text>
                                <View style={styles.stepbg}>
                                    <Text style={[styles.ptext]}>Step 7 of 7</Text>
                                </View>
                            </View>

                            <View style={[styles.Bborder]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Title</Text>
                                <Text style={styles.smlabel}>{this.state.selectedTitle}</Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Job Category</Text>

                                {this.state?.selectedCategory ?
                                    this.state.selectedCategory.map((item) =>
                                        <Text style={styles.smlabel}>{item.name}</Text>
                                    ) : null
                                }

                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Description</Text>
                                <Text style={styles.smlabel}>{this.state.selectedDescription} </Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Type of Project</Text>
                                <Text style={styles.smlabel}>{this.state.project_type_details}</Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>

                            <View style={[styles.Bborder, { borderBottomWidth: 0 }]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Expertise</Text>
                                <Text style={styles.smlabel}>{this.state.selectedItem}</Text>

                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Experience Level</Text>
                                <Text style={styles.smlabel}>{this.state.selectedExpLevel}</Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={[styles.Bborder, { borderBottomWidth: 0 }]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Job Posting Visibility</Text>
                                <Text style={styles.smlabel}>{this.state.visibility}</Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>

                            <View style={[styles.Bborder, { borderBottomWidth: 0 }]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Hourly or Fixed-Price</Text>
                                {this.state.hourRateFrom === "" ?
                                    <Text style={styles.smlabel}>Fixed </Text> :
                                    <Text style={styles.smlabel}>Hourly</Text>
                                }
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={[styles.Bborder, { borderBottomWidth: 0 }]}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Project Duration</Text>
                                <Text style={styles.smlabel}>{this.state.projectDuration}</Text>
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>
                            <View style={styles.Bborder}>
                                <Text style={[styles.formlabel, { marginBottom: 0 }]}>Budget</Text>
                                {this.state.hourRateFrom === "" ?
                                    <Text style={styles.smlabel}>$ {this.state.specificBudget}</Text> :
                                    <Text style={styles.smlabel}>$ {this.state.hourRateFrom}</Text>
                                }
                                {/* <Image source={require('../../../assets/images/edit.png')}  resizeMode="contain" style={styles.editicon}     />                       */}
                            </View>

                            <View style={[CommonStyles.row, CommonStyles.formgroup, { marginTop: 30 }]}>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.goBack()}
                                        style={CommonStyles.outlinebtn}>
                                        <Text style={CommonStyles.outlinetext}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.outlinebtn3}
                                        onPress={() => this.onSubmit()}
                                    >
                                        {this.state.disabled === true ?
                                            (<ActivityIndicator
                                                size="small"
                                                color="#fff"
                                            />
                                            ) : (
                                                <Text style={CommonStyles.btntext}>Post Job</Text>
                                            )}

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                    {/* </KeyboardAvoidingView> */}
                </NativeBaseProvider>
            </ImageBackground>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         userData: state,
//     };
// };

// export default connect(mapStateToProps, null)(PostStep7);
