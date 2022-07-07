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
    Keyboard,
    //Button,
    ActivityIndicator,
    //ToastAndroid
} from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import {
    changeAppOpenStatus,
    storeAccessToken,
    updateUserDetails,
    toggledAs,
} from '../../Store/Actions/Action';
import { apiCallWithOutToken } from '../../Api/index';
import { LOGIN } from '../../shared/allApiUrl';
import { connect } from 'react-redux';
import Validator from '../../shared/Validator';
import { toggleDrawer } from 'react-navigation-drawer/lib/typescript/src/routers/DrawerActions';
import Toast from 'react-native-simple-toast';
import {
    LoginButton,
    AccessToken,
    LoginManager,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

var GouruuCreds = null;
var status = ""

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                user_name: '',
                password: '',
            },
            errors: {},
            profileCompletion: "",
            disabled: false,
            isSelected: false

        };
    }
    componentDidMount = async () => {
        try {
            var email = await AsyncStorage.getItem("email");
            var password = await AsyncStorage.getItem("password");
            console.log("email==>", email);
            console.log("password==>", password);
            let fields = this.state.fields;
            fields["user_name"] = email;
            fields["password"] = password;
            this.setState({ fields });
            if(email) {
                this.setState({ isSelected:true });11                               
            }
        } catch (error) {
            console.log(error)
        }
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
    facebookLogin = async () => {
        LoginManager.logOut();
        //status = "";
        try {
            const userInfo = await LoginManager.logInWithPermissions([
                'public_profile',
                'email',
            ]);
            if (userInfo.isCancelled) {
            } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                    let accessToken = data.accessToken.toString();
                    if (accessToken) {
                        fetch(
                            'https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' +
                            accessToken,
                        )
                            .then((response) => response.json(),
                            //console.log("response==>",response.json())
                        )
                            .then(async (json) => {
                                console.log("response==>", json)
                                await LoginManager.logOut();
                                if (json) {
                                    let email = json.email;
                                    let name = json.name;
                                    let provider_id = json.id;
                                    let picture = json.picture.data.url;

                                    var formData = new FormData();
                                    formData.append('name', name);
                                    formData.append('email', email);
                                    formData.append('social_id', provider_id);
                                    formData.append('social_type', 'facebook');



                                } else {
                                    Toast.show('User Not Found', Toast.LONG);
                                }
                            })
                            .catch((err) => {
                                //reject('ERROR GETTING DATA FROM FACEBOOK');
                                console.log("err==>", err)
                                Toast.show('ERROR GETTING DATA FROM FACEBOOK', Toast.LONG)
                            });
                    }
                });
            }
        } catch (error) {
            console.log('signin error', error);
            Toast.show('Something went wrong!');
        }
    };

    rememberUser = async () => {
        try {
            await AsyncStorage.setItem("email", this.state.fields.user_name);
            await AsyncStorage.setItem("password", this.state.fields.password);
            GouruuCreds = 1;
            status = "";
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit = async () => {
        // //this.rememberUser();
        console.log("rem==>", this.state.isSelected)

        this.setState({
            errors: Validator.validateForm(
                null,
                this.state.fields,
                this.state.errors,
            ),
        });
        if (this.state.errors.formIsValid) {
            if (this.state.isSelected === true) {
                this.rememberUser()
            } else {
                await AsyncStorage.setItem("email", "");
                await AsyncStorage.setItem("password", "");
                this.setState({ isSelected:false });
            }
            this.setState({ disabled: true })
            var formData = new FormData();
            formData.append('email', this.state.fields.user_name);
            formData.append('password', this.state.fields.password);


            await apiCallWithOutToken(LOGIN, 'post', formData).then(res => {
                console.log("SIGNINRESPONSE++++++++++", res)
                //ToastAndroid.show(res.data.message,ToastAndroid.SHORT)
                Toast.show(res.data.message, Toast.LONG)
                this.setState({ disabled: false })
                if (res.data.status == 1) {
                    this.props.updateUserDetails(res.data.data);
                    this.props.changeAppOpenStatus(false);
                    this.props.storeAccessToken(res.data.data.token);
                    this.props.navigation.navigate('Dashboard');
                    //this.props.navigation.navigate('ProfileSetUp');
                }
            }).catch(err => {
                this.setState({ disabled: false })
                console.log("error console===>", err.message)
                //ToastAndroid.show("Incorrect username or password", ToastAndroid.SHORT)
                Toast.show("Incorrect username or password", Toast.LONG)
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={CommonStyles.container}>
                            <View
                                style={CommonStyles.rowcenter}
                            >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                    <Image source={require('../../assets/images/logo.png')}
                                        style={{ width: 90, height: 90 }}
                                        resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headingtop}>Sign In to Gouruu</Text>

                            <View style={{ marginTop: 20 }}>
                                <View style={CommonStyles.formgroup}>
                                    <TextInput
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
                                        ? <Text style={{ color: 'red' }}>Enter User Name/Email Id*</Text>
                                        : null}
                                </View>
                                <View style={CommonStyles.formgroup}>
                                    <TextInput
                                        style={[
                                            CommonStyles.formcontrol,
                                            this.state.errors['password'] === 'blank' ||
                                                this.state.errors['password'] === 'length'
                                                ? { borderColor: 'red' }
                                                : null,
                                        ]}
                                        placeholder="*******"
                                        placeholderTextColor="#ccc"
                                        secureTextEntry={true}
                                        value={this.state.fields.password}
                                        onChangeText={text => this.handleChange(text, 'password')}
                                        errorMessage={this.state.errors['password']}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                    <View style={CommonStyles.formtextwrap}>
                                        <Text style={CommonStyles.formtext}>Password*</Text>
                                    </View>
                                    {this.state.errors['password'] === 'blank' ? (
                                        <Text style={{ color: 'red' }}>Enter Password*</Text>
                                    ) : this.state.errors['password'] === 'length' ? (
                                        <Text style={{ color: 'red' }}>Enter Valid Password*</Text>
                                    ) : null}
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
                                            <Text style={CommonStyles.btntext}>Sign In</Text>
                                        )}

                                </TouchableOpacity>
                            </View>
                            <View style={[CommonStyles.formgroup, CommonStyles.rowbetween]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')} >
                                    <Text style={CommonStyles.ftext}>Forgot password</Text>
                                </TouchableOpacity>
                                <CheckBox
                                    value={this.state.isSelected}
                                    onValueChange={(newValue) => this.setState({ isSelected: (newValue) })}
                                    style={{ marginLeft: 100 }}
                                    tintColors={{ true: '#383CC1', false: '#758283' }}
                                />
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Text style={CommonStyles.ftext}>Remember Me</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[CommonStyles.rowcenter]}>
                                <Text style={CommonStyles.ftext}>Dont't have an account? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                                    <Text style={[CommonStyles.ftext, { fontWeight: 'bold' }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[CommonStyles.rowcenter, CommonStyles.formgroup]}>
                                <Text style={{ color: '#ddd', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>OR</Text>
                            </View>

                            <TouchableOpacity
                                //onPress={() => this.facebookLogin()}
                                style={[CommonStyles.outlinebtn, { backgroundColor: '#4267b2' }]}>
                                <Image source={require('../../assets/images/facebook.png')} resizeMode="contain" style={CommonStyles.btnimg} />
                                <Text style={[CommonStyles.outlinetext, { color: '#fff' }]}>Continue with Facebook</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                                <Image source={require('../../assets/images/google.png')} resizeMode="contain" style={CommonStyles.btnimg} />
                                <Text style={[CommonStyles.outlinetext]}>Continue with Google</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                                <Image source={require('../../assets/images/apple.png')} resizeMode="contain" style={CommonStyles.btnimg} />
                                <Text style={[CommonStyles.outlinetext]}>Continue with Apple</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                                <Image source={require('../../assets/images/twitter.png')} resizeMode="contain" style={CommonStyles.btnimg} />
                                <Text style={[CommonStyles.outlinetext]}>Continue with Twitter</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={CommonStyles.rowcenter}>
                                <Text style={{ color: '#090243', fontSize: 20, fontWeight: 'bold' }}>FAQ</Text>
                            </TouchableOpacity> */}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetails: (data) => dispatch(updateUserDetails(data)),
        storeAccessToken: (token) => dispatch(storeAccessToken(token)),
        //toggledAs: (toggled_as) => dispatch(toggledAs(toggled_as)),
        changeAppOpenStatus: (status) => dispatch(changeAppOpenStatus(status)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
