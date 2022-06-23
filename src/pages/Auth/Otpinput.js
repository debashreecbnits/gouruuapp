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
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { OTP_VERIFY } from '../../shared/allApiUrl';
import { apiCallWithOutToken } from '../../Api';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';

class OtpInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            userId: this.props.navigation.state.params.data,
            disabled: false,
        };
    }

    onSubmit = async () => {
        this.setState({ disabled:true})
        var formData = new FormData();
        formData.append('userid', this.state.userId);
        formData.append('otp', this.state.otp);
        await apiCallWithOutToken(OTP_VERIFY, 'post', formData).then(res => {
            this.setState({ disabled:false})
            console.log("OtpInput res 2 ==>", res)
            if (res.data.status == 1) {
                this.props.navigation.navigate("ForgotPasswordAfterOtp", { data: this.state })
            } else {
                Toast.show(res.data.message, Toast.LONG)
            }
        }).catch(err => {
            this.setState({ disabled:false})
            console.log('err====', err)
            Toast.show("Something went wrong !", Toast.LONG)
        })
    }


    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={CommonStyles.container}>
                            <View style={CommonStyles.rowcenter}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                    <Image source={require('../../assets/images/logo.png')}
                                        style={{ width: 120, height: 90 }} resizeMode="cover" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headingtop}>Enter One Time Password</Text>
                            <View style={[CommonStyles.rowcenter]}>
                                <Text style={{ fontSize: 16, color: '#767676', textAlign: 'center' }}>Code sent to your registerd Email id.</Text>
                            </View>

                            <View style={{ marginTop: 20, flex: 1, alignItems: 'center', height: 300, flexDirection: 'row'}}>
                                <View style={CommonStyles.formgroup}>
                                    <OTPInputView pinCount={6}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        style={{ height: 100}}
                                        onCodeFilled={(code => this.setState({ otp: code }))}
                                    />
                                    <View style={CommonStyles.flexrow}>
                                        <TouchableOpacity>
                                            <Text style={{ color: '#3e1bee', fontSize: 16, marginBottom: 20, marginRight: 10 }}>Resend OTP In</Text>
                                        </TouchableOpacity>

                                        <Text style={CommonStyles.para}>(02:00)</Text>
                                    </View>
                                </View>
                            </View>


                            <View style={CommonStyles.formgroup}>
                                <TouchableOpacity style={CommonStyles.primarybutton}
                                    onPress={() => this.onSubmit()}>
                                    {this.state.disabled === true ?
                                        (<ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                        ) : (
                                            <Text style={CommonStyles.btntext}>Verify</Text>
                                        )}

                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        userData: state,
    };
};

export default connect(mapStateToProps, null)(OtpInput);