import {Animated, Image, StyleSheet} from 'react-native';
import React from 'react';
import {RectButton} from "react-native-gesture-handler";

const renderRightAction = (image, color, x, progress, onClick, borderColor = null) => {
    const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
    });
    const pressHandler = () => {
        onClick()
    };
    return (
        <Animated.View style={{flex: 1, height: 60, transform: [{translateX: trans}]}}>
            <RectButton
                style={[styles.rightAction, {backgroundColor: color, borderWidth: borderColor ? 1 : 0, borderColor: borderColor}]}
                onPress={pressHandler}>
                <Image source={image} style={{width: 20, height: 20}}/>
            </RectButton>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        width: 60,
        marginHorizontal: 8
    },
});

export {renderRightAction}
