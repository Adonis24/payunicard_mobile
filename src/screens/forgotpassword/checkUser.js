import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Common, Dimens, Colors} from 'styles';
import {Text, TextInput, Button} from 'components';
import t from 'strings';

function checkUser(onNextClick, hook, showKeyboard) {

    const input = useRef(null);

    useEffect(() => {
        if (showKeyboard) {
            input.current.focus()
        }
    }, [showKeyboard]);

    return (
        <View style={Common.horizontalMargin}>

            <Text style={{
                marginTop: 32,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24
            }}>{t('forgotpassword.checkUserHeaderTitle')}</Text>

            <Text style={{
                width: '75%',
                marginTop: 20,
                color: Colors.placeholder,
                fontSize: 12
            }}>{t('forgotpassword.checkUserHeaderText')}</Text>

            <View style={styles.padding}/>

            <TextInput label={t('forgotpassword.checkUserUsernameInputPlaceholder')}
                       value={hook.username}
                       innerRef={input}
                       autoCorrect={false}
                       autoCapitalize='none'
                       onChangeText={(text) => {
                           hook.setUsername(text)
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

export default checkUser;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

