import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

    export default function ProductRowView({backgroundColor = "#94DD3410", productName, iconUrl, amount, currency = "₾", hasSeparator = true, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={{width: '100%', paddingLeft: 16, paddingRight: 16, height: 68, flexDirection: 'row'}}>
                <View style={{width: 56, paddingTop: 15}}>
                    <View style={
                        {
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: backgroundColor,
                            position: 'relative'
                        }}>
                        <Image source={{uri: `${iconUrl}`}}
                               resizeMode={'contain'}
                               style={
                                   {
                                       resizeMode: 'contain',
                                       width: 18,
                                       height: 18
                                   }
                               }/>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', ...Sizes.mt4}}>
                        <View style={{alignSelf: 'flex-start'}}>
                            <Text style={{...FontCfg.medium, color: Colors.placeholder, ...Sizes.fs14}}>
                                {productName}
                            </Text>
                        </View>
                        <View style={{alignSelf: 'flex-end'}}>
                            <Text style={{...FontCfg.medium, color: Colors.text, ...Sizes.fs14}}>{`${amount}${currency}`}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', backgroundColor: "#f5f5f5", height: 1, position: 'absolute', bottom: 0}} />
                </View>
            </View>
        </TouchableOpacity>
    )
};
