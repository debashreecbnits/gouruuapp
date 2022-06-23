const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import Normalize from '../../../../src/shared/Dimens'

export default {
    h2: {
        color: '#242933',
        fontSize: 22,
        fontWeight: '700',
        paddingTop: 5,
        marginBottom:0
    },
    ptext: {
        color: '#767676',
        fontSize: 16,
        paddingBottom: 6
    },
    ptext2: {
      color: '#767676',
      fontSize: 12,
      paddingBottom: 6,
      
  },
    borderbox2: {
      flexDirection:'column',        
      borderColor:'#ccc',        
      //borderWidth:1,
      paddingTop:20,
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:15,
      height:90
  },
  card: {

    borderWidth: 1,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height:90,
    
  },
    boldtext: {
        color: '#767676',
        fontSize: 16,
        fontWeight:'500',
        textAlign:'center'
    },
    inputform: {
      borderWidth: Normalize(1),
      borderColor: '#242933',
      borderRadius: Normalize(5),
      color: '#242933',
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: Normalize(12),
      paddingLeft: Normalize(15),
      paddingRight: Normalize(15),
      marginBottom: Normalize(0),
      backgroundColor: 'rgba(255, 255, 255, 0.11)',
      height: Normalize(40)
    },
    width100: {
      width: '100%',
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
    
    formlabel2:{
      color: '#383CC1',
      fontSize: 18,
      marginBottom:5,
      fontWeight:'700'
  },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 150,
      //marginTop: 20,
      right:15
    
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
        borderRadius:4
    },
    inputform2: {
      borderWidth:0.9,
      borderColor:'#ddd',
      width:'100%',
      paddingLeft:10,
      paddingRight:10,
      fontSize:16,
      color:'#1B98F5',
      borderRadius:4
  },
    editicon: {
        width:20,
        height:20,
        position:'absolute',
        top:10,
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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      absinput: {
          position:'absolute',
          width:70,
          height:45,
          right:0,
          top:0,
          textAlign:'center'
      },

  formlabel2: {
    color: '#383CC1',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '700'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 150,
    //marginTop: 20,
    right: 15

  },
  smlabel: {
    color: '#090243',
    fontSize: 14,
    paddingBottom: 5,
    fontWeight: '400',
    maxWidth: '85%',
    lineHeight: 26
  },
  inputform: {
    borderWidth: 0.9,
    borderColor: '#ddd',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#242933',
    borderRadius: 4
  },
  inputform2: {
    borderWidth: 0.9,
    borderColor: '#ddd',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#1B98F5',
    borderRadius: 4
  },
  editicon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 0
  },
  deleterow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    top: 20,
    marginTop: -20
  },
  trbtn: {
    width: 30,
    height: 30,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 30 / 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15
  },
  modalView: {
    width: '100%',
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
    flex: 1
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  absinput: {
    position: 'absolute',
    width: 70,
    height: 45,
    right: 0,
    top: 0,
    textAlign: 'center'
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderColor: 'red'
  },
  autoComplete: {
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 5,
    overflow: 'hidden',
    height: 50,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    borderColor: 'red'
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#777',
    margin: 2,
    fontFamily: 'Montserrat-Medium',
  },
}
