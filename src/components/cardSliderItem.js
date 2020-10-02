import React from 'react';
import {
    View, Text, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import String from '../utils/string'
import { Dimens } from 'styles';

export default function CardSliderItem ({imageURL , color , loyaltyCardId, cardName, index, customWidth = 16, onClick, onAddNew}) {

    let img = <Image source={require("../../assets/cards/LTUnicard.png")} style={styles.imageStyle} />

    if (String.validURL(imageURL)) {
        img = <Image source={{uri: `${imageURL}`}} style={[styles.imageStyle]} />
    }

    return (
        <TouchableOpacity
            style={{
                flex:1,
                height: 120,
                width: loyaltyCardId ? 180 : customWidth,
                padding: 0,
                marginRight: 16,
                marginBottom: 20
            }}
            onPress={() => {
                if(loyaltyCardId === "addCard") onAddNew()
                else onClick()
            }}>
            {
                loyaltyCardId === "addCard" ?
                    <View style={{width: '100%', height: 110, justifyContent:"center", alignItems:"center", borderColor:"#F3F3F3", borderWidth : 1, borderRadius: 10}}>
                        <Image
                            source={require("../../assets/addIcon.png")}
                            style={{width:24, height:24, marginBottom: Dimens.DEFAULT_VERTICAL_SPACING_LITTLE, resizeMode: "contain"}}
                        />
                        <Text style={{color:"#6B6B6B" }}>{cardName}</Text>
                    </View>
                    : (loyaltyCardId ?
                    <View style={{ width:"100%", height: 120 }}>
                        <View style={{
                            width:"80%",
                            marginLeft: "10%",
                            height: 10,
                            backgroundColor : color,
                            borderRadius: 20,
                            position: 'absolute',
                            bottom: 20,
                            shadowColor: color,
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 1,
                            shadowRadius: 20 }}>

                        </View>
                        <View style={{ height: 110, backgroundColor : 'transparent', borderRadius: 10 }}>
                            {img}
                        </View>
                    </View> : null)
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        flex:1,
        resizeMode: 'stretch',
        width: "100%",
        // shadowColor: color,
        // shadowOffset: {width: 0, height: 8},
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
        borderRadius: 16
    }
});

