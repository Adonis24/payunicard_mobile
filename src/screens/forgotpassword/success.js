import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Common, Dimens, Colors} from 'styles';
import {Text} from 'components';

const { height } = Dimensions.get('window');

function success(text) {

    return (
        <View style={Common.fill}>
            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING * 2}}/>
            <View style={styles.padding}/>
            <Image resizeMode='contain'
                    source={require('../../../assets/illustrations/success.png')} 
                    style={{
                                height: height / 4,
                                alignSelf: 'center',
                                maxHeight: 272
                            }}
            />
            <View style={styles.padding}/>
            <View style={{ alignContent: 'center', 
                                        alignItems: 'center', 
                                        marginLeft: 32,
                                        marginRight: 32, 
                                        height : '30%'}}>
                <Text style={{
                    marginTop: 32,
                    color: Colors.text,
                    alignContent: 'center',
                    fontSize: 16,
                }}>{text}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});


export default success;
