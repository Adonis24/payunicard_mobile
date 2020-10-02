import React, {useState, useEffect, useRef} from 'react';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {View, StatusBar, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {MaterialIcons} from '@expo/vector-icons';
import {CircularTouchable} from 'react-native-better-touchable';
import {Text, Button} from 'components';
import t from 'strings';
import * as ImageManipulator from 'expo-image-manipulator';
import {Pulse} from 'react-native-loader';

const {width, height} = Dimensions.get('screen');
const fixWidth = width + 4;
const fixHeight = height + 4;
const visibleWidth = width - 40;

function CustomCamera({hasCameraPermission, innerRef, children, current, passport = false}) {
    return (
        <>
            {hasCameraPermission && <Camera ratio='16:9'
                                            ref={innerRef}
                                            style={{flex: 1}}
                                            type={(current === 2 && !passport) || (current === 1 && passport) ? Camera.Constants.Type.front : Camera.Constants.Type.back}>
                {children}
            </Camera>}
        </>)
}

const WrappedSvg = ({visibleHeight}) => (
    <Svg width={fixWidth} height={fixHeight} viewBox={`0 0 ${fixWidth} ${fixHeight}`}>
        <Defs>
            <Mask id='mask' x='0' y='0' height={fixHeight} width={fixWidth}>
                <Rect height={fixHeight} width={fixWidth} fill='#fff'/>
                <Rect x={20} y={(height - visibleHeight) / 2} width={visibleWidth} height={visibleHeight} rx='15'/>
            </Mask>
        </Defs>
        <Rect height={fixHeight} width={fixWidth} fill='rgba(0, 0, 0, 0.9)' mask='url(#mask)'/>
    </Svg>
);

export default function CameraModal({close, index, title, description, passport = false}) {

    const [processing, setProcessing] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [photos, setPhotos] = useState(
        passport ? [
                    {photo: null, confirmed: false, base64: null},
                    {photo: null, confirmed: false, base64: null}
                    ] : [
                    {photo: null, confirmed: false, base64: null},
                    {photo: null, confirmed: false, base64: null},
                    {photo: null, confirmed: false, base64: null}
                    ]
    );

    const camera = useRef(null);

    const [currentPhoto, setCurrentPhoto] = useState(null);

    const visibleHeight = !passport && index <= 1 ? visibleWidth * 0.625 : visibleWidth;

    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA).then(({status}) => setHasCameraPermission(status === 'granted'));
    }, [])

    useEffect(() => StatusBar.setBarStyle('light-content'), [])

    const takePicture = async () => {
        if (camera && camera.current) {
            setProcessing(true)
            let photo = await camera.current.takePictureAsync(({skipProcessing: false, quality: 0.1}));
            const cropW = photo.width * 0.9
            const cropH = !passport && index <= 1 ? cropW * 0.625 : cropW

            const data = await ImageManipulator.manipulateAsync(photo.uri, [
                {
                    crop: {
                        originX: (photo.width - cropW) / 2,
                        originY: (photo.height - cropH) / 2,
                        width: cropW,
                        height: cropH
                    }
                }
            ], {format: 'jpeg', base64: true})

            setCurrentPhoto(data.uri)

            let _photos = [...photos];

            _photos[index].photo = data

            setPhotos(_photos);

            setTimeout(() => {
                setProcessing(false)
            }, 1200)
        }
    }

    const text = <Text style={{color: 'white', fontWeight: '400', fontSize: 14, textAlign: 'center', alignSelf: 'center'}}>{title}</Text>
    const descr = <Text style={{color: 'white', fontWeight: '400', fontSize: 16, alignSelf: 'center', marginTop: 24, marginHorizontal: 16, textAlign: 'center'}}>{description}</Text>
    const takeButton = <TouchableOpacity
        onPress={() => {
            takePicture().then(() => {
            });
        }}
        style={styles.bottom}>
        <View style={
            {
                width: 48, height: 48,
                borderColor: '#94DD34', borderRadius: 48, borderWidth: 1,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <View style={{width: 44, height: 44, backgroundColor: 'white', borderRadius: 44}}/>
        </View>
    </TouchableOpacity>

    const continueButton =
        <View style={styles.bottom}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '48%'}}>
                    <Button
                        onPress={() => {
                            const _photos = [...photos];
                            _photos[index].photo = null;
                            setPhotos(_photos);
                            setCurrentPhoto(null)
                        }}
                        textStyle={{color: 'white'}}
                        style={{backgroundColor: '#979797', width: '100%'}}
                        title={t('camera.retake')}/>
                </View>
                <View style={{width: '4%'}}/>
                <View style={{width: '48%'}}>
                    <Button
                        onPress={() => {
                            close(photos)
                        }}
                        textStyle={{color: 'white'}}
                        style={{backgroundColor: '#94DD34', width: '100%'}}
                        title={t('common.continue')}/>
                </View>
            </View>
        </View>

    return (

        <View style={{flex: 1}}>
            <CustomCamera
                current={index}
                hasCameraPermission={hasCameraPermission}
                innerRef={camera}>
                <WrappedSvg visibleHeight={visibleHeight} currentPhoto={currentPhoto}/>
            </CustomCamera>
            <SafeAreaView style={[StyleSheet.absoluteFill, {elevation: 5}]}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                    marginTop: '2%'
                }}>
                    {(photos.length > index && photos[index].photo != null) ? <View style={{ width: 30, height: 30 }} /> :
                        <CircularTouchable
                            onPress={close}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} size={30}>
                            <MaterialIcons
                                name='close'
                                color='white'
                                size={25}/>
                        </CircularTouchable>}
                    {text}
                    <View style={{ width: 30, height: 30 }} />
                </View>

                {descr}

                <View style={{position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: 25}}>
                    {(photos.length > index && photos[index].photo != null) ? continueButton : takeButton}
                </View>
                <View style={[{
                    position: 'absolute',
                    zIndex: 2,
                    top: (height - visibleHeight - 10) / 2,
                    left: 15,
                    right: 15,
                    width: width - 30,
                    height: visibleHeight + 10,
                    borderRadius: 18,
                    borderColor: '#2DD458',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    {currentPhoto && <Image source={{uri: `${currentPhoto}`}}
                                            resizeMode='cover'
                                            style={
                                                {
                                                    borderRadius: 18,
                                                    width: '98%',
                                                    height: '98%',
                                                }
                                            }/>}
                </View>
            </SafeAreaView>

            <View style={
                {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    position: 'absolute',
                    top: (height - visibleHeight - 10) / 2,
                    left: 15,
                    right: 15,
                    width: width - 30,
                    height: visibleHeight + 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: processing ? 1 : 0
                }
            }>
                <Pulse size={18} color="#FFFFFF"/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    bottom: {
        alignSelf: 'center',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
