import React from 'react';
import {
    View,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';

import Header from "../../components/commonHeader"
import {TextInput, Button, ScrollableWithInputHandling} from "components"
import {DeviceHeight, FontCfg, Sizes} from 'styles';
import t from 'strings';

export default function contactInfoScreen({navigation}) {

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollableWithInputHandling
                style={{flex: 1, backgroundColor: "#ffff"}}
            >
                <Header
                    closeIcon={false}
                    title={t('menuName.contactInformation')}
                    onLeftSidePress={() => {
                        navigation.pop()
                    }}
                    rightText={""}
                />
                <View style={{marginHorizontal: 24, marginTop: 32}}>
                    <TextInput
                        label={t('verify.manual_verification_name')}
                        value={'გიორგი'}
                        secureTextEntry={false}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        disabled={true}
                        onChangeText={(text) => {
                        }}
                    />
                    <TextInput
                        label={t('verify.manual_verification_surname')}
                        value={'ვაშაკიძე'}
                        secureTextEntry={false}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        disabled={true}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                        }}
                    />
                    <TextInput
                        label={t('menuName.email')}
                        value={'gvashakidze6@gmail.com'}
                        secureTextEntry={false}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                        }}
                    />
                    <TextInput
                        label={t('forgotpassword.recovery_mode_phone')}
                        value={'577651100'}
                        secureTextEntry={false}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                        }}
                    />
                </View>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: "flex-end", alignItems: "stretch"}}>
                    <Button
                        title={t("common.next")}
                        style={{height: DeviceHeight / 14.44, ...Sizes.mt8, marginHorizontal: 24, marginBottom: 48}}
                        textStyle={{...FontCfg.bold}}
                        loading={false}
                        onPress={() => {
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollableWithInputHandling>
        </TouchableWithoutFeedback>
    )
}
