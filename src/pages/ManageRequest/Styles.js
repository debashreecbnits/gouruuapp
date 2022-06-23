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
    
    cardbody: {
        paddingBottom:15,
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10
    }
}
