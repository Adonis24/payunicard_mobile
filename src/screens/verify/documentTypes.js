import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Common, Dimens, Colors, Sizes, FontCfg} from 'styles';
import {Text, SelectorButton} from 'components';
import t from 'strings';
const {height} = Dimensions.get('window');

export const DOCUMENT_TYPE = {
    ID_CARD: 'Enum_IDCard',
    ID_CARD_OLD: 'Enum_OldIDCard',
    PASSPORT: 'Enum_Passport'
}

const icon = (type)  => {
    switch(type) {
        case DOCUMENT_TYPE.ID_CARD: return 'idcard'
        case DOCUMENT_TYPE.ID_CARD_OLD: return 'idcard'
        case DOCUMENT_TYPE.PASSPORT: return 'idcard'
    }
}

const background = (type)  => {
    switch(type) {
        case DOCUMENT_TYPE.ID_CARD: return Colors.primary
        case DOCUMENT_TYPE.ID_CARD_OLD: return '#ffda04'
        case DOCUMENT_TYPE.PASSPORT: return '#ff8f00'
    }
}

const DocumentTypeRow = ({item, click, hook}) => {
    return  <View>
                <View style={styles.padding}/>
                <SelectorButton onPress={ () => {
                                    hook.setSelectedDocType(item)
                                    click()
                                }}
                                title={item.name}
                                subTitle={item.subTitle}
                                icon={icon(item.type)}
                                style={{height: height * 0.1}}
                                iconBackground={background(item.type)}/>
            </View>;
}

function documentTypes(click, hook) {

    return (
        <View style={Common.horizontalMargin}>

            <Text style={{
                marginTop: height / 25,
                color: Colors.text,
                lineHeight: 26,
                fontSize: height / 33.83,
                ...FontCfg.medium,
            }}>{t('verify.doc_types')}</Text>

            <View style={styles.padding}/>
            <FlatList data={hook.documentTypes}
                      keyExtractor={item => item.type.toString()}
                      renderItem={object => <DocumentTypeRow item={object.item} click={() => {
                          click(object.item)
                      }} hook={hook} />}
            />

        </View>
    )
};

export default documentTypes;

const styles = StyleSheet.create({
    padding: {
        height: Dimens.DEFAULT_VERTICAL_SPACING
    }
});

