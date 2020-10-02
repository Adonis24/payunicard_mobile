import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Common, Colors } from 'styles';
import Text from './text';
import { AntDesign } from '@expo/vector-icons';

export default function ModalHeader({ showBackButton = false,
    onBackPressed,
    title,
    renderRight, style }) {
    return (
        <View style={[
            {
                flexDirection: 'row',
                height: 50,
                alignItems: 'center'
            },
            Common.horizontalMargin,
            style]}>

            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    alignItems: !showBackButton ? 'flex-start' : 'center'
                }}>
                <Text style={{
                    color: Colors.text,
                    fontSize: 14
                }}>{title}</Text>
            </View>

            <View>
                {showBackButton &&
                    <TouchableOpacity
                        onPress={onBackPressed}>
                        <AntDesign
                            name='left'
                            color='#b0b0b0'
                            size={16} />
                    </TouchableOpacity>}
            </View>


            {renderRight && renderRight()}
        </View>
    )
}