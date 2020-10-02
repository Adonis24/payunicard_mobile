import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Common, Dimens} from 'styles';
import {Text, TextInput, Button} from 'components';
import t from 'strings';

function pinVerify(onNextClick, hook, showKeyboard) {

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

            <TextInput label={t('forgotpassword.pinVerifyPinInputPlaceholder')}
                       value={hook.pin}
                       innerRef={input}
                       autoCorrect={false}
                       autoCapitalize='none'
                       onChangeText={(text) => {
                           hook.setPin(text)
                       }}/>

            <View style={styles.padding}/>

            <Button onPress={onNextClick}
                    loading={hook.loading}
                    title={t('forgotpassword.checkUser')}
                    style={{marginBottom: Dimens.DEFAULT_VERTICAL_SPACING}}
            />
        </View>
    )
};

export default pinVerify;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

