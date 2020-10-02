import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {Common, Colors} from 'styles';
import Text from './text';
import {Dimens, Sizes} from "../styles";
import Button from "./button";
import t from 'strings';
import {useLocale} from "../hooks";

export default function langChooserHeader({leftTitle = 'auth.auth'}) {

    const {setLocale, locale} = useLocale();

    return (
        <View style={{
            height: 17,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: Platform.select({ios: 19, android: StatusBar.currentHeight + 19})
        }}>

            <Text style={{
                marginLeft: Dimens.DEFAULT_MARGIN,
                color: Colors.text,
                ...Sizes.fs14,
            }}>{t(leftTitle)}</Text>

            <Button title={'Switch to ' + t('common.reverselocale')}
                    style={{marginRight: Dimens.DEFAULT_MARGIN, backgroundColor: 'transparent'}}
                    textStyle={{color: Colors.placeholder, fontWeight: 'light', ...Sizes.fs14}}
                    translatable={false} onPress={() => {
                setLocale(locale === 'ka' ? 'en' : 'ka');
            }}/>
        </View>
    )
}
