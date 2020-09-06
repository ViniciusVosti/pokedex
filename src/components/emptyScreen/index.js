import React from 'react'
import { Image, Text, View } from 'react-native';

import { p } from '../../styles';


export const EmptyScreen = (props) => {
    let {
        text = 'Nothing to see here'
    } = props

    return (
        <View style={[p.jCenter,p.aiCenter, p.mt32]}>
            <Image source={require("../../assets/images/snorlax_sleep.png")} style={[{width: 184, height: 184}]} />
            <View style={[p.aiCenter, p.jCenter, p.mt32]}>
                <Text style={[p.ffRegular, p.tCenter]}>{text}</Text>
            </View>
        </View>
    )
}