import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from 'styles';

function CheckBox({ title, checked, onCheck }) {

    return (
        <TouchableOpacity onPress={() => { onCheck(!checked) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.checkbox}>
                    {checked && <AntDesign style={{
                        marginTop: 1,
                        marginLeft: 1
                    }}
                        name='check'
                        color={Colors.placeholder}
                        size={12} />}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}> {title} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CheckBox;

const styles = StyleSheet.create({
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#EBEBEB',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontWeight: '300',
        fontSize: 12,
        color: Colors.placeholder,
        marginLeft: 5
    }
});
