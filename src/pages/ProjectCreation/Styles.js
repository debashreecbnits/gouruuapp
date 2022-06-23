const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    h2: {
        color: '#242933',
        fontSize: 20,
        fontWeight: '700',
        fontFamily:"Raleway-Bold",
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        paddingBottom: 6,
        fontFamily:"Lato-Regular",
    },
    boldtext: {
        color: '#3e1bee',
        fontSize: 18,
        fontWeight:'700',
        textAlign:'right',
        fontFamily:"Raleway-Bold",
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        fontFamily:"Lato-Regular",
    },
    borderbox: {
        flexDirection:'column',
        borderWidth:1,
        borderColor:'#ccc',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:15,
        height:90
    },
    Bborder: {
        paddingBottom:15,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingRight:35,
        position:'relative',
    },
    editicon: {
        width:20,
        height:20,
        position:'absolute',
        top:10,
        right:0
    },
    activebox: {
      backgroundColor:'#ddd'
    },
    formlabel:{
        color: '#090243',
        fontSize: 16,
        marginBottom:5,
        fontWeight:'700',
        fontFamily:"Raleway-Bold",
    },
    smlabel:{
        color: '#090243',
        fontSize: 14,
        paddingBottom:5,
        fontWeight:'400',
        fontFamily:"Lato-Regular",
    },
    smlabel2:{
        color: '#767676',
        fontSize: 14,
        paddingBottom:5,
        fontWeight:'400',
        fontFamily:"Lato-Regular",
    },
    inputform: {
        borderWidth:0.9,
        borderColor:'#ddd',
        width:'100%',
        paddingLeft:10,
        paddingRight:10,
        fontSize:16,
        color:'#242933',
        borderRadius:4,
        fontFamily:"Lato-Regular",
    },
    imgbox: {
        marginBottom:15,
        position:'relative'
    },
    wrapper: {
        backgroundColor:'#3e1bee',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        paddingBottom:15,
        paddingTop:15,
        paddingLeft:15,
        paddingRight:15
    },
    jtext:{
        fontSize:20,
        lineHeight:32,
        textAlign:'center',
        color:'#fff',
        marginTop:10,
        fontFamily:"Raleway-Bold",
    },
    uploadpic: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:150,
        backgroundColor:'#f6f4ff',
        borderRadius:5,
        fontFamily:"Lato-Regular",
    }

}
