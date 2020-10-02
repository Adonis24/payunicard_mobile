import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform, Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Common, Colors, Dimens} from 'styles';

import {Text, TextInput, Button} from 'components';
import t from 'strings';
import { validateEmail } from 'utils/dateUtils';

const {height} = Dimensions.get('window');

function pageStepThree(onNextClick, register, swipeIndex) {

    const [offsetY, setOffsetY] = useState(0);
    const [scrollEnabled, setScrollEnabled] = useState(false);
    let usernameInput = useRef(null)

    useEffect(() => {
        if (swipeIndex === 2) {
            setTimeout(function () {
                usernameInput.current.focus()
            }, 500);
        }

    }, [swipeIndex]);

    return (
        <ScrollView style={[Common.horizontalMargin, {flex:1}]}
                    scrollEnabled={scrollEnabled}
                    contentOffset={{ y: offsetY }}
                    contentContainerStyle={{ marginTop: Platform.OS === 'android' ? offsetY : 0 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps={'always'}>

            <TouchableWithoutFeedback style={{flex:1}} onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={{flex : 1}}>
                    <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING * 2}}/>

                    <TextInput innerRef={usernameInput}
                                label={t('registration.page2InputEmail')}
                                value={register.email}
                                style={{
                                    borderWidth:  register.highlightsValidations && (register.email.length === 0 || !validateEmail(register.email)) ? 1 : 0,
                                    borderColor: 'red'
                                }}
                            autoCorrect={false}
                            autoCapitalize = 'none'
                            onChangeText={(text) => {
                                register.setEmail(text)
                            }}
                            onBlur={()=> {
                                setOffsetY(0)
                                setScrollEnabled(false)
                            }}
                            />

                    <TextInput style={{
                                        marginTop: Dimens.DEFAULT_VERTICAL_SPACING,
                                        borderWidth:  register.highlightsValidations && (register.lastStepPassword.length === 0 || register.lastStepPassword !== register.lastStepRepeatPassword) ? 1 : 0,
                                        borderColor: 'red'
                                        }}
                            label={t('registration.page2InputPassword')}
                            value={register.lastStepPassword}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize = 'none'
                            onChangeText={(text) => {
                                register.setLastStepPassword(text)
                            }}
                            onFocus={()=>{
                                setOffsetY(Platform.OS === 'android' ? -88 : 88)
                                setScrollEnabled(true)
                            }}
                            onBlur={()=> {
                                setOffsetY(0)
                                setScrollEnabled(false)
                            }}
                            />

                    <TextInput style={{
                                        marginTop: Dimens.DEFAULT_VERTICAL_SPACING,
                                        borderWidth:  register.highlightsValidations && (register.lastStepRepeatPassword.length === 0 || register.lastStepPassword !== register.lastStepRepeatPassword) ? 1 : 0,
                                        borderColor: 'red'
                                    }}
                            label={t('registration.page2InputRepeatPassword')}
                            value={register.lastStepRepeatPassword}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize = 'none'
                            onChangeText={(text) => {
                                register.setLastStepRepeatPassword(text)
                            }}
                            onFocus={()=>{
                                setOffsetY(Platform.OS === 'android' ? -88 : 88)
                                setScrollEnabled(true)
                            }}
                            onBlur={()=> {
                                setOffsetY(0)
                                setScrollEnabled(false)
                            }}
                            />

                    <Button onPress={onNextClick}
                            loading={register.loading}
                            title={t('registration.finish')}
                            style={{ marginTop: Dimens.DEFAULT_VERTICAL_SPACING, marginBottom: Dimens.DEFAULT_VERTICAL_SPACING}}/>

                    <View style={{height: height * 0.5}}/>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>)
};

export default pageStepThree;
