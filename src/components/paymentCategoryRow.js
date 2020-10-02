import {Image, View, TouchableOpacity} from "react-native";
import {Text} from "components/index";
import React from "react";

function PaymentCategoryRow({title, imageUrl, image, isCircle, onClick}) {
    return (
        <TouchableOpacity  style={{ width: 80, height: 110, alignItems: 'center' }} onPress={onClick}>

            <View style={[{
                width: 64, height: 64, borderRadius: 15,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000000', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.05, shadowRadius: 7
            }, isCircle ? { borderRadius: 32 } : {}]}>
                { image ? <Image source={image}
                                    style={
                           {
                               resizeMode: 'cover',
                               width: 40,
                               height: 40,
                               borderRadius: 20
                           }
                       }/> : <Image source={{uri: `${imageUrl}`}}
                       style={
                           {
                               resizeMode: 'contain',
                               width: 40,
                               height: 40,
                               borderRadius: 20
                           }
                       }/>
                }
            </View>
            <View style={{ height: 46, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '400', textAlign: 'center', fontSize: 10, color: '#6B6B6B' }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default PaymentCategoryRow;
