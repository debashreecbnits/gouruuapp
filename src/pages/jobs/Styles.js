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
        color: '#767676',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
        fontFamily:"Lato-Regular",
    },
    listwrap: {
        backgroundColor:'#fff',
        borderRadius:5,
        overflow:'hidden',
        marginBottom:20,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation:5,
        paddingBottom:10,
        paddingTop:10,
        paddingLeft:15,
        paddingRight:15
    },
    pageheding: {
        color: '#3a3a3a',
        fontSize: 18,
        fontWeight: '700',
        marginTop:20,
        fontFamily:"Raleway-Bold",
    },
    litext: {
        color: '#767676',
        fontSize: 16,
        marginTop:8,
        marginBottom:8,
        fontFamily:"Lato-Regular",
    },
    uploadbox: {
        borderWidth:2,
        borderColor:'#ccc',
        borderStyle:'dashed',
        height:85,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:9,
        paddingLeft:25,
        paddingRight:25,
    },
    col33: {
        width:'33.3%',
        paddingLeft:5,
        paddingRight:5
    },
    mtextbox: {
        width:'70%',        
    },
    datePickerStyle: {
        width: 130,
        //marginTop: 20,
        right:15,
        top:10
      
      },
    minputwrap: {
        width:'30%',
        paddingLeft:10
    },
    borderbox: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,       
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        height:35
    },
    doller: {
        color: '#3e1bee',
        fontSize: 22,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    hrtext:{
        color: '#3a3a3a',
        fontSize: 16,
        fontWeight: '700',
        fontFamily:"Lato-Regular",
    },
    dwrap: {
        position:'relative',
        paddingRight:35
    },
    delete: {
        position:'absolute',
        right:10,
        top:12
    }

}