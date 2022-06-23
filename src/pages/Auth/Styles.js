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
       fontFamily:"Raleway-Bold",
   },
   sideMenuTop: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    backgroundColor: '#f2f2f2'
},

   borderbox:{
       borderWidth:1,
       borderColor:'#ccc',
       alignItems:'center',
       paddingBottom:15,
       paddingTop:15,
       width:'100%',
   },

   selectedborderbox:{
    borderWidth:1,
    borderColor:'blue',
    alignItems:'center',
    paddingBottom:15,
    paddingTop:15,
    width:'100%',
},

    
    underlineStyleBase: {
        width: 60,
        height: 55,
        borderWidth: 0,
        borderBottomWidth: 1,
        fontSize:16,
        color:'#242933',  
        fontFamily:"Lato-Regular",      
    },

    underlineStyleHighLighted: {
        borderColor: "#3e1bee",
    },
   



}
