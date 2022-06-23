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
        fontFamily:"Lato-Regular",
    },
    grtext: {
        color: '#767676',
        fontSize: 16,
        paddingTop:5,
        fontFamily:"Lato-Regular",
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    slide1: {
        width:'100%',
        height:'100%'        
      },
      slide2: {
        width:'100%',
        height:'100%'
      },
      slide3: {
      width:'100%',
      height:'100%'
      },
      mapbox: {
        height:160,
        width:'100%',
        marginBottom:20
      },
      hirebtn: {
          position:'absolute',
          width:100,
          right:0,
          top:0,
          paddingTop:3,
          paddingBottom:3,
          zIndex:9
      },
      rheading: {
        color: '#242933',
        fontSize: 18,
        fontWeight:'bold',
        fontFamily:"Raleway-Bold",
      },
      flexborder: {
          flexDirection:'row',
          borderBottomWidth:0.5,
          borderBottomColor:'#ccc',
          paddingBottom:5,
          marginBottom:10
      },
      ratebtn: {
          paddingBottom:3,
          paddingTop:3,
          paddingLeft:10,
          paddingRight:10,
          shadowColor: '#242933',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation:2,
            backgroundColor:'#f0f0f0',
            borderRadius:5
      },
      col20: {
        width:'40%',
        paddingLeft:10,
        paddingRight:10
      },
      col80: {
        width:'60%',
        paddingLeft:10,
        paddingRight:10
      },
      prow: {
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
        width:'100%',
      },
      stratext: {
          fontSize:16,
          fontWeight:'500',
          color:'#242933',
          marginRight:10,
          fontFamily:"Lato-Regular",
      }


}
