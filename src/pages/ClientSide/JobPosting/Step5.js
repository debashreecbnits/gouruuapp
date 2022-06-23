import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,
    KeyboardAvoidingView, ScrollView,ImageBackground
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { apiCallWithToken } from '../../../Api';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { GET_FREELANCER_LIST } from '../../../shared/allApiUrl';

export default class PostStep5 extends Component {

    constructor(props) {
        super(props);
        this.state = {

            visibility: "Anyone",
            people_need: "One Gouruu",
            gouruuArray: [{ count: 0, Gouruu: "" }],
            filteredArrayFreelancerList: [""],
            storeFreelancerData: [],
            mystate: [],

            //7 field
            selectedExpLevel: this.props?.navigation?.state?.params?.data?.exp_level,
            selectedItem: this.props?.navigation?.state?.params?.data?.selectedItem,
            selectedTerm: this.props?.navigation?.state?.params?.data?.selectedTerm,
            selectedTitle: this.props?.navigation?.state?.params?.data?.selectedTitle,
            selectedCategory: this.props?.navigation?.state?.params?.data?.selectedCategory,
            selectedJobSpeciality: this.props?.navigation?.state?.params?.data?.selectedJobSpeciality,
            selectedKeyWord: this.props?.navigation?.state?.params?.data?.selectedKeyWord,
            selectedDescription: this.props?.navigation?.state?.params?.data?.selectedDescription,
            project_type_details: this.props?.navigation?.state?.params?.data?.project_type_details,
            selectedMultipleFile: this.props?.navigation?.state?.params?.data?.selectedMultipleFile,
            userId: this.props?.navigation?.state?.params?.data?.userId,
            projectSpecification: this.props?.navigation?.state?.params?.data?.projectSpecification,
            projectLocation: this.props?.navigation?.state?.params?.data?.projectLocation,
            textCategoryStore : this.props?.navigation?.state?.params?.data?.textCategoryStore,
            address :this.props?.navigation?.state?.params?.data?.address,
            pid : this.props?.navigation?.state?.params?.data?.pid ? this.props.navigation.state.params.data.pid : ""
        };
    }

    onNext = () => {
        this.props.navigation.navigate('PostStep6', { data: this.state });
        }

    componentDidMount() {
        this.getFreelancerList()
    }


    getGouruu = (val, count) => {
        gouruuArray.map((item) => {
            if (item.count == count && val) {
                item.Gouruu = val.user_id;
            } else if (item.count == count && val == null) {
                item.Gouruu = "";
            }
        });
    };

    getFreelancerListFiltered = async () => {
        this.state.storeFreelancerData && this.state.storeFreelancerData.map((item, idx) => {
            this.setState({ filteredArrayFreelancerList: item.first_name })
        })


    }


    getFreelancerList = async (search) => {
        //(true);
        var formData = new FormData();
        let userId = this.state.userId;

        formData.append("userid", userId);
        formData.append("search", search ? search : "");
        formData.append("skill", "");
        formData.append("experience", "");
        await apiCallWithToken(GET_FREELANCER_LIST, "post", formData)
            .then((resp) => {
                this.setState({ storeFreelancerData: resp.data.data })
                this.state.storeFreelancerData && this.state.storeFreelancerData.map((item, idx) => {
                    this.setState({ filteredArrayFreelancerList: item.first_name + " " + item.last_name })
                })


            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>            
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    {/* <View style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Visibility</Text>
                        </View>
                    </View> */}

                    <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Visibility</Text>
                        </View>
                    </ImageBackground>

                    <ScrollView>
                        <View style={CommonStyles.container}>
                        <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                            <Text style={styles.h2}>Project Visibility</Text>
                            <View style={styles.stepbg}>
                                <Text style={[styles.ptext]}>Step 5 of 7</Text>
                            </View>
                            
                        </View>
                            
                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>Who can see your job?</Text>
                                <View style={[ { marginBottom: 5 }]}>
                                    <View style={CommonStyles.col100}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ visibility: 'Anyone' })}
                                            style={[
                                                styles.borderbox,
                                                { backgroundColor: this.state.visibility == 'Anyone' ? '#3e1bee' : 'transparent' },
                                            ]}
                                        >
                                          
                                                <Text style={[styles.label0, { color: this.state.visibility == 'Anyone' ? '#fff' : '#3e1bee' }]}>Anyone</Text>
                                            
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col100}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ visibility: 'Only For Gouruu' })}
                                            style={[
                                                styles.borderbox,
                                                { backgroundColor: this.state.visibility == 'Only For Gouruu' ? '#3e1bee' : 'transparent' },
                                            ]}
                                        >
                                
                                                <Text style={[styles.label0, { color: this.state.visibility == 'Only For Gouruu' ? '#fff' : '#3e1bee' }]}>Only For Gouruu</Text>
                                            
                                        </TouchableOpacity>
                                    </View>
                                    <View style={CommonStyles.col100}>
                                    <TouchableOpacity
                                    onPress={() => this.setState({ visibility: 'Private' })}
                                    style={[
                                        styles.borderbox,
                                        { backgroundColor: this.state.visibility == 'Private' ? '#3e1bee' : '#fff',
                                        
                                    
                                    },
                                    ]}
                                >
                                    
                                        <Text style={[styles.label0, { color: this.state.visibility == 'Private' ? '#fff' : '#3e1bee' }]}>Private</Text>
                                    
                                </TouchableOpacity>
                                </View>
                                </View>

                            
                            </View>



                            <View style={CommonStyles.formgroup}>
                                <Text style={styles.formlabel}>How Many People do you need for this job?</Text>
                                <View style={[{ marginBottom: 5 }]}>

                                    <TouchableOpacity
                                        onPress={() => this.setState({ people_need: 'One Gouruu' })}
                                        style={[
                                            styles.borderbox,
                                            { backgroundColor: this.state.people_need == 'One Gouruu' ? '#3e1bee' : '#fff' },
                                        ]}
                                        
                                    >
                                        
                                            <Text style={[styles.label0, { color: this.state.people_need == 'One Gouruu' ? '#fff' : '#3e1bee' }]}>One Gouruu</Text>
                                        
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ people_need: 'Need more than one Gouruu' })}
                                        style={[
                                            styles.borderbox,
                                            { backgroundColor: this.state.people_need == 'Need more than one Gouruu' ? '#3e1bee' : '#fff' },
                                        ]}                                        
                                    >
                                        
                                            <Text style={[styles.label0, { color: this.state.people_need == 'Need more than one Gouruu' ? '#fff' : '#3e1bee', }]}>Need more than one Gouruu</Text>
                                        
                                    </TouchableOpacity>
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
