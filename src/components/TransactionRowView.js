import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

export default function TransactionRowView({date, imageUrl, merchantName, transactionType, amount, currency = "₾", hasSeparator = true, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={{width: '100%', paddingLeft: 16, paddingRight: 16, height: 'auto', flexDirection: 'row'}}>
                <View style={{width: 40, height: 68, justifyContent: 'center', alignItems: 'center', marginRight: 16}}>
                    <Image source={{uri: `${imageUrl}`}}
                           style={
                               {
                                   width: 40,
                                   height: 40,
                                   borderRadius: 20,
                                   marginBottom: 19
                               }
                           }/>
                </View>
                <View style={{flex: 1, height: 68}}>
                    <Text style={{...FontCfg.light, color: Colors.placeholder, ...Sizes.fs10, lineHeight: 12}}>
                        {date}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', ...Sizes.mt4}}>
                        <View style={{alignSelf: 'flex-start'}}>
                            <Text style={{...FontCfg.medium, color: Colors.placeholder, ...Sizes.fs14, lineHeight: 18}}>
                                {merchantName}
                            </Text>
                        </View>
                        <View style={{alignSelf: 'flex-end'}}>
                            <Text style={{
                                ...FontCfg.medium,
                                color: amount > 0 ? Colors.primary : Colors.text, ...Sizes.fs14, lineHeight: 18
                            }}>
                                {amount > 0 ? "+" : ""}{`${amount}${currency}`}
                            </Text>
                        </View>
                    </View>
                    <Text style={{...FontCfg.light, color: Colors.placeholder, ...Sizes.fs10, ...Sizes.mt4, lineHeight: 12}}>
                        {transactionType}
                    </Text>
                    {hasSeparator && <View style={{width: '100%', backgroundColor: "#f5f5f5", height: 1, position: 'absolute', bottom: 8}} /> }
                </View>
            </View>
        </TouchableOpacity>
    )
};
