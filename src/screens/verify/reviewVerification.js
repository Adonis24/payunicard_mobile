import React, {useRef, useState} from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Common, Dimens, Colors } from 'styles';
import { Button, Text, ListPicker } from 'components';
import { Defaults } from 'utils';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import t from 'strings';
const { height } = Dimensions.get('window');


function reviewVerification(hook, onTermsClick) {

    const frontSide = () => {
        if (hook.frontSideData && hook.frontSideData.uri)
            return hook.frontSideData.uri

        return null
    }

    const backSide = () => {
        if (hook.backSideData && hook.backSideData.uri)
            return hook.backSideData.uri

        return null
    }

    const selfie = () => {
        if (hook.selfieData && hook.selfieData.uri)
            return hook.selfieData.uri

        return null
    }

    const row = (titleLeft, titleRight) => {
        return <View style={styles.labeContainer}>
            <Text style={styles.leftLabel}>{titleLeft}</Text>
            <Text style={styles.rightLabel}>{titleRight}</Text>
        </View>
    };

    return (
        <KeyboardAwareScrollView
            extraScrollHeight={60}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={Common.horizontalMargin}>
            <TouchableWithoutFeedback>
                <View>
                    <Text style={{
                        marginTop: 8,
                        color: Colors.text,
                        fontSize: height / 50.75,
                        marginBottom: 12,
                        fontWeight: '600'
                    }}>{t('verify.reviewPersonalInfo')}</Text>

                    {row(t('verify.reviewDocType'), hook.selectedDocType && hook.selectedDocType !== null ? hook.selectedDocType.name : '')}
                    {row(t('verify.reviewFullName'), hook.name + ' ' + hook.surname)}
                    {row(t('verify.reviewPin'), hook.pin)}
                    {row(t('verify.reviewDateOfBirth'), hook.birthDate)}
                    {row(t('verify.reviewCard'), hook.selectedCard && hook.selectedCard !== null ? hook.selectedCard.name : '')}
                    {row(t('verify.reviewPrice'), hook.selectedCard && hook.selectedCard !== null ? hook.selectedCard.price : '')}

                    <View style={{ backgroundColor: '#6B6B6B', opacity: 0.1, height: 1, width: '100%' }} />

                    <Text style={{
                        marginTop: 8,
                        color: Colors.text,
                        fontSize: 12,
                        fontWeight: '600'
                    }}>{t('verify.reviewDoc')}</Text>

                    <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' }}>
                        <Image source={{ uri: `${frontSide()}` }} style={{ width: height / 8.73, height: height / 8.73, borderRadius: 10 }}
                            resizeMode="cover" />
                        <Image source={{ uri: `${backSide()}` }} style={{ width: height / 8.73, height: height / 8.73, borderRadius: 10 }}
                            resizeMode="cover" />
                        <Image source={{ uri: `${selfie()}` }} style={{ width: height / 8.73, height: height / 8.73, borderRadius: 10 }}
                            resizeMode="cover" />
                    </View>

                    <Text style={{ marginTop: height / 16.91, fontWeight: '200', color: Colors.placeholder, fontSize: 12 }}>
                        {t('verify.reviewBySigningYouAreAgree')}</Text>
                    <TouchableOpacity onPress={ () => {
                        onTermsClick()
                    } }>
                        <Text style={{ fontWeight: '400', textDecorationLine: 'underline', color: Colors.placeholder }}>
                            {t('verify.reviewOnTermsAndConditions')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    leftLabel: {
        alignSelf: 'flex-start',
        color: Colors.placeholder,
        fontSize: 14
    }, rightLabel: {
        alignSelf: 'flex-end',
        color: Colors.text,
        fontSize: 14,
        textAlign: 'right'
    }, labeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 12,
    }

});

export default reviewVerification;
