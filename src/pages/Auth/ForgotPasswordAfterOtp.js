import React, { Component } from 'react';
import { View, 
         Text, 
         TouchableOpacity, 
         SafeAreaView, 
         Image, 
         KeyboardAvoidingView, 
         ScrollView, 
         TextInput,
         ActivityIndicator,
        } from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { RESET_PASSWORD } from '../../shared/allApiUrl';
import { apiCallWithOutToken } from '../../Api';
import Validator from '../../shared/Validator';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

class ForgotPasswordAfterOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                password: '',
                con_password: '',
                disabled: false,
              },
              errors: {},
        };
    }

    handleChange(value, name) {
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({fields});
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
        if (this.state.errors.formIsValid){
            var formData = new FormData();
            formData.append('uid', this.props.navigation.state.params.data.userId);
            formData.append('otp', this.props.navigation.state.params.data.otp);
            formData.append('new_password', this.state.fields.password);
            formData.append('confirm_password', this.state.fields.con_password);
            await apiCallWithOutToken(RESET_PASSWORD, 'post', formData).then(res => {
                Toast.show(res.data.message, Toast.LONG)
                this.setState({ disabled:false})
                console.log("Forgot password after Otp  res 3 ==>", res)
                if (res.data.status === 1) {
                    this.props.navigation.navigate('SignIn');
                }
            }).catch(err => {
                this.setState({ disabled:false})
                console.log(err)
                Toast.show("Something went wrong", Toast.LONG)
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
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                                <Image source={require('../../assets/images/logo.png')} 
                                style={{ width: 90, height: 90 }} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headingtop}>Reset Password</Text>

                           <View style={{marginTop:20}}>
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
                                        blurOnSubmit={false} />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Enter New Password</Text>
                                        </View>
                                    {this.state.errors['password'] === 'blank' ? (
                                        <Text style={{ color: 'red' }}>Enter Password*</Text>
                                    ) : this.state.errors['password'] === 'length' ? (
                                        <Text style={{ color: 'red' }}>Enter Valid Password*</Text>
                                    ) :this.state.errors['password'] === 'oldnewshouldnotbesame' ? (
                                        <Text style={{ color: 'red' }}>Old password and New Password should not be same*</Text>
                                    ) : null}
                                    </View>         
                                    <View style={CommonStyles.formgroup}>
                           <TextInput
                                        style={[
                                            CommonStyles.formcontrol,
                                            this.state.errors['con_password'] === 'blank' ||
                                                this.state.errors['con_password'] === 'length'
                                                ? { borderColor: 'red' }
                                                : null,
                                        ]}
                                        placeholder="*******"
                                        placeholderTextColor="#ccc"
                                        secureTextEntry={true}
                                        value={this.state.fields.con_password}
                                        onChangeText={text => this.handleChange(text, 'con_password')}
                                        errorMessage={this.state.errors['con_password']}
                                        returnKeyType="next"
                                        blurOnSubmit={false} />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Enter Confirm New Password</Text>
                                        </View>
                                    {this.state.errors['con_password'] === 'blank' ? (
                                        <Text style={{ color: 'red' }}>Enter Password*</Text>
                                    ) : this.state.errors['con_password'] === 'length' ? (
                                        <Text style={{ color: 'red' }}>Enter Valid Password*</Text>
                                    ) :this.state.fields.password != this.state.fields.con_password ? (
                                        <Text style={{ color: 'red' }}>Password does not match*</Text>
                                    ): null}
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
const mapStateToProps = state => {
    return {
      userData: state,
    };
  };

  export default connect(mapStateToProps, null)(ForgotPasswordAfterOtp);