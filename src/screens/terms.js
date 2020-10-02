import React from 'react';
import {View, ScrollView} from 'react-native';
import {ModalHeader, Text, Button} from 'components';
import t from 'strings';
import {Colors} from 'styles';

export default function Terms({terms, close}) {

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <ModalHeader
                onBackPressed={close}
                showBackButton={true}
                title={t('verify.terms')}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: 24,
                    flex: 1
                }}>
                <View style={{flex: 1, width: '100%'}}>
                    <Text style={{
                        color: Colors.placeholder,
                        flex: 1,
                        width: '100%'
                    }}>
                        {terms}
                    </Text>
                    <View style={{height: 140}}/>
                </View>
            </ScrollView>

            <View style={{
                paddingTop: 24,
                paddingBottom: 24,
                position: 'absolute',
                bottom: 0,
                paddingHorizontal: 24,
                width: '100%',
                backgroundColor: 'white'
            }}>

                <Button title={t('verify.agree')} onPress={() => {
                    close()
                }}/>

            </View>

        </View>
    )
}
