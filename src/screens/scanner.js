import React, { useState, useEffect, useRef } from 'react';
import * as Permissions from 'expo-permissions';
import { View, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { CircularTouchable } from 'react-native-better-touchable';
import { Text, SelectorButton, SwitchButton } from 'components';
import t from 'strings';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {FontCfg, Colors, Dimens} from 'styles';

const { width, height } = Dimensions.get('screen');

const fixWidth = width + 4;
const fixHeight = height + 4;

function QRCamera({ hasCameraPermission, innerRef, children }) {
    
    return (
       <>
            {hasCameraPermission && <BarCodeScanner
                ref={innerRef} 
                onBarCodeScanned={handleQRRead}
                style={{ flex: 1 }} >
                {children}
                </BarCodeScanner>
            }
        </>)
}

function QRImage({ innerRef, image, style }) {
    
    return (
       <>
        <Image source={image} ref={innerRef} style={[style, {flex: 1}]}/>
        </>)
}

const WrappedSvg = ({visibleWidth, visibleHeight}) => (
    
    <Svg width={fixWidth} height={fixHeight} viewBox={`0 0 ${fixWidth} ${fixHeight}`}>
        <Defs>
            <Mask id='mask' x='0' y='0' height={fixHeight} width={fixWidth}>
                <Rect height={fixHeight} width={fixWidth} fill='#fff' />
                <Rect x={(width - visibleWidth)/2} y={(height - visibleHeight) / 2} width={visibleWidth} height={visibleHeight} rx='15' />
            </Mask>
        </Defs>
        <Rect height={fixHeight} width={fixWidth} fill='rgba(0, 0, 0, 0.9)' mask='url(#mask)' />
    </Svg>
);

const ScannerType = {
    QR: 'QR',
    BAR_CODE: 'BarCode'
}

function Scanner({close, type = ScannerType.QR, onRequestClose, manualHandler }) {

    const isScanningQR = type === ScannerType.QR

    const visibleWidth = width * (isScanningQR ? 0.6 : 0.7);
    const visibleHeight = visibleWidth * (isScanningQR ? 1 : 0.5)

    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [qrScan, setQrScan] = useState(true);
    const camera = useRef(null);

    let qrImage     = {uri: 'https://barcodesegypt.com/wp-content/uploads/sites/123/2019/05/qr_code_5cdd30e269752.jpg'}
    let title       = qrScan === true ? (isScanningQR ? t('qr.qr_scan') : t('bar_code.title')) : t('qr.qr_receive')
    let descHeader  = qrScan === true ? (isScanningQR ? t('qr.qr_scan_desc_header') : t('bar_code.scan_desc_header')) : t('qr.qr_receive_desc_header')
    let descBody    = qrScan === true ? (isScanningQR ? t('qr.qr_scan_desc_body') : t('bar_code.scan_desc_body')) : t('qr.qr_receive_desc_body')
    let titleColor  = qrScan === true ? 'white' : Colors.text
    let bgColor     = qrScan === true ? 'transparent' : 'white'
    const text      = <Text style={{ height: 20, color: titleColor }}>{title}</Text>
    const continueButton = isScanningQR ? <SwitchButton leftTitle={t('qr.qr_scan')}
                                         rightTitle={t('qr.qr_receive')} 
                                         onLeftPressed={()=>{ setQrScan(true) }} 
                                         onRightPressed={()=>{ setQrScan(false) }} 
                                         leftSelected={qrScan}/>
                                         :
                                         <SelectorButton title={t('bar_code.manual_input_title')} 
                                                         subTitle={t('bar_code.manual_input_sub_title')}
                                                         onPress={()=>{
                                                            manualHandler()
                                                         }}
                                                         backgroundColor={'white'} 
                                                         style={{height: 64}}
                                                         displaysIcon={false}
                                                         />

    const descTitleComp = <Text style={[{...FontCfg.bold, fontSize: 24, color: titleColor, textAlign:'center'}]}>
                        {descHeader}
                      </Text>

    const descBodyComp = <Text style={[{...FontCfg.light, fontSize: 13, color: titleColor, textAlign:'center', top: 16}]}>
                    {descBody}
                 </Text>


    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA).then(({ status }) => setHasCameraPermission(status === 'granted'));
    }, [])

    useEffect(() => StatusBar.setBarStyle('light-content'), [])

    handleQRRead = result => {
        close(result.data)
    };

    return (
        <View style={{ flex: 1 }}>

            {qrScan ? 
                <QRCamera hasCameraPermission={hasCameraPermission} innerRef={camera}>
                    <WrappedSvg visibleWidth={visibleWidth} visibleHeight={visibleHeight}/>
                </QRCamera>
            :
            <QRImage/> 
            }
            
            <SafeAreaView style={[StyleSheet.absoluteFill, { elevation: 5, backgroundColor: bgColor }]}>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                    marginTop: '6%',
                }}>
                    <CircularTouchable
                        onPress={onRequestClose}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} size={30}>
                        <MaterialIcons
                            name='close'
                            color={titleColor}
                            size={25} />
                    </CircularTouchable>
                    {text}
                    <View style={{
                        width: 30,
                        height: 30
                    }} />
                </View>

                <View style={
                    { position:'absolute', 
                        marginTop: (height + visibleHeight)/2 + 64, 
                        width: '100%', 
                        alignContent:'space-between', 
                        paddingHorizontal: 32 ,
                        flexDirection: 'column',
                    }}>
                    {descTitleComp}
                    {descBodyComp}
                </View>

                <View style={{ position: 'absolute', bottom: 32, width: '100%', paddingHorizontal: 32 }}>
                    {continueButton}
                </View>

                {
                    qrScan ? 
                    <View style={{
                    position: 'absolute',
                    zIndex: 2,
                    width: visibleWidth,
                    height: visibleHeight,
                    borderRadius: 18,
                    borderColor: '#2DD458',
                    borderWidth: 1,
                    top: (height - visibleHeight)/2,
                    left: (width - visibleWidth)/2,
                    }} />
                    : <QRImage image={qrImage} 
                                style={{
                    position: 'absolute',
                    zIndex: 2,
                    width: visibleWidth,
                    height: visibleHeight,
                    borderRadius: 18,
                    borderColor: Colors.border,
                    borderWidth: 1,
                    top: (height - visibleHeight)/2,
                    left: (width - visibleWidth)/2,
                    }}/>
                }

            </SafeAreaView>

        </View>
    )
}

export { Scanner, ScannerType }