import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Colors} from 'styles';

export default function CurrentUserView({borderColor = Colors.primary, imageUrl, onClick}) {
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={
                {
                    width: 40,
                    height: 40,
                    borderColor: borderColor,
                    borderRadius: 20,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Image source={ imageUrl && imageUrl.length > 0 ? {uri: `${imageUrl}`} : require('../../assets/avatar.png')}
                       resizeMode={'contain'}
                       style={
                           {
                               width: 30,
                               height: 30,
                               borderRadius: 15,
                           }
                       }/>
            </View>
        </TouchableOpacity>
    )
};
