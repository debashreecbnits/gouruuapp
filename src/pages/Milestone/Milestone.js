import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import CommonStyles from '../../../CommonStyles';
import styles from './Styles';

export default class Index extends Component {
    
      constructor() {
        super();
        this.state = {}
    }
    render() {
        return (
            <SafeAreaView style={CommonStyles.wrapper}>                
                <View style={CommonStyles.headerwrap}>
                    <View style={CommonStyles.Tlefticon}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/left-arrow.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                    <View style={CommonStyles.centerheading}>
                        <Text style={CommonStyles.htitle}>Milestone</Text>  
                    </View>
                    <View style={CommonStyles.Trighticon}>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('NotificationList')} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={CommonStyles.ticon} />
                        </TouchableOpacity>
                    </View>
                </View>     
                <ScrollView>     
                    <View style={CommonStyles.container}>                          
                    
                    <View style={styles.mrow}>  
                        <View style={[styles.leftline, styles.activeline]}></View>                     
                        <View style={[styles.mround, styles.activeround]}>
                            <Text style={[styles.mtext, styles.mactivetext]}>1</Text>
                        </View>
                        <View style={[styles.mcontent]}>
                            <Text style={styles.mrheading}>Project Accepted</Text>
                            <Text style={styles.para}>We agreed and signup with project.</Text>
                            <Text style={[styles.para, styles.mactivetext]}>We Got signup Amount $500</Text>
                        </View>                        
                    </View>
                    <View style={styles.mrow} opacity={0.4}>  
                        <View style={[styles.leftline]}></View>                     
                        <View style={[styles.mround]}>
                            <Text style={[styles.mtext]}>2</Text>
                        </View>
                        <View style={[styles.mcontent]}>
                            <Text style={[styles.mrheading]}>Step 2</Text>
                            <Text style={styles.para}>correct ans but as the above comment says, it's a style.</Text>                            
                        </View>                        
                    </View>
                    <View style={styles.mrow} opacity={0.4}>  
                        <View style={[styles.leftline]}></View>                     
                        <View style={[styles.mround]}>
                            <Text style={[styles.mtext]}>3</Text>
                        </View>
                        <View style={[styles.mcontent]}>
                            <Text style={[styles.mrheading]}>Step 3</Text>
                            <Text style={styles.para}>correct ans but as the above comment says, it's a style.</Text>                            
                        </View>                        
                    </View>
                    <View style={styles.mrow} opacity={0.4}>  
                        <View style={[styles.leftline]}></View>                     
                        <View style={[styles.mround]}>
                            <Text style={[styles.mtext]}>4</Text>
                        </View>
                        <View style={[styles.mcontent]}>
                            <Text style={[styles.mrheading]}>Step 4</Text>
                            <Text style={styles.para}>correct ans but as the above comment says, it's a style.</Text>                            
                        </View>                        
                    </View>
                    <View style={styles.mrow} opacity={0.4}> 
                        <View style={[styles.mround]}>
                            <Text style={[styles.mtext]}>5</Text>
                        </View>
                        <View style={[styles.mcontent, styles.lastcontent]}>
                            <Text style={[styles.mrheading]}>Step 5</Text>
                            <Text style={styles.para}>correct ans but as the above comment says, it's a style.</Text>                            
                        </View>                        
                    </View>
                           
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

