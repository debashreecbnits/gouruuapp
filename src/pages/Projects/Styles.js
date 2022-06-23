import { justifyContent } from 'styled-system';

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
        fontFamily:"Lato-Regular",
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
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        textAlign:'right',
        fontFamily:"Lato-Regular",
    },
    h100: {
        flex:1
    },
    rhead: {
        borderColor:'#3e1bee',
        borderWidth:1,
        paddingBottom:6,
        paddingTop:6,
        paddingLeft:10,
        paddingRight:15,
        borderTopRightRadius:35,
        borderBottomRightRadius:35,
        marginTop:10,
        marginLeft:10,
        width:120
    },
    rtext: {
        color:'#3e1bee',
        fontSize:16,
        fontFamily:"Lato-Regular",
    },
    projectListRow: {
        flexDirection:'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    projectListCard:{
      shadowColor: 'rgba(0,0,0,0.45)',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.9,
      shadowRadius: 1,
      elevation:5,
      position:'relative',
      width: '48%',
      backgroundColor:'#fff',
      marginBottom:15,
      borderRadius:6
    },
    cardcontent: {
        flex: 1,
        paddingHorizontal:10,
        paddingVertical:15,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },

    notificationbox: {
        flexDirection:'row',
        justifyContent:'space-between', 
        paddingTop:15,
        paddingBottom:15,
        marginBottom:10,
        backgroundColor:'#f9f9f2',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:8,
        shadowColor: 'rgba(0,0,0,0.45)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 1,
        elevation:5,
        position:'relative'
    },
    namerow: {
      flexDirection:'row',
      alignItems:'flex-start',
      paddingBottom:12,
      paddingTop:12,
      backgroundColor:'#f4e6f9',
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
    avtbox: {
        width:60,
        overflow:'hidden',
        position:'relative',
        paddingBottom:5
      },
      avatar: {
        width:50,
        height:50,
        borderRadius:50/2,
        overflow:'hidden',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
      avtimage: {
        resizeMode:'cover',
        height:50,
        width:50
      },
      centercontent: {
        width:'75%'
      },
      headingmain: {
        color:'#757575',
        fontSize:14,
        marginBottom:10,
        fontFamily:"Lato-Regular",
      },
      smstext: {
        fontSize:13,
          color:'#757576',     
          fontFamily:'MontserratRegular',
      },
      msgtext: {
        fontSize:13,
          color:'#242933',     
          fontFamily:'Lato-Regular',
      },
      badgen: {
        width:20,
        height:20,
        borderRadius:20/2,
        overflow:'hidden',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#e1ad01',
        position:'absolute',
        bottom:5,
        right:5
      },
      ptext: {
        color: '#767676',
        fontSize: 16,
        paddingBottom: 6,
        lineHeight:26,
        fontFamily:"Lato-Regular",
    },
    datebox: {
      flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#e6e1ff',
        borderRadius:35,
        paddingBottom:6,
        paddingTop:6,
        paddingRight:10,
        paddingLeft:10,
        
    },
    nmodal: {
      height:100,
      paddingTop:20
    }
}
