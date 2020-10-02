import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Common, Dimens, Colors} from 'styles';
import {Text, SelectorButton, Button, CardViewButton} from 'components';
import t from 'strings';
const {height} = Dimensions.get('window');

const CARD_TYPE = {
    TYPE1: 1,
    TYPE2: 2,
    TYPE3: 3
};

const cards = {
    'CardTypeMC': require('../../../assets/cards/CardTypeMC.png'),
    'CardTypeVISA': require('../../../assets/cards/CardTypeVISA.png'),
    'CardTypeTotal': require('../../../assets/cards/CardTypeTotal.png'),
};

const cardImage = (type) => {
    switch (type) {
        case CARD_TYPE.TYPE1:
            return cards.CardTypeMC;
        case CARD_TYPE.TYPE2:
            return cards.CardTypeVISA;
        case CARD_TYPE.TYPE3:
            return cards.CardTypeTotal;
    }
};

const CardTypeRow = ({item, hook}) => {
    return <View>
        <View style={styles.padding}/>
        <CardViewButton
            onPress={() => {
                hook.setSelectedCard(item)
            }} image={cardImage(item.typeId)}
            title={item.name}
            subTitle={item.description}
            checked={hook.selectedCard === item} 
            tooltipText = {item.description}/>
    </View>;
};

function orderCard(hook) {
    
    return (
        <View style={[Common.horizontalMargin]}>

            <Text style={{
                marginTop: height / 23.88,
                color: Colors.text,
                lineHeight: 34,
                fontSize: 24,
            }}>{t('verify.order_card_title')}</Text>

            <Text style={{
                width: '75%',
                marginTop: height / 40.6,
                color: Colors.placeholder,
                fontSize: 12
            }}>{t('verify.order_card_subtitle')}</Text>

            <View style={styles.padding}/>
            <FlatList data={hook.cardTypes}
                      extraData={hook.selectedCard}
                      keyExtractor={item => item.typeId.toString()}
                      renderItem={object => <CardTypeRow item={object.item} hook={hook} />}
            />
        </View>
    )
};

export default orderCard;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});
