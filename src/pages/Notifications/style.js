export default {
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
        width:'85%'
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
          fontFamily:'Montserrat-Regular',
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
