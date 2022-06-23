import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {AntDesign} from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../../../CommonStyles';

class PortfolioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //portfolioDetails: this.props.data,
    };
  }

  edit = item => {
    this.props.editPortFolio(item);
  };

  delete = item => {
    this.props.deletePortFolio(item);
  };

  render() {
    return (
      <View>
        {this.props.data.map(item => {
          return (
            <View>              
              
              <View style={CommonStyles.card}>
                <View style={[CommonStyles.rowbetween, {paddingHorizontal:15, paddingTop:10}]}>
                <Text style={CommonStyles.hedinglink}>{item.name}</Text>
                <View style={[styles.deleterow2, {width:50}]}>
                <TouchableOpacity
                  style={styles.trbtn}
                  onPress={() => this.edit(item)}>
                  <Image
                    source={require('../../assets/images/edit.png')}
                    resizeMode="contain"
                    style={{height: 15, width: 15}}
                  />
                  {/* <Icon name="ios-create" size={20}/> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.trbtn}
                  onPress={() => this.delete(item)}>
                  <Icon name="ios-trash" color="#777" size={14} />
                </TouchableOpacity>
              </View>
                  </View>
            
                <View style={[CommonStyles.cardbody, {flexDirection:'row', flexWrap:'wrap', paddingHorizontal:5,}]}>
               
                {item.images && item.images.length > 0 ? (
                  item.images.map(img => {
                    return (
                      <TouchableOpacity style={styles.pfimgbox}>
                        <Image
                          source={{uri: img}}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <></>
                )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default PortfolioCard;
