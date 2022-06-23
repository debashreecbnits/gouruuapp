const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    headingtop: {
        color: '#242933',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
        paddingBottom: 20,
        fontFamily:"Raleway-Bold",   
    },
    faqbox: {

        paddingTop: 10,
        marginBottom: 15,
        position: 'relative',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
    },
    faqheader: {
        paddingLeft: 10,
        paddingRight: 25,
        paddingBottom: 10,
        position: 'relative'
    },
    faqbody: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    faqheading: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
        fontFamily:"Raleway-Bold",   
    },
    faqarrow: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: 10,
        top: 8

    }

}
