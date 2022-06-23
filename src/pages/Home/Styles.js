const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
   headingtop: {
       color:'#242933',
       fontSize:24,
       textAlign:'center',
       fontWeight:'500',
       paddingTop:10,
       paddingBottom:20,
       fontFamily:"Lato-Regular",
   },
   ptext: {
    color:'#fff',
    fontSize:16,
    paddingBottom:6,
    fontFamily:"Lato-Bold",
   },
   grtext: {
    color:'#767676',
    fontSize:13,
    fontFamily:"Lato-Regular",   
   },
   grtext2: {
    color:'#767676',
    fontSize:13,
    fontFamily:"Lato-Regular", 
    marginTop:5  
   },
   sortselect:{
       borderWidth:0,
       borderColor:'transparent',
       color:'#242933',
       fontSize:16,
       fontFamily:"Lato-Regular",
       lineHeight:28
   },
    
   welcomebox: {
    backgroundColor:'#fff',
    paddingBottom:15,
    paddingTop:5,    
   },
   morebg: {
       flex:1,
       width:'auto',
       marginLeft:-15,
       marginRight:-15,
       height:265,
       paddingBottom:25,
       paddingTop:25,
       paddingLeft:15,
       paddingRight:15,
       marginBottom:20,
   },
   bannertext: {
    color:'#f2f2f2',
    fontSize:18,
    textAlign:'center',
    lineHeight:26,
    marginBottom:15,
    fontFamily:"Lato-Regular",   
   },
   newscard: {
       width:300,
       marginRight:15,
       marginTop:15
   },
   date: {
    position:'absolute',
    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:4,
    backgroundColor:'rgba(0,0,0, .75)',
    top:10,
    left:10
 },
 datetext: {
     color: '#fff',
     fontSize: 14,
     fontFamily:"Lato-Regular",   
 },
 cardcontent: {
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15
},
cardthumb: {
    width:'100%',
    height:140,
    borderTopLeftRadius:5,    
    borderTopRightRadius:5,    
},
faqbox: {
   
    paddingTop:10,   
    marginBottom:15,
    position:'relative',
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:5
},
faqheader: {    
    paddingLeft:10,    
    paddingRight:25,
    paddingBottom:10,
    position:'relative'
},
faqbody: {
    borderTopWidth:1,
    borderTopColor:'#ddd',
    paddingLeft:10,    
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
},
faqheading: {
    fontWeight:'bold',
    color:'#333',
    fontSize:16, 
    fontFamily:"Raleway-Bold",   
},
faqarrow: {
    width:18,
    height:18,
    position:'absolute',
    right:10,
    top:8

},
serachBtn: {
    width: 110,
    height: 45,
    backgroundColor: '#3e1bee',
    borderRadius: 50 / 2,
    marginLeft : 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
},
height40: {
    height : 40,
    justifyContent: 'center',
    alignItems: 'center'
},
cbtn: {
    height : 40,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:15,
    left:10,
    right:10,
    width:200
},
height60: {
    height : 60,
    justifyContent: 'center',
    alignItems: 'center'
},
homeslider: {
    height:260,
    marginBottom:40,
    overflow:'hidden',
    marginLeft:-15,
    marginRight:-15,
    marginTop:-15
},
slides: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom:90,
    paddingLeft:20,
    paddingRight:20
    
  },
  textheading: {
    color: '#fff',
    fontSize: 20,
    fontFamily:"Raleway-Bold",
    marginBottom:10
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontFamily:"Lato-Regular",
    paddingRight:100

  },
  heading: {
    color: '#212121',
    fontSize: 20,
    fontFamily:"Raleway-Bold",
    marginBottom:10,
    textAlign:'center'
  },
  para: {
    color: '#757675',
    fontSize: 16,
    fontFamily:"Lato-Regular",
    textAlign:'center'
  },
  welcomeg: {
      marginBottom:40
  },
  hcardcontent: {
      paddingBottom:60,
      position:'relative'

  }

}