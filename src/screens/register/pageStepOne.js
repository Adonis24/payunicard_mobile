import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Keyboard, Animated , ScrollView} from 'react-native';

import CountryPicker , {getAllCountries} from 'react-native-country-picker-modal';
import { Colors, Dimens, Common } from 'styles';
import { Text, TextInput, Button ,ScrollableWithInputHandling } from 'components';
import t from 'strings';
import { Consts, isAndroid } from 'utils';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from '@unimodules/core';

function pageStepOne(onNextClick, register) {

    const textInputRef = useRef(null);
    const countryPickerRef = useRef(null);
    const countryPicker = useRef(null);
    const [offsetY, setOffsetY] = useState(0);

    return (
        <ScrollView style={Common.horizontalMargin}
                    scrollEnabled={false}
                    contentOffset={{ y: offsetY }}
                    contentContainerStyle={{ marginTop: Platform.OS === 'android' ? offsetY : 0 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}>
            <Text style={{
                marginTop: 34,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24,
            }}>{t('auth.registerphonenumber')}</Text>

            <Text style={{
                width: '75%',
                marginTop: 20,
                color: Colors.placeholder,
                fontSize: 12
            }}>{t('auth.registerphonenumbersubtext')}</Text>

            <View style={styles.padding} />

            <TouchableOpacity ref={countryPicker}
                style={styles.countryPicker}
                onPress={()=>countryPickerRef.current.openModal()}
            >
                <CountryPicker
                    ref={countryPickerRef}
                    onChange={value => {
                        register.setCountryKey(value.cca2);
                        register.setCountryCode(value.callingCode);
                        register.setCountry(value.name)
                    }}
                    cca2={register.countryKey}
                    countryList={Consts.CCA2}
                    filterable={true}
                    animationType='slide'
                    closeable={true}
                    translation='eng'
                    showCallingCode={true}
                    styles={{
                        closeButtonImage: {
                            tintColor: 'red'
                        },
                        countryName: {
                            color: '#424242',
                            fontSize: 15,
                        },
                        letterText: {
                            color: 'grey',
                            fontSize: 15,
                        },
                        itemCountryName: {
                            borderBottomWidth: 0
                        },
                    }}
                    flagType='flat'
                />

                <Text style={{
                    marginLeft: 8,
                    color: Colors.placeholder,
                    marginTop: 5,
                    fontSize: 14
                }}>{'+' + register.countryCode + ' ' + register.country}</Text>


                <AntDesign style={{
                    position: 'absolute',
                    right: 16,
                    top: 14,
                    fontWeight: 'bold'
                }} name='down' color='#b0b0b0' size={16} />

            </TouchableOpacity>

            <View style={styles.padding} />

            <TextInput
                innerRef={textInputRef}
                keyboardType={"number-pad"}
                label={t('auth.phoneNumber')}
                autoCorrect={false}
                autoCapitalize='none'
                value={register.phoneNumber}
                onChangeText={(text) => { register.setPhoneNumber(text) }}
                onFocus={()=>{  setOffsetY(Platform.OS === 'android' ? -160 : 160) }}
                onBlur={()=> { setOffsetY(0) }}
                style={{borderWidth:  register.highlightsValidations && register.phoneNumber.length < 9 ? 1 : 0,
                        borderColor: 'red'}}
                />

            <View style={{ height: Dimens.DEFAULT_VERTICAL_SPACING }} />

            <Button
                onPress={onNextClick}
                loading={register.loading}
                title={t('common.next')} />

        </ScrollView>
    )
};

export default pageStepOne;

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

