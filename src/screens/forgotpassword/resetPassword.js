import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Common, Dimens} from 'styles';
import {Text, TextInput, Button} from 'components';
import t from 'strings';

function resetPassword(onNextClick, hook, showKeyboard) {

    const input = useRef(null);
    
    useEffect(() => {
        if (showKeyboard) {
            input.current.focus()
        }
    }, [showKeyboard]);

    return (
        <View style={Common.horizontalMargin}>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING * 2}}/>
            <View style={styles.padding}/>

            <TextInput label={t('registration.page2InputPassword')}
                       value={hook.password}
                       innerRef={input}
                       secureTextEntry={true}
                       autoCorrect={false}
                       autoCapitalize='none'
                       onChangeText={(text) => {
                           hook.setPassword(text)
                       }}/>

            <View style={styles.padding}/>

            <TextInput label={t('registration.page2InputRepeatPassword')}
                       value={hook.repeatPassword}
                       secureTextEntry={true}
                       autoCorrect={false}
                       autoCapitalize='none'
                       onChangeText={(text) => {
                           hook.setRepeatPassword(text)
                       }}/>

            <View style={styles.padding}/>

            <Button onPress={onNextClick}
                    loading={hook.loading}
                    title={t('forgotpassword.resetPasswordSubmit')}
                    style={{marginBottom: Dimens.DEFAULT_VERTICAL_SPACING}}
            />
        </View>
    )
};

export default resetPassword;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

