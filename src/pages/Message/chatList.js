import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './style';
import CommonStyles from '../../../CommonStyles';
import { apiCallWithToken } from '../../Api';
import { CHAT_LIST } from '../../shared/allApiUrl';
import moment from 'moment';
import { connect } from 'react-redux';

class chatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatListStore: [],
      userId: this.props?.navigation?.state?.params?.userId,
    };
  }

  componentDidMount() {
    this.getChatListInformation();
  }

  getChatListInformation = async () => {
    var formData = new FormData();
    formData.append('receiver_id', this.props?.userData?.userDetails?.data?.id);
    await apiCallWithToken(CHAT_LIST, 'post', formData)
      .then(res => {
        if (res.data.ack === 1) {
          this.setState({ chatListStore: res.data.result });
        }
      })
      .catch(err => {
        console.log('error==>', err);
      });
  };

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
            <Text style={CommonStyles.htitle}>Message</Text>
          </View>
          <View style={CommonStyles.Trighticon}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationList')} >
              <Image
                source={require('../../assets/images/notification.png')}
                resizeMode="contain"
                style={CommonStyles.ticon}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.msglist}>
              {this.state.chatListStore.map((item, idx) => {
                return (
                  <>
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        //  this.props?.userData?.userDetails?.data?.user_type === "Client" ? this.props.navigation.navigate('chat',{chatListReceiverId:item.receiver_id, chatListReceiverName:item.receiver_name}):
                        this.props.navigation.navigate('chat', {
                          chatListReceiverId:
                            item.sender_id ==
                              this.props?.userData?.userDetails?.data?.id
                              ? item.receiver_id
                              : item.sender_id,
                          chatListReceiverName:
                            item.sender_id === this.state.userId
                              ? item.receiver_name
                              : item.sender_name,
                          chatListSenderName: item.receiver_name,
                        })
                      }>
                      <View style={styles.msgbox}>
                        {/* <View style={[styles.badge]}></View> */}
                        <View style={styles.avatar}>
                          {item.receiver_profileImage && item.sender_profileImage ?
                            <Image
                              source={{
                                uri:
                                  item.sender_id ===
                                    this.state.userId
                                    ? item.receiver_profileImage
                                    : item.sender_profileImage
                              }}
                              style={styles.avtarimg}
                            />
                            :
                            <Image source={require("../../assets/images/noimage.png")}
                              style={styles.avtarimg}
                            />
                          }
                        </View>
                        <View style={styles.msgbody}>
                          <View style={styles.rowjustify}>
                            <Text
                              style={styles.msgheading}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {item.sender_id === this.state.userId
                                ? item.receiver_name
                                : item.sender_name}
                            </Text>
                            {/* <Text style={styles.msgdate}>{moment(item.time).format('hh:mm A')}</Text> */}
                            <Text style={styles.msgdate}>{item.time}</Text>
                          </View>
                          <Text style={styles.msgtext} numberOfLines={4}>
                            {item.last_message}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
              {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>
                                        <View style={[styles.badge, {backgroundColor:'#72d64b'}]}></View> 
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt2.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Emily</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                      
                                    </View>
                                  </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>                                       
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt3.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Daniel</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                          
                                    </View>
                                  </View>
                                  </TouchableOpacity>
                                    <View style={styles.msgbox}>                                        
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt1.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Sophie</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                           
                                    </View>
                                  </View>
                                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>
                                        <View style={[styles.badge, {backgroundColor:'#72d64b'}]}></View> 
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt2.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Emily</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                      
                                    </View>
                                  </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>                                       
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt3.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Daniel</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                          
                                    </View>
                                  </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>                                        
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt1.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Sophie</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                           
                                    </View>
                                  </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('chat')}>
                                    <View style={styles.msgbox}>                                       
                                    <View style={styles.avatar}>
                                        <Image source={require('../../assets/images/avt4.png')} style={styles.avtarimg} />
                                    </View>
                                    <View style={styles.msgbody}>
                                        <View style={styles.rowjustify}>
                                            <Text style={styles.msgheading} numberOfLines={1} ellipsizeMode="tail">Nicolaj</Text>
                                            <Text style={styles.msgdate}>12/12/2018</Text>
                                        </View>
                                        <Text style={styles.msgtext} numberOfLines={4}>All the Lorem Ipsum generators on the Internet tend on the Internet... </Text>
                                         
                                    </View>
                                  </View>
                                  </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
        {/* </SafeAreaView> */}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps, null)(chatList);
