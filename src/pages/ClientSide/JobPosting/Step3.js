import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image,
    KeyboardAvoidingView, ScrollView, ImageBackground
} from 'react-native';
import { NativeBaseProvider, Radio } from 'native-base';
import styles from './Styles';
import CommonStyles from '../../../../CommonStyles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class PostStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                address: this.props?.navigation?.state?.params?.data?.draftValueDetails?.location_status === 0 ? this.props.navigation.state.params.data.draftValueDetails?.city.concat(",", this.props?.navigation?.state?.params?.data?.draftValueDetails?.country) : '',
            },
            project_type: 'one time',
            project_specification: this.props?.navigation?.state?.params?.data?.draftValueDetails ? this.props?.navigation?.state?.params?.data?.draftValueDetails?.job_type : 'Technical',
            project_location: this.props?.navigation?.state?.params?.data?.draftValueDetails?.location_status === 0 ? "Want to change" : "Same as profile",

            //5 field
            selectedTerm: this.props?.navigation?.state?.params?.data?.selectedtTerm,
            selectedTitle: this.props?.navigation?.state?.params?.data?.title,
            selectedCategory: this.props?.navigation?.state?.params?.data?.selectedCategory,
            selectedJobSpeciality: this.props?.navigation?.state?.params?.data?.selectedJobSpeciality,
            selectedKeyWord: this.props?.navigation?.state?.params?.data?.selectedKeyWord,
            selectedDescription: this.props?.navigation?.state?.params?.data?.description,
            selectedMultipleFile: this.props?.navigation?.state?.params?.data?.multipleFile,
            userId: this.props?.navigation?.state?.params?.data?.userId,
            textCategoryStore: this.props?.navigation?.state?.params?.data?.textCategoryStore,
            draftValueDetails: this.props?.navigation?.state?.params?.data?.draftValueDetails
        };
    }

    onNext = () => {
        console.log("this.props value==>", this.props)
        this.props.navigation.navigate('PostStep4', { data: this.state });

    }


    handleChange(value, name) {
        console.log("value==>", value)
        console.log("name==>", name)
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({ fields });
        console.log("fields==>", this.state.fields)

    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/mainbg.png')} style={CommonStyles.wrapperbg}>
                <NativeBaseProvider style={CommonStyles.wrapper}>
                    <KeyboardAvoidingView style={{ flex: 1 }}>

                        {/* <View style={CommonStyles.headerwrap}>
                        <View style={CommonStyles.Tlefticon}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                            </TouchableOpacity>
                        </View>
                        <View style={CommonStyles.centerheading}>
                            <Text style={CommonStyles.htitle}>Details</Text>
                        </View>
                    </View> */}
                        <ImageBackground source={require('../../../assets/images/headerbar.png')} style={CommonStyles.headerwrap}>
                            <View style={CommonStyles.Tlefticon}>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                                </TouchableOpacity>
                            </View>
                            <View style={CommonStyles.centerheading}>
                                <Text style={CommonStyles.htitle}>Details</Text>
                            </View>
                        </ImageBackground>
                        <ScrollView keyboardShouldPersistTaps="always">
                            <View style={CommonStyles.container}>
                                <View style={[styles.bdrbtm, CommonStyles.rowbetween, CommonStyles.aligncenter]}>
                                    <Text style={styles.h2}>Project Details</Text>
                                    <View style={styles.stepbg}>
                                        <Text style={[styles.ptext]}>Step 3 of 7</Text>
                                    </View>

                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Choose Project Type</Text>
                                    <Radio.Group
                                        name="myRadioGroup2"
                                        value={this.state.project_type}
                                        onChange={(nextValue) => {
                                            this.setState({ project_type: nextValue });
                                        }}
                                    >
                                        <View style={{ width: '100%', flex: 1, marginTop: 10 }}>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="one time" my="1" ml={2}>
                                                    <Text style={[styles.label]}> One time Project</Text>
                                                </Radio>
                                            </ImageBackground>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="ongoing" my="1" ml={2}>
                                                    <Text style={[styles.label]}> Ongoing Project</Text>
                                                </Radio>
                                            </ImageBackground>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="complex" my="1" ml={2}>
                                                    <Text style={styles.label}> Complex Project</Text>
                                                </Radio>
                                            </ImageBackground>
                                        </View>
                                    </Radio.Group>
                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Choose Project Specification</Text>
                                    <Radio.Group
                                        name="myRadioGroup3"
                                        value={this.state.project_specification}
                                        onChange={(nextValue) => {
                                            this.setState({ project_specification: nextValue });
                                        }}
                                    >
                                        <View style={{ width: '100%', flex: 1, marginTop: 10 }}>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="Technical" my="1" color="blue" ml={2}>
                                                    <Text style={styles.label}> Technical </Text>
                                                </Radio>
                                            </ImageBackground>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="Miscellaneous" my="1" ml={2}>
                                                    <Text style={styles.label}> Miscellaneous </Text>
                                                </Radio>
                                            </ImageBackground>
                                        </View>
                                    </Radio.Group>
                                </View>

                                <View style={CommonStyles.formgroup}>
                                    <Text style={styles.formlabel}>Choose Project location</Text>
                                    <Radio.Group
                                        name="myRadioGroup4"
                                        value={this.state.project_location}
                                        onChange={(nextValue) => {
                                            this.setState({ project_location: nextValue });
                                        }}
                                    >
                                        <View style={{ width: '100%', flex: 1, marginTop: 10 }}>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="Same as profile" my="1" ml={2}>
                                                    <Text style={styles.label}> Same as profile </Text>
                                                </Radio>
                                            </ImageBackground>
                                            <ImageBackground source={require('../../../assets/images/radiobg.png')} style={styles.radiobg} resizeMode="stretch">
                                                <Radio value="Want to change" my="1" ml={2}>
                                                    <Text style={styles.label}> Want to change </Text>
                                                </Radio>
                                            </ImageBackground>
                                        </View>
                                    </Radio.Group>

                                </View>
                                {/* {this.props?.navigation?.state?.params?.data?.draftValueDetails?.location_status === 0 ?
                                    <View style={{ marginBottom: 20 }}>
                                        <Text>{this.state.fields.address}</Text>
                                    </View> : <></>
                                } */}
                                {
                                    this.state.project_location != "Same as profile" ?
                                        <View style={CommonStyles.formgroup}>
                                            <GooglePlacesAutocomplete
                                                placeholder={this.state.fields.address}
                                                //placeholder='Search'
                                                minLength={2} // minimum length of text to search
                                                autoFocus={false}
                                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                                                listViewDisplayed={false} // true/false/undefined
                                                fetchDetails={true}
                                                renderDescription={row => row.description} // custom description render
                                                onPress={(data, details = null) => {
                                                    // 'details' is provided when fetchDetails = true
                                                    console.log("details===>",details)
                                                    this.handleChange(details.formatted_address, 'address');
                                                }}
                                                // setAddressText ={this.state.fields.address}
                                            

                                                query={{
                                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                                    key: 'AIzaSyAACgTdJ_FF55iFXrHmUH85Y34GjR4pOSg',
                                                    language: 'en', // language of the results
                                                }}
                                                styles={{
                                                    textInput: [
                                                        CommonStyles.formcontrol,

                                                        { borderColor: '#758283' }

                                                    ],
                                                    textInputContainer: CommonStyles.formgroup,
                                                }}
                                                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                                currentLocationLabel="Current location"
                                                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                                GoogleReverseGeocodingQuery={
                                                    {
                                                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                                    }
                                                }
                                                GooglePlacesSearchQuery={{
                                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                                    rankby: 'distance',
                                                    type: 'food',
                                                }}
                                                GooglePlacesDetailsQuery={{
                                                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                                    fields: 'formatted_address',
                                                }}
                                                filterReverseGeocodingByTypes={[
                                                    'locality',
                                                    'administrative_area_level_3',
                                                ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                                predefinedPlaces={[]}
                                                enablePoweredByContainer={false}
                                                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                                                renderLeftButton={() => { }}
                                                renderRightButton={() => { }}
                                            />
                                            <View style={CommonStyles.formtextwrap}>
                                                <Text style={CommonStyles.formtext}>Select project location*</Text>
                                            </View>
                                        </View> :
                                        <></>

                                }

                                <View style={[CommonStyles.row, styles.mt40]}>
                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn}
                                            onPress={() => this.props.navigation.goBack()}
                                        >
                                            <Text style={CommonStyles.outlinetext}>Back</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={CommonStyles.col50}>
                                        <TouchableOpacity style={CommonStyles.outlinebtn3} onPress={() => this.onNext()}>
                                            <Text style={CommonStyles.btntext}>Next</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </NativeBaseProvider>
            </ImageBackground>
        );
    }
}
