import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './Styles';
import CommonStyles from '../../../CommonStyles';
import Autocomplete from 'react-native-autocomplete-input';
import { apiCallWithToken } from '../../Api';
import { GET_ALL_CATEGORY, GET_ALL_SPECIALITY } from '../../shared/allApiUrl';

class AutocompleteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobName: '',
            jobnameError: '',
            jobCategory: [],
            filteredJobCategory: [],
            filteredJobCategoryError: '',
            selectedJobCategory: [],
            jobSpeciality: [],
            jobSpecialList: false,
            filteredJobSpeciality: [],
            selectedJobSpeciality: [],
            jobSpecialityError: "",

            holder: [],
            specialityHolder: [],
            suggestedKeywordError: '',
            speciality: [],
            skill: [],
            skillList: [],
            specialityList: [],
            jobList: false,
            term: this.props?.navigation?.state?.params?.data?.value,
            userId: this.props?.navigation?.state?.params?.data?.userId

        };
    }

    componentDidMount() {

        this.getJobCategory();
        this.jobList();
        this.getSpecialitynSkill();
        this.getJobSpeciality();
    }

    getJobCategory = async () => {
        await apiCallWithToken(GET_ALL_CATEGORY, 'get')
            .then(res => {
                if (res.data) {
                    this.setState({ jobCategory: res.data.data })
                }
            }).catch(err => {
                console.log(err)
            })
    };

    jobList = () => {
        this.setState({ filteredJobCategory: this.state.jobCategory })
    }

    getSpecialitynSkill = async (newValue) => {
        if (newValue.id !== null) {
            let tempArr = this.state.selectedJobCategory;
            tempArr.push(newValue)
            this.setState({ selectedJobCategory: tempArr, filteredJobCategory: [] });
            var formData = new FormData();
            formData.append("cat_id", newValue.id);


            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                        
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    getJobSpeciality = async (newValueid, newValuename) => {
        
        if (newValueid !== "") {
            let tempArr = this.state.selectedJobSpeciality;
            tempArr.push(newValuename)
            this.setState({ selectedJobSpeciality: tempArr, filteredJobSpeciality: [] });
            var formData = new FormData();
            formData.append("cat_id", newValueid);
            
            await apiCallWithToken(GET_ALL_SPECIALITY, "post", formData)
                .then((res) => {
                    if (res.status == 200) {
                        this.setState({ specialityList: res.data.data.speciality, skillList: res.data.data.skill });
                        
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    findJobCategoryData = (text) => {
        this.setState({ jobList: true })
        let jobCategoryData = this.state.jobCategory;
        if (text) {
            const regex = new RegExp(`${text.trim()}`, 'i');
            let data = jobCategoryData.filter((obj) => obj.name.search(regex) >= 0)
            this.setState({ filteredJobCategory: data })
        } else {
            this.setState({ filteredJobCategory: [] })
        }
    }

    render() {
        return (
            <>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => this.jobList()}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={[styles.autoComplete]}
                listStyle={{ zIndex: 1, position: 'relative' }}
                data={this.state.filteredJobCategory}
                onChangeText={(text) => this.findJobCategoryData(text)}
                placeholder="Enter job category"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        disabled={this.state.selectedJobCategory.length != 0 ? true : false}
                        onPress={() => this.getSpecialitynSkill(item)}
                    >
                        <Text style={[styles.itemText]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            {
                this.state.selectedJobCategory.length > 0 && this.state.selectedJobCategory.map((val, index) => {
                    return (<View style={[CommonStyles.tagswrap, { paddingTop: 10 }]}>
                        <View style={[CommonStyles.tags, CommonStyles.activetag, CommonStyles.flexrow]}>
                            <Text style={[CommonStyles.tagtext, CommonStyles.whitetext]}>{val.name}</Text>
                            <TouchableOpacity onPress={() => this.removeJobCategory(index)}>
                                <Icon name="close-circle" size={15} color="#fff" style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    )
                })
            }
            {this.state.filteredJobCategoryError != '' ? (
                <Text style={{ color: 'red' }}>{this.state.filteredJobCategoryError}</Text>
            ) : null}
            </>
        )
    }
}

export default AutocompleteCard;