import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard
} from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Validator from '../../shared/Validator';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
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

  handleSubmit = async () => {
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors,
      ),
    });
    if (this.state.errors.formIsValid) {
      this.props.navigation.navigate('SignUpNext',{data : this.state});
    }
  };
  render() {
    return (
      <SafeAreaView style={CommonStyles.wrapper}>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={CommonStyles.container}>
              <View style={CommonStyles.rowcenter}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={{width: 90, height: 90}}
                  resizeMode="contain"
                />
                </TouchableOpacity>
              </View>
              <Text style={styles.headingtop}>Sign Up to Gouruu</Text>

              <View style={[CommonStyles.row, {marginTop: 20}]}>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TextInput
                      style={[CommonStyles.formcontrol,this.state.errors['first_name'] 
                      ? {borderColor: 'red'}
                      : null]}
                      placeholder="John"
                      placeholderTextColor="#ccc"
                      keyboardType="default"
                      value={this.state.fields.first_name}
                      onChangeText={text =>
                        this.handleChange(text.trim(), 'first_name')
                      }
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={CommonStyles.formtextwrap}>
                      <Text style={CommonStyles.formtext}>First Name*</Text>
                    </View>
                 
                  {this.state.errors['first_name'] 
                      ? <Text style={{color:'red'}}>Enter First Name*</Text>
                      : null}
                   </View>
                </View>

                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TextInput
                      style={[CommonStyles.formcontrol,this.state.errors['last_name'] 
                      ? {borderColor: 'red'}
                      : null]}
                      placeholder="Doe"
                      placeholderTextColor="#ccc"
                      keyboardType="default"
                      value={this.state.fields.last_name}
                      onChangeText={text =>
                        this.handleChange(text, 'last_name')
                      }
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={CommonStyles.formtextwrap}>
                      <Text style={CommonStyles.formtext}>Last Name*</Text>
                    </View>
                    {this.state.errors['last_name'] 
                      ? <Text style={{color:'red'}}>Enter Last Name*</Text>
                      : null}
                  </View>
                </View>
              </View>
              <View style={CommonStyles.row}>
                <View style={CommonStyles.col50}>
                  <View
                    style={
                      CommonStyles.formgroup
                    }>
                    <TextInput
                     style={[CommonStyles.formcontrol,this.state.errors['user_name'] 
                     ? {borderColor: 'red'}
                     : null]}
                      placeholder="JhoneDoe"
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
                      <Text style={CommonStyles.formtext}>User name*</Text>
                    </View>
                    {this.state.errors['user_name'] 
                      ? <Text style={{color:'red'}}>Enter User Name*</Text>
                      : null}
                  </View>
                </View>
                <View style={CommonStyles.col50}>
                  <View style={CommonStyles.formgroup}>
                    <TextInput
                      style={[CommonStyles.formcontrol,this.state.errors['email'] 
                      ? {borderColor: 'red'}
                      : null]}
                      placeholder="jhone@example.com"
                      placeholderTextColor="#ccc"
                      autoCapitalize={'none'}
                      keyboardType="email-address"
                      value={this.state.fields.email}
                      onChangeText={text => this.handleChange(text, 'email')}
                      returnKeyType="next"
                      blurOnSubmit={false}
                      onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={CommonStyles.formtextwrap}>
                      <Text style={CommonStyles.formtext}>Email Address*</Text>
                    </View>
                    {this.state.errors['email'] 
                      ? <Text style={{color:'red'}}>Enter Valid Email*</Text>
                      : null}
                  </View>
                </View>
              </View>
              <View style={CommonStyles.formgroup}>
                <TextInput
                  style={[CommonStyles.formcontrol,CommonStyles.iconright,this.state.errors['phone'] 
                      ? {borderColor: 'red'}
                      : null]}
                  placeholder="phone number"
                  placeholderTextColor="#ccc"
                  minLength={10}
                  keyboardType="number-pad"
                  value={this.state.fields.phone}
                  onChangeText={text => this.handleChange(text, 'phone')}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  onSubmitEditing={Keyboard.dismiss}
                />
                <View style={CommonStyles.formtextwrap}>
                  <Text style={CommonStyles.formtext}>Phone No*</Text>
                </View>
                {this.state.errors['phone'] 
                      ? <Text style={{color:'red'}}>Enter Valid Phone No*</Text>
                      : null}
              </View>
            
              <View style={CommonStyles.formgroup}>
                <TouchableOpacity
                  style={CommonStyles.primarybutton}
                  onPress={() => this.handleSubmit()}
                >
                  <Text style={CommonStyles.btntext}>Next</Text>
                </TouchableOpacity>
              </View>

              <View style={[CommonStyles.rowcenter]}>
                <Text style={CommonStyles.ftext}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[CommonStyles.ftext, {fontWeight: 'bold'}]}
                    onPress={() => this.props.navigation.navigate('SignIn')}>
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[CommonStyles.rowcenter, CommonStyles.formgroup]}>
                <Text
                  style={{
                    color: '#ddd',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>
                  OR
                </Text>
              </View>

              <TouchableOpacity
                style={[CommonStyles.outlinebtn, {backgroundColor: '#4267b2'}]}>
                <Image
                  source={require('../../assets/images/facebook.png')}
                  resizeMode="contain"
                  style={CommonStyles.btnimg}
                />
                <Text style={[CommonStyles.outlinetext, {color: '#fff'}]}>
                  Continue with Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                <Image
                  source={require('../../assets/images/google.png')}
                  resizeMode="contain"
                  style={CommonStyles.btnimg}
                />
                <Text style={[CommonStyles.outlinetext]}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                <Image
                  source={require('../../assets/images/apple.png')}
                  resizeMode="contain"
                  style={CommonStyles.btnimg}
                />
                <Text style={[CommonStyles.outlinetext]}>
                  Continue with Apple
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[CommonStyles.outlinebtn]}>
                <Image
                  source={require('../../assets/images/twitter.png')}
                  resizeMode="contain"
                  style={CommonStyles.btnimg}
                />
                <Text style={[CommonStyles.outlinetext]}>
                  Continue with Twitter
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={CommonStyles.rowcenter}>
                <Text
                  style={{color: '#090243', fontSize: 20, fontWeight: 'bold'}}>
                  FAQ
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
