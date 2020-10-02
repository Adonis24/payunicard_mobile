import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Keyboard, Dimensions, Modal, Image, StyleSheet, Platform} from 'react-native';
import {Text, PagerBullets, Pager, ListPicker, Button} from 'components';
import {Common, Colors, Dimens} from 'styles';
import t from 'strings';
import {showErrorWithMessage} from 'utils';
import {AntDesign} from '@expo/vector-icons';
import useVerify from '../../hooks/verifyHook'
import documentTypes, {DOCUMENT_TYPE} from './documentTypes';
import verifyUserinfoManualInput from './verifyUserinfoManualInput';
import addCardDelieveryAddress from './addCardDelieveryAddress'
import orderCard from './orderCard';
import Camera from '../camera';
import SimulatedModal from "../../components/SimulatedModal";
import reviewVerification from "./reviewVerification";
import success from "../forgotpassword/success";
import {Defaults} from "../../utils";

const {height} = Dimensions.get('window');

function Verify() {

    const countryModalRef = useRef(null);
    const cameraTrip = useRef(null);
    const hook = useVerify();
    const [swipeIndex, setSwipeIndex] = useState(0);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [canRender, setCanRender] = useState(false);
    const [cameraStep, setCameraStep] = useState(0);
    const termsModalRef = useRef(null);

    const PAGES = [
        t('verify.verification'),
        t('verify.verification'),
        t('verify.verification'),
        t('verify.verification'),
        t('verify.verification'),
        t('verify.verification')
    ];

    const NEXT_TITLES = [
        t('common.next'),
        t('common.next'),
        t('common.next'),
        t('common.next'),
        t('common.send'),
        t('common.close')
    ];

    const required_fields_err_message = t('common.required_fields_error');
    const validation_message = t('verify.order_card_validation_failed')

    useEffect(() => {
        if (swipeIndex === 2 || swipeIndex === 4 || swipeIndex === 5) {
            Keyboard.dismiss()
        }
    }, [swipeIndex])

    const onBackPressed = () => {

        if (swipeIndex === 1 || swipeIndex === 2) {
            setSwipeIndex(0);
            setCameraStep(0);
        } else {
            setSwipeIndex(swipeIndex - 1);
        }
    };

    const validate = () => {

        if (swipeIndex === 1 && (!hook.selectedCountry || !hook.name || hook.name.length === 0 || !hook.surname || hook.surname.length === 0 || !hook.birthDate)) {
            showErrorWithMessage(required_fields_err_message)
            hook.setHighlightsValidations(true)
            setTimeout(function () {
                hook.setHighlightsValidations(false)
            }, 2000);
            return false
        }

        if (swipeIndex === 2 && !hook.selectedCard) {
            showErrorWithMessage(validation_message);
            return false
        }

        if (swipeIndex === 3 && (!hook.selectedCity || !hook.address || hook.address.length === 0)) {
            showErrorWithMessage(required_fields_err_message)
            return false
        }

        return true
    }

    const passportIsSelected = () => {
        if (hook.selectedDocType) {
            return hook.selectedDocType.type === DOCUMENT_TYPE.PASSPORT
        }
        return false
    }

    const onNext = (object) => {

        let swipeIndexAppender = 1
        if (swipeIndex == 2 && hook.selectedCard && hook.selectedCard.typeId == 4) {
            swipeIndexAppender++
        }

        if (validate() === false) { return }

        switch (swipeIndex) {
            case 0:
                beginCameraTripModalHandler()
                break
            case 4:
                hook.verify(verifyHandler)
                break
            case 5:
                Defaults.verify.close()
                break
            default:
                setSwipeIndex(swipeIndex + swipeIndexAppender);
                break
        }
    };

    const hidesNextButton = () => {
        return swipeIndex === 0
    }

    const verifyHandler = (object) => {
        if (object.ok) {
            if (Defaults.verify.onDismiss) {
                Defaults.verify.onDismiss();
            }
            setSwipeIndex(swipeIndex + 1);
        }
    }

    const beginCountryModalHandler = () => {
        setTimeout(function () {
            countryModalRef.current.open()
        }, 500);
    }

    const beginCameraTripModalHandler = () => {
        setTimeout(function () {
            cameraTrip.current.open()
        }, 500);
    }

    const viewAt = (index) => {
        switch (index) {
            case 0:
                return documentTypes(onNext, hook);
            case 1:
                return verifyUserinfoManualInput(hook, beginCountryModalHandler, swipeIndex === index);
            case 2:
                return orderCard(hook);
            case 3:
                return addCardDelieveryAddress(hook, beginCountryModalHandler, swipeIndex === index);
            case 4:
                return reviewVerification(hook, beginTermsModalHandler);
            default:
                break
        }

        return success(t('verify.success'))
    };

    const beginTermsModalHandler = () => {
        setTimeout(function () {
            termsModalRef.current.open()
        }, 500);
    }

    const renderViewsAfterDelay = () => {
        setTimeout(function () {
            //TODO: when sandro will implement Skeleton, we will put that here....
            setCanRender(true)
        }, 500)
    };

    const getTitleForCameraTip = () => {
        switch (cameraStep) {
            case 1: return t('verify.cameraBackSide');
            case 2: return t('verify.cameraWithSelfie');
            default: return t('verify.cameraFrontSide');
        }
    };

    const getDescForCameraTrip = () => {
        switch (cameraStep) {
            case 1: return t('verify.cameraTakeDesc1');
            case 2: return t('verify.cameraTakeDesc2');
            default: return t('verify.cameraTakeDesc0');
        }
    };

    const getImageForCameraTrip = () => {
        let image = require('../../../assets/review/userCardFront.png');
        switch (cameraStep) {
            case 1:
                image = require('../../../assets/review/userCardBack.png');
                break;
            case 2:
                image = require('../../../assets/review/userCardWiithSelfie.png');
                break;
        }
        return image;
    };

    return (
        <View style={Common.fill}>

            <View style={[{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Platform.OS === 'android' ? 0 : height / 33.83
            }, Common.horizontalMargin]}>

                <View style={{width: swipeIndex === 0 ? 0 : '15%'}}>
                    {swipeIndex > 0 && swipeIndex < 5 ?
                        <TouchableOpacity onPress={onBackPressed}>
                            <AntDesign style={{fontWeight: 'bold', alignSelf: 'flex-start'}} name='left'
                                       color='#b0b0b0' size={16}/>
                        </TouchableOpacity> : null}
                </View>

                <View
                    style={{
                        width: swipeIndex === 0 ? '85%' : '70%',
                        alignItems: swipeIndex === 0 ? 'flex-start' : 'center'
                    }}>
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
            {canRender && <Pager
                pages={PAGES}
                swipeIndex={swipeIndex}
                scrollEnabled={false}
                renderItem={
                    (_, i) => viewAt(i)
                }
                didScrollToLast={() => {
                }}/>
            }

            <Button style={{
                alignSelf: 'stretch',
                height: hidesNextButton() ? 0 : Dimens.FIELD_HEIGHT,
                marginTop: 8,
                marginHorizontal: Dimens.DEFAULT_VERTICAL_SPACING
            }}
                    title={NEXT_TITLES[swipeIndex]}
                    loading={hook.loading}
                    onPress={() => {
                        onNext()
                    }}/>

            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>

            {renderViewsAfterDelay()}

            <Modal
                animationType='slide'
                onRequestClose={() => {
                    setCameraVisible(false);
                }}
                visible={cameraVisible}>
                <Camera
                    title={t('verify.idCard')}
                    description={getTitleForCameraTip()}
                    index={cameraStep}
                    passport={ passportIsSelected() }
                    close={(photos) => {
                        setCameraVisible(false);

                        if (photos && photos.length > 0) {

                            setCameraStep(cameraStep => cameraStep + 1);

                            const lastStep = passportIsSelected() ? 1 : 2

                            if (passportIsSelected()) {
                                if (photos.length > 0 && photos[0].photo != null) { hook.setFrontSideData(photos[0].photo); }
                                if (photos.length > 1 && photos[1].photo != null) { hook.setSelfieData(photos[1].photo); }
                            } else {
                                if (photos.length > 0 && photos[0].photo != null) { hook.setFrontSideData(photos[0].photo); }
                                if (photos.length > 1 && photos[1].photo != null) { hook.setBackSideData(photos[1].photo); }
                                if (photos.length > 2 && photos[2].photo != null) { hook.setSelfieData(photos[2].photo); }
                            }

                            if (cameraStep === lastStep) {
                                cameraTrip.current.close()
                                setSwipeIndex(swipeIndex + 1);
                            }
                        }
                    }}/>
            </Modal>

            <SimulatedModal ref={countryModalRef} hasFlatCorners={true} hidesDragView={true} height={'100%'}>
                <ListPicker
                    onBackPressed={() => {
                        countryModalRef.current.close()
                    }}
                    handleOnPress={(item) => {
                        hook.setSelectedCity(item)
                        countryModalRef.current.close()
                    }}
                    items={hook.cities}
                    value={'name'}
                    title={t('verify.cities')}/>
            </SimulatedModal>

            <SimulatedModal ref={cameraTrip} hasFlatCorners={true} hidesDragView={true} height={'100%'}>
                <ListPicker
                    onBackPressed={() => {
                        cameraTrip.current.close()
                    }}
                    handleOnPress={(item) => {
                    }}
                    items={[]}
                    value={''}
                    customView={
                        <View style={{width: '100%', height: '100%', alignItems: 'center', paddingTop: 40}}>
                            <Image source={getImageForCameraTrip()}
                                   resizeMode='contain'
                                   style={
                                       {
                                           width: 212,
                                           height: 126,
                                           marginBottom: 40
                                       }
                                   }/>

                            <Text style={{
                                marginHorizontal: 40,
                                color: Colors.text,
                                lineHeight: 34,
                                fontSize: 24,
                                textAlign: 'center',
                                fontWeight: '600'
                            }}>{getTitleForCameraTip()}</Text>

                            <Text style={{
                                marginHorizontal: 40,
                                color: Colors.placeholder,
                                fontSize: 14,
                                textAlign: 'center'
                            }}>{getDescForCameraTrip()}</Text>

                            <View style={{width: '100%', marginTop: 40, paddingHorizontal: 40}}>
                                <Button style={{width: '100%'}}
                                        title={t('verify.take')}
                                        loading={hook.loading}
                                        onPress={() => {
                                            setCameraVisible(true)
                                        }}/>
                            </View>
                        </View>
                    } title={t('verify.verification')}/>
            </SimulatedModal>

            <SimulatedModal ref={termsModalRef} hasFlatCorners={true} hidesDragView={true} height={'100%'}>

                <ListPicker
                    onBackPressed={() => {
                        termsModalRef.current.close()
                    }}
                    handleOnPress={(item) => {
                    }}
                    items={[]}
                    value={''}
                    customView={
                        <View style={{width: '100%', height: '100%', alignItems: 'center', paddingTop: 40}}>

                            <Text style={{
                                marginHorizontal: 40,
                                color: Colors.placeholder,
                                fontSize: 14,
                                textAlign: 'center'
                            }}>{hook.term && hook.term.description ? hook.term.description : ''}</Text>

                            <View style={{width: '100%', marginTop: 40, paddingHorizontal: 40}}>
                                <Button style={{width: '100%'}}
                                        title={t('verify.agree')}
                                        loading={hook.loading}
                                        onPress={() => {
                                            termsModalRef.current.close()
                                        }}/>
                            </View>

                        </View>
                    } title={t('verify.terms')}/>

            </SimulatedModal>

        </View>
    )
}

export default Verify;
