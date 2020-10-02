import React, {useState} from 'react';
import {View, Image, Dimensions, SafeAreaView} from 'react-native';
import {Pager, Text, PagerBullets, RoundButton, LangChooserHeader} from 'components';
import {Settings} from 'utils';
import t from 'strings';
import {Common, Colors, Sizes, FontCfg} from 'styles';

const {width, height} = Dimensions.get('window');

function Onboarding({navigation}) {

    const PAGES = [{
        image: require('../../assets/illustrations/onboarding_1.png'),
        title: t('onboarding.page0Title'),
        content: t('onboarding.page0Content')
    }, {
        image: require('../../assets/illustrations/onboarding_2.png'),
        title: t('onboarding.page1Title'),
        content: t('onboarding.page1Content')
    }, {
        image: require('../../assets/illustrations/onboarding_3.png'),
        title: t('onboarding.page2Title'),
        content: t('onboarding.page2Content')
    },{
        image: require('../../assets/illustrations/onboarding_4.png'),
        title: t('onboarding.page3Title'),
        content: t('onboarding.page3Content')
    }]

    const [swipeIndex, setSwipeIndex] = useState(0);

    return (
        <View style={[Common.fill]}>

            <SafeAreaView style={[Common.fill]}>

                <LangChooserHeader leftTitle={'onboarding.headerTitleLeft'}/>

                <Pager pages={PAGES} swipeIndex={swipeIndex} styles={{width: width}} scrollEnabled={false}
                       renderItem={(p, i) => {
                           return (
                               <View key={i.toString()}
                                     style={[{
                                         flex: 1,
                                         width: width,
                                     }, Common.horizontalPadding]}>

                                   <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 48}}>

                                       <Image source={p.image} style={{width: '100%', marginBottom: height / 8.34}} resizeMode="contain"/>

                                       <Text style={{
                                           ...Sizes.mb12,
                                           ...FontCfg.bold,
                                           fontSize: height / 33.83,
                                       }}>{p.title}</Text>
                                       <Text style={{
                                           ...Sizes.fs12,
                                           color: Colors.placeholder
                                       }}>{p.content}</Text>
                                   </View>

                               </View>
                           )
                       }} didScrollToPage={(index) => {
                    setSwipeIndex(index);
                }} didScrollToLast={() => {
                    Settings.setOnboardingWasShown(true);
                    navigation.navigate('Login')
                }}/>

                <View style={{justifyContent: 'flex-end', ...Sizes.mb16}}>
                    <View style={[{flexDirection: 'row', justifyContent: 'space-between'}, Common.horizontalPadding]}>
                        <PagerBullets
                            swipeIndex={swipeIndex}
                            pages={PAGES}/>

                        <RoundButton
                            title={t('common.next')}
                            onPress={() => {
                                setSwipeIndex(swipeIndex + 1)
                            }}/>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Onboarding;
