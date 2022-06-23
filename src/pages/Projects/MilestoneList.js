import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, } from 'react-native';
import { NativeBaseProvider, Select, CheckIcon } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../../components/Searchbar/index';
import { connect } from 'react-redux';
import { MILESTONELIST } from '../../shared/allApiUrl';
import { apiCallWithToken } from '../../Api';
import moment from 'moment';

class MilestoneList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            milestoneListArray: [],
            freelancerNameStore:[]
        };
    }

    componentDidMount() {
        this.getmilestoneList()
    }
    getmilestoneList = async () => {

        var formData = new FormData();
        let jobId = this.props?.navigation?.state?.params?.projectId

        formData.append('job_id', jobId);    
        await apiCallWithToken(MILESTONELIST, 'post', formData)
            .then((resp) => {
                this.setState({ milestoneListArray: resp?.data?.message?.job_list });
                this.setState({ freelancerNameStore: resp?.data?.message?.user_list})
            }).catch(err => {
                console.log(err)
            })

    }

    render() {

        return (
            <NativeBaseProvider style={CommonStyles.wrapper}>
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Milestone List</Text>
                    </View>
                   
                </ImageBackground>

                <ScrollView>
                    

                        <View  style={CommonStyles.container}>

                            

                            {this.state.milestoneListArray && this.state.milestoneListArray.length ? this.state.milestoneListArray.map((item, index) => (
                                <View  key={index} style={CommonStyles.card}>
                                    <View style={CommonStyles.cardbody}>
                                      
                                        {/* <Text  style={styles.grtext}>Freelancer Name : {item.first_name}</Text> */}
                                      
                                        <View style={CommonStyles.rowbetween}>
                                            <Text style={styles.pageheding}>title : {item.title}</Text>

                                        </View>
                                        <Text style={CommonStyles.para}>description : {item.description}</Text>



                                    </View>

                                    <TouchableOpacity
                                        style={[
                                            CommonStyles.primarybutton,
                                            CommonStyles.btnsm, { bottom: 5 }
                                        ]}
                                        onPress={() =>
                                            this.props.navigation.navigate('ProjectDetails2', { freelancerId: item?.freelancer_id, jobId: item?.job_id })
                                            

                                        }>
                                        <Text
                                            style={[
                                                CommonStyles.btntext,
                                                CommonStyles.btnsmtext,
                                            ]}
                                        >
                                            Details
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                )) :
                        <Text>No list found</Text>
                        
                        }


                            





                        </View>

                   
                </ScrollView>
            </NativeBaseProvider>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};
export default connect(mapStateToProps, null)(MilestoneList);
