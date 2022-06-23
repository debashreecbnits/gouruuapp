import { backgroundColor } from 'styled-system';

const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 18,
        fontFamily:"Raleway-Bold",   
    },
    modalCross: {
        position: 'absolute',
        top: 10,
        right: 10,       
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
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        textAlign:'right',
        fontFamily:"Lato-Regular", 
    },
    centeredView: {
        //flex: 1,
       height:200,
       width:400,
      },
    fcard: {
        flexDirection:'row',
        paddingBottom:5,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'flex-start',
        position:'relative',
        borderRadius:8,
        overflow:'visible'
    },
    height60: {
        height : 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumb: {
        width:60,
        height:60,
        borderRadius:9,
        marginRight:10,       
    },
    cardcontent: {
        width:'80%',
        paddingRight:25
    },
    moredot: {
        position:'absolute',
        right:-5,
        top:5
    },
    verify: {
        width:20,
        height:20,
        position:'absolute',
        right:25,
        top:5
    },
    verifybox: {
        width:30,
        height:30,
        position:'absolute',
        left:65,
        top:35,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:30/2
    },
    profilebox: {
        width:90,
        height:90,
        position:'relative',
        borderRadius:90/2,
        overflow:'hidden',
        marginLeft:0,
        marginRight:'auto',
    },
    profileimg:{
        width:80,
        height:80,
        borderRadius:80/2,
        marginLeft:0,
    },
    pedit: {
        position:'absolute',
        bottom:10,
        left:'45%',
        zIndex:99,
        width:25,
        height:25,
        borderRadius:25/2,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    name: {
        color:'#242933',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:"Raleway-Bold",   
    },
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontFamily:"Raleway-Bold",   
    },
    namebox: {
        width:'70%'
    },
    h2: {
        color: '#242933',
        fontSize: 22,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:0,
        fontFamily:"Raleway-Bold",   
    },
    h4: {
        color: '#242933',
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:10,
        fontFamily:"Raleway-Bold",   
    },
    
    boldtext: {
        color: '#333',
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center',
        fontFamily:"Raleway-Bold",   
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
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
    formpart: {
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.01,
        shadowRadius: 1,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 6,
        marginBottom:15
    },
    labeltext: {
        color: '#3e3e3e',
        fontFamily: 'Montserrat-Regular',
        fontWeight: '400',
        fontSize: 18,
        marginBottom: 8,
        letterSpacing: 1,
    },
    pickermenu: {
        borderWidth: 1,
        borderColor: '#d5d5d5',
        backgroundColor: '#f7f7f7',
        borderRadius: 4,
        height: 44,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    dttext:{
        color: '#888b9b',
        fontWeight: '400',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        letterSpacing: 2,
    },
    label0:{
        color: '#75777c',
        fontSize: 14,
        fontFamily:'Raleway-Bold',
    },
    borderbox1: {
        flexDirection:'column',        
        borderColor:'#ccc',        
        borderWidth:1,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:10,
        width:'100%',
        borderRadius:9,
        overflow:'hidden'
    },
    Bborder: {
        paddingBottom:15,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingRight:35,
        position:'relative',
    },
    activebox: {
      backgroundColor:'#ddd'
    },
    formlabel:{
        color: '#242933',
        fontSize: 16,
        marginBottom:5,
        fontWeight:'600',
        fontFamily:"Raleway-Bold",   
    },
    label2:{
        color: '#3e1bee',
        fontSize: 16,
        fontWeight:'400',
        fontFamily:'Raleway-Bold',
        paddingLeft:10
    },
    whitebox: {
        borderRadius:9,
        paddingHorizontal:15,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#fefeff',
        marginTop:10,
        marginBottom:20,
        
    },
    smlabel:{
        color: '#090243',
        fontSize: 14,
        paddingBottom:5,
        fontWeight:'400',
        maxWidth:'85%',
        lineHeight:26,
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
    btntext: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold',
    },
    btnarea: {
        marginBottom: 15,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    redbtn: {
        backgroundColor: '#6c5ce7',
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
    },
    editicon: {
        width:20,
        height:20,
        position:'absolute',
        top:10,
        right:0
    },
    calicon: {
        width:20,
        height:20,
        position:'absolute',
        bottom:15,
        right:0
    },
    deleterow: {
        flexDirection:'row',
        justifyContent:'flex-end',
        position:'relative',
        top:20,
        marginTop:-20
    },
    trbtn: {
        width:30,
        height:30,
        borderColor:'#ccc',
        flexDirection:'row',
        justifyContent:'center',
        borderWidth:1,
        alignItems:'center',
        marginLeft:5,
        marginRight:5,
        borderRadius:30/2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:15
      },
      modalView: {
          width:'100%',
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex:1
      },      
      absinput: {
          position:'absolute',
          width:70,
          height:45,
          right:0,
          top:0,
          textAlign:'center'
      },
      rbox: {
        width:90,
        height:90,
        borderColor:'#ccc',
        borderWidth:1,
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:90/2,
        marginBottom:10
      },
      pfimgbox: {
        borderRadius:5,
        height:150,
        width:'100%',
        overflow:'hidden'
      },
      pfimg: {
          height:150,
          width:'100%'
      },
      pfoot: {
          backgroundColor:'#f0f0f0',
          borderRadius:5,
          marginTop:5,
          marginBottom:15,
          paddingBottom:5,
          paddingTop:5
      },
      timewrap: {
          flexDirection:'row',
          flexWrap:'wrap',
          marginLeft:-10,
          marginRight:-10,
      },
      timebox: {
          width:'50%',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:10,
          paddingLeft:15,
          paddingRight:15
      },
      ttext: {
        color: '#242933',
        fontSize: 16,
        fontFamily:"Lato-Regular",   
      },
      tprofile: {
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        paddingTop:15,   
      }


}
