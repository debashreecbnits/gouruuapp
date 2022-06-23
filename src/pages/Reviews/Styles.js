const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontWeight:'bold',
        fontFamily:"Lato-Regular",
    },
    h2: {
        color: '#242933',
        fontSize: 22,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:0,
        fontFamily:"Raleway-Bold",
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    unmae: {
        color: '#242933',
        fontSize: 18,
        fontWeight:'bold',
        fontFamily:"Raleway-Bold",
    }   , 
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
      headingtop: {
        color: '#242933',
        fontSize: 20,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    
}

