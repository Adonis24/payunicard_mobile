import React, {useEffect, useState} from 'react';
import {
    Platform,
    SafeAreaView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {TextInput, Button} from 'components'
import t from 'strings';
import Header from "../../components/commonHeader";
import {useActionSheet} from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import {useLoyaltyCards} from 'hooks';
import {showErrorWithMessage, showSuccessWithMessage} from 'utils';

const {width} = Dimensions.get('window');
const CARD_W = width * 0.6
const CARD_H = CARD_W * 0.6

function addLoyaltyCard({navigation}) {

    const successText = t('add_loyalty_card.add_success')
    const required_fields_err_message = t('common.required_fields_error');

    const hook = useLoyaltyCards()
    const {showActionSheetWithOptions} = useActionSheet();
    const options = [t("menuName.takePicture"), t("menuName.chooseFromGallery"), t("menuName.cancel")]

    getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    useEffect(() => {

        let params = navigation.state.params
        hook.setSelectedMerchant(params.merchant)
        hook.setCardNumber(params.data ? params.data : '')
        hook.setCardName(params.merchant ? params.merchant.name : '')
        hook.setImageURL(params.merchant ? params.merchant.imageUrl : null)

        getPermissionAsync()
    }, [])

    function _callActionSheet() {
        showActionSheetWithOptions({
            options,
            cancelButtonIndex: 2,
            destructiveButtonIndex: 2,
        }, (index) => {
            _pickImage()
        })
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
        });

        if (!result.cancelled) {
            hook.setImageURL(result.uri)
        }
    };

    const getImage = () => {
        if (hook.imageURL) {
            return {uri: hook.imageURL, width: CARD_W, height: CARD_H}
        }

        return require('../../../assets/cards/LTUnicard.png')
    }

    const validate = () => {

        if (hook.cardName.length === 0 || hook.cardNumber.length === 0) {
            showErrorWithMessage(required_fields_err_message)
            hook.setHighlightsValidations(true)
            setTimeout(function () {
                hook.setHighlightsValidations(false)
            }, 2000);
            return false
        }

        return true
    }

    const cardView = <View style={{
        marginTop: 48,
        alignSelf: 'center',
        height: CARD_H,
        width: CARD_W,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.1,
        shadowRadius: 7
    }}>
        <Image source={getImage()}
               resizeMode={'cover'}
               style={{
                   width: CARD_W,
                   height: CARD_H,
                   borderRadius: 10
               }}/>
        <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        }}>
            <TouchableOpacity style={{
                width: 32, height: 32,
                marginEnd: -16,
                backgroundColor: 'white',
                borderRadius: 16,
                marginTop: -16,
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4
            }} onPress={_callActionSheet}>
                <Image source={require('../../../assets/pencil.png')}
                       style={{resizeMode: 'center', width: '50%', height: '50%', margin: 8}}/>
            </TouchableOpacity>
        </View>
    </View>

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

                <Header
                    closeButtonHasBg={false}
                    closeIcon={true}
                    rightSideIcon={require("../../../assets/transparent.png")}
                    title={t('bar_code.title')}
                    onLeftSidePress={() => {
                        navigation.pop()
                    }}
                />

                {cardView}

                <TextInput
                    keyboardType={"number-pad"}
                    label={t('add_loyalty_card.card_name')}
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={hook.cardName}
                    onChangeText={(text) => {
                        hook.setCardName(text)
                    }}
                    // onFocus={()=>{  setOffsetY(Platform.OS === 'android' ? -160 : 160) }}
                    // onBlur={()=> { setOffsetY(0) }}
                    style={{
                        marginLeft: 32,
                        marginRight: 32,
                        marginTop: 32,
                        borderWidth: hook.highlightsValidations && hook.cardName.length < 2 ? 1 : 0,
                        borderColor: 'red'
                    }}
                />

                <TextInput
                    keyboardType={"number-pad"}
                    label={t('add_loyalty_card.card_number')}
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={hook.cardNumber}
                    onChangeText={(text) => {
                        hook.setCardNumber(text)
                    }}
                    // onFocus={()=>{  setOffsetY(Platform.OS === 'android' ? -160 : 160) }}
                    // onBlur={()=> { setOffsetY(0) }}
                    style={{
                        marginLeft: 32,
                        marginRight: 32,
                        marginTop: 16,
                        borderWidth: hook.highlightsValidations && hook.cardNumber.length < 12 ? 1 : 0,
                        borderColor: 'red'
                    }}
                />

                <View style={{
                    position: 'absolute',
                    bottom: 32,
                    width: '100%',
                    paddingHorizontal: 32
                }}>
                    <Button title={t('common.next')} loading={hook.loading} disabled={hook.loading} onPress={() => {
                        if (validate()) {
                            hook.addUserLoyaltyCard((response) => {
                                if (!response.error) {
                                    showSuccessWithMessage(successText)
                                    navigation.dismiss()
                                }
                            })
                        }
                    }}/>
                </View>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default addLoyaltyCard;
