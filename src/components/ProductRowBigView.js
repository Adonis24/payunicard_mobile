import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

    export default function ProductRowBigView({backgroundColor = "transparent", productName, iconUrl, amount, currency = "₾", onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={{width: '100%', borderRadius: 10, borderWidth: 1, borderColor: '#F1F1F1', paddingLeft: 24, paddingRight: 24, height: 90, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{alignSelf: 'flex-start'}}>
                        <Text style={{...FontCfg.book, color: Colors.placeholder, ...Sizes.fs14}}>
                            {productName}
                        </Text>
                        <Text style={{...FontCfg.bold, color: Colors.text, ...Sizes.fs24, ...Sizes.mt4}}>{`${amount}${currency}`}</Text>
                    </View>
                </View>
                <View style={{width: 48, height: 90}}>
                    <View style={
                        {
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: backgroundColor,
                            position: 'relative',
                            marginTop: 22
                        }}>
                        <Image source={{uri: `${iconUrl}`}}
                               style={
                                   {
                                       resizeMode: 'contain',
                                       width: 28,
                                       height: 28
                                   }
                               }/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};
