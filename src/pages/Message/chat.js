import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, FlatList, Dimensions ,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style'
import CommonStyles from '../../../CommonStyles';
import Firebase from '../../Firebase/firebase';
import { updateDisableDashboard } from '../../Store/Actions/Action';
import { connect } from 'react-redux';
import { SendMessage, RecieveMessage } from "./customFunction";
import { apiCallWithToken } from '../../Api';
import { GET_CHAT, INSERT_CHAT } from '../../shared/allApiUrl';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //messages: [],
            message: '',
            currentUid: this.props?.userData?.userDetails?.data?.id,
            guestUid: this.props.navigation?.state?.params?.receiverid ? this.props.navigation.state.params.receiverid : this.props.navigation.state.params.chatListReceiverId,
            name: this.props?.navigation?.state?.params?.name ? this.props.navigation.state.params.name : this.props?.navigation?.state?.params?.chatListReceiverName,
            allMessages: [],
            threadId: Date.now(),
            blockStatusStore:[],
        }
    }

    componentDidMount() {
        this.getChatInformation();
    }

    getChatInformation = async () => {
        var formData = new FormData();
        formData.append('receiver_id', this.props?.userData?.userDetails?.data?.id);
        formData.append('sender_id', this.props.navigation?.state?.params?.receiverid ? this.props.navigation.state.params.receiverid : this.props.navigation.state.params.chatListReceiverId);

        await apiCallWithToken(GET_CHAT, 'post', formData)
            .then((res) => {
                if (res.data.data.ack === 1) {
                    let threadId = parseInt(res.data.data.chat_details[0].thread_id)
                    this.setState({ threadId: threadId })
                    this.setState({ blockStatusStore :res?.data?.data?.block_status[0]})
                    
                   
                }
                try {
                    let message = [];
                    Firebase.database().
                        ref().
                        child('messages').
                        orderByChild('threadId').
                        equalTo(this.state.threadId).
                        once('value').
                        then((snapshot) => {
                            if (snapshot.val()) {
                                var listMesage = [];
                                for (let key in snapshot.val()) {
                                    listMesage.push(snapshot.val()[key]);
                                }
                                this.setState({
                                    allMessages: listMesage
                                });
                            }
                        }).catch((Err) => {
                            this.setState({
                                loader: false
                            })
                        })
                } catch (error) {
                    alert(error)
                }
            })
            .catch((err) => {
                console.log("error==>", err);
            });
    };


    SendMessage = async () => {
        
        if(this.state.blockStatusStore.is_blocked === 1 && this.state.blockStatusStore?.blockeduser_id === this.state.currentUid) {
            
          
            Alert.alert(
                "",
                "You are Blocked !!",
                [
                   
                    {
                        text: "Ok",
                        style: "cancel",
                        //onPress: () => {this.setState({toggle:false})}
                        
                    },
                ],
          
            ) 
        }
            else if(this.state.blockStatusStore.is_blocked === 1 && this.state.blockStatusStore?.blockinguser_id === this.state.currentUid ) {
                Alert.alert(
                    "",
                    "Unblock this freelancer to send a message !!",
                    [
                       
                        {
                            text: "Ok",
                            style: "cancel",
                            //onPress: () => {this.setState({toggle:false})}
                            
                        },
                    ],
              
                ) }
                
        else {this.state.message &&
            SendMessage(this.state.currentUid, this.state.guestUid, this.state.message, this.state.name, this.state.threadId)
                .then(async (res) => {
                    var formData = new FormData();
                    formData.append('sender_id', this.state.currentUid);
                    formData.append('receiver_id', this.state.guestUid);
                    formData.append('thread_id', this.state.threadId);
                    formData.append('message', this.state.message);
                    console.log("formdata==>",formData)
                    await apiCallWithToken(INSERT_CHAT, 'post', formData)
                        .then((res) => {
                            this.setState({ message: '' })
                            this.getChatInformation()
                        })
                        .catch((err) => {
                            alert(err)
                            console.log("err",err)
                        })
                })
                .catch((err) => {
                    alert(err)
                })
        }
        
    }
    

    render() {
        return (
            <View style={styles.wrapper}>
                {/* <SafeAreaView style={styles.nopadd}> */}
                <ImageBackground source={require('../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
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
                        <Text style={CommonStyles.htitle}>{this.state.name}</Text>
                    </View>
                    <View style={CommonStyles.Trighticon}>
                        <TouchableOpacity>
                            <Icon name="ellipsis-vertical" color="#fff" size={24} />
                        </TouchableOpacity>
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
                    <View style={[styles.container, styles.pt20]}>
                        <ScrollView
                            ref={(ref) => (this.scrollView = ref)}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollTo(0);
                                this.scrollView.scrollToEnd({ animated: true });
                            }}
                        >
                            {this.state.allMessages.map((item, key) =>
                                <View style={{ alignSelf: this.state.currentUid === item.reciever ? 'flex-start' : 'flex-end' }}>
                                    <View style={{
                                        padding: 5,
                                        maxWidth: '80%',
                                        marginLeft: 'auto',
                                        marginRight: 10,
                                        paddingVertical: 5,
                                        position: 'relative',
                                        marginBottom: 10,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        minWidth: 20,
                                        borderTopLeftRadius: this.state.currentUid === item.sender ? 30 : 0,
                                        borderTopRightRadius: 30,
                                        borderBottomRightRadius: this.state.currentUid === item.sender ? 0 : 30,
                                        borderBottomLeftRadius: 30,
                                        backgroundColor: this.state.currentUid === item.sender ? '#383CC1' : '#ccc'
                                    }}>
                                        <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold', color: this.state.currentUid === item.sender ? '#fff' : '#242B2E' }}>
                                            {item.msg}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>

                    <View style={styles.absfooter}>
                        {/* <Text style={[styles.date, { textAlign: 'right' }]}>11:27</Text> */}
                        <View style={styles.rbox}>
                            <TextInput
                                style={{ width: '85%' }}
                                onChangeText={(text) => this.setState({ message: text })}
                                placeholder="Your Message..."
                                value={this.state.message}
                            />
                            
                            <TouchableOpacity
                                onPress={() => this.SendMessage()}
                            >
                                <Icon name="md-paper-plane" size={25} color="#3e1bee" />
                            </TouchableOpacity>

                        </View>
                        {/* <GiftedChat
                        messages={this.state.messages}
                        user={this.user}
                        onSend={Firebase.shared.send}
                    /> */}
                    </View>

                </KeyboardAwareScrollView>
                {/* </SafeAreaView> */}
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);