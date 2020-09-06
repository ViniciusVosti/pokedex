import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { BtnDrawer } from '../../components';
import { Icon } from '..';
import { colors, p, } from '../../styles'

export default class MenuContainer extends Component {
	
	state = {
		version: ""
	}
	
	componentDidMount() {
		this.init();
	}
	
	async init() {
		let version = await DeviceInfo.getVersion();
		this.setState({version});
    }
    
    render() {

        return (

            <View style={[p.f1, p.p16, p.bgcThird]}>

                <View style={[p.bgcTransparent,p.f1,]}>

                    <View style={[p.row]}>
                        <View style={[p.bgcWhite,p.aiCenter, p.jCenter,{ height: 70, width: 70, borderRadius: 35, }]}>
                            <View style={[p.bgcSecondaryLight,p.aiCenter, p.jCenter,{ height: 60, width:60, borderRadius: 30, }]}>
                                <View style={[p.bgcSecondaryDark, { width: 40, height: 40, borderRadius:20 }]}>
                                    <View style={[p.bgcSecondaryLight,p.aiCenter,p.jCenter, { width: 18, height: 18, borderRadius: 9 }]}>
                                        <View style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor:'#a3dafd' }]}>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[p.bgcThirdDark, p.aiCenter, p.jCenter,{ height: 15, width: 15, borderRadius: 7.5, }]}>
                            <View style={[p.bgcThird, { width: 10, height: 10, borderRadius:5 }]}>
                                <View style={[p.bgcThirdLight,p.aiCenter,p.jCenter, { width: 2, height: 2, borderRadius: 1 }]}>

                                </View>
                            </View>
                        </View>
                        <View style={[p.bgcPrimary, p.aiCenter, p.jCenter,p.ml8,{ height: 15, width: 15, borderRadius: 7.5, }]}>
                            <View style={[p.bcPrimaryDark, { width: 10, height: 10, borderRadius:5 }]}>
                                <View style={[p.bgcPrimaryLight,p.aiCenter,p.jCenter, { width: 2, height: 2, borderRadius: 1 }]}>

                                </View>
                            </View>
                        </View>
                        <View style={[p.bgcGreen, p.aiCenter, p.jCenter,p.ml8,{ height: 15, width: 15, borderRadius: 7.5, }]}>
                            <View style={[p.bgcGreenDark, { width: 10, height: 10, borderRadius:5 }]}>
                                <View style={[p.bgcGreenLight,p.aiCenter,p.jCenter, { width: 2, height: 2, borderRadius: 1 }]}>

                                </View>
                            </View>
                        </View>
                    </View>

                    <ScrollView style={[p.mt16]}>

                        <BtnDrawer
                            name={"Home"}
                            iconName={"home"} 
                            iconType={"FontAwesome5"}
                            iconSize={22}
                            onPress={() => Actions.home()}
                        />

                        <BtnDrawer
                            name={"Favorites"}
                            iconName={"star"} 
                            iconType={"FontAwesome5"}
                            iconSize={22}
                            onPress={() => Actions.favorite()}
                        />

                        <BtnDrawer
                            name={"Games"}
                            iconName={"gamepad"} 
                            iconType={"FontAwesome5"}
                            iconSize={22}
                            onPress={() => global.alert.alert("In develop")}
                        />

                        <BtnDrawer
                            name={"Machines"}
                            iconName={"tag"} 
                            iconType={"FontAwesome5"}
                            iconSize={22}
                            onPress={() => global.alert.alert("In develop")}
                        />

                        <BtnDrawer
                            name={"Locations"}
                            iconName={"map-marker-alt"} 
                            iconType={"FontAwesome5"}
                            iconSize={22}
                            onPress={() => global.alert.alert("In develop")}
                        />

                    </ScrollView>

                </View>

                <View style={{ position: 'absolute', bottom: 14, left: 14, }}>

                    <Text style={[p.ffRegular, p.fsSmaller, p.tcWhite]}>V.: {this.state.version} {'- DEV'}</Text>

                </View>

            </View>
        );
    }
}
