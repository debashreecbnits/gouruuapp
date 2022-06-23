import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet,Platform } from 'react-native';
var handle="";
(Platform.OS=="ios")?(handle=="ios"):(handle="android")
import Icon from 'react-native-vector-icons/FontAwesome';

class floatingInput extends Component {
  state = {
    isFocused: false,
    inputPopulated: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const checkValueForPlaceholder = this.props.value
      ? { ...styles.placeholderStyle, color: 'transparent' }
      : { ...styles.placeholderStyle, color: '#aaa' };
    const checkValueForLabel = this.props.value
      ? { ...styles.placeholderStyle }
      : { ...styles.labelStyle };
    const labelStyle = !isFocused
      ? checkValueForPlaceholder
      : styles.labelStyle;
    const textInputStyle = !isFocused
      ? { ...styles.textInputStyle, borderBottomColor: '#aaa' }
      : { ...styles.textInputStyle, borderBottomColor: '#3498db' };

    return (
      <View style={styles.inputContainerStyle}>
        <View style={{ flexDirection: 'row', position: 'absolute' }}>
          <Icon
            name={props.iconName}
            size={20}
            color="#3498db"
            style={styles.iconStyle}
          />
          <Text style={labelStyle}>{label}</Text>
        </View>

        <TextInput
          {...props}
          style={textInputStyle}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.props.refInner}
          editable = {this.props.editable && this.props.editable}
        />
        <Text style={styles.errorStyle}>{props.errorMessage}</Text>
      </View>
    );
  }
}

export default floatingInput;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginHorizontal: 10,
  },
  iconStyle: {
    position: 'absolute',
    top: 20,
  },
  labelStyle: {
    position: 'absolute',
    left: 10,
    top: 0,
    fontSize: 10,
    color: '#3498db',
    
  },
  placeholderStyle: {
    position: 'absolute',
    left: 10,
    top: 20,
    fontSize: 13,
  },
  textInputStyle: {
    padding: 0,
    width: '100%',
    height:Platform.OS === 'ios' ? 30 : 30,
    fontSize: 15,
    color: '#242933',
    marginTop: 10,
    height: 22 ,
  },
  errorStyle: {
    color: 'red',
    fontSize: 12,
    width:'100%',

  },
});
