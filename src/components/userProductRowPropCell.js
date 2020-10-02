import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from './text'
import {Sizes, FontCfg, Colors} from 'styles';

export default function UserProductRowPropCell({titleTop, titleBottom, icon, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={{width: '100%', height: 66, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View key={'fabRow1'} style={{flexDirection: 'column'}}>
                    <Text style={{ fontSize: 12, color: Colors.placeholder }}>{titleTop}</Text>
                    <Text style={{ fontSize: 14 , color: Colors.text }}>{titleBottom}</Text>
                </View>
                {icon && <Image style={{ width: 20, height: 20 }} source={icon}/>}
            </View>
            <View key={'fabRow2'} style={{height: 1, width: '100%', backgroundColor: '#F1F1F1', position: 'absolute', bottom: 0}}/>
        </TouchableOpacity>
    )
};
