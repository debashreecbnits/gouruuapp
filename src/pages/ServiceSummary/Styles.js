import { marginRight } from 'styled-system';

const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 20,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    ptext: {
        color: '#242933',
        fontSize: 18,
        fontWeight: '700',
        paddingBottom:15,
        paddingTop:5,
        fontFamily:"Raleway-Bold",
    },
    grtext: {
        color: '#767676',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    boldtext: {
        color: '#333',
        fontSize: 16,
        fontWeight:'bold',
        lineHeight:32,
        textAlign:'right',
        fontFamily:"Raleway-Bold",
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    serviceimage: {
      width:150,
      height:120,
      marginRight:15,
      borderRadius:8
    },
      mapbox: {
        height:120,
        width:'100%',
        marginBottom:10,
        flexDirection:'row'
      },
      
      flexborder: {
          flexDirection:'row',
          borderBottomWidth:0.5,
          borderBottomColor:'#ccc',
          paddingBottom:10,
          justifyContent:'space-between'
      },
      aligncenter: {
        alignItems:'center',
        marginBottom:10
      },
      radiotext: {
        color: '#767676',
        fontSize: 18,
        fontWeight:'500',
        paddingLeft:10,
        fontFamily:"Lato-Regular",
    }   , 
}
