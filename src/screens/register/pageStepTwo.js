import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Common, Colors, Dimens } from 'styles';
import { Text, Button, OtpInput , ScrollableWithInputHandling} from 'components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'strings';

function getLast3Digits(number) {
    if (number.length < 3) {
        return number
    }
    return number.substring(number.length - 3, number.length)
}

function pageStepTwo(register, codeFilled, onResend, swipeIndex) {

    const { setOtp, otp } = register;
    const number = getLast3Digits(register.phoneNumber);
    let input = useRef(null);

    useEffect(() => {
        if (swipeIndex === 1)
            input.current.focus()
    }, [swipeIndex]);

    return (
        <ScrollableWithInputHandling>

            <TextInput
                keyboardType={"number-pad"}
                ref={input}
                value={otp}
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={(text) => {
                    if (text.length <= 4) { setOtp(text); }
                }}
                style={{ height: 1, width: 0 }} />

            <Text style={{
                marginTop: 32,
                marginBottom: 16,
                color: Colors.placeholder,
                fontSize: 12,
                alignSelf: 'center',
            }}>{t('registration.phoneNumberFmt', [register.countryCode, number])}</Text>

            <OtpInput onPress={() => {
                input.current.focus();
            }} otp={otp}></OtpInput>

            <View style={{ height: Dimens.DEFAULT_VERTICAL_SPACING }} />

            <View>
                <Button
                    onPress={()=>{
                        onResend();
                        setOtp(""); 
                        input.current.clear() 
                    }}
                    title={t('registration.resend')}
                    style={[{
                        backgroundColor: '#FF8F0020',
                        borderRadius: Dimens.FIELD_HEIGHT / 2
                    }, styles.btnVerify]}
                    textStyle={{ color: '#FF8F00' }} />
            </View>
        </ScrollableWithInputHandling>
    )
};

export default pageStepTwo;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    },

    charContainer: {
        height: '90%',
        width: '20%',
        backgroundColor: '#F6F6F4',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 16,
        justifyContent: 'center'
    },

    char: {
        color: Colors.text,
        fontSize: 30,
        textAlign: 'center'
    },
    btnVerify: {
        alignContent: 'center',
        alignSelf: 'center',
        paddingLeft: 16,
        paddingRight: 16
    }
});

