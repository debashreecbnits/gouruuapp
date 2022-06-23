const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    
    pageheding: {
        color:'#242933',
        fontSize:16,
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
    ullist: {
        position:'relative'
    },
    lilist: {
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:12,
        position:'relative',
        borderBottomWidth:0.5,
        borderBottomColor:'#ccc' 
    },
    siconbox: {
        width:30,
        height:30,        
    },
    sheadbox: {
        width:'85%',
    },
    rightArrow: {
        position:'absolute',
        right:5,
        top:15
    }
}
