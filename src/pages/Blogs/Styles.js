const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    name: {
        color: '#3e1bee',
        fontSize: 14,
        fontWeight: '500',  
        fontFamily:"Lato-Regular",     
    },
    date: {
       position:'absolute',
       paddingBottom:5,
       paddingTop:5,
       paddingLeft:10,
       paddingRight:10,
       borderRadius:4,
       backgroundColor:'rgba(0,0,0, .75)',
       top:10,
       left:10
    },
    datetext: {
        color: '#fff',
        fontSize: 14,
        fontFamily:"Lato-Regular",
    },
    grtext: {
        fontSize:16,
        color:'#767676',
        fontFamily:"Lato-Regular", 
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
       alignItems:'flex-start',
       textAlign:'left',
       fontFamily:"Lato-Regular",   
    },
    cardcontent: {
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:15
    },
    cardthumb: {
        width:'100%',
        height:140,
        borderTopLeftRadius:5,    
        borderTopRightRadius:5,    
    },
    posttext: {
        fontSize:16,
        color:'#767676',
        marginRight:10,
        fontFamily:"Lato-Regular",   
    }

}
