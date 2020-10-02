import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Common, Dimens, Colors } from 'styles';
import { SelectorButton } from 'components';
import t from 'strings';
const {width, height} = Dimensions.get('window');

const OPERATION_TYPE = {
    FILL_BALANCE: 'FILL_BALANCE',
    ADD_LOYALTY_CARD: 'ADD_LOYALTY_CARD',
    ADD_BANK_CARD: 'ADD_BANK_CARD'
}

const icon = (type)  => {
    switch(type) {
        case OPERATION_TYPE.FILL_BALANCE: return 'idcard'
        case OPERATION_TYPE.ADD_LOYALTY_CARD: return 'idcard'
        case OPERATION_TYPE.ADD_BANK_CARD: return 'idcard'
    }
}

const background = (type)  => {
    switch(type) {
        case OPERATION_TYPE.FILL_BALANCE: return Colors.primary
        case OPERATION_TYPE.ADD_LOYALTY_CARD: return '#ffda04'
        case OPERATION_TYPE.ADD_BANK_CARD: return '#ff8f00'
    }
}

const OperationTypeRow = ({item, click}) => {
    return  <View>
                <View style={styles.padding}/>
                <SelectorButton onPress={ () => {
                                    click(item)
                                }}
                                title={item.title}
                                subTitle={item.subTitle}
                                icon={icon(item.type)}
                                style={{height: height * 0.12, width: width * 0.9}}
                                iconBackground={background(item.type)}/>
            </View>;
}

function NewOperation({onSelect}) {

    const data = [
        {
            type: OPERATION_TYPE.FILL_BALANCE,
            title: t('newOperation.fillBalance'),
            subTitle: t('newOperation.fillBalanceDescription')
        },
        {
            type: OPERATION_TYPE.ADD_LOYALTY_CARD,
            title: t('newOperation.lAddCard'),
            subTitle: t('newOperation.lAddCardDescription')
        },
        {
            type: OPERATION_TYPE.ADD_BANK_CARD,
            title: t('newOperation.bAddCard'),
            subTitle: t('newOperation.bAddCardDescription')
        }
    ]

    return (
        <View style={Common.horizontalMargin}>

            <View style={styles.padding}/>
            <FlatList data={data}
                      keyExtractor={item => item.type.toString()}
                      renderItem={object => <OperationTypeRow item={object.item} click={(item)=>{
                        onSelect(item)
                      }} />}
            />
        </View>
    )
};

export default NewOperation;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

