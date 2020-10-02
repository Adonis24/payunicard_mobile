import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Common, Dimens, Colors} from 'styles';
import {Text, SelectorButton} from 'components';
import t from 'strings';

function recoveryMode(onNextClick, hook, swipeIndex) {

    return (
        <View style={Common.horizontalMargin}>

            <Text style={{
                marginTop: 32,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24
            }}>{t('forgotpassword.recovery_mode_title')}</Text>

            <View style={styles.padding}/>

            <SelectorButton onPress={ () => {
                hook.setRecoveryMode('phone')
                onNextClick()
            }} title={t('forgotpassword.recovery_mode_phone')} 
            subTitle={t('forgotpassword.recovery_mode_phone_subtitle')} 
            icon='phone' 
            loading={hook.loading} 
            iconBackground='#ff8f00'></SelectorButton>
            
            <View style={styles.padding}/>

            <SelectorButton onPress={ () => {
                hook.setRecoveryMode('email')
                onNextClick()
            }} title={t('forgotpassword.recovery_mode_email')} 
            subTitle={t('forgotpassword.recovery_mode_email_subtitle')} 
            icon='mail' 
            loading={hook.loadingMail} 
            iconBackground='#ffd903'></SelectorButton>
            
        </View>
    )
};

export default recoveryMode;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

