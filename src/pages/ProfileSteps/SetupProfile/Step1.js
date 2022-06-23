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
import {connect} from 'react-redux';
import axios from 'axios';
import { apiBaseUrl} from '../../../shared/helpers';
import { Select, NativeBaseProvider, CheckIcon, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import Autocomplete from 'react-native-autocomplete-input';
import { apiCallWithToken } from '../../../Api';
import { GET_ALL_CATEGORY, GET_ALL_SPECIALITY } from '../../../shared/allApiUrl';
import Icon from 'react-native-vector-icons/Ionicons';
var suggestedKeyword = [];
var keywordLookingFor = [];

class PostRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobCategory: [],
            filteredJobCategory: [],
            selectedJobSpeciality: [],
            filteredJobSpeciality: [],
            skillList: [],
            specialityList: [],
            filteredJobCategoryError: '',
            selectedJobCategory: [],
            holder: [],
            suggestedKeywordError: '',
            holderLookingFor: [],
            keywordLookingForError: '',
            exp_level: "Intermediate",
            service_type: "Technical",
            textCategoryStore: "",
            textCategoryMainStore: "",
            UID:this.props?.navigation?.state?.params?.USERID,
            Token:this.props?.navigation?.state?.params?.Token,
        };
    }

    componentDidMount() {

        // this.getJobCategory();
        // this.jobList();
        // this.getSpecialitynSkill();
        // this.getJobSpeciality();
        this.props.navigation.addListener('didFocus', () => {
            this.getJobCategory();
            this.jobList();
            this.getSpecialitynSkill();
            this.getJobSpeciality();
        });

    }

    getJobCategory = async () => {
        if(this.props.userData?.userDetails?.accessToken &&
            this.props.userData?.userDetails?.accessToken.length){
        await apiCallWithToken(GET_ALL_CATEGORY, 'get')
            .then(res => {
                if (res.data) {
                    this.setState({ jobCategory: res.data.data })
                }
            }).catch(err => {
                console.log(err)
            })
        }
            else{
                try {
                  console.log("before...............")
                  let res = await axios({
                      url: apiBaseUrl + GET_ALL_CATEGORY,
                      method: 'get',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                      //   'Content-Type': 'application/json',
                        'Authorization': 'Token '+ this.state.Token
                      }
                    }
                  );
                  if (res.data) {
                                this.setState({ jobCategory: res.data.data })
                        }
                } catch (error) {
                  console.error("error===========", error);
                }
            }
    };

    jobList = () => {
        this.setState({ filteredJobCategory: this.state.jobCategory })
    }

    findJobCategoryData = (text) => {
        if(this.state.filteredJobCategoryError){
            this.setState({filteredJobCategoryError:""})
        }
        let tempArr = text
        this.setState({ textCategoryStore: tempArr })

        this.setState({ jobList: true })
        let jobCategoryData = this.state.jobCategory;
        if (text) {
            const regex = new RegExp(`${text.trim()}`, 'i');
            let data = jobCategoryData.filter((obj) => obj.name.search(regex) >= 0)
            this.setState({ filteredJobCategory: data })
        } else {
            this.setState({ filteredJobCategory: [] })
        }
    }

   
    AddTextCategory = () => {
        this.setState({ textCategoryMainStore: this.state.textCategoryStore })
        {
            this.state.selectedJobCategory.length > 0 || this.state.textCategoryMainStore != "" ?
                Alert.alert(
                    "",
                    "You only add one Job Category.",
                    [
                        {
                            text: "OK",
                            onPress: () => this.setState({ textCategoryStore: "" }),
                            style: "cancel",
                        },

                    ],

                ) :
                <></>
        }
    }

    getSpecialitynSkill = async (newValue) => {
        if (newValue.id !== null) {
            let tempArr = this.state.selectedJobCategory;
            tempArr.push(newValue)
            this.setState({ selectedJobCategory: tempArr, filteredJobCategory: [] });
            var formData = new FormData();
            formData.append("cat_id", newValue.id);

if(this.props.userData?.userDetails?.accessToken &&
    this.props.userData?.userDetails?.accessToken.length){
            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, 
                            skillList: res.data.data.skill });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
                else{
                    try {
                        console.log("before...............")
                        let res = await axios({
                            url: apiBaseUrl + GET_ALL_SPECIALITY,
                            method: 'post',
                            data: formData,
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'multipart/form-data',
                            //   'Content-Type': 'application/json',
                              'Authorization': 'Token '+ this.state.Token
                            }
                          }
                        );
                        if (res.status == 200) {
                            this.setState({ specialityList: res.data.data.speciality, 
                                skillList: res.data.data.skill });
                        }
                      } catch (error) {
                        console.error("error===========", error);
                      }
                }
        }
    };

    getJobSpeciality = async (newValue) => {
        if (newValue.id !== null) {
            let tempArr = this.state.selectedJobSpeciality;
            tempArr.push(newValue)
            this.setState({ selectedJobSpeciality: tempArr, filteredJobSpeciality: [] });
            var formData = new FormData();
            formData.append("cat_id", newValue.id);
            if(this.props.userData?.userDetails?.accessToken &&
                this.props.userData?.userDetails?.accessToken.length){
            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            else{
                try {
                    console.log("before...............")
                    let res = await axios({
                        url: apiBaseUrl + GET_ALL_SPECIALITY,
                        method: 'post',
                        data: formData,
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'multipart/form-data',
                        //   'Content-Type': 'application/json',
                          'Authorization': 'Token '+ this.state.Token
                        }
                      }
                    );
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                    }
                  } catch (error) {
                    console.error("error===========", error);
                  }
            }
        }
    };

    removeJobCategory = (index) => {
        let tempArr = this.state.selectedJobCategory;
        tempArr.splice(index);
        this.setState({ selectedJobCategory: tempArr })
    }

    removeJobCategoryTextInput = () => {
        this.setState({ textCategoryMainStore: "" })
       }

    AddItemsToArray = () => {

        //Adding Items To Array.
        suggestedKeyword.push(this.state.holder.toString());
        this.setState({ holder: suggestedKeyword })
        this.setState({ suggestedKeywordError: "" })
    }
    removeKeyword = (index) => {
        let tempArr = suggestedKeyword;
        tempArr.splice(index);
        this.setState({ holder: tempArr })
    }
    AddItemsToArrayLookingFor = () => {

        //Adding Items To Array.
        keywordLookingFor.push(this.state.holderLookingFor.toString());
        this.setState({ holderLookingFor: keywordLookingFor })
        this.setState({ keywordLookingForError: "" })
    }

    removeKeywordLookingFor = (index) => {
        let tempArr = keywordLookingFor;
        tempArr.splice(index);
        this.setState({ holderLookingFor: tempArr })
    }

    onNext = () => {
       
       if (this.state.selectedJobCategory.length === 0 && this.state.textCategoryMainStore === "") {
            this.setState({ filteredJobCategoryError: '***Please select or add any Job category' })
        }
        else if (this.state.holder.length === 0) {
            this.setState({ suggestedKeywordError: '***Please add any keyword' })
        }
        else if (this.state.holderLookingFor.length === 0) {
            this.setState({ keywordLookingForError: '***Please type any skill' })
        }
        else {

            this.setState({ filteredJobCategoryError: "" })
            this.setState({ holder: "" })
            suggestedKeyword = []
            keywordLookingFor = [];
            if (this.state.service_type === "Technical") {
                this.props.navigation.navigate('ProfileStep2', { data: this.state })
            }
            else {
                this.props.navigation.navigate('ProfileStep4', { data: this.state })
            }
        }
       
        

    }

    render() {
        console.log("UID+++++++++1Token=",this.props)
        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Title</Text>
                        </View>
                        {/* <View style={CommonStyles.Trighticon}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                    <ScrollView>
                        <View style={CommonStyles.container}>
                            <Text style={styles.h2}>Tell Us Something About Yourself</Text>

                            <View style={CommonStyles.formgroup}>
                                <View style={CommonStyles.formgroup}>
                                <View style={{ flexDirection: 'row', 
                                //borderColor: 'red', 
                                //borderWidth: 1, borderRadius: 5 
                                }}>
                                    <Autocomplete
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => this.jobList()}
                                        containerStyle={[styles.autocompleteContainer, {border: 'none'}]}
                                        style={styles.autoComplete}
                                        listStyle={{ zIndex: 1, position: 'relative' }}
                                        data={this.state.filteredJobCategory}
                                        onChangeText={(text) => this.findJobCategoryData(text)}
                                        placeholder="Enter job category"
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                disabled={this.state.selectedJobCategory.length != 0 ? true : false}
                                                onPress={() => this.getSpecialitynSkill(item)}
                                            >
                                                <Text style={styles.itemText}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                     
                                   
                                    <TouchableOpacity 

                                        onPress={this.AddTextCategory}
                                    >
                                        <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                                    </TouchableOpacity>

                                </View>

                                    {this.state.selectedJobCategory.length > 0 ?
                                        <>
                                            {
                                                this.state.selectedJobCategory.length > 0 && this.state.selectedJobCategory.map((val, index) => {
                                                    return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                        <View style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                                                            <Text style={[CommonStyles.tagtext, CommonStyles.whitetext]}>{val.name}</Text>
                                                            <TouchableOpacity onPress={() => this.removeJobCategory(index)}>
                                                                <Icon name="close-circle" size={15} color="#fff" style={{ marginLeft: 5 }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    )
                                                })
                                            }

                                        </>
                                        :
                                        <>

                                            {this.state.textCategoryMainStore == "" ? null :
                                                <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                    <View style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                        <Text style={[CommonStyles.tagtext]}>{this.state.textCategoryMainStore}</Text>
                                                        <TouchableOpacity
                                                            //onPress={() => this.removeJobCategory(index)}
                                                            onPress={() => this.removeJobCategoryTextInput()}
                                                        >
                                                            <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>
                                            }
                                        </>

                                    }
                                    {this.state.filteredJobCategoryError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.filteredJobCategoryError}</Text>
                                    ) : null}

                                </View>

                                {/* <Select
                                    minWidth="200"
                                    accessibilityLabel="Choose Sub Category"
                                    placeholder="Choose Sub Category"
                                    _selectedItem={{
                                        bg: "primary.600",
                                        endIcon: <CheckIcon size={5} />,
                                    }}
                                    style={styles.formlabel}
                                >
                                    <Select.Item label="UX Research" value="ux" />
                                    <Select.Item label="Web Development" value="web" />
                                    <Select.Item label="Cross Platform Development" value="cross" />
                                    <Select.Item label="UI Designing" value="ui" />
                                    <Select.Item label="Backend Development" value="backend" />
                                </Select>                                 */}

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Suggested Keyword</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput placeholder="eg: Designer" placeholderTextColor="#ddd" style={styles.inputform}
                                            value={this.state.holder}
                                            //onChangeText={(text) => this.setState({ suggestedKeyword: text })}
                                            onChangeText={(TextInputValue) => 
                                                {if(this.state.suggestedKeywordError){
                                                    this.setState({ suggestedKeywordError: '' })
                                                }
                                                this.setState({ holder: TextInputValue })}
                                            }
                                        />
                                        <TouchableOpacity style={{ marginTop: 10, marginLeft: -40 }} onPress={this.AddItemsToArray}>
                                            <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        suggestedKeyword && suggestedKeyword.map((val, index) => {
                                            return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                <View key={index} style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                                                    <Text key={index} style={[CommonStyles.tagtext, CommonStyles.whitetext]}>#{val}</Text>
                                                    <TouchableOpacity onPress={() => this.removeKeyword(index)}>
                                                        <Icon name="close-circle" size={15} color="#fff" style={{ marginLeft: 5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            )
                                        })
                                    }
                                    {this.state.suggestedKeywordError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.suggestedKeywordError}</Text>
                                    ) : null}

                                </View>

                            </View>
                            {this.state?.skillList.length != 0 ?
                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Choose Your Skills</Text>
                                    <View style={CommonStyles.tagswrap}>
                                        {
                                            this.state.skillList && this.state.skillList.map((val, index) => {
                                                return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                    <View key={index} style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                                                        <Text key={index} style={[CommonStyles.tagtext, CommonStyles.whitetext]}>#{val.title}</Text>

                                                    </View>
                                                </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View> : null
                            }
                            {/* <View style={CommonStyles.formgroup}>
                                <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Not What You are looking for</Text>
                                <TextInput placeholder="Type here" placeholderTextColor="#ddd" style={styles.inputform}
                                value={this.state.holderLookingFor}
                                onChangeText={(TextInputValue)=> this.setState({ holderLookingFor : TextInputValue }) }
                                />
                                 <TouchableOpacity style={{ marginTop: 10, marginLeft: -40 }} onPress={this.AddItemsToArrayLookingFor}>
                                        <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                                    </TouchableOpacity>
                                <Text style={{ textAlign: 'right', color: '#757575', fontSize: 13 }}>Select up to 9more skills</Text>
                            </View>
                            */}

                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Not What You are looking for</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput placeholder="Type here" placeholderTextColor="#ddd" style={styles.inputform}
                                        value={this.state.holderLookingFor}
                                        //onChangeText={(text) => this.setState({ suggestedKeyword: text })}
                                        onChangeText={(TextInputValue) => 
                                            {if(this.state.keywordLookingForError)
                                                {
                                                    this.setState({keywordLookingForError:''})
                                                }
                                            this.setState({ 
                                            holderLookingFor: TextInputValue })
                                            }
                                        }
                                    />
                                    <TouchableOpacity style={{ marginTop: 10, marginLeft: -40 }} onPress={this.AddItemsToArrayLookingFor}>
                                        <Icon name="add-circle-outline" size={30} color="#3e1bee" />
                                    </TouchableOpacity>
                                </View>
                                {
                                    keywordLookingFor && keywordLookingFor.map((val, index) => {
                                        return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                            <View key={index} style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                                                <Text key={index} style={[CommonStyles.tagtext, CommonStyles.whitetext]}>{val}</Text>
                                                <TouchableOpacity onPress={() => this.removeKeywordLookingFor(index)}>
                                                    <Icon name="close-circle" size={15} color="#fff" style={{ marginLeft: 5 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )
                                    })
                                }
                                {this.state.keywordLookingForError != '' ? (
                                    <Text style={{ color: 'red' }}>{this.state.keywordLookingForError}</Text>
                                ) : null}

                            </View>

                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>What level of experience do you want?</Text>
                                <View style={[CommonStyles.row, { marginBottom: 5 }]}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity onPress={() => this.setState({ exp_level: 'Entry Level' })}
                                            style={[
                                                styles.card,
                                                { borderColor: this.state.exp_level == 'Entry Level' ? '#3e1bee' : '#fff' },
                                            ]}
                                        >
                                            <View style={[styles.borderbox2]}>
                                                <Text style={[styles.ptext, { color: '#3e1bee' }]}>Entry Level</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ exp_level: 'Intermediate' })}
                                            style={[
                                                styles.card,
                                                { borderColor: this.state.exp_level == 'Intermediate' ? '#3e1bee' : '#fff' },
                                            ]}
                                        >
                                            <View style={[styles.borderbox2]}>
                                                <Text style={[styles.ptext, { color: '#3e1bee' }]}>Intermediate</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => this.setState({ exp_level: 'Expert' })}
                                    style={[
                                        styles.card,
                                        { borderColor: this.state.exp_level == 'Expert' ? '#3e1bee' : '#fff' },
                                    ]}>
                                    <View style={[styles.borderbox2]}>
                                        <Text style={[styles.ptext, { color: '#3e1bee' }]}>Expert</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>What type of work will you provide?</Text>
                                <View style={[CommonStyles.row, { marginBottom: 5 }]}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity onPress={() => this.setState({ service_type: 'Miscellaneous' })}
                                            style={[
                                                styles.card,
                                                { borderColor: this.state.service_type == 'Miscellaneous' ? '#3e1bee' : '#fff' },
                                            ]}
                                        >
                                            <View style={[styles.borderbox2]}>
                                                <Text style={[styles.ptext, { color: '#3e1bee' }]}>Miscellaneous</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ service_type: 'Technical' })}
                                            style={[
                                                styles.card,
                                                { borderColor: this.state.service_type == 'Technical' ? '#3e1bee' : '#fff' },
                                            ]}
                                        >
                                            <View style={[styles.borderbox2]}>
                                                <Text style={[styles.ptext, { color: '#3e1bee' }]}>Technical</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>




                            <View style={CommonStyles.row}>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.goBack()}
                                        style={CommonStyles.outlinebtn2}>
                                        <Text style={CommonStyles.outlinetext2}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.primarybutton}
                                        onPress={() => this.onNext()}
                                    >

                                        <Text style={CommonStyles.btntext}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </NativeBaseProvider>
        );
    }
}
const mapStateToProps = state => {
    return {
      userData: state,
    };
  };

  export default connect(mapStateToProps)(PostRequest);