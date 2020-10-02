import React, {useEffect, useState} from 'react';
import {
    View,
} from 'react-native';

import Header from "../../components/commonHeader"
import {ScrollableWithInputHandling, UserSettingSwitcherRow} from "components"
import t from 'strings';
import useForgotPassword from "hooks/forgotPasswordHook";
import {Defaults} from "utils";

export default function securitySettingsScreen({navigation}) {

    let [touchIdIsEnabled, setTouchIdIsEnabled] = useState(false)
    let [passcodeIsEnabled, setPasscodeIsEnabled] = useState(false)
    let [tfaIsEnabled, setTfaIsEnabled] = useState(Defaults.hasOtpEnabled)

    const hook = useForgotPassword();

    const onSuccess = () => {
        setTfaIsEnabled(hook.tfa == 1)
    };

    const goToOtp = (value) => {
        hook.setUsername(Defaults.currentUsername)
        hook.generateOtp((data) => {
            navigation.navigate('OtpSettingsScreen', {
                isOn: value,
                otpType: "tfa",
                onSuccess: onSuccess
            })
        }, "3", Defaults.currentUsername)
    }

    return (
        <ScrollableWithInputHandling
            style={{flex: 1, backgroundColor: "#ffff"}}
        >
            <Header
                closeIcon={false}
                title={t('menuName.security')}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                rightText={""}
            />
            <View style={{width: '100%', paddingHorizontal: 24, marginTop: 32}}>

                <UserSettingSwitcherRow title={'TouchID-ის გააქტიურება'} isOn={touchIdIsEnabled} onChange={(value) => {
                    setTouchIdIsEnabled(value)
                }}/>
                <UserSettingSwitcherRow title={'პასკოდის გააქტიურება'} isOn={passcodeIsEnabled} onChange={(value) => {
                    setPasscodeIsEnabled(value)
                }}/>
                <UserSettingSwitcherRow title={'2FA-ორ დონიანი\nავტორიზაცია'} isOn={tfaIsEnabled} onChange={(value) => {
                    goToOtp(value)
                }}/>

            </View>
        </ScrollableWithInputHandling>
    )
}
