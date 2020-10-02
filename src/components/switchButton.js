import React from 'react';
import { Colors, Dimens } from 'styles';
import { View } from 'react-native';
import Button from './button';

function SwitchButton({ leftTitle, rightTitle, style, onLeftPressed, onRightPressed, leftSelected }) {

    const leftBackground = leftSelected === true ? Colors.primary : 'white'
    const rightBackground = leftSelected === false ? Colors.primary : 'white'

    const leftColor = leftSelected === true ? 'white' : Colors.text
    const rightColor = leftSelected === false ? 'white' : Colors.text

    return (
        <View style={[{
                overflow: 'hidden',
                borderRadius: Dimens.FIELD_HEIGHT / 2,
                borderColor: Colors.border,
                borderWidth: 0.7,
                backgroundColor: Colors.roundButtonColor,
                height: Dimens.FIELD_HEIGHT,
                flexDirection: 'row',
                alignContent: 'stretch',
                flex: 1
            }, style]}>
            <Button title={leftTitle} 
                    style={{ borderRadius: 0, width: '50%', backgroundColor: leftBackground }} 
                    textStyle={{ color: leftColor }}
                    onPress={() => { if (onLeftPressed) { onLeftPressed() } }
                    }/>
            <Button title={rightTitle} style={{backgroundColor: rightBackground, borderRadius: 0,  width: '50%'}} 
                    textStyle={{ color: rightColor }} title={rightTitle}
                    onPress={() => { if (onRightPressed) { onRightPressed() } }
                    }/>
        </View>)
}

export default SwitchButton;
