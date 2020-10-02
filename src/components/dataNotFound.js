import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text } from '../components';

export default function dataNotFound({title,text}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{ title }</Text>
            <Text style={styles.text}>{ text }</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    container : {
        marginHorizontal:16,
        marginVertical : 64,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
    },
    title : {
        marginBottom : 8,
        fontSize:14,
        lineHeight:18,
        color:"#130D1E"
    },
    text : {
        fontSize:12,
        lineHeight:18,
        color:"#6B6B6B"
    }
})