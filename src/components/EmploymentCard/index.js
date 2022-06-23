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

class EmploymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Employment_History: this.props.data,
    };
  }

  edit =(item)=> {
    this.props.editEmploymentHistory(item)
  }

  delete =(item)=> {
    this.props.deleteEmploymentHistory(item)
  }

  render() {

    return (
      <View>
        {this.props.data.map((item) => {
            return (
          <View>
            <View style={styles.deleterow2}>
              <TouchableOpacity style={styles.trbtn} onPress={() => this.edit(item)}>
              {/* <Image
                      source={require('../../assets/images/edit.png')}
                      resizeMode="contain"
                      style={{height: 25, width: 25}}
                    /> */}
                    <Icon name="ios-create" size={20}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trbtn}  onPress={() => this.delete(item)}>
                <Icon name="ios-trash" color="#777" size={14} />
              </TouchableOpacity>
            </View>
            <Text style={styles.formlabel}>{item.company}</Text>
            <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
              {item.category}
            </Text>
            <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
              {item.start_date} - {item.end_date}
            </Text>
            <Text style={[styles.ptext, {fontWeight: 'bold'}]}>
              {item.city}{','}{item.country}
            </Text>
            <Text style={styles.ptext}>{item.description}</Text>
          </View>);
        })}
      </View>
    );
  }
}

export default EmploymentCard;
