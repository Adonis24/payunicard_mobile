import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Colors, Dimens, Common} from 'styles';
import {Text, TextInput, Button} from 'components';
import t from 'strings';
import {AntDesign} from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CountryPicker , {getAllCountries} from 'react-native-country-picker-modal';
import Consts from "../../utils/consts";

const {height, width} = Dimensions.get('window');

const rangeEmojis = Array.from({length: 256}, (v, k) => (k + 9728).toString(16));

function verifyUserInfoManualInput(hook, onCountryPickerClick, showKeyboard) {

    const textInputPin = useRef(null);
    const textInputName = useRef(null);
    const textInputSurname = useRef(null);
    const textInputDate = useRef(null);
    const countryPicker = useRef(null);
    const countryPickerRef = useRef(null);

    useEffect(() => {
        if (showKeyboard) {
            textInputPin.current.focus()
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
                marginTop: 8,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 32,
            }}>{t('verify.manual_verification_title')}</Text>

            <Text style={{
                width: '75%',
                marginTop: 8,
                color: Colors.placeholder,
                fontSize: 12
            }}>{t('verify.manual_verification_subtitle')}</Text>

            <View style={styles.padding}/>

            <TouchableOpacity ref={countryPicker}
                              style={styles.countryPicker}
                              onPress={()=>countryPickerRef.current.openModal()}
            >
                <CountryPicker
                    ref={countryPickerRef}
                    onChange={value => {
                        hook.setSelectedCountry({
                            countryId: Consts.ids[value.cca2],
                            name: value.name
                        })
                    }}
                    cca2={'GE'}
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
                            color: 'blue'
                        },
                        letterText: {
                            color: 'grey'
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
                }}>{'+995 ' + hook.selectedCountry.name}</Text>


                <AntDesign style={{
                    position: 'absolute',
                    right: 16,
                    top: 14,
                    fontWeight: 'bold'
                }} name='down' color='#b0b0b0' size={16} />

            </TouchableOpacity>

            <View style={styles.padding}/>

            <TextInput
                innerRef={textInputPin}
                keyboardType={"number-pad"}
                label={t('verify.manual_verification_pin')}
                autoCorrect={false}
                autoCapitalize='none'
                style={{fontSize: 14, 
                        fontWeight: '200', 
                        height: Dimens.FIELD_HEIGHT,
                        borderWidth:  hook.highlightsValidations && hook.pin.length < 11 ? 1 : 0,
                        borderColor: 'red'}}
                value={hook.pin}
                onChangeText={(text) => {
                    hook.setPin(text)
                    if (text.length > 10) {
                        //hook.fetchUserInfo(text)
                    }
                }}/>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>

            <TextInput
                innerRef={textInputName}
                label={t('verify.manual_verification_name')}
                autoCorrect={false}
                autoCapitalize='none'
                style={{fontSize: 14, 
                        fontWeight: '200', 
                        height: Dimens.FIELD_HEIGHT, 
                        borderWidth:  hook.highlightsValidations && hook.name.length === 0 ? 1 : 0,
                        borderColor: 'red'}}
                value={hook.name}
                onChangeText={(text) => {
                    hook.setName(text)
                }}/>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>

            <TextInput
                innerRef={textInputSurname}
                label={t('verify.manual_verification_surname')}
                autoCorrect={false}
                autoCapitalize='none'
                style={{fontSize: 14, 
                        fontWeight: '200', 
                        height: Dimens.FIELD_HEIGHT,
                        borderWidth:  hook.highlightsValidations && hook.surname.length < 11 ? 1 : 0,
                        borderColor: 'red'}}
                value={hook.surname}
                onChangeText={(text) => {
                    hook.setSurname(text)
                }}/>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>
            <View style={{height: Dimens.FIELD_HEIGHT, position: 'relative'}}>
                <TextInput style={{fontSize: 14, height: Dimens.FIELD_HEIGHT}}
                           innerRef={textInputDate}
                           keyboardType={"number-pad"}
                           label={t('verify.manual_verification_birthdate')}
                           editable={false}
                           autoCorrect={false}
                           autoCapitalize='none'
                           value={hook.birthDate}
                />
                <DatePicker style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                            date={hook.birthDate} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            format="YYYY/MM/DD"
                            hideText={true}
                            // minDate="01/01/1920"
                            // maxDate="01/01/2019"
                            showIcon={false}
                            confirmBtnText={t('verify.manual_verification_birthdate_confirm')}
                            cancelBtnText={t('verify.manual_verification_birthdate_cancel')}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {
                                hook.setBirthDate(date)
                            }}
                />
            </View>

        </KeyboardAwareScrollView>
    )
};

export default verifyUserInfoManualInput;

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

