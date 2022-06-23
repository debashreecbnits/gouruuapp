const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontWeight:'bold',
        fontFamily:"Raleway-Bold",
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
      
      headingtop: {
        color: '#242933',
        fontSize: 20,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    cardbody: {
        paddingTop:10,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:10
    },
    supportmail: {
        color:'#3e1bee',
        fontSize:16,
        paddingTop:3,
        fontFamily:"Lato-Regular",
    }
    
}
