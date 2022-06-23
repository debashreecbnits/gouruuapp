const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderRadius:9,        
  },
  autoComplete: {
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 50,
    fontSize: 16,
    fontFamily:'Lato-Regular',
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.18)',
    borderRadius:9,
    width:'100%'
  },

  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#777',
    margin: 2,
    fontFamily:'Lato-Regular',
  },
}