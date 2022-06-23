import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, KeyboardAvoidingView, ScrollView, TextInput, } from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { CHANGE_PASSWORD } from '../../shared/allApiUrl';
import { apiCallWithToken } from '../../Api';
import Validator from '../../shared/Validator';
import {connect} from 'react-redux';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                current_password: '',
                password: '',
                con_password: '',
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
        this.setState({
            errors: Validator.validateForm(
                null,
                this.state.fields,
                this.state.errors,
            ),
        });
        if (this.state.errors.formIsValid) {
            let data = {
                userid : this.props.userData.userDetails.data.id,
                oldpassword: this.state.fields.current_password,
                newpassword: this.state.fields.password,
                confirmpassword: this.state.fields.con_password,
                }
                
            await apiCallWithToken(CHANGE_PASSWORD, 'post', data).then(res => {
                if (res.data.status === 1) {
                    this.props.navigation.navigate('Dashboard');
                }
            }).catch(err => {
                console.log(err)
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
                            <Text style={styles.headingtop}>Change Password</Text>

                           <View style={{marginTop:20}}>
                           <View style={CommonStyles.formgroup}>
                           <TextInput
                                        style={[
                                            CommonStyles.formcontrol,
                                            this.state.errors['current_password'] === 'blank' ||
                                                this.state.errors['current_password'] === 'length'
                                                ? { borderColor: 'red' }
                                                : null,
                                        ]}
                                        placeholder="*******"
                                        placeholderTextColor="#ccc"
                                        secureTextEntry={true}
                                        value={this.state.fields.current_password}
                                        onChangeText={text => this.handleChange(text, 'current_password')}
                                        errorMessage={this.state.errors['current_password']}
                                        returnKeyType="next"
                                        blurOnSubmit={false} />
                                        <View style={CommonStyles.formtextwrap}>
                                            <Text style={CommonStyles.formtext}>Enter Old Password</Text>
                                        </View>
                                    {this.state.errors['current_password'] === 'blank' ? (
                                        <Text style={{ color: 'red' }}>Enter Password*</Text>
                                    ) : this.state.errors['current_password'] === 'length' ? (
                                        <Text style={{ color: 'red' }}>Enter Valid Password*</Text>
                                    ) : null}
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
                                <TouchableOpacity style={CommonStyles.primarybutton} onPress={() => this.onSubmit()}>
                                    <Text style={CommonStyles.btntext}>Submit</Text>
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

  export default connect(mapStateToProps, null)(ChangePassword);