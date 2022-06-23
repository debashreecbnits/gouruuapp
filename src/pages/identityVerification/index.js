import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ImageBackgroundBase, ImageBackground, Dimensions} from 'react-native';
import { NativeBaseProvider, Select, CheckIcon} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import { connect } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { apiCallWithToken } from '../../Api';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
class Identity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentUpload: '',
            returnedDocument:'',
            documentType: '',
            idPhoto:'',
            idNumber:'',
            gender:'',
            faceBrightnes:'',
            faceSharpness:'',
            transactionReference:'',
            middleName:'',
            firstName:'',
            lastName:'',
            flag: false,
            identityVerificationId:this.props.userData.userDetails.data.id,
        };
       }

       documentUpload = async () => {
         //this.setState({flag:false})
        try {
            const results = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            this.setState({ documentUpload: results[0] });
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              alert('Canceled from multiple doc picker');
            } else {
              alert('Unknown Error: ' + JSON.stringify(err));
              throw err;
            }
          }
          this.setState({flag:false});
          var formData = new FormData();
          formData.append('userid', this.state.identityVerificationId);
          formData.append('document', this.state.documentUpload);
          await apiCallWithToken('client_identity_verification/', 'post', formData)
            .then(res => {
                this.setState({returnedDocument:res.data.data.image});
            })
            .catch(err => {
              console.log(err);
            }); 
       };

       
        deleteFile = () => {
          this.setState({flag:true})
        }
        
      

       documentSubmit = async() => {
        var formData = new FormData();
        formData.append('user_id', this.props.userData.userDetails.data.id);
        formData.append('id_image', this.state.returnedDocument);
        formData.append('id_type', this.state.documentType);
        await apiCallWithToken('appruve_verification', 'post', formData)
          .then(res => {
              this.setState({faceBrightnes:res.data.face_brightness,
                             faceSharpness:res.data.face_sharpness,
                             transactionReference:res.data.transaction_reference,
                             idNumber:res.data.id_details.id_number,
                             firstName:res.data.id_details.first_name,
                             lastName:res.data.id_details.last_name,
                             middleName:res.data.id_details.middle_name,
                             dob:res.data.id_details.date_of_birth,
                             gender:res.data.id_details.gender,
                             idPhoto:res.data.id_details.id_photo,
            })
            var formData2 = new FormData();
            formData2.append('user_id', this.props.userData.userDetails.data.id);
            formData2.append('id_type', this.state.documentType);
        formData2.append('id_photo', this.state.idPhoto);
        formData2.append('gender', this.state.gender);
        formData2.append('date_of_birth', this.state.dob);
        formData2.append('middle_name', this.state.middleName);
        formData2.append('last_name', this.state.lastName);
        formData2.append('first_name', this.state.firstName);
        formData2.append('id_number', this.state.idNumber);
        formData2.append('transaction_reference', this.state.transactionReference);
        formData2.append('face_sharpness', this.state.faceSharpness);
        formData2.append('face_brightness', this.state.faceBrightnes);
        apiCallWithToken('insert_appruve_verification', 'post', formData2)
        .then(res => {
            if(res.data.status === 1){
                Alert.alert("Identity Verification Done");
                this.props.navigation.navigate('Dashboard');
            }
      
        })
          })
          .catch(err => {
            console.log(err);
          });
       }


    render() {
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground style={CommonStyles.headerwrap} source={require('../../assets/images/headerbar.png')}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Verify Your Identity</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('NotificationList')}>
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                {this.state.identityVerificationId.is_admin_verified === true ?
                <View style={{alignItems:"center"}}><Text style={{justifyContent:"center",
                 marginTop:deviceHeight/2.5, fontSize:22}}
                 >Identity verification already done...</Text></View>
                :
                <ScrollView>
                    <View style={[CommonStyles.container, ]}>
                        <View style={CommonStyles.card}>
                            <View style={styles.cardheader}>
                                <Text style={styles.heading}>Upload Identity Information</Text>
                            </View>
                            <View style={styles.cardcontent}>
                                <Text style={CommonStyles.heading}>Upload identity documents</Text>
                                <Text style={[CommonStyles.para2, {textAlign:'left', marginBottom:20}]}>Please upload your National Identity Card, Passport or Driving License to verify your identity, You will not able to apply on a job or post services before verification</Text>
                                {this.state.documentUpload ?
                                this.state.flag === false ?
                      <View style={{flexDirection:"row"}}>
                        <View style={{paddingHorizontal:5, paddingVertical:5, marginBottom:15, borderWidth:1, borderColor:'#ccc', position:'relative'}}>
                            <Image
                                    source={{ uri: this.state.documentUpload.uri }}
                                    style={{ height: 80, width: 80 }}
                                  />
                                  <TouchableOpacity onPress={() => this.deleteFile()}  style={CommonStyles.deletecross}>
                                      <Icon name="close-circle" size={20} color="#767676" />
                                </TouchableOpacity>
                          </View>
                            
                              
                      </View>
                      :null
  :null
  } 
  
                                <TouchableOpacity style={styles.uploadbox} onPress={()=>this.documentUpload()}>
                                    <Text style={[CommonStyles.para, {textAlign:'center', color:'#3e1bee', marginBottom:0}]}>Upload your Documents Here for verification</Text>
                                </TouchableOpacity>
    
                            </View>
                        </View>
                        <View style={CommonStyles.formgroup}>
                      <Select
                        minWidth="100%"
                        accessibilityLabel="language"
                        placeholder="SELECT DOCUMENT TYPE"
                        _selectedItem={{
                          bg: 'primary.600',
                          endIcon: <CheckIcon size={5} />,
                        }}
                        style={styles.formlabel}
                        selectedValue={this.state.documentType}
                        onValueChange={newvalue => {
                          this.setState({documentType: newvalue})
                        }}
                        >
                        <Select.Item label="Passport" value="passport" />
                        <Select.Item
                          label="Voter"
                          value="voter"
                        />
                        <Select.Item label="Driving License" 
                        value="driver_license" />
                        <Select.Item label="National Id" 
                        value="national_id" />
                      </Select>
                    </View>
                        <TouchableOpacity style={[CommonStyles.primarybutton, {position:'absolute', bottom:20, left:15, right:15}]} onPress={()=>this.documentSubmit()}>
                            <Text style={CommonStyles.btntext}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
     } 
            </NativeBaseProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
      userData: state,
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    updateProfile: data => dispatch(updateProfile(data)),
    updateUserDetails: data => dispatch(updateUserDetails(data)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Identity);