const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {

    cardheader:  {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'rgba(62, 27, 238, 0.1)'
    },
    heading: {
        fontSize:18,
        color:'#233333',
        fontWeight:'bold',
        fontFamily:"Raleway-Bold",
    },
    cardcontent: {
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,
    },
    uploadbox: {
        borderWidth:2,
        borderColor:'#ccc',
        borderStyle:'dashed',
        height:85,
        width:'100%',
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:9,
        paddingLeft:25,
        paddingRight:25,
    },
}

