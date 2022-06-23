import { paddingLeft } from 'styled-system';

const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    
    slide1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom:110,
        paddingLeft:20,
        paddingRight:20
        
      },
      slide2: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom:110,
        paddingLeft:20,
        paddingRight:20
      },
      slide3: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom:110,
        paddingLeft:20,
        paddingRight:20
      },
      textheading: {
        color: '#3e1bee',
        fontSize: 20,
        textAlign:'center',
        fontFamily:"Raleway-Bold",
        marginBottom:10
      },
      text2: {
        color: '#333',
        fontSize: 16,
        textAlign:'center',
        fontFamily:"Lato-Regular",
        marginBottom:10
      },
      bottomwrap:{
          position:'absolute',
          left:0,
          right:0,
          bottom: Dimensions.get("window").width <= 767 && Platform.OS == "android"
          ? 5
          : 35,
          top:'auto',
          flexDirection:'row',
          justifyContent:'space-between',
          paddingLeft:20,
          paddingRight:20,
          paddingBottom:10,
          paddingTop:10,
          height:50
      },
      ntext:{
          color:"#fff",
          fontSize:16,
          fontFamily:"Raleway-Bold",
      },
      nxtbtn: {
        backgroundColor:'#3e1bee',
        borderRadius:35,
        paddingLeft:18,
        paddingRight:18,
        paddingTop:3,
        paddingBottom:3
      },
      skipbtn: {
        backgroundColor:'#3e1bee',
        borderRadius:35,
        paddingLeft:18,
        paddingRight:18,
        paddingTop:3,
        paddingBottom:3
      },

}