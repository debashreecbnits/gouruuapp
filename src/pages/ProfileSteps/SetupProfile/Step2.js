import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput, Modal, Alert, ImageBackground,
} from 'react-native';
import { Select, NativeBaseProvider, CheckIcon } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker'
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

export default class PostRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {

            modalVisible: false,
            school: '',
            areaOfStudy: '',
            areaOfStudyError:'',
            entryDate: "",
            passoutDate: "",
            schoolNameError: "",
            passoutDateError: '',
            educationDetails: [],
            degree: "",
            degreeError:"",
            schooldescription: "",
            passoutDate:'',
            passoutDateError:'',
            entryDateError:'',
            //props state
            selectedJobCategory: this.props?.navigation?.state?.params?.data?.selectedJobCategory,
            selectedKeyword: this.props?.navigation?.state?.params?.data?.holder,
            lookingForSkill: this.props?.navigation?.state?.params?.data?.holderLookingFor,
            exp_level: this.props?.navigation?.state?.params?.data?.exp_level,
            service_type: this.props?.navigation?.state?.params?.data?.service_type,
            textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryMainStore,
            UID:this.props?.navigation?.state?.params?.data?.UID,
            Token:this.props?.navigation?.state?.params?.data?.Token,
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    onNext = () => {
         if(this.state.modalVisible===false && this.state.educationDetails.length<=0){
             Alert.alert("Please fill the education details")
         }
         else{
        this.props.navigation.navigate('ProfileStep3', { data: this.state })
         }
        
    }

  

    handleEducationDetails = async () => {
        if (this.state.school === "") {
            this.setState({ schoolNameError: '***Please enter school name' })
        }
        else if (this.state.areaOfStudy === "") {
            this.setState({ areaOfStudyError: '***Please write your area of study' })
        }
        else if (this.state.degree === "") {
            this.setState({ degreeError: '***Please write your degree' })
        }
        else if (this.state.entryDate === "") {
            this.setState({ entryDateError: '***Please select  entry year' })
        }
        else if (this.state.passoutDate === "") {
            this.setState({ passoutDateError: '***Please select passout year' })
        }
       
       
        else {
            this.setState({ schoolNameError: "" })
            this.setState({ areaOfStudyError: "" })
            this.setState({ degreeError: "" })
            this.setState({ entryDateError: "" })
            this.setState({ passoutDateError: "" })
            var emp = [];
            emp = this.state.educationDetails;
            const e = {
                school: this.state.school,
                AreaOfStudy: this.state.areaOfStudy,
                Degree: this.state.degree,
                start_date: this.state.entryDate,
                end_date: this.state.passoutDate,
                schooldescription: this.state.schooldescription
            }
            emp.push(e);
            //seteducationDetails(emp);
            this.setState({ educationDetails: emp })
            // setEducation(!Education);
            // resetValues2();
            // setCreatStep(3);
            //this.resetValues()
            
            this.setState({ modalVisible: false });            

        }


    }

    resetValues = () => {
        this.setState({ school: "" })
        this.setState({ areaOfStudy: '' })
        this.setState({ degree: "" })
        this.setState({ entryDate: '' })
        this.setState({ passoutDate: '' })
        this.setState({ schooldescription: "" })
        this.setState({schoolNameError:''})
        this.setState({areaOfStudyError:''})
        this.setState({degreeError:''})
        this.setState({entryDateError:''})
        this.setState({passoutDateError:''})

    }

    render() {
        console.log("UID+++++++++=2",this.props?.navigation)
        const { modalVisible } = this.state;
    
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
                            <Text style={CommonStyles.htitle}>Education Details</Text>
                        </View>
                        {/* <View style={CommonStyles.Trighticon}>
                            <TouchableOpacity>
                                <Image source={require('../../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View> */}
                    </ImageBackground>
                    <ScrollView>
                        <View style={CommonStyles.container}>
                            <Text style={styles.h2}>Education Details</Text>
                            <Text style={[CommonStyles.para, { marginBottom: 20 }]}>Add the schools you attended areas of study, and degress earned.</Text>

                             {this.state?.educationDetails && this.state?.educationDetails.length != 0 ?  this.state.educationDetails.map((item,idx)=> (
                                <View key={idx} style={[{ position: 'relative' }]}>
                                    <View style={styles.deleterow}>
                                        <TouchableOpacity style={styles.trbtn}>
                                            <Icon name="ios-trash" color="#777" size={14} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.formlabel2}>{item.school}</Text>
                                    <Text style={[styles.ptext2, { fontWeight: 'bold' }]}>{item.AreaOfStudy}</Text>
                                    <Text style={[styles.ptext]}>{item.start_date} to {item.end_date}</Text>
                                    <Text style={styles.ptext}>{item.schooldescription}</Text>
                                    <View style={CommonStyles.hr}></View>
                                </View>
                                
                                )) : null
                            } 
                            
                            
                          

                            <View style={[CommonStyles.row, { marginTop: 25 }]}>
                                <View style={CommonStyles.col50}>
                                    <TouchableOpacity style={CommonStyles.outlinebtn} onPress={() => this.setModalVisible(true)}>
                                        <Text style={CommonStyles.outlinetext}>+ Add More</Text>
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
                            
                            
                            
                            <View style={styles.centeredView}>
                                <Modal animationType="fade" transparent={true} visible={modalVisible}>
                                    <ScrollView>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>




                                                <View style={CommonStyles.formgroup}>
                                                    <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>School</Text>
                                                    <TextInput placeholder="Eg: northwest school.." placeholderTextColor="#ddd" style={[styles.inputform]}
                                                        value={this.state.school}
                                                        onChangeText={(text) => 
                                                            {if(this.state.schoolNameError){
                                                                this.setState({schoolNameError:""})
                                                            }
                                                            this.setState({ school: text })
                                                            }
                                                        }
                                                    />
                                                    {this.state.schoolNameError != '' ? (
                                                        <Text style={{ color: 'red' }}>{this.state.schoolNameError}</Text>
                                                    ) : null}
                                                </View>
                                                <View style={CommonStyles.formgroup}>
                                                    <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Area of Study</Text>
                                                    <TextInput placeholder="Eg: B-tech, BCA" placeholderTextColor="#ddd" style={styles.inputform}
                                                        value={this.state.areaOfStudy}
                                                        onChangeText={(text) => 
                                                            {if(this.state.areaOfStudyError){
                                                                this.setState({areaOfStudyError:''})
                                                            }
                                                            this.setState({ 
                                                            areaOfStudy: text })}
                                                        }
                                                    />
                                                     {this.state.areaOfStudyError != '' ? (
                                                        <Text style={{ color: 'red' }}>{this.state.areaOfStudyError}</Text>
                                                    ) : null}
                                                </View>
                                                <View style={CommonStyles.formgroup}>
                                                    <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Degree</Text>
                                                    <TextInput placeholder="Eg: Bachelor's" placeholderTextColor="#ddd" style={styles.inputform}
                                                        value={this.state.degree}
                                                        onChangeText={(text) => {
                                                            if(this.state.degreeError){
                                                                this.setState({degreeError:''})
                                                            }
                                                            this.setState({ degree: text })}}
                                                    />
                                                    {this.state.degreeError != '' ? (
                                                        <Text style={{ color: 'red' }}>{this.state.degreeError}</Text>
                                                    ) : null}
                                                </View>
                                                <View style={[CommonStyles.row]}>
                                                    <View style={CommonStyles.col50}>
                                                        <View style={CommonStyles.formgroup}>
                                                            <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Entry Year</Text>
                                                            <DatePicker
                                                                style={styles.datePickerStyle}
                                                                date={this.state.entryDate} // Initial date from state
                                                                mode="date" // The enum of date, datetime and time
                                                                placeholder="select date"
                                                                format="YYYY-MM-DD"
                                                                minDate="1900-01-01"
                                                                maxDate="2050-01-01"
                                                                confirmBtnText="Confirm"
                                                                cancelBtnText="Cancel"
                                                                customStyles={{
                                                                    dateIcon: {
                                                                        //display: 'none',
                                                                        position: 'absolute',
                                                                        left: 5,
                                                                        top: 4,
                                                                        right: 10
                                                                    },
                                                                    dateInput: {
                                                                        marginLeft: 10,
                                                                    },
                                                                }}

                                                                onDateChange={(date) => { 
                                                                    if(this.state.entryDateError){
                                                                        this.setState({entryDateError:''})
                                                                    }
                                                                    this.setState({ entryDate: date }) }}
                                                            />
                                                        </View>
                                                        {this.state.entryDateError != '' ? (
                                                    <Text style={{ color: 'red' }}>{this.state.entryDateError}</Text>
                                                ) : null}
                                                    </View>

                                                    <View style={CommonStyles.col50}>
                                                        <View style={CommonStyles.formgroup}>
                                                            <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Passout Year</Text>
                                                            <DatePicker
                                                                style={styles.datePickerStyle}
                                                                date={this.state.passoutDate} // Initial date from state
                                                                mode="date" // The enum of date, datetime and time
                                                                placeholder="select date"
                                                                format="YYYY-MM-DD"
                                                                minDate="1900-01-01"
                                                                maxDate="2050-01-01"
                                                                confirmBtnText="Confirm"
                                                                cancelBtnText="Cancel"
                                                                customStyles={{
                                                                    dateIcon: {
                                                                        //display: 'none',
                                                                        position: 'absolute',
                                                                        left: 5,
                                                                        top: 4,
                                                                        right: 10
                                                                    },
                                                                    dateInput: {
                                                                        marginLeft: 10,
                                                                    },
                                                                }}

                                                                onDateChange={(date) => { 
                                                                    if(this.state.passoutDateError){
                                                                        this.setState({passoutDateError:''})
                                                                    }
                                                                    this.setState({ passoutDate: date }) }}
                                                            />
                                                        </View>
                                                        {this.state.passoutDateError != '' ? (
                                                    <Text style={{ color: 'red' }}>{this.state.passoutDateError}</Text>
                                                ) : null}
                                                    </View>
                                                    
                                                </View>
                                                
                                                <View style={CommonStyles.formgroup}>
                                                    <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>Description (optional)</Text>
                                                    <TextInput placeholder="Type here" placeholderTextColor="#ddd" style={[styles.inputform, { height: 69 }]} 
                                                     value={this.state.schooldescription}
                                                     onChangeText={(text) => this.setState({ schooldescription: text })}
                                                    />
                                                    <Text style={{ textAlign: 'right', color: '#757575', fontSize: 13 }}>0/120 characters (min. 10)</Text>
                                                    
                                                </View>
                                                

                                                <View style={[CommonStyles.row, { marginTop: 25 }]}>
                                                    <View style={CommonStyles.col50}>
                                                        <TouchableOpacity style={CommonStyles.outlinebtn} onPress={() => {
                                                            this.resetValues()
                                                            this.setModalVisible(!modalVisible)}}>
                                                            <Text style={CommonStyles.outlinetext}>Cancel</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={CommonStyles.col50}>
                                                        <TouchableOpacity style={CommonStyles.primarybutton}
                                                            //onPress={() => this.onSubmit()}

                                                            //onPress={() => this.setModalVisible(false,{data:this.state.schoolName})}

                                                            onPress={() => this.handleEducationDetails()}
                                                        >
                                                            <Text style={CommonStyles.btntext}>Submit</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    </ScrollView>
                                </Modal>

                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </NativeBaseProvider>
        );
    }
}
