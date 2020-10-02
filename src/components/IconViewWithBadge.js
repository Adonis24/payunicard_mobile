import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

export default function IconViewWithBadge({backgroundColor = "#94DD3410", borderColor = Colors.primary, iconUrl, badgeValue, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={
                {
                    width: 40,
                    height: 40,
                    borderColor: borderColor,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: backgroundColor,
                    position: 'relative'
                }}>
                <Image source={iconUrl}
                       resizeMode={'contain'}
                       style={
                           {
                               resizeMode: 'contain',
                               width: 18,
                               height: 18
                           }
                       }/>
                {badgeValue && <View style={{
                    backgroundColor: "#FFA001",
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: -2,
                    top: -2
                }}>
                    <Text style={{...FontCfg.bold, color: '#FFFFFF', ...Sizes.fs12}}>
                        {badgeValue}
                    </Text>
                </View>}
            </View>
        </TouchableOpacity>
    )
};
