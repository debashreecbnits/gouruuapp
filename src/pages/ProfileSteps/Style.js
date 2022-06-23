const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 18,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    ptext: {
        color: '#454545',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
    },
    pageheding: {
        color: '#3a3a3a',
        fontSize: 22,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",      
    },
    litext: {
        color: '#6c757d',
        fontSize: 18,        
        marginTop:8,
        fontWeight:'600',
        fontFamily:"Raleway-Bold",
    },
    cardbody:{
        paddingLeft:10,
        paddingTop:10,
        paddingRight:10,
        paddingBottom:10
    },
    btnbox:{
        marginTop:50
    },
    mb15:{
        marginBottom:15
    },

}
