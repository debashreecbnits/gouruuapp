import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api';
import { FREELANCER_AVAILABILITY, AVAILABILITY_SERVICE_PROVIDER } from '../../shared/allApiUrl';
import { AccordionList } from 'accordion-collapse-react-native';
import styles from './Styles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { updateProfile } from '../../Store/Actions/Action';


class Calendarr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            freelancerId: this.props?.navigation?.state?.params?.freelancerId ? this.props?.navigation?.state?.params?.freelancerId : this.props?.userData?.userDetails?.data?.id,
            availibilityListArray: [],
            markedDay: {},
            userType: this.props?.userData?.userDetails?.data?.user_type,
            timeArray2: ""
        }
    }

    componentDidMount() {
        this.getAvailibilityCalendar()
    }

    getAvailibilityCalendar = async () => {
        var formData = new FormData();
        //let userId = this.props.userData.userDetails.data.id

        formData.append('userid', this.state.freelancerId);

        await apiCallWithToken(FREELANCER_AVAILABILITY, 'post', formData).
            then((resp) => {
                
                this.setState({ availibilityListArray: resp.data.Data });

                this.calendarMarkdate(this.state.availibilityListArray)
                
                const tmp = moment(this.state.availibilityListArray.times).format("HH:mm")
                
            }).catch(err => {
                console.log(err);

            })

    }

    calendarMarkdate = (data) => {
        //calendar first section 
        var markedDayy = {};
        var dateObj = new Date();
        var newdatetoday = moment(dateObj).format("YYYY-MM-DD")
        data && data.length > 0 && data.map((item) => {

            // markedDayy[item.date] = {
            //     selected: true,
            //     //marked: true,
            //     selectedColor: "blue",

            // }
            var monthdate = item.date
            if (item.date > newdatetoday && moment(monthdate).format("MMMM") === moment().format("MMMM")) {
                markedDayy[item.date] = {
                    selected: true,
                    //marked: true,
                    selectedColor: "blue",

                }
            }
            // else {
            //     markedDayy[item.date] = {
            //         selected: true,
            //         //marked: true,
            //         selectedColor: "grey",
            //     }
            // }


        })
        this.setState({ markedDay: markedDayy })

        // data && data.length > 0 && data.map((item) => {
        //     if (item.date > newdatetoday) {
        //         markedDayy[item.date] = {
        //             selected: true,
        //             //marked: true,
        //             selectedColor: "blue",

        //         }
        //     } else {
        //         markedDayy[item.date] = {
        //             selected: true,
        //             //marked: true,
        //             selectedColor: "red",
        //         }
        //     }

        // })
        // this.setState({markedDay(markedDayy)})
    }
    removeTime = async (value, date) => {
        // let tempArr = this.state.timeArray;
        // tempArr.splice(index);
        // this.setState({ timeArray: tempArr })
        const temp =[value] 
        

      

        var formData = new FormData();
        //let userId = this.props.userData.userDetails.data.id

        formData.append('userid', this.state.freelancerId);
        formData.append('date', date.date);
        formData.append('times', JSON.stringify(temp));
        formData.append('action_type', 'delete');

        await apiCallWithToken(AVAILABILITY_SERVICE_PROVIDER, 'post', formData).
            then((resp) => {
            }).catch(err => {
                console.log(err);

            })
    }

    _head = (item) => {


        return (
            <View style={[styles.itempartb2, { backgroundColor: "#3e1bee", alignItems: 'center', height: 60, flexDirection: "row" }]}>
                <View style={[styles.itempartb4, { backgroundColor: "#f9f9f9", alignItems: 'center', justifyContent: "center" }]}>

                    <Text style={[styles.datetext, {}]}>{item.date}</Text>

                </View>
                <Text style={[CommonStyles.heading, { color: '#fff' }]}>Show Availability</Text>
            </View>
        );
    }

    _body = (item) => {
        

        const timeArray = item.times.map((vl) => (vl)).join(", ")

        console.log("timearray==>",timeArray)

      
        // const workoutSectionType = item.exercises[0].workout_type


        return (

            // <View style={[styles.itempartb2,]}>
            //     <Text style={styles.datetext2}>Time availability : {timeArray}</Text>

            // </View>
            <>
                {this.state?.userType && this.state?.userType != "" && this.state?.userType === "Service Provider" ?
                    <View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>

                        {item.times.map((val, index) => {
                            return (
                                <>
                                    <View key={index} style={[CommonStyles.filltags, CommonStyles.flexrow]}>
                                        <Text style={[CommonStyles.tagtext]}>{val}</Text>
                                        <TouchableOpacity onPress={() => this.removeTime(val, item)}>
                                            <Icon name="close-circle" size={15} color="#757575" style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>

                                    </View>
                                </>
                            )

                        })
                        }

                    </View> :
                    <View style={[CommonStyles.card,{width:"90%",marginHorizontal:"5%"}]}>


                        <View style={[CommonStyles.cardbody]}>
                            <Text style={[CommonStyles.tagtext]}>{timeArray}</Text>

                        </View>
                    </View>
                }
            </>

        )


    }

    render() {
        return (
            <View style={[CommonStyles.wrapper]}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Availability</Text>
                    </View>
                </ImageBackground>
                <Calendar
                    //style={{top:20}}
                    //markingType={'period'}
                    // markedDates={{
                    //     '2022-03-15': { marked: true, dotColor: '#50cebb' },
                    //     '2022-03-16': { marked: true, dotColor: '#50cebb' },
                    //     '2022-03-21': { startingDay: true, color: '#3742fa', textColor: 'white' },
                    //     '2022-03-22': { color: '#5352ed', textColor: 'white' },
                    //     '2022-03-23': { color: '#5352ed', textColor: 'white', marked: true, dotColor: 'white' },
                    //     '2022-03-24': { color: '#5352ed', textColor: 'white' },
                    //     '2022-03-25': { endingDay: true, color: '#3742fa', textColor: 'white' }
                    // }}
                    markedDates={this.state.markedDay}
                />
                <View style={styles.row}>
                    <Text style={[styles.h1, styles.themetext]}>Upcoming Availability</Text>
                    {/* <Text style={[styles.h1, styles.themetext]}>({workoutDateLimit.length})</Text> */}
                </View>
                <ScrollView>

                    <AccordionList
                        list={this.state.availibilityListArray}
                        header={this._head}
                        body={this._body}
                    //keyExtractor={item => `${item.id}`}
                    />
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendarr);

//export default Calendarr;