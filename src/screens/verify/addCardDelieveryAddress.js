import React, { useRef, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Colors, Dimens, Common } from 'styles';
import { Text, TextInput, Button } from 'components';
import t from 'strings';
import { showErrorWithMessage } from 'utils';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const {height} = Dimensions.get('window');

function addCardDelieveryAddress(hook, onCountryPickerClick, showKeyboard) {

    const textInputRef = useRef(null);

    useEffect(() => {
        if (showKeyboard) {
            textInputRef.current.focus()
        }
    }, [showKeyboard]);

    return (
        <KeyboardAwareScrollView
            extraScrollHeight={60}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={Common.horizontalMargin}>

            <Text style={{
                marginTop: 34,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24,
            }}>{t('verify.order_card_title')}</Text>

            <Text style={{
                width: '75%',
                marginTop: 20,
                color: Colors.placeholder,
                fontSize: 12
            }}>{t('verify.order_card_address_subtitle')}</Text>

            <View style={styles.padding} />

            <View style={styles.countryPicker}>
                <TouchableOpacity style={{backgroundColor: 'transparent', width: '100%'}} onPress={onCountryPickerClick}>
                    <Text style={{
                        marginLeft: 8,
                        color: Colors.placeholder,
                        marginTop: 4,
                        fontSize: height / 48
                    }}>{hook.selectedCity.name}</Text>

                    <AntDesign style={{
                        position: 'absolute',
                        right: 16,
                        top: 8,
                        fontWeight: 'bold'
                    }} name='down' color='#b0b0b0' size={16}/>
                </TouchableOpacity>
            </View>

            <View style={styles.padding} />

            <TextInput
                innerRef={textInputRef}
                label={t('verify.order_card_address')}
                autoCorrect={false}
                autoCapitalize='none'
                value={hook.address}
                onChangeText={(text) => {
                    hook.setAddress(text)
                }} />

        </KeyboardAwareScrollView>
    )
};

export default addCardDelieveryAddress;

const styles = StyleSheet.create({
    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.input,
        borderRadius: 10,
        height: Dimens.FIELD_HEIGHT,
        width: '100%',
        paddingLeft: 16,
    },
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }

});

