import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../../CommonStyles';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {AntDesign} from 'react-native-vector-icons/AntDesign';
import {
  GET_ALL_CATEGORY,
  GET_ALL_SPECIALITY,
  EMPLOYMENT_HISTORY,
  UPLOAD_PORTFOLIO,
  GET_FREELANCER_PROFILE_INFO,
} from '../../shared/allApiUrl';
import {apiCallWithToken} from '../../Api';
import {connect} from 'react-redux';
import {updateProfile} from '../../Store/Actions/Action';
import DocumentPicker from 'react-native-document-picker';

class AddPortFolioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioDetails: this.props.data,
      item: this.props.data,
      projectName: this.props.data ? this.props.data.name : '',
      portfolioImage: this.props.data?.images ? this.props.data?.images : [],
      multipleFile: [],
      portfolioItem: {},
      addPortFolioModal: false,
    };
  }

  uploadPortFolioImage = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: ['image/*'],
      });

      for (const res of results) {
        if (results.length > 5) {
          Alert.alert('File number should not exceed 5');
        }
      }

      this.setState({multipleFile: results});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  onSubmit = async () => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);

    if (this.state?.multipleFile) {
      this.state.multipleFile.map(item => formData.append('file', item));
    }

    formData.append('name', this.state.projectName);
    formData.append('is_active', 1);
    formData.append('action_type', this.props.editable ? 'update' : 'add');
    await apiCallWithToken(UPLOAD_PORTFOLIO, 'post', formData)
      .then(res => {
        this.props.updatePortfolioHistory();
        this.props.closePortfolioModall();
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteee = index => {
    let tempArr = this.props.data.images;
    tempArr.splice(index);
    this.setState({...this.props.data.image, tempArr});
  };

  deleteFile = e => {
    const deletedFile = this.state.multipleFile.filter(
      (item, index) => index !== e,
    );
    this.setState({multipleFile: deletedFile});
  };

  deleteFile1 = async index => {
    const deletedFile12 = this.state.portfolioImage.filter(
      (item, index1) => index1 !== index,
    );

    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);

    if (this.state.multipleFile) {
      this.state.multipleFile.map(item => formData.append('file', item));
    }

    formData.append('name', this.state.projectName);

    formData.append('portfolio_id', this.props.data.id[index]);
    formData.append('is_active', 1);
    formData.append('action_type', 'del');
    await apiCallWithToken(UPLOAD_PORTFOLIO, 'post', formData)
      .then(res => {
        this.setState({portfolioImage: deletedFile12});
      })
      .catch(err => {
        console.log(err);
      });
  };

  editFile1 = async index => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: ['image/*'],
      });

      for (const res of results) {
        if (results.length > 5) {
          Alert.alert('File number should not exceed 5');
        }
      }

      this.setState({portfolioImage: results});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from multiple doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);

    if (this.state.portfolioImage) {
      this.state.portfolioImage.map(item => formData.append('file', item));
    }

    formData.append('name', this.state.projectName);

    formData.append('portfolio_id', this.props.data.id[index]),
      formData.append('is_active', 1);
    formData.append('action_type', 'update');
    await apiCallWithToken(UPLOAD_PORTFOLIO, 'post', formData)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  closeModal = () => {
    this.props.closePortfolioModall();
  };

  render() {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={CommonStyles.formgroup}>
            <Text
              style={[
                CommonStyles.formtext,
                {paddingBottom: 10, fontWeight: '600'},
              ]}>
              Portfolio
            </Text>
            <TextInput
              placeholder="type here"
              placeholderTextColor="#ddd"
              style={styles.inputform}
              value={this.state.projectName}
              onChangeText={text => this.setState({projectName: text})}
            />
            {this.state.portfolioImage &&
              this.state.portfolioImage.map((item, index) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Image
                        source={{uri: item.uri ? item.uri : item}}
                        style={{height: 180, width: 180}}
                      />
                      <TouchableOpacity onPress={() => this.editFile1(index)}>
                        <Text style={{color: 'green'}}>EDIT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.deleteFile1(index)}>
                        <Text style={{color: 'red'}}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={CommonStyles.col50}>
            <View style={CommonStyles.formgroup}>
              {this.state.multipleFile.length > 0 &&
                this.state.multipleFile.map((item, key) => (
                  <View key={key}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Image
                        source={{uri: item.uri}}
                        style={{height: 180, width: 180}}
                      />
                      <TouchableOpacity onPress={() => this.deleteFile(key)}>
                        <Text style={{color: 'red'}}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              <TouchableOpacity
                style={CommonStyles.outlinebtn}
                onPress={() => this.uploadPortFolioImage()}>
                <Text style={{color: 'blue'}}>Click here to upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[CommonStyles.row, {marginTop: 25}]}>
            <View style={CommonStyles.col50}>
              <TouchableOpacity
                style={CommonStyles.outlinebtn}
                onPress={() => this.closeModal()}>
                <Text style={CommonStyles.outlinetext}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.col50}>
              <TouchableOpacity
                style={CommonStyles.primarybutton}
                onPress={() => this.onSubmit()}>
                <Text style={CommonStyles.btntext}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPortFolioCard);
