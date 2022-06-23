import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,
    KeyboardAvoidingView, ScrollView, TextInput, ImageBackground
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { ThemeConsumer } from 'styled-components';
import { connect } from 'react-redux';

 class PostStep6 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payForJob: "Pay By Hour",
            hourRateFrom: '',
            hourRateTo: '',
            specificBudget: '',
            projectDuration: 'More than 6 months',
            timeRequirement: 'More than 30 /hrs / week',
            hourlyRateError: "",
            specificBudgetError: "",
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
            textCategoryStore : this.props?.navigation?.state?.params?.data?.textCategoryStore,
            address :this.props?.navigation?.state?.params?.data?.address,
            pid : this.props?.navigation?.state?.params?.data?.pid ? this.props.navigation.state.params.data.pid : ""
        };
    }

    onNext = () => {
        if (this.state.payForJob === "Pay By Hour" && this.state.hourRateFrom === '') {
            this.setState({ hourlyRateError: '***Please enter hourly rate range' })
        }
        else if (this.state.payForJob != "Pay By Hour" && this.state.specificBudget === '') {
            this.setState({ specificBudgetError: '***Please enter specific budget' })
        }
        else {
            this.setState({ hourlyRateError: "" })
            this.setState({ specificBudgetError: "" })
            this.props.navigation.navigate('PostStep7', { data: this.state });
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
                            <Text style={CommonStyles.htitle}>Budget</Text>
                        </View>
                    </View> */}

                        <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                            <View style={CommonStyles.Tlefticon}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.centerheading}>
                                <Text style={CommonStyles.htitle}>Budget</Text>
                            </View>
                        </ImageBackground>

                        <ScrollView>
                            <View style={CommonStyles.container}>
                                <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                    <Text style={styles.h2}>Project Budget</Text>
                                    <View style={styles.stepbg}>
                                        <Text style={[styles.ptext]}>Step 6 of 7</Text>
                                    </View>
                                </View>

                                <View style={[CommonStyles.formgroup, { marginBottom: 10 }]}>
                                    <Text style={styles.formlabel}>How You Want to pay for job?</Text>
                                    <View style={[CommonStyles.row, { marginBottom: 5 }]}>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ payForJob: 'Pay By Hour' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.payForJob == 'Pay By Hour' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >

                                                <Text style={[styles.label0, { color: this.state.payForJob == 'Pay By Hour' ? '#fff' : '#3e1bee' }]}>Pay By Hour</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ payForJob: 'Pay With Fixed Price' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.payForJob == 'Pay With Fixed Price' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >
                                                <Text style={[styles.label0, { color: this.state.payForJob == 'Pay With Fixed Price' ? '#fff' : '#3e1bee' }]}>Pay With Fixed Price</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {this.state.payForJob === 'Pay By Hour' ?
                                    <View style={CommonStyles.formgroup}>
                                        <Text style={styles.formlabel}>Enter hourly rate ({this.props?.userData?.userDetails?.data?.currency})</Text>
                                        <View style={styles.lightbox}>
                                            <View style={[CommonStyles.row]}>
                                                <View style={[CommonStyles.col50]}>
                                                    <TextInput
                                                        value={this.state.hourRateFrom}
                                                        onChangeText={(text) => this.setState({ hourRateFrom: text })}
                                                        style={styles.inputform}
                                                        placeholder={this.props?.userData?.userDetails?.data?.currency +" "+"20 Hr"} placeholderTextColor="#ddd" />

                                                </View>

                                                <View style={CommonStyles.col50}>

                                                    <TextInput
                                                        value={this.state.hourRateTo}
                                                        onChangeText={(text) => this.setState({ hourRateTo: text })}
                                                        style={styles.inputform}
                                                        placeholder={this.props?.userData?.userDetails?.data?.currency +" "+"00 Hr"}
                                                        placeholderTextColor="#ddd" />
                                                </View>

                                            </View>
                                        </View>
                                        <View>
                                            {this.state.hourRateFrom ==="" &&  this.state.hourlyRateError != '' ? (
                                                <Text style={{ color: 'red' }}>{this.state.hourlyRateError}</Text>
                                            ) : null}
                                        </View>
                                    </View>
                                    :
                                    <View style={CommonStyles.formgroup}>
                                        <Text style={styles.formlabel}>Enter a specific budget ({this.props?.userData?.userDetails?.data?.currency})</Text>
                                        <View style={[styles.lightbox]}>
                                            <TextInput
                                                value={this.state.specificBudget}
                                                onChangeText={(text) => this.setState({ specificBudget: text })}
                                                style={styles.inputform}
                                                placeholder={this.props?.userData?.userDetails?.data?.currency +" "+"00"}
                                                placeholderTextColor="#ddd" />
                                           

                                        </View>
                                        {this.state.specificBudget === "" && this.state.specificBudgetError != '' ? (
                                                <Text style={{ color: 'red' }}>{this.state.specificBudgetError}</Text>
                                            ) : null}

                                    </View>

                                    }
                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>How long do you expect this project to last?</Text>
                                    <View style={[CommonStyles.row, { marginBottom: 5, flexWrap: 'wrap' }]}>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ projectDuration: 'More than 6 months' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.projectDuration == 'More than 6 months' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >
                                                <Text style={[styles.label0, { color: this.state.projectDuration == 'More than 6 months' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>More than 6 months</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ projectDuration: '3 to 6 months' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.projectDuration == '3 to 6 months' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >
                                                <Text style={[styles.label0, { color: this.state.projectDuration == '3 to 6 months' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>3 to 6 months</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                            <View style={[CommonStyles.col50]}>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ projectDuration: '1 to 3 months' })}
                                                    style={[
                                                        styles.borderbox,
                                                        { backgroundColor: this.state.projectDuration == '1 to 3 months' ? '#3e1bee' : '#fff' },
                                                    ]}
                                                >

                                                    <Text style={[styles.label0, { color: this.state.projectDuration == '1 to 3 months' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>1 to 3 months</Text>

                                                </TouchableOpacity>
                                            </View>
                                            <View style={CommonStyles.col50}>
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ projectDuration: 'Less than 1 month' })}
                                                    style={[
                                                        styles.borderbox,
                                                        { backgroundColor: this.state.projectDuration == 'Less than 1 month' ? '#3e1bee' : '#fff' },
                                                    ]}
                                                >

                                                    <Text style={[styles.label0, { color: this.state.projectDuration == 'Less than 1 month' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>Less than 1 month</Text>

                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                               
                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Do you have a time requirement for this project?</Text>
                                    <View style={[CommonStyles.row, { marginBottom: 5, flexWrap: 'wrap' }]}>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ timeRequirement: 'More than 30 /hrs / week' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.timeRequirement == 'More than 30 /hrs / week' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >

                                                <Text style={[styles.label0, { color: this.state.timeRequirement == 'More than 30 /hrs / week' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>More than 30 /hrs / week</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ timeRequirement: 'Less than 30 /hrs / week' })}
                                                style={[
                                                    styles.borderbox,
                                                    { backgroundColor: this.state.timeRequirement == 'Less than 30 /hrs / week' ? '#3e1bee' : '#fff' },
                                                ]}
                                            >

                                                <Text style={[styles.ptext, { color: this.state.timeRequirement == 'Less than 30 /hrs / week' ? '#fff' : '#3e1bee', textAlign: 'center' }]}>Less than 30 /hrs / week</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
const mapStateToProps = state => {
    return {
      userData: state,
      profileData: state.userDetails.profileDetails,
    };
  };
  
 
  export default connect(mapStateToProps)(PostStep6);
