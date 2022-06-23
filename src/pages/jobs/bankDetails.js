import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, SafeAreaView, Image, CheckBox,
    KeyboardAvoidingView, ScrollView, TextInput,ImageBackground,ActivityIndicator
} from 'react-native';
import { Select, NativeBaseProvider, Radio, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import DocumentPicker from 'react-native-document-picker';
import { apiCallWithToken } from '../../Api';
import { SUBACCOUTS } from '../../shared/allApiUrl';
import RNCountry from "react-native-countries";
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

class BankDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountBank: "",
            accountBankError: "",
            accountNumber: "",
            accountNumberError: "",
            businessName: "",
            businessNameError: "",
            businessEmail: "",
            businessEmailError: "",
            businessContact: "",
            businessContactError: "",
            businessContactMobile: "",
            businessContactMobileError: "",
            businessMobile: "",
            businessMobileError: "",
            country: "Nigeria",
            countryError: "",
            userId: this.props?.userData?.userDetails?.data?.id,
            jobId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.jobId,
            disabled: false,

        };
    }


    componentWillMount() {
        let countryNamesWithCodes = RNCountry.getCountryNamesWithCodes;
        countryNamesWithCodes.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
            countryNameListWithCode: countryNamesWithCodes
        })
        console.log("country name+++",countryNamesWithCodes)
    }

    onNext = () => {
        console.log("props value==>",this.props?.userData?.userDetails?.data?.user_type)

        if (this.state.accountBank === "") {
            this.setState({ accountBankError: '***Please enter account bank' })
        }
        else if (this.state.businessEmail === "") {
            this.setState({ businessEmailError: '***Please write business email' })
        }
        else if (this.state.businessMobile === "") {
            this.setState({ businessMobileError: '***Please write business mobile' })
        }
        else if (this.state.country === "") {
            this.setState({ countryError: '***Please write country' })
        }



        else {
            this.setState({ accountBankError: "" })
            this.setState({ businessEmailError: "" })
            this.setState({ businessMobileError: "" })
            this.setState({ countryError: "" })

            this.setState({ disabled:true})
            var formData = new FormData();
            formData.append('userid', this.props.userData.userDetails.data.id);
            formData.append('account_name', this.state.accountBank);
            formData.append('mobilenumber', this.state.businessMobile);
            formData.append('email', this.state.businessEmail);
            formData.append('country', this.state.country);
            formData.append('action_type',"add");
            
            console.log("formdata==>",formData)
            apiCallWithToken(SUBACCOUTS, 'post', formData)
                .then(res => {
                    this.setState({ disabled:false})
                    Toast.show(res.data.message, Toast.LONG)
                    console.log("res+++",res)
                        
                    if ((res.data.status == 1 && res.data.message == "Payout subaccount created")) {
                        {
                         this.props?.userData?.userDetails?.data?.user_type == "Client" ?
                         this.props.navigation.navigate('AddMoney', { userId: this.state.userId, jobId: this.state.jobId }) :
                         this.props.navigation.navigate('ApplyJobs', { userId: this.state.userId, jobId: this.state.jobId }) 
                        }
                        
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ disabled:false})
                    Toast.show("error occur", Toast.LONG)
                });

        }

    }



    render() {
        return (
            <NativeBaseProvider style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>
                {/* <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Bank Details</Text>
                    </View>
                
                </View> */}

                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Bank Details</Text>
                    </View>
                </ImageBackground>

                <ScrollView>
                    <View style={[CommonStyles.container]}>

                        <View style={{ marginBottom: 30 }}>
                            <Text style={styles.headingtop}>Fill The Below fields to submit your Bank details</Text>
                        </View>

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.bankName}
                                onChangeText={(text) => this.setState({ accountBank: text })}
                                style={CommonStyles.formcontrol} placeholder="044" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Account Name</Text>
                            </View>

                            {this.state.accountBank === "" && this.state.accountBankError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.accountBankError}</Text>
                            ) : null}
                        </View>
                  
                       

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.businessEmail}
                                onChangeText={(text) => this.setState({ businessEmail: text })}
                                style={CommonStyles.formcontrol} placeholder="abc@gmail.com" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Email</Text>
                            </View>

                            {this.state.businessEmail === "" && this.state.businessEmailError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.businessEmailError}</Text>
                            ) : null}
                        </View>

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.businessMobile}
                                onChangeText={(text) => this.setState({ businessMobile: text })}
                                style={CommonStyles.formcontrol} placeholder="97898765676" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Mobile Number</Text>
                            </View>

                            {this.state.businessMobile === "" && this.state.businessMobileError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.businessMobileError}</Text>
                            ) : null}
                        </View>

                        <View style={CommonStyles.formgroup}>
                            {/* <TextInput
                                value={this.state.country}
                                onChangeText={(text) => this.setState({ country: text })}
                                style={CommonStyles.formcontrol} placeholder="Nigeria" placeholderTextColor="#ccc" /> */}
                            <View style={CommonStyles.formcontrol}>
                                <Picker
                                    selectedValue={this.state.country}
                                    //style={{borderColor:'red',borderWidth:1,backgroundColor:"#EDBF69",borderRadius:5}}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ country: itemValue })}>
                                    {this.state.countryNameListWithCode.map((val) => {
                                        return <Picker.Item key={'country-item-' + val.code} label={val.name} value={val.code} />
                                    })}
                                
                                
                                </Picker>
                            </View>
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Country</Text>
                            </View>


                            {this.state.country === "" && this.state.countryError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.countryError}</Text>
                            ) : null}
                        </View>


                        <View style={CommonStyles.formgroup}>
                            <TouchableOpacity style={CommonStyles.primarybutton}
                                onPress={() => this.onNext()}
                            >
                                 {this.state.disabled === true ?
                                        (<ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                        ) : (
                                            <Text style={CommonStyles.btntext}>Proceed</Text>
                                        )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = state => {
    return {
        userData: state,
    };
};



export default connect(mapStateToProps)(BankDetails);