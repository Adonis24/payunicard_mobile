import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Common, Colors, Dimens} from 'styles';
import {Text, Button, OtpInput, TextInput} from 'components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import t from 'strings';

function otpInput(hook, showKeyboard, mask = null) {

    let input = useRef(null);
    let [maskVal, setMaskVal] = useState(mask)

    useEffect(() => {
        if (showKeyboard) {
            input.current.focus()
            if (hook.mask && hook.mask.length > 0) {
                setMaskVal(hook.mask)
            }
        }
    }, [showKeyboard]);

    return (
        <KeyboardAwareScrollView style={Common.horizontalMargin}>

            <TextInput
                keyboardType={"number-pad"}
                value={hook.otp}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={(text) => {
                    if (text.length <= 4) {
                        hook.setOtp(text);
                    }
                }}
                selectionColor={'white'}
                innerRef={input}
                style={{height: 20, width: 20, backgroundColor: 'white', color: 'white', position: 'absolute', top: -20}}/>

            <View style={styles.padding}/>

            <Text style={{
                marginTop: 32,
                color: Colors.placeholder,
                fontSize: 16
            }}>{t('forgotpassword.otp_verify_phone_mask', [maskVal])}</Text>

            <View style={styles.padding}/>

            <OtpInput onPress={() => {
                input.current.focus()
            }} otp={hook.otp}/>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING * 2}}/>

            <View>
                <Button
                    title={t('registration.resend')}
                    style={[{
                        backgroundColor: '#FF8F0020',
                        borderRadius: Dimens.FIELD_HEIGHT / 2
                    }, styles.btnVerify]}
                    textStyle={{color: '#FF8F00'}}/>
            </View>
        </KeyboardAwareScrollView>
    )
};

export default otpInput;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    },
    btnVerify: {
        alignContent: 'center',
        alignSelf: 'center',
        paddingLeft: 16,
        paddingRight: 16
    }
});

