import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    ImageBackground,
    Modal
} from 'react-native';
import {
    NativeBaseProvider, Radio,
    ActionSheet
} from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { connect } from 'react-redux';
import { updateDisableDashboard } from '../../../Store/Actions/Action';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import ActionSheet from 'react-native-actionsheet';
import { apiCallWithToken } from '../../../Api';
import { GET_DRAFTLIST } from '../../../shared/allApiUrl';
import Entypo from 'react-native-vector-icons/Entypo'

var BUTTONS = ['Option 1', 'Option 2', 'Option 3', 'Delete', 'Cancel'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
var store
class PostRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            value: 'short term',
            valuefirst: 'create job post',
            duration: '',
            durationError: '',
            userId: '',
            listStore: [],
            selectedListItem: [],
            userId2: this.props?.userData?.userDetails?.data?.id,

        };
    }

    componentDidMount() {
        this.onDraftActionList()
        this.props.updateDisableDashboard(false);

        this.props.navigation.addListener('didFocus', () => {
            this.props.updateDisableDashboard(false);
        });
        this.setState({ userId: this.props?.userData?.userDetails?.data?.id })

    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    showActionSheet = () => {
        //this.ActionSheet.show()
        ActionSheet.show(
            {
                options: [
                    { text: this.state.listStore[0].title, icon: "chatbubbles", iconColor: "#a2272e" },
                    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
                ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 1,
                title: "Post Action Sheet"
            },

            buttonIndex => {
                switch (buttonIndex) {
                    case 0: console.log("switch==>", this.state.listStore[0]);
                        break;
                    default:
                        break;
                }
            }
        )

    }

    onDraftActionList = async () => {
        var formData = new FormData();
        formData.append('user_id', this.state.userId2);

        await apiCallWithToken(GET_DRAFTLIST, 'post', formData).then(res => {
            console.log("draft list==>",res)
            if (res.data.message.status == 1) {
                this.setState({ listStore: res?.data?.message?.draft_list })
                console.log("list store==>",this.state.listStore)
                //this.ActionSheet.show()
                if (this.state?.listStore) {
                    this.state.listStore.map(item => this.state.selectedListItem.push(item.title));
                    //this.state.listStore.map(item => this.setState({selectedListItem : item.title}));
                }
                store = JSON.stringify(this.state.selectedListItem)
            }




        }).catch(err => {
            console.log(err)
        })

    }


    onNext = () => {
          this.props.navigation.navigate('PostStep1', { data: this.state })
        }
    
        closeModal = (value) => {
            this.setState({modalVisible : value})
        }
    
    render() {
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
                            <Text style={CommonStyles.htitle}>Job Post</Text>
                        </View>
                    </ImageBackground>

                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.keyboardContainer}
                        enableAutomaticScroll={true}
                        scrollEnabled={false}
                        extraScrollHeight={60}
                        behavior="padding"
                        enabled
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="none"
                    >
                        <ScrollView>
                            <View style={[CommonStyles.container, CommonStyles.nobg]}>
                                <View style={styles.bdrbtm}>
                                    <Text style={styles.h2}>Get Started</Text>
                                    <Text style={styles.ptext}>What Would you like to do?</Text>
                                </View>
                                <Radio.Group
                                    name="myRadioGroup"
                                    value={this.state.valuefirst}
                                    onChange={(nextValue) => {
                                        this.setState({ valuefirst: nextValue })
                                    }}>

                                    <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                        <Radio value="create job post" my={1} ml={2} >
                                            <Text style={styles.label}>Create a new job post</Text>
                                        </Radio>
                                    </ImageBackground>
                                    <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                        <Radio value="existing job post" my={1} ml={2}
                                            onPress={() => this.setModalVisible(true)}
                                        >
                                            <Text style={styles.label}>Existing job post</Text>
                                        </Radio>
                                    </ImageBackground>
                                </Radio.Group>
                                <Radio.Group
                                    name="myRadioGroup2"
                                    defaultValue={this.state.value}
                                    onChange={(nextValue) => {
                                        this.setState({ value: nextValue });
                                    }}
                                >

                                    <Text style={styles.formlabel}>Type of the project</Text>
                                    <View style={styles.whitebox}>
                                        <View style={[CommonStyles.row]}>
                                            <View style={[CommonStyles.col50]}>
                                                <View style={this.state.value === "short term" ? styles.borderbox : styles.borderbox1}>
                                                    <Radio value="short term">
                                                        <Text style={styles.label2}>Short Term </Text>
                                                    </Radio>
                                                </View>
                                            </View>
                                            <View style={CommonStyles.col50}>
                                                <View style={this.state.value === "long term" ? styles.borderbox : styles.borderbox1}>
                                                    <Radio value="long term">
                                                        <Text style={styles.label2}>Long Term </Text>
                                                    </Radio>
                                                </View>
                                            </View>


                                        </View>
                                    </View>

                                </Radio.Group>
                                {/* <ImageBackground source={require('../../../assets/images/radiobg2.png')} style={styles.radiobg2} resizeMode="stretch">
                                        <Text style={[styles.formlabel, { marginHorizontal: 15 }]}>Duration of the project</Text>
                                        <TextInput placeholder="eg: 2hr" placeholderTextColor="#ddd" style={[styles.inputform, { width: 100, marginRight: 15, backgroundColor: '#fff', height: 40 }]}
                                            defaultValue={this.state.duration}
                                            onChangeText={(text) => {
                                                this.setState({ duration: text });
                                            }}
                                        />

                                        {/* {this.state.durationError != '' ? (
                                            <Text style={styles.errortext}>{this.state.durationError}</Text>
                                        ) : null} */}


                                {/* </ImageBackground>  */}
                                <View style={styles.centeredView}>
                                    <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
                                        <ScrollView>
                                            <View style={styles.centeredView}>
                                              
                                                <View 
                                                style={[styles.modalView]}>
                                                <TouchableOpacity
                                                    style={[styles.modalCross,{right:5,top:5}]}
                                                    onPress={() => this.closeModal(false)}
                                                >
                                                    <Entypo
                                                       
                                                        name="circle-with-cross"
                                                        color="#3742fa"
                                                        size={35}
                                                    />
                                                </TouchableOpacity>
                                                    {
                                                        this.state.listStore.length > 0  ?
                                                            this.state.listStore.map((val, index) => {

                                                                return (
                                                                    <TouchableOpacity
                                                                      key={index} 
                                                                    style={[CommonStyles.formgroup2]}
                                                                    onPress={() => this.props.navigation.navigate('PostStep1', { draftPostId: val.id, draftUserId: val.user_id, draftValueDetails:val, data: this.state}) && this.setState({modalVisible:false})}
                                                                     //onPress={() => this.props.navigation.navigate('PostStep5', { draftPostId: val.id, draftUserId: val.user_id, draftValueDetails:val, data: this.state}) && this.setState({modalVisible:false})}
                                                                     >

                                                                        <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}>{val.title}</Text>


                                                                    </TouchableOpacity>
                                                                )

                                                            }
                                                            ) : <Text style={[CommonStyles.formtext, { paddingBottom: 10, fontWeight: '600' }]}> No Existing job found...</Text>
                                                    }

                                                </View>
                                            </View>
                                        </ScrollView>
                                    </Modal>

                                </View>


                                <View style={CommonStyles.row}>
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
                    </KeyboardAwareScrollView>

                </NativeBaseProvider>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state,
        profileData: state.userDetails.profileDetails,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDisableDashboard: data => dispatch(updateDisableDashboard(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRequest);
