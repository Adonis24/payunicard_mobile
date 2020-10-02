import React, {useEffect} from 'react';
import {
    Keyboard, TouchableWithoutFeedback,
    View,
} from 'react-native';

import Header from "../../components/commonHeader"
import t from 'strings';
import otpInput from "screens/forgotpassword/otpInput";
import {ScrollableWithInputHandling} from "components";
import useForgotPassword from "hooks/forgotPasswordHook";

export default function OtpSettingsScreen({navigation}) {
    const hook = useForgotPassword();

    useEffect(()=>{
        if(hook.otp.length === 4){
            const params = navigation.state.params;

            switch (params.otpType ?? "") {
                case "passwordChange":
                    hook.changePassword(params.oldPassword, params.password, params.confirmPassword,(success) => {
                        if (success) {
                            navigation.state.params.onSuccess()
                            navigation.popToTop()
                        }
                    })
                case "tfa":
                    hook.changeAuthStatus(params.isOn,(success) => {
                        if (success) {
                            navigation.state.params.onSuccess()
                            navigation.popToTop()
                        }
                    })
                default:
                    break
            }
        }
    }, [hook.otp])

    return (
        <View style={{ flex: 1 }}>
            <Header
                closeIcon={false}
                title={t('menuName.userAndPassword')}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                rightText={""}
            />
            {otpInput(hook, true, navigation.state.params.mask)}
        </View>
    )
}
