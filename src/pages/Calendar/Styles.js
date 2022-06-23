const React = require('react-native');
const {Dimensions} = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  datetext: {
    color: '#757675',
    fontSize: 14,
    fontFamily:"Lato-Bold", 
  },
  datetext2: {
    color: '#757675',
    fontSize: 15,
    fontFamily:"Lato-Bold", 
    lineHeight:26
  },
    itempartb2: {
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.01,
        shadowRadius: 1,
        elevation: 3,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        marginBottom: 15,
      
      },
      
  itempartb4: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 1,
    elevation: 3,    
    borderRadius: 5,
    height:60,
    width:120,
    right:10
  
  
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingLeft:15,
    paddingRight:15
},
h1: {
  fontSize: 22,
  color: '#df363b',
  fontFamily: 'Lato-Bold',
},
themetext: {
  color: '#020c26',
  fontSize: 22,
  paddingRight: 5,
},
}