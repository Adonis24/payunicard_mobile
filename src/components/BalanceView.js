import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

export default function BalanceView({
                                        topTitle = "Balance",
                                        topTitleColor = Colors.placeholder,
                                        topTitleFontSize = {...Sizes.fs14},

                                        bottomTitle = "0.0",
                                        bottomTitleColor = Colors.text,
                                        bottomTitleFontSize = {...Sizes.fs32},

                                        showsIcon = false,
                                        showsCurrency = false,
                                        currency = "₾",
                                        iconUrl,
                                        onClick
                                    }) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View>
                <Text style={[{...FontCfg.light, color: topTitleColor}, topTitleFontSize]}>
                    {topTitle}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[{...FontCfg.bold, color: bottomTitleColor}, bottomTitleFontSize]}>
                        {bottomTitle}{showsCurrency && currency}
                    </Text>
                    {showsIcon && <Image source={iconUrl}
                                         resizeMode={'contain'}
                                         style={
                                             {
                                                 resizeMode: 'contain',
                                                 width: 20,
                                                 height: 20
                                             }
                                         }/>}
                </View>
            </View>
        </TouchableOpacity>
    )
};
