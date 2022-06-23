import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Alert,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Validator from '../../shared/Validator';
import { FORGET_PASSWORD } from '../../shared/allApiUrl';
import { USER_EXIST } from '../../shared/allApiUrl';
import { apiCallWithOutToken } from '../../Api';
import Toast from 'react-native-simple-toast';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                user_name: '',
            },
            errors: {},
            disabled: false,
        };
    }

    handleChange(value, name) {
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({ fields });
        this.setState({
            errors: Validator.validateForm(
                name,
                this.state.fields,
                this.state.errors,
            ),
        });
    }

    onSubmit = async () => {
        this.setState({ disabled:true})
        this.setState({
            errors: Validator.validateForm(
                null,
                this.state.fields,
                this.state.errors,
            ),
        });
        if (this.state.errors.formIsValid == true) {
            var formData = new FormData();
            formData.append('userid', this.state.fields.user_name);
            console.log("formdata forgot password==>", formData)
            await apiCallWithOutToken(USER_EXIST, 'post', formData).then(res => {
                Toast.show(res.data.message, Toast.LONG)
                this.setState({ disabled:false})
                console.log("forgot password res 1==>", res)
                if (res.data.status == 1) {
                    this.props.navigation.navigate("OtpInput", { data: res.data.data })
                }
            }).catch(err => {
                console.log('err====', err)
                Toast.show("Error occur!", Toast.LONG)
                this.setState({ disabled:false})
            })
        }
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
                                        style={{ width: 90, height: 90 }}
                                        resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headingtop}>Forgot Password</Text>

                            <View style={{ marginTop: 20 }}>
                                <View style={CommonStyles.formgroup}>
                                    <TextInput
                                        //style={CommonStyles.formcontrol}
                                        style={[CommonStyles.formcontrol, this.state.errors['user_name']
                                            ? { borderColor: 'red' }
                                            : null]}
                                        placeholder="JohnDoe/johndoe@gmail.com"
                                        placeholderTextColor="#ccc"
                                        keyboardType="default"
                                        value={this.state.fields.user_name}
                                        onChangeText={text =>
                                            this.handleChange(text.trim(), 'user_name')
                                        }
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    <View style={CommonStyles.formtextwrap}>
                                        <Text style={CommonStyles.formtext}>User Name/Email Id*</Text>
                                    </View>
                                    {this.state.errors['user_name']
                                        ? <Text style={{ color: 'red' }}>Enter Valid User Name/Email Id*</Text>
                                        : null}
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
                                            <Text style={CommonStyles.btntext}>Submit</Text>
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
