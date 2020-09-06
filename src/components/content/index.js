import React from 'react';
import { StatusBar, View } from 'react-native';
import { Container, Content as ContentNative } from 'native-base'

import Header from '../header';
import { colors, p } from '../../styles';

export const Content = (props) => {
    return(
        <Container style={{ flex: 1, position: 'relative' }} showsVerticalScrollIndicator={false}>

            {!props.noHeader && <StatusBar backgroundColor={props.statusBarColor ? props.statusBarColor : props.backgroundColor ? props.backgroundColor : colors.secondary} barStyle={'light-content'} {...props} />}
            {!props.noHeader && <Header {...props} />}
            {!props.noScroll && <ContentNative style={[p.f1, { backgroundColor: props.backgroundColor ? props.backgroundColor : colors.divider }, props.bodyStyle]} {...props} />}
            {props.noScroll && <View style={[p.f1, { backgroundColor: props.backgroundColor ? props.backgroundColor : colors.divider }, props.bodyStyle]}  {...props} />}

        </Container>
    )
}
