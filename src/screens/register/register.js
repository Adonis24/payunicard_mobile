import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { Text, PagerBullets, Pager } from 'components';
import { Common, Colors } from 'styles';
import t from 'strings';
import pageStepOne from './pageStepOne';
import pageStepTwo from './pageStepTwo';
import pageStepThree from './pageStepThree';
import { AntDesign } from '@expo/vector-icons';
import useRegister from '../../hooks/registerHook';
import { validateEmail } from 'utils/dateUtils';

function Register({ onSuccess }) {

    const register = useRegister();
    const [swipeIndex, setSwipeIndex] = useState(0);

    const PAGES = [
        t('registration.page0Title'),
        t('registration.page1Title'),
        t('registration.page0Title')
    ];

    useEffect(() => {
        if (register.otp.length === 4) {
            onSmsCodeFilled()
        }
    }, [register.otp])

    const regSucceeded = () => {
        setTimeout(function () {
            onSuccess(register.email, register.lastStepPassword)
        }, 100);
    }

    const serviceResultHandler = (success) => {
        if (success) {
            Keyboard.dismiss()
            setSwipeIndex(swipeIndex + 1);
        }
    };

    const onBackPressed = () => {
        setSwipeIndex(swipeIndex - 1);
    };

    const resendOtpHandler = (value) => {
        // TODO:
    };

    const onNextClick = () => {
        if (swipeIndex === 0) {

            if (register.phoneNumber.length < 9) {
                register.setHighlightsValidations(true)
                setTimeout(function () {
                    register.setHighlightsValidations(false)
                }, 2000);
                return
            }

            register.register(serviceResultHandler)
        } else if (swipeIndex + 1 <= 2) {
            setSwipeIndex(swipeIndex + 1);
        }
    };

    const onSubmitRegistration = () => {

        if (register.email.length === 0 ||
            !validateEmail(register.email) ||
                register.lastStepPassword.length === 0 ||
                    register.lastStepRepeatPassword.length === 0 ||
                        register.lastStepPassword !== register.lastStepRepeatPassword) {
            register.setHighlightsValidations(true)
            setTimeout(function () {
                register.setHighlightsValidations(false)
            }, 2000);
            return
        }

        register.submitRegistration(function (success) {
            if (success) {
                regSucceeded()
            }
        })
    }

    const onSmsCodeFilled = () => {
        if (swipeIndex === 1) {
            register.verifyOtp(serviceResultHandler)
        } else {
            setSwipeIndex(swipeIndex + 1);
        }
    };

    const onResend = () => {
        register.register(resendOtpHandler)
    };

    const viewAt = (index) => {

        switch (index) {
            case 0:
                return pageStepOne(onNextClick, register);
            case 1:
                return pageStepTwo(register, onSmsCodeFilled, onResend, swipeIndex);
            default:
                return pageStepThree(onSubmitRegistration, register, swipeIndex)
        }
    };

    return (
        <View style={Common.fill}>

            <View style={[{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 14,
            }, Common.horizontalMargin]}>

                <View style={{ width: swipeIndex === 0 ? 0 : '15%' }}>
                    {swipeIndex > 0 ?
                        <TouchableOpacity onPress={onBackPressed}>
                            <AntDesign style={{ fontWeight: 'bold', alignSelf: 'flex-start' }} name='left'
                                color='#b0b0b0' size={16} />
                        </TouchableOpacity> : null}
                </View>

                <View
                    style={{ width: swipeIndex === 0 ? '85%' : '70%', alignItems: swipeIndex === 0 ? 'flex-start' : 'center' }}>
                    <Text style={{
                        color: Colors.text,
                        fontSize: 14,
                    }}>{PAGES[swipeIndex]}</Text>
                </View>

                <View style={{ width: '15%' }}>
                    <PagerBullets
                        style={{ alignSelf: 'flex-end' }}
                        swipeIndex={swipeIndex}
                        pages={PAGES} />
                </View>

            </View>

            <Pager
                pages={PAGES}
                swipeIndex={swipeIndex}
                scrollEnabled={false}
                renderItem={(_, i) => viewAt(i)}
                didScrollToLast={() => {

                }} />

        </View>
    )
}

export default Register;
