import React, {useState} from 'react';
import {
    View,
    KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';

import Header from "../../components/commonHeader"
import {TextInput, Button, ScrollableWithInputHandling} from "components"
import {DeviceHeight, FontCfg, Sizes} from 'styles';
import t from 'strings';
import {Defaults} from "utils";
import {useUserAndPasswordHook} from "hooks";
import otpInput from "screens/forgotpassword/otpInput";
import useForgotPassword from "hooks/forgotPasswordHook";

export default function currentUserScreen({navigation}) {

    const userAndPasswordHook = useUserAndPasswordHook(Defaults.currentUsername);
    const hook = useForgotPassword();

    const onSuccess = () => {
        navigation.popToTop()
        Defaults.showSuccessWithMessage("Password has been changed successfully")
    }

    const goToOtp = () => {
        hook.setUsername(Defaults.currentUsername)
        hook.generateOtp((data) => {
            if (data.phoneMask && userAndPasswordHook.oldPassword && userAndPasswordHook.confirmPassword && userAndPasswordHook.password) {
                if (userAndPasswordHook.confirmPassword !== userAndPasswordHook.password) {
                    Defaults.showErrorWithMessage("Passwords does not match");
                    return
                }
                navigation.navigate('OtpSettingsScreen', {
                    otpType: "passwordChange",
                    mask: data.phoneMask,
                    oldPassword: userAndPasswordHook.oldPassword,
                    confirmPassword: userAndPasswordHook.confirmPassword,
                    password: userAndPasswordHook.password,
                    onSuccess: onSuccess
                })

            }
        }, "3", Defaults.currentUsername)
    }

    const userView = () => {
        return <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollableWithInputHandling style={{flex: 1, backgroundColor: "#ffff"}}>
                <Header
                    closeIcon={false}
                    title={t('menuName.userAndPassword')}
                    onLeftSidePress={() => {
                        navigation.pop()
                    }}
                    rightText={""}
                />
                <View style={{marginHorizontal: 24, marginTop: 32}}>
                    <TextInput
                        label={t('auth.username')}
                        value={userAndPasswordHook.username}
                        secureTextEntry={false}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        disabled={true}
                        onChangeText={(text) => {
                        }}
                    />
                    <TextInput
                        label={t('userAndPassword.oldPassword')}
                        value={userAndPasswordHook.oldPassword}
                        secureTextEntry={true}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                            userAndPasswordHook.setOldPassword(text)
                        }}
                    />
                    <TextInput
                        label={t('userAndPassword.password')}
                        value={userAndPasswordHook.password}
                        secureTextEntry={true}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                            userAndPasswordHook.setPassword(text)
                        }}
                    />
                    <TextInput
                        label={t('userAndPassword.newPassword')}
                        value={userAndPasswordHook.confirmPassword}
                        secureTextEntry={true}
                        style={{...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16}}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => {
                            userAndPasswordHook.setConfirmPassword(text)
                        }}
                    />
                </View>
                <KeyboardAvoidingView style={{flex: 1, justifyContent: "flex-end", alignItems: "stretch"}}>
                    <Button
                        title={t("common.next")}
                        style={{height: DeviceHeight / 14.44, ...Sizes.mt8, marginHorizontal: 24, marginBottom: 48}}
                        textStyle={{...FontCfg.bold}}
                        loading={userAndPasswordHook.loading}
                        onPress={goToOtp}
                    />
                </KeyboardAvoidingView>
            </ScrollableWithInputHandling>
        </TouchableWithoutFeedback>
    }

    return (
        userView()
    )
}
