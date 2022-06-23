import { alignItems } from 'styled-system';

const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    sidebarwrap: {
        flex:1,
        width:'100%'
    },
    sidebar: {  
        flex:1
    },
    profilewrap: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:25,
        paddingBottom:10,
        backgroundColor:'#6c13be',
        height:200,
        borderBottomLeftRedius:35,
        borderBottomRightRadius:25,
        overflow:'hidden',
    },
    profileimage: {
        width:65,
        height:65,
        borderRadius:65/2,        
    },

    pimgbox: {
        borderWidth:6,
        borderColor:'rgba(255,255,255,.35)',
        width:70,
        height:70,
        borderRadius:70/2,
        marginRight:10,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    procontent: {
        marginTop:10
    },
    menuwrap: {
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
    },
    usertype: {
        color:'#f2f2f2',
        fontSize:14,
        fontFamily:"Lato-Regular",
    },
    uname: {
        color:'#fff',
        fontSize:16,
        fontFamily:"Raleway-Bold",
        width:180
    },

    alabel: {
        color:'#fff',
        fontSize:16,
        fontFamily:"Raleway-Bold",
        
    },
    uname2: {
        color:'#242933',
        fontSize:16,
        fontFamily:"Raleway-Bold"
    },
    menuitem: {
        paddingTop:8,
        paddingBottom:8,
        flexDirection:'row',
        alignItems:'center',        
    },
    menulink: {
        color: '#525252',
        fontSize:14,
        fontWeight:'500',
        marginLeft:5,
        fontFamily:"Lato-Regular"
    },
    sideMenuTop: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding:15,
        backgroundColor: '#f2f2f2'
    },
    menuWrapper: {
        // paddingHorizontal:'5%',
    },
    menuLabel: {
        paddingHorizontal: '5%',
        paddingVertical: 15,
        borderBottomColor: 'rgba(255,255,255,0.25)',
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems:'center'
    },
    uswitch: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:40    
    }
}