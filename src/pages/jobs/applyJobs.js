import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  CheckBox,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ImageBackground,
  Modal,
  TouchableOpacityBase,
} from 'react-native';
import { Select, NativeBaseProvider, Radio, Checkbox } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import DocumentPicker from 'react-native-document-picker';
import { apiCallWithToken } from '../../Api';
import { JOB_APPLICATION, ALLOTTED_POST, GET_PORTFOLIO } from '../../shared/allApiUrl';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class ApplyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      fullNameError: '',
      emailId: '',
      emailIdError: '',
      messageField: '',
      messageFieldError: '',
      paidType: 'Milestone',
      milestoneName: '',
      milestoneNameError: '',
      milestoneDate: '',
      milestoneDateError: '',
      milestoneAmount: '',
      milestoneAmountError: '',
      totalAmount: '',
      serviceFee: '',
      receiveAmount: '',
      multipleFile: [],
      showFile: [],
      dueDate: '',
      count: 0,
      milestoneArray: [{ description: '', dueDate: '', amount: '' }],
      isVisible: false,
      description: '',
      descriptionArr: [],
      amount: '',
      amountArr: [],
      dueDate: '',
      dueDateArr: [],
      startDate: '',
      startDateArr: [],
      portfolioDetails: [],
      checkedValues: [],
      freelancerId:'',
    };
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', () => {
      this.getPortfolio();
    });
  }

  onNext = async () => {
    if (this.state.fullName === '') {
      this.setState({ fullNameError: '***Please enter title' });
    } else if (this.state.messageField === '') {
      this.setState({ messageFieldError: '***Please write any message' });
    }

    // else if (this.state.milestoneName === "") {
    //     this.setState({ milestoneNameError: '***Please enter name' })
    // }
    // else if (this.state.milestoneDate === "") {
    //     this.setState({ milestoneDateError: '***Please enter date' })
    // }
    // else if (this.state.milestoneAmount === "") {
    //     this.setState({ milestoneAmountError: '***Please enter amount' })
    // }
    else {
      this.setState({ fullNameError: '' });
      this.setState({ milestoneNameError: '' });
      this.setState({ milestonedateError: '' });
      this.setState({ milestoneAmountError: '' });
      //this.props.navigation.navigate('PostStep2', { data: this.state })
      //setLoader(true);
      // var emp = [];
      // //emp = [...this.state.milestoneArray];
      // emp = this.state.milestoneArray;
      // const e = { description: this.state.description, dueDate: this.state.dueDate, amount: this.state.amount }
      // emp.push(e);
      //this.setState({ milestoneArray: emp })
      
      let selectedPortfolio = [];
        // arr.push({
        //   checkedValues:this.state.checkedValues.id,
        //   //level: this.state.otherLanguageProficiaency,
        // })
        this.state.checkedValues.forEach(element => {
          //arr.push(element.id)
         element.id && element.id.forEach(element2 => {
          selectedPortfolio=[...selectedPortfolio,element2]
         });
        });
           

      var formData = new FormData();
      let userId = this.props?.navigation?.state?.params?.userId;
      let jobId = this.props?.navigation?.state?.params?.jobId;
      formData.append('userid', userId);
      formData.append('jobid', jobId);
      formData.append('title', this.state.fullName);
      formData.append('description', this.state.messageField);
      formData.append('resume', this.state.multipleFile[0]);
      // if (this.state?.checkedValues) {
      //   this.state.checkedValues.map(item =>
      //      formData.append('portfolio', item.id.toString()),
      //   );
      // }
      formData.append('portfolio', selectedPortfolio.toString());
      formData.append('payment_type', this.state.paidType);
      if (this.state.paidType == 'Milestone') {
        formData.append('milestone', JSON.stringify(this.state.milestoneArray));
      } else if (this.state.paidType == 'Project') {
        formData.append('amount', this.state.totalAmount);
      }
      console.log("JOBAPPLYFORMDATA+++++",formData)
      await apiCallWithToken(JOB_APPLICATION, 'post', formData)
        .then(res => {
          console.log("JOB APPLY++++RES+++++++",res)
          this.props.navigation.navigate('Myfeed');

          let userIdd = this.props?.navigation?.state?.params?.userId;
          let jobIdd = this.props?.navigation?.state?.params?.jobId;
          var formDataa = new FormData();
          formDataa.append('userid', userIdd);
          formDataa.append('post_id', jobIdd);
          formDataa.append('r_rate', '');
          formDataa.append('fixed_rate', '40');
          formDataa.append('delivery_in_days', '10');
          formDataa.append('actual_delivery_in_days', '');
          formDataa.append('status', 'Assigned');
          apiCallWithToken(ALLOTTED_POST, 'post', formDataa)
            .then(res => {
              //this.props.navigation.navigate('Myfeed')
              // if (res.data.status == 1) {

              //this.props.navigation.navigate('Dashboard');
              // }
            })
            .catch(err => {
              console.log(err);
            });

          this.props.navigation.navigate('Dashboard');
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getPortfolio = async () => {
    var formData = new FormData();
    formData.append('userid', this.props.userData.userDetails.data.id);
    await apiCallWithToken(GET_PORTFOLIO, 'post', formData)
      .then(res => {
        this.setState({ portfolioDetails: res.data.Data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: ['image/*', 'application/pdf'],
      });

      for (const res of results) {
        if (results.length > 1) {
          Alert.alert('File number should not exceed 1');
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

  handleChangeName = (text, index) => {
    let inputArr = [...this.state.milestoneArray];
    inputArr[index].description = text;
    this.setState({ milestoneArray: inputArr });
  };

  handleChangeAmount = (text, index) => {
    let inputArr = [...this.state.milestoneArray];
    inputArr[index].amount = text;
    this.setState({ milestoneArray: inputArr });
  };

  handleChangeDueDate = (date, index) => {
    //this.setState({dueDate:date})
    let inputArr = [...this.state.milestoneArray];
    inputArr[index].dueDate = date;
    this.setState({ milestoneArray: inputArr });
  };

  handleChangeStartDate = (date, index) => {
    //this.setState({startDate:date})
    let inputArr = [...this.state.milestoneArray];
    inputArr[index].startDate = date;
    this.setState({ milestoneArray: inputArr });
  };

  addMilestone = () => {
    this.setState({
      milestoneArray: [
        ...this.state.milestoneArray,
        { description: '', amount: '', dueDate: '' },
      ],
    });
  };

  

  removeMilestone = (index, element) => {
    this.state.milestoneArray.splice(index, 1);
    this.setState({ milestoneArray: this.state.milestoneArray });
  };

  render() {
    return (
      <NativeBaseProvider
        style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>
        {/* <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Job Application</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>
                 </View> */}
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


          

          <ImageBackground
            source={require('../../assets/images/headerbar.png')}
            style={CommonStyles.headerwrap}>
            <View style={CommonStyles.Tlefticon}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../assets/images/left-arrow.png')}
                  resizeMode="contain"
                  style={CommonStyles.ticon}
                />
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.centerheading}>
              <Text style={CommonStyles.htitle}>Job Application</Text>
            </View>
          </ImageBackground>

          <ScrollView>
            <View style={[CommonStyles.container]}>
              <View style={{ marginBottom: 30 }}>
                <Text style={styles.headingtop}>
                  Fill The Below fields to submit your application
                </Text>
              </View>

              <View style={CommonStyles.formgroup}>
                <TextInput
                  value={this.state.fullName}
                  onChangeText={text => this.setState({ fullName: text })}
                  style={CommonStyles.formcontrol}
                  placeholder="write here"
                  placeholderTextColor="#ccc"
                />
                <View style={CommonStyles.formtextwrap}>
                  <Text style={CommonStyles.formtext}>Title</Text>
                </View>

                {this.state.fullName === '' && this.state.fullNameError != '' ? (
                  <Text style={{ color: 'red' }}>{this.state.fullNameError}</Text>
                ) : null}
              </View>

              <View style={CommonStyles.formgroup}>
                <TextInput
                  value={this.state.messageField}
                  onChangeText={text => this.setState({ messageField: text })}
                  style={[CommonStyles.formcontrol, { height: 90 }]}
                  placeholder="Write Here"
                  placeholderTextColor="#ccc"
                />
                <View style={CommonStyles.formtextwrap}>
                  <Text style={CommonStyles.formtext}>Message</Text>
                </View>
                {this.state.messageField === '' &&
                  this.state.messageFieldError != '' ? (
                  <Text style={{ color: 'red' }}>
                    {this.state.messageFieldError}
                  </Text>
                ) : null}
              </View>

              {this.state.multipleFile.length <= 1 &&
                this.state.multipleFile.map((item, key) => (
                  <View key={key}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {this.state.multipleFile &&
                        this.state.multipleFile.type == 'image/*' ? (
                        <Image
                          source={{ uri: item.uri }}
                          style={{ height: 60, width: 60 }}
                        />
                      ) : (
                        <Text>{item.type ? item.type : ''}</Text>
                      )}
                      <TouchableOpacity onPress={() => this.deleteFile(key)}>
                        <Text style={{ color: 'red' }}>DELETE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              <View style={CommonStyles.formgroup}>
                <Text
                  style={[
                    CommonStyles.heading,
                    { marginBottom: 10, fontWeight: '400' },
                  ]}>
                  Upload documents
                </Text>
                <TouchableOpacity
                  onPress={() => this.selectMultipleFile()}
                  style={styles.uploadbox}>
                  <Text
                    style={[
                      CommonStyles.para,
                      { textAlign: 'center', color: '#3e1bee', marginBottom: 0 },
                    ]}>
                    Upload your Resume Here
                  </Text>
                </TouchableOpacity>
                <Text style={[CommonStyles.para2, { textAlign: 'right' }]}>
                  You may attach up to 100 MB
                </Text>
              </View>
              {this.state.portfolioDetails != null ?(
              <View style={CommonStyles.formgroup}>
                <Text
                  style={[
                    CommonStyles.heading,
                    { marginBottom: 10, fontWeight: '400' },
                  ]}>
                 Select Portfolio
                </Text>
                 {this.state.portfolioDetails && this.state.portfolioDetails.length>0 && this.state.portfolioDetails.map((item, index) => 
                
                (
                       <Checkbox.Group accessibilityLabel='choose portfolio'
                       onChange={newvalue => {
                         this.setState({checkedValues: newvalue})
                       }}
                       value={this.state.checkedValues}
                       >
                     <Checkbox 
                     value={item}
                     >{item.name}</Checkbox>
                     </Checkbox.Group>
                     
                 ))}
              </View>
            )

            :
          <View style={CommonStyles.formgroup}>
            <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('FreelancerProfile',{freelancerId:this.props.userData.userDetails.id})}
            >
              <Text style={{color:"blue"}}>CLICK HERE  </Text>
              <Text style={[
                    CommonStyles.heading,
                    { marginBottom: 10, fontWeight: '400' },
                  ]}>(If you want to add portfolio please click to go to profile and add)</Text>
              </TouchableOpacity>
          </View>
         }
              <Radio.Group
                value={this.state.paidType}
                onChange={nextValue => {
                  this.setState({ paidType: nextValue });
                }}
                name="myRadioGroup"
                accessibilityLabel="Pick your choice"
                style={{ marginBottom: 25 }}>
                <Text style={[CommonStyles.heading, { marginBottom: 15 }]}>
                  How do you want to be paid?
                </Text>
                <View style={[CommonStyles.flexrow]}>
                  <Radio value="Milestone" my={1}>
                    {' '}
                  </Radio>
                  <View style={{ width: '90%' }}>
                    <Text style={CommonStyles.heading}>By Milestone</Text>
                    <Text style={CommonStyles.para}>
                      Divide the project into small segments,called
                      milestone.You'll be paid for milestone as completed and
                      approved.
                    </Text>
                  </View>
                </View>
                <View style={CommonStyles.flexrow}>
                  <Radio value="Project" my={1}>
                    {' '}
                  </Radio>
                  <View style={{ width: '90%' }}>
                    <Text style={CommonStyles.heading}>By Project</Text>
                    <Text style={CommonStyles.para}>
                      Get your entire payment at the end, when all the work has
                      been delivered.
                    </Text>
                  </View>
                </View>
              </Radio.Group>

            {this.state.paidType === 'Milestone' ? (
              <View style={styles.bymilestone}>
                <Text style={[CommonStyles.heading, {marginBottom: 25}]}>
                  How many milestone do you want to include?
                </Text>
                <TouchableOpacity style={CommonStyles.formgroup} onPress={()=>this.addMilestone()}>
                                    <Text style={[CommonStyles.heading, CommonStyles.activetext, { textAlign: 'right' }]}>+ ADD Milestone</Text>
                                </TouchableOpacity>

                  {this.state.milestoneArray &&
                    this.state.milestoneArray.map((element, index) => (
                      <View style={CommonStyles.row}>
                        <View style={styles.col33}>
                          <View style={CommonStyles.formgroup}>
                            <TextInput
                              value={element.description}
                              //onChangeText={(text) => this.setState({description:text})}
                              onChangeText={text =>
                                this.handleChangeName(text, index)
                              }
                              style={CommonStyles.formcontrol}
                              placeholder="Milstone Name"
                              placeholderTextColor="#ccc"
                            />

                            <View style={CommonStyles.formtextwrap}>
                              <Text style={CommonStyles.formtext}>
                                Description
                              </Text>
                            </View>
                            {this.state.milestoneName === '' &&
                              this.state.milestoneNameError != '' ? (
                              <Text style={{ color: 'red' }}>
                                {this.state.milestoneNameError}
                              </Text>
                            ) : null}
                          </View>
                        </View>

                        <View style={styles.col33}>
                          <View style={CommonStyles.formgroup}>
                            {/* <TextInput
                                                value={this.state.milestoneDate}
                                                onChangeText={(text) => this.setState({ milestoneDate: text })}
                                                style={CommonStyles.formcontrol} placeholder="Choose date" placeholderTextColor="#ccc" /> */}

                            <View style={CommonStyles.formtextwrap}>
                              <Text style={[CommonStyles.formtext, { bottom: 10 }]}>
                                Due date
                              </Text>
                            </View>
                            <DatePicker
                              style={styles.datePickerStyle}
                              date={element.dueDate} // Initial date from state
                              mode="date" // The enum of date, datetime and time
                              placeholder="select date"
                              //confirmBtnText={date=>{this.setState({dueDate:date})}}
                              format="YYYY-MM-DD"
                              minDate={moment().toDate()}
                              maxDate="2050-01-01"
                              //confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              customStyles={{
                                dateIcon: {
                                  //display: 'none',
                                  position: 'absolute',
                                  left: 5,
                                  top: 4,
                                  right: 10,
                                },
                                dateInput: {
                                  marginLeft: 10,
                                },
                              }}
                              //onPressDate={date=>this.setState({dueDate:date})}
                              onDateChange={date =>
                                this.handleChangeDueDate(date, index)
                              }
                            />

                            {/* {this.state.milestoneDate === ""  &&
                                         this.state.milestoneDateError != ''  ? (
                                <Text style={{ color: 'red' }}>{this.state.milestoneDateError }</Text>
                            ) : null} */}
                          </View>
                        </View>
                        <View style={styles.col33}>
                          <View style={[CommonStyles.formgroup, styles.dwrap]}>
                            {/* <TouchableOpacity style={styles.delete}>
                                                <Text style={{ fontSize: 24, color: '#242933' }}>x</Text>
                                               
                                            </TouchableOpacity> */}
                          <TextInput
                            value={element.amount}
                            onChangeText={text =>
                              this.handleChangeAmount(text, index)
                            }
                            style={CommonStyles.formcontrol}
                            placeholder="$42"
                            placeholderTextColor="#ccc"
                          />
                          <View style={CommonStyles.formtextwrap}>
                            <Text style={CommonStyles.formtext}>Amount</Text>
                          </View>
                          {this.state.milestoneAmount === '' &&
                          this.state.milestoneAmountError != '' ? (
                            <Text style={{color: 'red'}}>
                              {this.state.milestoneAmountError}
                            </Text>
                          ) : null}
                          {this.state.milestoneArray && this.state.milestoneArray.length == 1 ?
                            // <TouchableOpacity
                            //   style={CommonStyles.formgroup}
                            //   disabled
                            //   //onPress={() => this.removeMilestone(index)}
                            //   >
                            //   <Text
                            //     style={[
                            //       CommonStyles.heading,
                            //       //CommonStyles.activetext,
                            //       {textAlign: 'right',color:"grey"},
                            //     ]}>
                            //     REMOVE
                            //   </Text>
                            // </TouchableOpacity>
                            null
                            :
                            <TouchableOpacity
                              style={CommonStyles.formgroup}
                              onPress={() => this.removeMilestone(index)}
                              >
                                <Text
                                  style={[
                                    CommonStyles.heading,
                                    CommonStyles.activetext,
                                    { textAlign: 'right' },
                                  ]}>
                                  REMOVE
                                </Text>
                              </TouchableOpacity>
                            }

                          </View>
                        </View>
                      </View>
                    ))}

                {/* <TouchableOpacity style={CommonStyles.formgroup} onPress={()=>this.addMilestone()}>
                                    <Text style={[CommonStyles.heading, CommonStyles.activetext, { textAlign: 'right' }]}>+ ADD Milestone</Text>
                                </TouchableOpacity> */}
              </View>
            ) : (
                <View style={styles.byproject}>
                  <Text style={[CommonStyles.heading, { marginBottom: 15 }]}>
                    What is the full amount you'd like to bid for this job?
                  </Text>
                  <View style={[CommonStyles.rowbetween, { marginBottom: 25 }]}>
                    <View style={styles.mtextbox}>
                      <Text
                        style={[CommonStyles.heading, CommonStyles.activetext]}>
                        Bid
                      </Text>
                      <Text style={[CommonStyles.para]}>
                        Total Amount that client will see
                      </Text>
                    </View>
                    <View style={styles.minputwrap}>
                      <View style={styles.borderbox}>
                        <Text style={styles.doller}>$</Text>
                        <TextInput
                          value={this.state.totalAmount}
                          onChangeText={text =>
                            this.setState({ totalAmount: text })
                          }
                          style={{
                            width: 35,
                            height: 35,
                            fontSize: 14,
                            textAlign: 'center',
                            top: 5,
                          }}
                          placeholder="25"
                          placeholderTextColor="#ccc"
                        />
                        <Text style={styles.hrtext}>Hr</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[CommonStyles.rowbetween, { marginBottom: 25 }]}>
                    <View style={styles.mtextbox}>
                      <Text
                        style={[CommonStyles.heading, CommonStyles.activetext]}>
                        Gouruu Service Fee
                      </Text>
                      <Text style={[CommonStyles.para]}>
                        The Gouruu Service fee is 20% when you begin a contract
                        with a new client. Once you bill over $500 with your
                        client the fee will be 10%
                      </Text>
                    </View>
                    <View style={styles.minputwrap}>
                      <View style={styles.borderbox}>
                        <Text style={styles.doller}>$</Text>
                        <Text style={CommonStyles.heading}>
                          {this.state.totalAmount * 0.2}
                        </Text>
                        <Text style={styles.hrtext}>Hr</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[CommonStyles.rowbetween, { marginBottom: 25 }]}>
                    <View style={styles.mtextbox}>
                      <Text
                        style={[CommonStyles.heading, CommonStyles.activetext]}>
                        You Will Receive
                      </Text>
                      <Text style={[CommonStyles.para]}>
                        The estimated amount you will receive after service fee is
                      </Text>
                    </View>
                    <View style={styles.minputwrap}>
                      <View style={styles.borderbox}>
                        <Text style={styles.doller}>$</Text>
                        <Text style={CommonStyles.heading}>
                          {this.state.totalAmount * 0.8}
                        </Text>
                        <Text style={styles.hrtext}>Hr</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              <View style={CommonStyles.formgroup}>
                <TouchableOpacity
                  style={CommonStyles.primarybutton}
                  onPress={() => this.onNext()}>
                  <Text style={CommonStyles.btntext}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

        </KeyboardAwareScrollView>
      </NativeBaseProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state,
  };
};



export default connect(mapStateToProps, null)(ApplyJobs);
