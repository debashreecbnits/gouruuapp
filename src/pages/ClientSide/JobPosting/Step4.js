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
    ActivityIndicator,
} from 'react-native';
import { NativeBaseProvider, } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { apiCallWithToken } from '../../../Api/index';
import { DRAFT_JOBS } from '../../../shared/allApiUrl';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default class PostStep4 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            selectedItem: this.props?.navigation?.state?.params?.data?.draftValueDetails ? this.props.navigation.state.params.data.draftValueDetails?.expertise.split(',') : [],
            selectedItemError: "",
            exp_level: "Intermediate",
            items: [],
            //holder:this.props?.navigation?.state?.params?.data?.draftValueDetails ? this.props?.navigation?.state?.params?.data?.draftValueDetails?.expertise : [],
            holder: [],
            holder2: [],
            //6 field
            selectedTerm: this.props?.navigation?.state?.params?.data?.selectedTerm,
            selectedTitle: this.props?.navigation?.state?.params?.data?.selectedTitle,
            selectedCategory: this.props?.navigation?.state?.params?.data?.selectedCategory,
            selectedJobSpeciality: this.props?.navigation?.state?.params?.data?.selectedJobSpeciality,
            selectedKeyWord: this.props?.navigation?.state?.params?.data?.selectedKeyWord,
            selectedDescription: this.props?.navigation?.state?.params?.data?.selectedDescription,
            project_type_details: this.props?.navigation?.state?.params?.data?.project_type,
            selectedMultipleFile: this.props?.navigation?.state?.params?.data?.selectedMultipleFile,
            userId: this.props?.navigation?.state?.params?.data?.userId,
            projectSpecification: this.props?.navigation?.state?.params?.data?.project_specification,
            projectLocation: this.props?.navigation?.state?.params?.data?.project_location,
            textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
            address: this.props?.navigation?.state?.params?.data?.fields?.address,
            draftValueDetails: this.props?.navigation?.state?.params?.data?.draftValueDetails,
            draftStatus: this.props?.navigation?.state?.params?.data?.draftValueDetails?.status == "In Draft" ? "update" : "add",
            pid: this.props?.navigation?.state?.params?.data?.draftValueDetails ? this.props?.navigation?.state?.params?.data?.draftValueDetails?.id : ""
        };

    }

    componentDidMount() {
        this.getskillList()
    }

    getskillList = async () => {

        let id = this.props?.navigation?.state?.params?.data?.selectedCategory[0].id
        var formData = new FormData();
        formData.append('cat_id', id);

        await apiCallWithToken(GET_ALL_SPECIALITY, 'post', formData).then(res => {
            if (res.status == 200) {
                this.setState({ items: res.data.data.skill });
            }

        }).catch(err => {
            console.log(err)
        })

    }


    removeKeyword = (index) => {
        let tempArr = this.state.selectedItem;
        tempArr.splice(index);
        this.setState({ holder: tempArr })
    }

    onselectedItemsChange = selectedItem => {
        this.setState({ selectedItem: selectedItem });
    };

    AddItemsToArray = () => {

        //Adding Items To Array.
        this.state.selectedItem.push(this.state.holder.toString());
        this.setState({ holder: this.state.selectedItem })


    }

    onDraftAction = async () => {


        var arr = [];
        arr = this.state?.address?.split(',');
        var country = arr[arr.length - 1];
        if (arr.length > 1) {
            var city = arr[arr.length - 3]
                ? arr[arr.length - 3]
                : arr[arr.length - 2];
        }
        var formData = new FormData();
        formData.append('uid', this.state.userId);
        formData.append('action_type', this.state.draftStatus);
        formData.append('term', this.state.selectedTerm);
        formData.append('title', this.state.selectedTitle);
        // job speciality ==> static value for now==> issue on api end
        formData.append('speciality',JSON.stringify(this.state.selectedJobSpeciality));
        {
            this.state?.selectedCategory.length === 0 ?
                formData.append('category', this.state.textCategoryStore) :
                formData.append('category', this.state.selectedCategory[0].name)
        };
        formData.append('description', this.state.selectedDescription);
        //formData.append('image', "");

        if (this.state?.selectedMultipleFile) {
            this.state.selectedMultipleFile.map(item => formData.append('image', item));
        }
        formData.append('job_type', this.state.projectSpecification);
        { this.state.address != "" ? formData.append('city', city) : formData.append("locationasprofile", 1) };
        { this.state.address != "" ? formData.append('country', country) : formData.append("locationasprofile", 1) };
        formData.append('exp_level', this.state.exp_level);
        formData.append('pid', this.state.pid);
        formData.append('expertise', JSON.stringify(this.state.selectedItem))
        console.log("formdata==>",formData)
        
        this.setState({ disabled: true })
        await apiCallWithToken(DRAFT_JOBS, 'post', formData).then(res => {
            if (res.data.status == 1) {
                this.setState({ disabled: false })
                this.props.navigation.navigate('PostStep5', { data: this.state });
                console.log("drafted res==>",res)

            }

        }).catch(err => {
            this.setState({ disabled: false })
            console.log(err)
        })

    }

    onNext = () => {
      
        if (this.state?.selectedItem.length > 0) {
            this.state.selectedItem.map(item => this.setState({ holder2: item }));
        }

        this.onDraftAction()
    }

    render() {
        const { selectedItems } = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
                <NativeBaseProvider style={CommonStyles.wrapper}>

                    <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Expertise</Text>
                        </View>
                    </ImageBackground>

                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.keyboardContainer}
                        enableAutomaticScroll={true}
                        scrollEnabled={true}
                        extraScrollHeight={60}
                        behavior="padding"
                        enabled
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="none"
                    >
                        <ScrollView>
                            <View style={CommonStyles.container}>
                                <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                    <Text style={styles.h2}>Expertise</Text>
                                    <View style={styles.stepbg}>
                                        <Text style={[styles.ptext]}>Step 4 of 7</Text>
                                    </View>
                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <View style={{ paddingBottom: 5 }}>
                                        <Text style={styles.formlabel}>Add more keywords to improve search (Optional)</Text>
                                    </View>




                                    <View style={[CommonStyles.tagswrap, { paddingTop: 10, paddingBottom: 10 }]}>
                                        {this.state.items && this.state.items.map((val, index) => {
                                            return (
                                                <View key={index} style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                    <Text key={index} style={[CommonStyles.tagtext]}>#{val.title}</Text>

                                                </View>
                                            )
                                        })
                                        }
                                    </View>


                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput placeholder="eg: Designer" placeholderTextColor="#ddd" style={styles.inputform}
                                            value={this.state.holder}
                                            onChangeText={(TextInputValue) => this.setState({ holder: TextInputValue })}
                                        />
                                        <TouchableOpacity style={{ marginTop: 10, marginLeft: -30 }} onPress={this.AddItemsToArray}>
                                            <Icon name="add-circle-outline" size={24} color="#3e1bee" />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        this.state.selectedItem && this.state.selectedItem.map((val, index) => {
                                            return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                                                <View key={index} style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                                    <Text key={index} style={[CommonStyles.tagtext]}>#{val}</Text>
                                                    <TouchableOpacity onPress={() => this.removeKeyword(index)}>
                                                        <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            )
                                        })
                                    }

                                    {this.state.selectedItem.length === 0 && this.state.selectedItemError != '' ? (
                                        <Text style={{ color: 'red' }}>{this.state.selectedItemError}</Text>
                                    ) : null}

                                </View>
                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>What level of experience do you want?</Text>
                                    <View style={[CommonStyles.row, { marginBottom: 5 }]}>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity onPress={() => this.setState({ exp_level: 'Enter Level' })}
                                                style={[styles.borderbox,
                                                {
                                                    borderColor: 'blue',
                                                    backgroundColor: this.state.exp_level == 'Enter Level' ? 'blue' : '#fff'
                                                },
                                                ]}
                                            >

                                                <Text style={[styles.label0, { color: this.state.exp_level == 'Enter Level' ? '#fff' : 'blue' }]}>Entery Level</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={CommonStyles.col50}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ exp_level: 'Intermediate' })}
                                                style={[
                                                    styles.borderbox,
                                                    {
                                                        backgroundColor: this.state.exp_level == 'Intermediate' ? 'blue' : '#fff',
                                                        borderColor: 'blue'
                                                    },
                                                ]}
                                            >

                                                <Text style={[styles.label0, { color: this.state.exp_level == 'Intermediate' ? '#fff' : 'blue' }]}>Intermediate</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({ exp_level: 'Expert' })}
                                        style={[
                                            styles.borderbox,
                                            {
                                                borderColor: 'blue',
                                                backgroundColor: this.state.exp_level == 'Expert' ? 'blue' : '#fff'
                                            },
                                        ]}>

                                        <Text style={[styles.label0, { color: this.state.exp_level == 'Expert' ? '#fff' : 'blue' }]}>Expert</Text>

                                    </TouchableOpacity>
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

                                            {this.state.disabled === true ?
                                                (<ActivityIndicator
                                                    size="small"
                                                    color="#fff"
                                                />
                                                ) : (
                                                    <Text style={CommonStyles.btntext}>Next</Text>
                                                )}
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    {/* </KeyboardAvoidingView> */}
                </NativeBaseProvider>
            </ImageBackground>
        );
    }
}
