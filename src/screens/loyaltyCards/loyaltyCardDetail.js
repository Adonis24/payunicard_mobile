import React from 'react';
import {
    Image,
    View
} from 'react-native';
import {Text} from 'components';
import {Common} from 'styles';
import Barcode from 'react-native-barcode-builder';
import { Defaults } from 'utils';

function loyaltyCardDetail({card = Defaults.loyaltyCardObject}) {
    return (
        <View style={[Common.horizontalMargin, { width: '100%', height: '100%'}]}>
            <View style={{ height: 85, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                marginHorizontal: 24, borderBottomWidth: 1, borderBottomColor: '#F1F1F1'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={{uri: `${card.imageURL}`}}
                           resizeMode='cover'
                           style={
                               {
                                   width: 60,
                                   height: 45,
                                   borderRadius: 5,
                                   backgroundColor: '#f2f2f2'
                               }
                           }/>
                    <View>
                        <Text style={{ marginLeft: 16, color: '#6B6B6B', fontSize: 16, fontWeight: '600' }}>{card.cardName}</Text>
                        <Text style={{ marginLeft: 16, color: '#6B6B6B', fontSize: 14, fontWeight: '400' }}>{card.cardNumber}</Text>
                    </View>
                </View>
                <View/>
            </View>
            <View style={{ paddingHorizontal: 24, height: 100, width: '100%' }}>
                <Barcode value="Hello World" format="CODE128" height={100} />

                <View style={{ height: 16 }} />

                <Text>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.Lorem Ipsum is simply dummy
                    text of the printing and
                </Text>
            </View>
        </View>
    );
}

export default loyaltyCardDetail;
