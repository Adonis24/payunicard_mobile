import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Common, Dimens, Colors} from 'styles';
import {Button, Text} from 'components';
import t from 'strings';

const {height} = Dimensions.get('window');

function Begin({onClose}) {

    return (

        < View style={
            {
                flex: 1,
                width: '85%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch', //changed value of alignItems
            }
        }>
            <Image style={{height: '50%'}} resizeMode='contain'
                   source={require('../../../assets/illustrations/lock.png')}
                   style={{
                       height: height / 4,
                       alignSelf: 'center',
                       maxHeight: 272
                   }}
            />

            <Text style={{
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24,
                textAlign: 'center'
            }}>{t('verify.begin_title')}</Text>

            <Text style={{
                marginTop: 20,
                color: Colors.placeholder,
                fontSize: 12,
                textAlign: 'center'
            }}>{t('verify.begin_subtitle')}</Text>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>
            <Button style={{width: '60%', alignSelf: 'center'}} title={t('verify.begin_continue')} onPress={() => {
                onClose()
            }}/>
        </View>
    )
}

export default Begin;
