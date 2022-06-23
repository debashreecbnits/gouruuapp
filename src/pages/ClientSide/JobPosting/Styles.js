const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    h2: {
        color: '#3e1bee',
        fontSize: 22,
        paddingTop: 10,
        fontFamily: 'Raleway-Bold',
    },
    ptext: {
        color: '#757575',
        fontSize: 14,
        paddingBottom: 6,
        fontFamily: 'Lato-Regular',
    },
    boldtext: {
        color: '#767676',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Lato-Regular',
    },
    grtext: {
        color: '#767676',
        fontSize: 15,
        fontFamily: 'Lato-Regular',
    },
    sortselect: {
        borderWidth: 0,
        borderColor: 'transparent',
        color: '#242933',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
    rgroup: {
        width: '100%'
    },
    bdrbtm: {
        borderBottomColor: 'rgba(0,0,0, 0.12)',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingBottom: 10
    },
    radiobg: {
        paddingBottom: 5,
        paddingTop: 5,
        overflow: 'hidden',
        borderRadius: 9,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        resizeMode: 'cover',
        marginBottom: 25,
        alignItems: 'center',
        height: 60
    },
    borderbox: {
        flexDirection: 'column',
        borderColor: '#3e1bee',
        borderWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        borderRadius: 9,
        overflow: 'hidden'
    },
    borderbox1: {
        flexDirection: 'column',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        borderRadius: 9,
        overflow: 'hidden'
    },
    borderbox2: {
        flexDirection: 'column',
        borderColor: '#ccc',
        //borderWidth:1,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        height: 90
    },
    radiobg2: {
        paddingBottom: 5,
        paddingTop: 5,
        overflow: 'hidden',
        borderRadius: 9,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        resizeMode: 'cover',
        marginBottom: 45,
        alignItems: 'center',
        height: 70,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    },
    card: {
        borderWidth: 1,
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,

    },
    Bborder: {
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingRight: 35,
        position: 'relative',
    },
    activebox: {
        backgroundColor: '#3e1bee',
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
    },
    whitebox: {
        borderRadius: 9,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fefeff',
        marginTop: 10,
        marginBottom: 20,

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
    },
    modalCross: {
        position: 'absolute',
        top: -10,
        right: -8,
        
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


    formlabel: {
        color: '#132144',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Raleway-Bold',
    },
    smlabel: {
        color: '#757575',
        fontSize: 14,
        paddingBottom: 5,
        fontFamily: 'Lato-Regular',
    },
    label0: {
        color: '#75777c',
        fontSize: 14,
        fontFamily: 'Raleway-Bold',
    },
    label: {
        color: '#75777c',
        fontSize: 14,
        fontFamily: 'Raleway-Bold',
        paddingLeft: 10
    },
    label2: {
        color: '#3e1bee',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Raleway-Bold',
        paddingLeft: 10
    },
    inputform: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.18)',
        width: '100%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: '#242933',
        backgroundColor: '#fff',
        borderRadius: 9,
        fontFamily: 'Lato-Regular',
        height: 44
    },
    editicon: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 10,
        right: 0
    },
    wrapper: {
        backgroundColor: '#3e1bee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    jtext: {
        fontSize: 20,
        lineHeight: 32,
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
        fontFamily: 'Lato-Regular',
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 9,
    },
    autoComplete: {
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        height: 44,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.18)',
        borderRadius: 9,
        width: '100%'
    },
    liststyle: {
        MaxHeight: 350
    },
    autocompletebox: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        color: '#767676',
        margin: 2,
        fontFamily: 'Lato-Regular',
    },
    errortext: {
        fontSize: 14,
        color: '#f00',
        fontFamily: 'Lato-Regular',
        position: 'absolute',
        left: 15,
        top: 45
    },
    stepbg: {
        backgroundColor: '#ecfff5',
        paddingHorizontal: 15,
        paddingTop: 6,
        borderRadius: 35
    },
    mt40: {
        marginTop: Dimensions.get("window").width <= 767 && Platform.OS == "android"
            ? 45
            : 20,
    },
    lightbox: {
        borderRadius: 9,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ededf5',
        marginTop: 10,
        marginBottom: 20,
    }

}
