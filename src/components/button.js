import React from 'react';
import Touchable from './touchable';
import {ViewPropTypes, ActivityIndicator, View, Text as RNText} from 'react-native';
import { Colors, Dimens } from 'styles';
import {getFixedTextStyle} from "../utils/fontStyle";

const { primary ,placeholder} = Colors;

function Button({ title, style, textStyle, onPress, loading, color }) {
    return (
        <Touchable disabled={loading} onPress={loading ? undefined : onPress} style={[{
            borderRadius: 10,
            backgroundColor: color ? "#F1F1F1" :  primary,
            height: Dimens.FIELD_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center'
        }, style]}>
            <View>
                {!loading && <RNText style={[{
                    color: color ? placeholder  : 'white',
                    fontSize: 14
                }, getFixedTextStyle(textStyle)]}>{title}</RNText>
                }
                {loading && <ActivityIndicator size='small' color='white'/>}
            </View>
        </Touchable>)
}

Button.propTypes = {
    style: ViewPropTypes.style
}

export default Button;
