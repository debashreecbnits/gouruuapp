import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ImageBackground,
  Alert,

} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import DocumentPicker from 'react-native-document-picker';

export default class PostRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props?.navigation?.state?.params?.data?.draftValueDetails ? this.props?.navigation?.state?.params?.data?.draftValueDetails?.description : '',
      multipleFile: [],
      showFile: [],
      selectedtTerm: this.props?.navigation?.state?.params?.data?.term,
      title: this.props?.navigation?.state?.params?.data?.jobName,
      selectedCategory: this.props?.navigation?.state?.params?.data?.selectedJobCategory,
      selectedJobSpeciality: this.props?.navigation?.state?.params?.data?.selectedJobSpeciality,
      selectedKeyWord: this.props?.navigation?.state?.params?.data?.holder,
      userId: this.props?.navigation?.state?.params?.data?.userId,
      textCategoryStore : this.props?.navigation?.state?.params?.data?.textCategoryMainStore,
      draftValueDetails : this.props?.navigation?.state?.params?.data?.draftValueDetails
    };
  }

  selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: ['image/*', 'application/pdf'],
      });

      for (const res of results) {
        if (results.length > 5) {
          Alert.alert('File number should not exceed 5');
        }
        if (res.size > 1000000) {
          Alert.alert('File size should not exceed 1MB');
        }
      }

      this.setState({ multipleFile: [...this.state.multipleFile, ...results] });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  deleteFile = e => {
    const deletedFile = this.state.multipleFile.filter(
      (item, index) => index !== e,
    );
    this.setState({ multipleFile: deletedFile });
  };

  onNext = () => {
  
  
    if (this.state.description === "") {
      this.setState({ descriptionError: '***Please write description' })
    }


    else {
      this.setState({ descriptionError: "" })
      this.props.navigation.navigate('PostStep3', { data: this.state });
    }

  };


  render() {

    return (
      <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
        <NativeBaseProvider style={CommonStyles.wrapper}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            {/* <View style={CommonStyles.headerwrap}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../../assets/images/left-arrow.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Description</Text>
            </View>
          </View> */}
            <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
              <View style={CommonStyles.Tlefticon}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                </TouchableOpacity>
              </View>
              <View style={CommonStyles.centerheading}>
                <Text style={CommonStyles.htitle}>Description</Text>
              </View>
            </ImageBackground>
            <ScrollView>
              <View style={CommonStyles.container}>
                <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                  <Text style={styles.h2}>Project Description</Text>
                  <View style={styles.stepbg}>
                    <Text style={[styles.ptext]}>Step 2 of 7</Text>
                  </View>

                </View>

                <View style={CommonStyles.formgroup}>
                  <Text style={styles.formlabel}>
                    A good description includes:
                  </Text>
                  <Text style={CommonStyles.para}>
                    What the deliverable is Type of freelancer or agency you’re
                    looking for Anything unique about the project, team, or your
                    company
                  </Text>
                  <TextInput
                    placeholder="eg: Write Here"
                    placeholderTextColor="#ddd"
                    style={[styles.inputform, { height: 120 }]}
                    value={this.state.description}
                    onChangeText={text => this.setState({ description: text })}
                  />

                  <View style={{ justifyContent: 'flex-end' }}>
                  </View>
                  {this.state.description === "" && this.state.descriptionError != '' ? (
                    <Text style={{ color: 'red' }}>{this.state.descriptionError}</Text>
                  ) : null
                  }
                </View>
                
                <View style={CommonStyles.formgroup}>
                  <Text style={styles.formlabel}>
                    Additional project files (optional)
                  </Text>
                  {this.state.multipleFile.length <= 5 &&
                    this.state.multipleFile.map((item, key) => (
                      <View key={key}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          {this.state.multipleFile && this.state.multipleFile.type == 'image/*' ?
                            <Image
                              source={{ uri: item.uri }}
                              style={{ height: 60, width: 60 }}
                            />
                            :
                            <Text>{item.type ? item.type : ''}</Text>
                          }
                          <TouchableOpacity onPress={() => this.deleteFile(key)}>
                            <Text style={{ color: 'red' }}>DELETE</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                  <View
                    style={[
                      styles.borderbox,
                      { marginBottom: 2, borderStyle: 'dashed', borderRadius: 1 },
                    ]}>
                    {this.state.multipleFile.length == 5 ? (
                      <TouchableOpacity disabled>
                        <Text style={[styles.ptext, { color: 'grey' }]}>
                          {' '}
                          To Upload Click Here
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => this.selectMultipleFile()}>
                        <Text style={[styles.ptext, { color: '#3e1bee' }]}>
                          {' '}
                          To Upload Click Here
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 13, color: '#777' }}>
                      You may attach up to 5 files
                    </Text>
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
