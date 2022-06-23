import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground } from 'react-native'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles';
import DatePicker from 'react-native-datepicker';
import { Select, NativeBaseProvider, Radio, } from 'native-base';
import { apiCallWithToken } from '../../Api';
import { CREATE_MILESTONE, ACCEPT_REJECT_JOB_PROPOSAL } from '../../shared/allApiUrl';
import moment from 'moment';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

            paidType: "milestone",
            // milestoneName: "",
            // milestoneNameError: "",
            // milestoneDate: "",
            // milestoneDateError: "",
            // milestoneAmount: "",
            // milestoneAmountError: "",
            // totalAmount: '',
            // serviceFee: '',
            // receiveAmount: '',
            milestoneArray: [{description: '', dueDate: '', amount: ''}],
            description: '',
            dueDate: "",
            amount: '',
            freelanceId: this.props.navigation.state.params.freelancerId,
            clientId: this.props.navigation.state.params.clientId,
            jobId: this.props.navigation.state.params.jobId,
            proposalId: this.props.navigation.state.params.proposalId

        }
    }

    

    handleMilestone = async () => {
        var formData = new FormData();
        // let userId = await getUserId()
        formData.append('freelancerid', this.state.freelanceId)
        formData.append('clientid', this.state.clientId);
        formData.append('jobid', this.state.jobId);
        formData.append('delivery_days', 10);
        formData.append('payment_type', this.state.paidType);
        formData.append('milestone', JSON.stringify(this.state.milestoneArray));
        await apiCallWithToken(CREATE_MILESTONE, 'post', formData).then(res => {
            this.props.navigation.navigate('ProposalList', { userid: this.state.clientId, jobIdd: this.state.jobId, proposalid: this.state.proposalId, delivery_days: 10, action_type: 'accept' })

        }).catch(err => {
            console.log(err);
        })

    }

    handleChangeName = (text, index) => {
        let inputArr = [...this.state.milestoneArray];
        inputArr[index].description = text;
        this.setState({milestoneArray: inputArr});
      };
    
      handleChangeAmount = (text, index) => {
        let inputArr = [...this.state.milestoneArray];
        inputArr[index].amount = text;
        this.setState({milestoneArray: inputArr});
      };
    
      handleChangeDueDate = (date, index) => {
        //this.setState({dueDate:date})
        let inputArr = [...this.state.milestoneArray];
        inputArr[index].dueDate = date;
        this.setState({milestoneArray: inputArr});
      };
    
    
      addMilestone = () => {
        this.setState({
          milestoneArray: [
            ...this.state.milestoneArray,
            {description: '', amount: '', dueDate: ''},
          ],
        });
      };
    
      
    
      removeMilestone = (index, element) => {
        this.state.milestoneArray.splice(index, 1);
        this.setState({milestoneArray: this.state.milestoneArray});
      };
    

    render() {
        return (

            <NativeBaseProvider style={[CommonStyles.wrapper, { backgroundColor: '#f0f0f0' }]}>
                {/* <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Add Milestone</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View> */}

                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Add Milestone</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ScrollView>
                    <View style={[CommonStyles.container]}>


                        <Radio.Group
                            value={this.state.paidType}
                            onChange={(nextValue) => {
                                this.setState({ paidType: nextValue });
                            }}

                            name="myRadioGroup"
                            accessibilityLabel="Pick your choice"
                            style={{ marginBottom: 25 }}
                        >
                            <Text style={[CommonStyles.heading, { marginBottom: 15 }]}>How do you want to be paid?</Text>
                            <View style={[CommonStyles.flexrow]}>
                                <Radio value="milestone" my={1}>   </Radio>
                                <View style={{ width: '90%' }}>
                                    <Text style={CommonStyles.heading}>By Milestone</Text>
                                    <Text style={CommonStyles.para}>Divide the project into small segments,called milestone.You'll be paid for milestone as completed and approved.</Text>
                                </View>
                            </View>

                        </Radio.Group>
                        {/* <View style={CommonStyles.formgroup}>
                              <Text style={styles.formlabel}>Milestone Description (optional)</Text>
                                <TextInput style={[styles.inputform, {height:90}]} placeholder="Write Here ..." placeholderTextColor="#ccc" />
                           </View> */}


                        <View style={styles.bymilestone}>
                            <Text style={[CommonStyles.heading, { marginBottom: 25 }]}>How many milestone do you want to include?</Text>
                             <TouchableOpacity
                                onPress={() => this.addMilestone()}
                                style={CommonStyles.formgroup}>
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
                            <Text style={{color: 'red'}}>
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
                            <Text style={[CommonStyles.formtext, {bottom: 10}]}>
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
                                  {textAlign: 'right'},
                                ]}>
                                REMOVE
                              </Text>
                            </TouchableOpacity>
  }

                        </View>
                      </View>
                    </View>
                  ))}
                           
                        </View>






                        <View style={CommonStyles.formgroup}>
                            <TouchableOpacity
                                onPress={() => this.handleMilestone()}
                                style={CommonStyles.primarybutton}>
                                <Text style={CommonStyles.btntext}>Create Milestone</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </NativeBaseProvider>

        )
    }
}
