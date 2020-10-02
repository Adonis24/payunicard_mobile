import React from 'react';
import Touchable from './touchable';
import { View, StyleSheet } from 'react-native';
import Text from './text';
import { Colors, Common, Dimens } from 'styles';

function OtpInput({ otp, onPress, height = 64 }) {
    return (

        <Touchable
            onPress={onPress}
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center', 
                height: height,
                flex:0,
                backgroundColor:"#FFF"
            }}
        >

            <View style={styles.charContainer}>
                <Text style={styles.char}>{otp.substring(0, 1)}</Text>
            </View>

            <View style={styles.charContainer}>
                <Text style={styles.char}>{otp.substring(1, 2)}</Text>
            </View>

            <View style={styles.charContainer}>
                <Text style={styles.char}>{otp.substring(2, 3)}</Text>
            </View>

            <View style={styles.charContainer}>
                <Text style={styles.char}>{otp.substring(3, 4)}</Text>
            </View>

        </Touchable>)
}


const styles = StyleSheet.create({

    charContainer: {
        width: 48,
        backgroundColor: '#F6F6F4',
        marginHorizontal : 12,
        borderRadius: 16,
        justifyContent: 'center',
        height: 64,

    },

    char: {
        color: Colors.text,
        fontSize: 30,
        textAlign: 'center'
    }
});


export default OtpInput;