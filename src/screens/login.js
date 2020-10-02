import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    Dimensions,
    Keyboard,
    Animated,
    TouchableWithoutFeedback,
    Platform,
    ScrollView
} from 'react-native';
import { Text, TextInput, Button, CheckBox, SimulatedModal, LangChooserHeader } from 'components';
import { Common, Colors, Dimens, Sizes, FontCfg } from 'styles';
import t from 'strings';
import { useLocale, useLogin } from 'hooks';
import Register from './register/register';
import ForgotPassword from './forgotpassword/forgotpassword';
import { Defaults } from 'utils';

let pkg = require('../../package.json');

const { height } = Dimensions.get('window');
const opacity = new Animated.Value(1);
const translateY = new Animated.Value(0);
const CONST_OFFSET_Y = 184

function Login({ navigation }) {

    const [offsetY, setOffsetY] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [focusedInput, setfocusedInput] = useState(null);
    const successfulRegText = t('registration.youhavebeenregisteredsuccessfully')

    const registerModal = useRef(null);
    const passwordResetModal = useRef(null);
    const login = useLogin(Defaults.currentUsername, '');

    const loginSucceeded = () => {
        setTimeout(function () {
            navigation.navigate('Authorized');
        }, 100);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? 16 : 44 }}>

            <LangChooserHeader />

            <ScrollView scrollEnabled={false} style={{ backgroundColor: 'white' }}
                contentOffset={{ y: offsetY }}
                contentContainerStyle={{ marginTop: Platform.OS === 'android' ? offsetY : 0 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}>

                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                    setOffsetY(0);
                    setOpacity(1);
                    setfocusedInput(null);
                }}>
                    <SafeAreaView style={Common.fill}>

                        <View
                            style={{
                                marginHorizontal: Dimens.DEFAULT_MARGIN,
                                marginBottom: 20,
                                marginTop: 20,
                            }}>

                            <Text style={{ fontSize: height / 33, fontWeight: 'bold' }}>{t('auth.welcome')}
                                {/* &nbsp;- <Text style={{ fontWeight: 'bold', color: 'red' }}>{pkg.version}</Text> */}
                            </Text>

                            <Image
                                style={{
                                    height: height / 3.2,
                                    alignSelf: 'center',
                                    opacity: opacity
                                }}
                                resizeMode='contain'
                                source={require('../../assets/illustrations/login_illustration.png')} />

                            <View style={{ ...Sizes.mt16, marginTop: focusedInput ? -20 : 0 }}>

                                <TextInput label={t('auth.username')}
                                    value={login.username}
                                    autoCorrect={false}
                                    style={{ ...Sizes.fs14, ...FontCfg.light, height: 54 }}
                                    autoCapitalize='none'
                                    onChangeText={(text) => {
                                        login.setUsername(text)
                                    }}
                                    onFocus={() => {
                                        setfocusedInput('username');
                                        setOffsetY(Platform.OS === 'android' ? -CONST_OFFSET_Y : CONST_OFFSET_Y);
                                        setOpacity(0)
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            if (focusedInput == 'password') {
                                                setOffsetY(0);
                                                setOpacity(1)
                                            }
                                        }, 500)
                                    }}
                                />

                                <TextInput label={t('auth.password')}
                                    value={login.password}
                                    secureTextEntry={true}
                                    style={{ ...Sizes.fs14, ...FontCfg.light, height: 54, ...Sizes.mt16 }}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => {
                                        login.setPassword(text)
                                    }}
                                    onFocus={() => {
                                        setfocusedInput('password')
                                        setOffsetY(Platform.OS === 'android' ? -CONST_OFFSET_Y : CONST_OFFSET_Y);
                                        setOpacity(0)
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            if (focusedInput == 'username') {
                                                setOffsetY(0);
                                                setOpacity(1)
                                            }
                                        }, 500)
                                    }}
                                />

                                <View style={{
                                    alignItems: 'center',
                                    ...Sizes.mt8,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>

                                    <CheckBox style={{ ...FontCfg.light, ...Sizes.fs12 }}
                                        title={t('auth.remember')}
                                        checked={login.remembers}
                                        onCheck={(checked) => {
                                            login.setRemembers(checked)
                                        }}
                                    />

                                    <Button title={t('auth.forgotpassword')}
                                        style={{ backgroundColor: 'transparent' }}
                                        textStyle={{
                                            color: Colors.placeholder,
                                            ...FontCfg.light,
                                            ...Sizes.fs12
                                        }}
                                        translatable={false}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            setfocusedInput(null);
                                            setOpacity(1);
                                            setOffsetY(0);
                                            passwordResetModal.current.open();
                                        }} />
                                </View>

                                <Button title={t('auth.login')} style={{ height: height / 14.44, ...Sizes.mt8, marginTop: focusedInput ? 40 : 0 }}
                                    textStyle={{ ...FontCfg.bold }}
                                    loading={login.loading} onPress={() => {
                                        login.login(loginSucceeded)
                                    }} />

                                <Button title={t('auth.signup')}
                                    style={{ backgroundColor: 'transparent', ...Sizes.mt8 }}
                                    textStyle={{ color: Colors.text, ...FontCfg.bold }}
                                    translatable={false} onPress={() => {
                                        Keyboard.dismiss();
                                        setOffsetY(0);
                                        setOpacity(1);
                                        setfocusedInput(null);
                                        registerModal.current.open();
                                    }} />
                            </View>

                        </View>

                    </SafeAreaView>
                </TouchableWithoutFeedback>

            </ScrollView>

            <SimulatedModal
                ref={registerModal}
                setPosition = 'absolute'
                fromBottom = '-20'
                height={'65%'}>
                <Register
                    onSuccess={(username, password) => {
                        Defaults.showSuccessWithMessage(successfulRegText)
                        registerModal.current.close()
                        loginSucceeded()
                    }}
                />
            </SimulatedModal>

            <SimulatedModal
                ref={passwordResetModal}
                setPosition = 'absolute'
                fromBottom = '-20'
                height='75%'>
                <ForgotPassword />
            </SimulatedModal>

        </View>
    )
}

export default Login;
