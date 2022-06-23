const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    profilebox: {
        width:100,
        height:100,
        position:'relative',
        borderRadius:100/2,
        overflow:'hidden',
        marginLeft:'auto',
        marginRight:'auto',
        borderWidth:10,
        borderColor:'rgba(179,123,254, 0.78)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight:20
    },
    profileimg:{
        width:90,
        height:90,
        borderRadius:90/2,
        marginLeft:'auto',
        marginRight:'auto',
    },
    name: {
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Raleway-Bold',
    },
    ptext: {
        color:'#f2f2f9',
        fontSize:14,
        fontFamily:'Lato-Regular',
    },
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontFamily:'Raleway-Bold',
    },
    profilebg: {
        height:210,
    },
    profilemain: {
        flexDirection:'row',
        marginTop:25,
        paddingLeft:15,
        paddingRight:15
    },
    editbtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:80,
        bottom:20,
        width:25,
        height:25,
        borderRadius:25/2,
        backgroundColor:'#fff'
    },
    
    editrow: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom:15

    },
    namerow: {
        flexDirection:'row',
        alignItems:'flex-start',
        paddingBottom:12,
        paddingTop:12,
        backgroundColor:'rgba(76,32,249, 0.25)',
        marginLeft:-15,
        marginRight:-15,
        paddingLeft:15,
        paddingRight:15
    },
    nameroweven: {
        flexDirection:'row',
        alignItems:'flex-start',
        paddingBottom:12,
        paddingTop:12,
        backgroundColor:'transparent',
        marginLeft:-15,
        marginRight:-15,
        paddingLeft:15,
        paddingRight:15
    },
    mcard: {
        backgroundColor:'#f6f7f8',
        marginLeft:-15,
        marginRight:-15,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:15,
        paddingTop:15,
        borderRadius:9
    }
}