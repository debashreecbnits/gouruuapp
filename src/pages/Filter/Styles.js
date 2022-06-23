const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 20,
        fontFamily:"Raleway-Bold",   
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        paddingBottom: 6,
        fontFamily:"Lato-Regular",   
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
        fontFamily:"Lato-Regular",   
    },
    catBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom:15,
        marginBottom:15
    },

}
