import React from 'react';
import Text from './text';
import Touchable from './touchable';
import { Colors } from 'styles';
import { ViewPropTypes } from 'react-native';


function RoundButton({ title, style, textStyle, onPress }) {

    return (
        <Touchable
            onPress={onPress}
            style={[{
                borderRadius: 21,
                backgroundColor: Colors.roundButtonColor,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
            }, style]}>
            <Text style={[{
                color: Colors.roundButtonTextColor,
                fontSize: 12
            }, textStyle]}>{title}</Text>
        </Touchable>)
}

RoundButton.propTypes = {
    style: ViewPropTypes.style
}

export default RoundButton;
