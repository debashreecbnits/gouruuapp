import React, { Component } from 'react';
import {
        View, 
        Text, 
        TouchableOpacity, 
        SafeAreaView, 
        Image, 
        CheckBox,
        KeyboardAvoidingView, 
        ScrollView, 
        TextInput,
        ImageBackground,
        ActivityIndicator,
        Linking
        } from 'react-native';
import { Select, NativeBaseProvider, Radio, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import DocumentPicker from 'react-native-document-picker';
import { apiCallWithToken } from '../../Api';
import { WALLET_CREATION} from '../../shared/allApiUrl';
import RNCountry from "react-native-countries";
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

class AddMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessMobile: "",
            businessMobileError: "",
            country: "Nigeria",
            countryError: "",
            userId: this.props?.userData?.userDetails?.data?.id,
            //jobId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.jobId,
            disabled: false,
            linkStore :"",
            email:"",
            emailError:"",
            phoneNumber:"",
            phoneNumberError:"",
            name:"",
            nameError:""
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
      
         if (this.state.businessMobile === "") {
            this.setState({ businessMobileError: '***Please add amount' })
        }
        else if (this.state.country === "") {
            this.setState({ countryError: '***Please select currency' })
        }
        else if (this.state.email === "") {
            this.setState({ emailError: '***Please enter mail id' })
        }
        else if (this.state.phoneNumber === "") {
            this.setState({ phoneNumberError: '***Please enter phone number' })
        }
        else if (this.state.name === "") {
            this.setState({ nameError: '***Please enter name' })
        }



        else {
           
            
            this.setState({ businessMobileError: "" })
            this.setState({ countryError: "" })
            this.setState({ emailError: ""})
            this.setState({ phoneNumberError: ""})
            this.setState({ nameError:""})

            this.setState({ disabled:true})
            var formData = new FormData();
            formData.append('amount', this.state.businessMobile);
            formData.append('currency', this.state.country);
            formData.append('userid', this.props.userData.userDetails.data.id);
            formData.append('email', this.state.email);
            formData.append('phoneNumber',this.state.phoneNumber);
            formData.append('name',this.state.name)
            
            console.log("formdata==>",formData)
            apiCallWithToken(WALLET_CREATION, 'post', formData)
                .then(res => {
                    this.setState({ disabled:false})
                    Toast.show(res.data.message, Toast.LONG)
                    if ((res.data.status == 1 && res.data.message == "Hosted Link")) {
                        //this.setState ({linkStore :res?.data?.link[0]?.link})
                        var aa = res?.data?.link[0]?.link
                        Linking.openURL(aa)
                        }
                    //onPress={() => Linking.openURL('https://www.mobrage.com/terms-condition/5ff83fc3bf4c532898869b90')}
                    console.log("res======>",res)
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
                        <Text style={CommonStyles.htitle}>Add Money</Text>
                    </View>
                </ImageBackground>

                <ScrollView>
                    <View style={[CommonStyles.container]}>

                        <View style={{ marginBottom: 30 }}>
                            <Text style={styles.headingtop}>Fill The Below fields to add money in your Wallet</Text>
                        </View>
                  

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.businessMobile}
                                onChangeText={(text) => this.setState({ businessMobile: text })}
                                style={CommonStyles.formcontrol} placeholder=" 1000" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Amount</Text>
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
                                <Text style={CommonStyles.formtext}>Currency</Text>
                            </View>


                            {this.state.country === "" && this.state.countryError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.countryError}</Text>
                            ) : null}
                        </View>

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                                style={CommonStyles.formcontrol} placeholder="abc@gmail.com" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Email</Text>
                            </View>

                            {this.state.email=== "" && this.state.emailError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.emailError}</Text>
                            ) : null}
                        </View>

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.phoneNumber}
                                onChangeText={(text) => this.setState({ phoneNumber: text })}
                                style={CommonStyles.formcontrol} placeholder="9878765432" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Phone Number</Text>
                            </View>

                            {this.state.phoneNumber === "" && this.state.phoneNumberError != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.phoneNumberError}</Text>
                            ) : null}
                        </View>

                        <View style={CommonStyles.formgroup}>
                            <TextInput
                                value={this.state.name}
                                onChangeText={(text) => this.setState({ name: text })}
                                style={CommonStyles.formcontrol} placeholder="Abc" placeholderTextColor="#ccc" />
                            <View style={CommonStyles.formtextwrap}>
                                <Text style={CommonStyles.formtext}>Name</Text>
                            </View>

                            {this.state.name === "" && this.state.name != '' ? (
                                <Text style={{ color: 'red' }}>{this.state.nameError}</Text>
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
                                            <Text style={CommonStyles.btntext}>ADD</Text>
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



export default connect(mapStateToProps)(AddMoney);