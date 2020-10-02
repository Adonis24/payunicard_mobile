import React from 'react';
import {View} from "react-native"
import { Colors , Common } from 'styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ScrollableWithInputHandling = (props) => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{flex:1,height:"100%"}}
            style={[{...Common.horizontalMargin},{ flex:0}]}
            viewIsInsideTabBar={true}
            {...props}
        >
        {props.children}
        </KeyboardAwareScrollView>
    )
}

export default ScrollableWithInputHandling;
