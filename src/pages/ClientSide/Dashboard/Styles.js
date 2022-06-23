const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    profilebox: {
        width:60,
        height:60,
        position:'relative',
        borderRadius:15,
        overflow:'hidden',
        borderWidth:3,
        borderColor:'#3e1bee'
    },
    profileimg:{
        width:60,
        height:60,
        borderRadius:15,
    },
    name: {
        color:'#242933',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'left',
        fontFamily:'Raleway-Bold',
    },
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'Raleway-Bold',
    },
    usertype: {
        color:'#3e1bee',
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
    },
    pboxx: {             
        marginBottom:15,
        alignItems:'center',   
        position:'relative',       
        paddingBottom:15,
        flexDirection:'row',
        width:'100%',
        paddingLeft:15
    },
    // abscard: {
    //     position:'relative',
    //     top:-60,        
    //     marginBottom:0,
    //     zIndex:99,
    //     paddingLeft:0,
    //     paddingRight:0,
    //     backgroundColor:'transparent'
    // },
    mutetext: {
        color:'#767676',
        fontSize:14,
        fontWeight:'500',
        fontFamily:'Lato-Regular',
    },
    circlebg: {
       width:'100%',
       height:150,
       marginTop:-15
    },
    htitle: {
        fontSize:24,
        color:'#fff',
        textAlign:'left',
        fontFamily:"Raleway-Bold"
    },
    smtitle: {
        fontSize:14,
        color:'#fff',
        textAlign:'left',
        fontFamily:"Lato-Regular"
    },
    lastactive: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20
    },
    whitecard: {
        paddingTop:15
    },
    menus: {
        flexDirection:'row',
        flexWrap:'wrap',        
    },
    menuitem: {
        paddingTop:25,
        paddingBottom:25,
        paddingLeft:10,
        paddingRight:10,
        position:'relative',
        backgroundColor:'#fff',
        borderRadius:15,
        overflow:'hidden',
        marginBottom:12,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation:5,
        width:'45%',
        marginLeft:'2.5%',
        marginRight:'2.5%',
        minHeight:150
    },
    menulink: {
        color:'#757575',
        fontSize:16,
        fontFamily:'Raleway-Bold',
        textAlign:'center'
    },
    angledown: {
        position:'absolute',
        width:8,
        right:18,
        top:12
    },

    uimg:{
        width:45,
        height:45,
        marginBottom:15,
        marginLeft:'auto',
        marginRight:'auto'
    }

}