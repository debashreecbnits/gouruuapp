import { flexDirection } from 'styled-system';

const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
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
    },
    pageheding: {
        color:'#242933',
        fontSize:18,
        fontWeight:'bold',
    },
    namebox: {
        width:'69%'
    },
    h2: {
        color: '#242933',
        fontSize: 22,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:0
    },
    h4: {
        color: '#242933',
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:10
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        paddingBottom: 6
    },
    boldtext: {
        color: '#333',
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16
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
    activebox: {
      backgroundColor:'#ddd'
    },
    formlabel:{
        color: '#242933',
        fontSize: 16,
        marginBottom:5,
        fontWeight:'600'
    },
    smlabel:{
        color: '#090243',
        fontSize: 14,
        paddingBottom:5,
        fontWeight:'400',
        maxWidth:'85%',
        lineHeight:26
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
        height: 50,
    },
    editicon: {
        width:20,
        height:20,
        position:'absolute',
        top:10,
        right:0
    },
    deleterow: {
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 15
    },
    deleterow2: {
        width: '100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom: 15
    },
    trbtn: {
        width:30,
        height:30,
        borderColor:'#ccc',
        borderWidth:1,
        alignItems:'center',
        justifyContent: 'center',
        marginLeft:5,
        marginRight:5,
        borderRadius:30/2,
        backgroundColor:'#f2f2f2'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:  Dimensions.get("window").width <= 767 && Platform.OS == "android"
        ? 20
        : 60,
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
        width:'47%',
        overflow:'hidden',
        marginBottom: 10,
        marginLeft:'1.5%',
        marginRight:'1.5%'
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
      }

}
