import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Keyboard} from 'react-native';
import {Text, PagerBullets, Pager} from 'components';
import {Common, Colors} from 'styles';
import t from 'strings';
import checkUser from './checkUser';
import pinVerify from './pinVerify';
import resetPassword from './resetPassword';
import otpInput  from './otpInput';
import success  from './success';
import recoveryMode from './recoveryMode';
import {AntDesign} from '@expo/vector-icons';
import {useForgotPassword} from 'hooks'

function ForgotPassword() {

    const hook = useForgotPassword();
    const [swipeIndex, setSwipeIndex] = useState(0);

    useEffect(()=>{
        if(hook.otp.length === 4){
            hook.submitOtp((success) => {
                if (success) {
                    setSwipeIndex(4);
                }
            })
        }
    }, [hook.otp])

    useEffect(()=>{
        if (swipeIndex === 2) {
            Keyboard.dismiss()
        }
    }, [swipeIndex])

    const PAGES = [
        t('forgotpassword.checkUser'),
        t('forgotpassword.pinVerify'),
        t('forgotpassword.recovery_mode'),
        t('forgotpassword.otp_verify'),
        t('forgotpassword.resetPassword'),
        t('forgotpassword.resetPassword')
    ];

    const serviceResultHandler = (obj) => {
        if (obj) {
            
            if (swipeIndex === 0) {
                if (obj.customerIsRegistered === true) {
                    setSwipeIndex(1);
                } else {
                    checkRecoveryModeAndNavigate(obj)
                }
            } else if (swipeIndex === 1) {
                checkRecoveryModeAndNavigate(obj)
            } else { 
                setSwipeIndex(swipeIndex + 1);
            }
        }
    };

    const checkRecoveryModeAndNavigate = (obj) => {
        if (obj.phoneIsVerified === true && obj.emailIsVerified === true) {
            setSwipeIndex(2);
        } else {

            hook.generateOtp((success) => {
                if (success) {
                    setSwipeIndex(3);
                }
            })
        }
    }

    const onBackPressed = () => {
        
        if (swipeIndex === 1 || swipeIndex === 2) {
            setSwipeIndex(0);    
        } else {
            setSwipeIndex(swipeIndex - 1);    
        }
    };

    const onNextClick = () => {
        if (swipeIndex === 0) {
            hook.checkUser(serviceResultHandler)
        } else if (swipeIndex === 1) {
            hook.verifyPin(serviceResultHandler)
        } else if (swipeIndex === 2) {
            hook.generateOtp(serviceResultHandler)
        } else if (swipeIndex === 4) {
            hook.submit(serviceResultHandler)
        }
    };

    const viewAt = (index) => {

        switch (index) {
            case 0:
                return checkUser(onNextClick, hook, swipeIndex===index);
            case 1:
                return pinVerify(onNextClick, hook, swipeIndex===index);
            case 2:
                return recoveryMode(onNextClick, hook);
            case 3:
                return otpInput(hook, swipeIndex===index);
            case 4:
                return resetPassword(onNextClick, hook, swipeIndex===index);
            default: 
                return success(t('forgotpassword.reset_password_success'))
        }
    };

    return (
        <View style={[Common.fill]}>

            <View style={[{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 0
            }, Common.horizontalMargin]}>

                <View style={{width: swipeIndex === 0 ? 0 : '15%'}}>
                    {swipeIndex > 0 && swipeIndex < 5 ?
                        <TouchableOpacity onPress={onBackPressed}>
                            <AntDesign style={{fontWeight: 'bold', alignSelf: 'flex-start'}} name='left'
                                       color='#b0b0b0' size={16}/>
                        </TouchableOpacity> : null}
                </View>

                <View
                    style={{width: swipeIndex === 0 ? '85%' : '70%', alignItems: swipeIndex === 0 ? 'flex-start' : 'center'}}>
                    <Text style={{
                        color: Colors.text,
                        fontSize: 14,
                    }}>{PAGES[swipeIndex]}</Text>
                </View>

                <View style={{width: '15%'}}>
                    <PagerBullets
                        style={{alignSelf: 'flex-end'}}
                        swipeIndex={swipeIndex}
                        pages={PAGES}/>
                </View>

            </View>

            <Pager
                pages={PAGES}
                swipeIndex={swipeIndex}
                scrollEnabled={false}
                renderItem={(_, i) => viewAt(i)}
                didScrollToLast={() => {

                }}/>

        </View>
    )
}

export default ForgotPassword;