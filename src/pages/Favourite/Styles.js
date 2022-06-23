const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 18,
        fontFamily:"Raleway-Bold",
        paddingRight:15
    },
    verify: {
        width:20,
        height:20,
        position:'absolute',
        right:25,
        top:5
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        fontFamily:"Lato-Regular",   
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
        fontFamily:"Lato-Regular",   
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        textAlign:'right',
        fontFamily:"Lato-Regular",   
    },
    fcard: {
        flexDirection:'row',
        paddingBottom:5,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'space-between',
        position:'relative',
    },
    thumb: {
        width:60,
        height:60,
        borderRadius:5,
        marginRight:10,       
    },
    cardcontent: {
        width:'79%'
    },
    verify: {
        width:21,
        height:21,
        borderRadius:21/2,
        position:'absolute',
        right:5,
        top:5
    }


}