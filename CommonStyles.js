const React = require('react-native');
const { Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    wrapperbg: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        position: 'relative',
    },
    wrappernobg: {
        flex: 1,
        position: 'relative',
    },
    wrapper: {
        flex: 1,
        position: 'relative',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: '#f9f9f9',
        minHeight: deviceHeight - 50
    },
    nobg: {
        backgroundColor: "transparent"
    },
    rowcenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowbetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexrow: {
        flexDirection: 'row',
    },
    aligncenter: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        marginLeft: -8,
        marginRight: -8
    },
    col50: {
        paddingLeft: 8,
        paddingRight: 8,
        width: '50%'
    },
    col502: {
        paddingLeft: 8,
        paddingRight: 8,
        width: '60%'
    },
    colbox: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
    },
    fullbox: {
        width: '100%',
    },
    formgroup: {
        marginBottom: 20,
        position: 'relative',
        width: '100%'
    },
    formgroup2: {
        marginBottom: 20,
        position: 'relative',
        width: '70%'
    },
    formcontrol: {
        paddingTop: 12,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
        color: '#242933',
        minHeight: 50,
        fontFamily: "Lato-Regular",
    },
    formtextwrap: {
        position: 'absolute',
        backgroundColor: '#f9f9f9',
        paddingBottom: 2,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 10,
        top: -12,
        left: 10,
    },
    searchinput: {
        fontSize: 16,
        color: '#242933',
        height: 40,
        fontFamily: "Lato-Regular",
    },
    formtext: {
        color: '#242933',
        fontSize: 14,
        fontFamily: "Raleway-Bold"
    },
    iconright: {
        paddingRight: 35,
    },
    primarybutton: {
        backgroundColor: '#3e1bee',
        paddingHorizontal: 15,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 8,
    },
    btntext: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontFamily: "Raleway-Bold",
        fontWeight: '600',
    },
    ftext: {
        fontSize: 14,
        color: '#242933',
        fontWeight: '500',
        paddingVertical: 5,
        fontFamily: "Lato-Regular",
    },
    outlinebtn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 10
    },
    outlinebtn2: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    outlinebtn3: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 10,
        borderColor: '#3e1bee',
        backgroundColor: '#3e1bee'
    },
    outlinetext: {
        textAlign: 'center',
        fontSize: 16,
        color: '#767676',
        fontFamily: "Raleway-Bold",
        fontWeight: '600',
    },
    outlinetext2: {
        textAlign: 'center',
        fontSize: 16,
        color: '#767676',
        fontWeight: '600',
        fontFamily: "Raleway-Bold"
    },
    linkdinbtn: {
        backgroundColor: '#0a66c2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0a66c2',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 10
    },
    linkdintext: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        fontFamily: "Raleway-Bold"
    },

    btnimg: {
        height: 22,
        width: 22,
        position: 'absolute',
        top: 10,
        left: 30
    },
    topbar: {
        width: '100%',
        position: 'relative',
    },
    homeheaderwrap: {
        paddingLeft: 55,
        paddingRight: 15,
        paddingBottom: 8,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        height: 70,
    },
    barwrap: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 15
    },
    dottedsearch: {
        width: '100%',
        paddingBottom: 8,
        borderStyle: 'dashed',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingLeft: 30,
        paddingRight: 40,
        color: '#242933',
        fontSize: 16,
        fontFamily: "Lato-Regular"
    },
    licon: {
        width: 16,
        height: 28,
        position: 'absolute'
    },
    ricon: {
        width: 26,
        height: 28,
        position: 'absolute',
        right: 8,
        top: 6
    },
    searchbartop: {
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 25,
        paddingVertical: 8,
        width: '100%',
        borderRadius: 4,
        color: '#242933',
        fontSize: 16,
        fontFamily: "Lato-Regular"
    },
    tagswrap: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        flexWrap: 'wrap',
    },
    tags: {
        width: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        marginBottom: 8,
        borderRadius: 35,
    },
    filltags: {
        width: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        marginBottom: 8,
        borderRadius: 35,
    },
    tagtext: {
        color: '#242933',
        fontSize: 13,
        fontFamily: "Lato-Regular"
    },
    activetag: {
        backgroundColor: '#3e1bee',
        borderColor: '#3e1bee'
    },
    activetext: {
        color: '#3e1bee'
    },
    whitetext: {
        color: '#fff'
    },
    cardthumb: {
        width: '100%',
        height: 120,
        borderRadius: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        position: 'relative'
    },
    editbtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 80,
        bottom: 20,
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: '#fff'
    },
    editbtn2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        backgroundColor: '#f2f2f2',
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        alignSelf: 'flex-end'
    },
    card2: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        position: 'relative',
        paddingBottom: 4,
        paddingLeft: 10,
        paddingTop: 5
    },
    cardcontent: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    cardbody: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    btnsm: {
        paddingHorizontal: 6,
        paddingVertical: 8,
        marginTop: 15
    },
    btnsmtext: {
        fontSize: 14,
        fontFamily: "Raleway-Bold",
    },
    pheading: {
        fontSize: 16,
        color: '#242933',
        marginBottom: 5,
        fontFamily: "Raleway-Bold",
        fontWeight: 'bold',
    },
    heading: {
        fontSize: 18,
        color: '#242933',
        fontFamily: "Raleway-Bold",
    },
    heading2: {
        fontSize: 24,
        color: '#242933',
        marginBottom: 10,
        fontFamily: "Raleway-Bold"
    },
    hedinglink: {
        color: '#3e1bee',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Raleway-Bold"
    },
    para: {
        fontSize: 15,
        color: '#767676',
        marginBottom: 10,
        fontFamily: "Lato-Regular",
        lineHeight: 24
    },
    para2: {
        fontSize: 13,
        color: '#767676',
        textAlign: 'center',
        fontFamily: "Lato-Regular"
    },
    notfoundtext: {
        fontSize: 16,
        color: '#767676',
        fontFamily: "Raleway-Medium",
        paddingVertical: 10,
    },
    pricetext: {
        fontSize: 16,
        color: '#767676',
        fontFamily: "Lato-Regular",
    },
    productrow: {
        marginBottom: 20
    },
    dashbg: {
        height: 170
    },
    headerwrap: {
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 8,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        height: 55,
    },
    tabheader: {
        height: 125,
        paddingBottom: 70
    },
    ticon: {
        width: 25,
        height: 25,
    },
    Tlefticon: {
        position: 'absolute',
        left: 15,
        top: 18,
    },
    Trighticon: {
        position: 'absolute',
        right: 15,
        top: 18,
        left: 'auto',
    },
    htitle: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "Lato-Regular"
    },
    centerheading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    namerow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 8,
        paddingTop: 5
    },
    namerow2: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingBottom: 10,
        paddingTop: 10
    },
    nametext: {
        fontSize: 16,
        color: '#242933',
        fontWeight: 'bold',
        width: 140,
        lineHeight: 24,
        fontFamily: "Raleway-Bold"
    },
    namedata: {
        fontSize: 16,
        color: '#757576',
        maxWidth: 200,
        lineHeight: 24,
        fontFamily: "Lato-Regular"
    },
    hr: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10
    },
    trow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
        paddingTop: 10,
        width: '100%'
    },
    cmsbanner: {
        position: 'relative',
    },
    banner: {
        width: '100%',
        height: 180
    },
    visonmission: {
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
        marginTop: 10
    },
    missiontext: {
        fontSize: 16,
        color: '#333',
        lineHeight: 26,
        marginBottom: 10,
        fontFamily: "Lato-Regular"
    },
    pfimgbox: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 150,
        width: '100%',
        overflow: 'hidden'
    },
    pfimg: {
        height: 150,
        width: '100%'
    },
    pfoot: {
        backgroundColor: '#f0f0f0',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 15,
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 75,
        paddingHorizontal: 15
    },
    boldtext: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "Raleway-Bold"
    },
    clogowrap: {
        paddingLeft: 15,
        paddingTop: 20,
        backgroundColor: '#3e1bee',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    clogocard: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: 160,
        marginBottom: 10,
        marginRight: 15,
        marginTop: 10,
        marginLeft: 2
    },
    clogo: {
        height: 70,
        width: 'auto',

    },
    lockimg: {
        height: 300,
    },
    blubg: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 50,
        backgroundColor: '#3e1bee',
        marginTop: 20,
        marginLeft: -15,
        marginRight: -15,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pltop: {
        position: 'relative',
        top: -40,
        marginBottom: -40
    },
    detailwrap: {
        paddingTop: 20
    },
    favheart: {
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex: 9,
        width: 22,
        height: 22,
        backgroundColor: '#fff',
        borderRadius: 22 / 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
    },
    tabview: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 2,
        left: 0,
        right: 0,
        paddingHorizontal: 15
    },
    tabtext: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Raleway-Bold",
        color: '#fff'
    },
    posttext: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: "Lato-Bold",
        color: '#fff'
    },
    tabbtn: {
        paddingBottom: 8,
        borderBottomColor: 'transparent',
        borderBottomWidth: 1,
        width: '50%'
    },
    activetab: {
        paddingBottom: 8,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: '50%'
    },
    postedrow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e1bee',
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginLeft: -10,
        marginTop: -15,
        marginRight: -10,
        marginBottom: 15
    },
    dropmenubox: {
        position: 'absolute',
        right: 20,
        top: 20,
        minWidth: 120,
        shadowColor: '#242933',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 5,
        backgroundColor: '#fff',
        zIndex: 99,
        paddingVertical: 10
    },
    mlink: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    mlinktext: {
        fontSize: 13,
        textAlign: 'left',
        fontFamily: "Lato-Ragular",
        color: '#757676'
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
        height: 60,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#a898f7',
        paddingHorizontal: 15
    },
    modalView: {
        // paddingHorizontal:15,
        // paddingVertical:15,
        // width:'100%',
        // backgroundColor:'#fff',
        // borderRadius:5,
        // shadowColor: '#f2f2f2',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 5,  


        margin: 20,       
        width: '100%',

        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5


    },
    deletecross: {
        position: 'absolute',
        top: -12,
        right: -12
    }


}



