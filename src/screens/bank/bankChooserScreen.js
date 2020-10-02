import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    SafeAreaView,
    Image, TouchableOpacity
} from 'react-native';
import {Text, ProductRowBigView, Button} from 'components';
import {Dimens, Sizes, FontCfg, Colors} from 'styles';
import t from 'strings';
import useBanks from '../../hooks/bankHook'
import useProducts from '../../hooks/myProductsHook'
import {FlatList, RectButton} from 'react-native-gesture-handler';
import Header from "../../components/commonHeader";
import UserCardSwipeableRow from "components/swipeableRows/UserCardSwipeableRow";
import {usePayments} from 'hooks';
import * as WebBrowser from 'expo-web-browser';

function bankScreenChooser({navigation}) {

    const hook = useBanks();
    const paymentsHook = usePayments();
    const productsHook = useProducts();
    const [addsNewCard, setAddsNewCard] = useState(navigation.state.params.addsNewCard ?? false)
    const [itemSelected, setItemSelected] = useState(null)
    let datasource = {}

    const Row = ({item, callback}) => (
        <TouchableOpacity onPress={() => {
            setItemSelected(item);
            callback(item)
        }}>
            <View key={item.toString()}>
                <RectButton style={styles.rectButton} onPress={() => {
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={
                                {
                                    width: 16,
                                    height: 16,
                                    justifyContent: 'enter',
                                    alignItems: 'center',
                                    marginRight: 8
                                }}>
                                <Image
                                    source={item === itemSelected ? require('../../../assets/ic_selected_item.png') : require('../../../assets/ic_unselected_item.png')}
                                    style={
                                        {
                                            width: 16,
                                            height: 16,
                                            position: 'absolute'
                                        }
                                    }/>
                            </View>
                            <View style={
                                {
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white'
                                }}>
                                <Image
                                    source={{uri: `${item.logoURL ? item.logoURL : item.imageURL}`}} //TODO: fix this
                                    style={
                                        {
                                            resizeMode: 'contain',
                                            width: 22,
                                            height: 22,
                                            borderRadius: 11
                                        }
                                    }/>
                            </View>
                        </View>

                        <Text
                            style={styles.fromText}>{addsNewCard ? item.name : (item.productName ?? item.bankName)}</Text>
                    </View>
                    <Text style={styles.lastFour}>
                        {item.cardNumber ?? item.balance}
                    </Text>
                </RectButton>
                <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>
            </View>
        </TouchableOpacity>
    );

    const cardRow = ({key}) => {
        return (
            <View key={key} style={{marginHorizontal: 24}}>
                {
                    addsNewCard
                        ? hook.banks.map((obj, i) => (
                            <UserCardSwipeableRow key={'UserSavedCardSwipeableRow_' + i}
                                                  children={<Row item={obj} callback={(item) => {
                                                  }}/>}/>
                        ))

                        : productsHook.userProducts.map((obj, i) => (
                            <UserCardSwipeableRow key={'UserSavedCardSwipeableRow_' + i}
                                                  children={<Row item={obj} callback={(item) => {
                                                  }}/>}/>
                        ))
                }
            </View>
        );
    };

    const productRow = ({key}) => {
        return addsNewCard ?
            null
            : (
                <View key={key} style={{marginHorizontal: 24}}>
                    {
                        productsHook.userCards.map((obj, i) => (
                            <UserCardSwipeableRow key={'UserCardSwipeableRow_' + i}
                                                  children={<Row item={obj} callback={(item) => {
                                                  }}/>}/>
                        ))
                    }
                </View>
            );
    };

    const PayWithNewCard = ({keyParam, callback}) => {
        const key = keyParam;
        return key !== 'payButton' && addsNewCard ? null : (
            <TouchableOpacity onPress={() => {
                callback()
            }}>
                <View key={key} style={{
                    marginHorizontal: 24,
                    height: 54,
                    borderRadius: 10,
                    backgroundColor: key === 'payButton' ? Colors.primary : '#F1F1F1',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {key !== 'payButton' &&
                        <Image source={require('../../../assets/icAddNewCard.png')} style={{width: 16, height: 16}}/>}
                        <Text style={[{...Sizes.ml10}, {color: key === 'payButton' ? 'white' : '#424242'}]}>
                            {key !== 'payButton' ? t('authorized.bankPayWithNewCards') : t('authorized.paymentResultScreen')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const TitleView = ({keyParam}) => {
        return addsNewCard ? null : <View key={keyParam} style={{marginHorizontal: 24}}>
            <Text>{t('authorized.selectedPaymentType')}</Text>
        </View>
    };

    const viewForKey = (key) => {
        return datasource[key]
    };

    const buildDatasource = () => {
        datasource['sep0'] = (<View key={'sep0'} style={{height: 8}}/>)
        datasource['userCards'] = cardRow('userCards')
        datasource['sep1'] = (<View key={'sep1'} style={{height: 32}}/>)
        datasource['sep2'] = <TitleView keyParam={'sep2'}/>
        datasource['sep3'] = addsNewCard ? null : (<View key={'sep3'} style={{height: 16}}/>)
        datasource['userProducts'] = productRow('userProducts')

        datasource['sep4'] = addsNewCard ? null : (
            <View key={'sep4'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)

        datasource['payWithNewCard'] = <PayWithNewCard keyParam={'payWithNewCard'} callback={onAddNewCard}/>

        datasource['sep5'] = addsNewCard ? null : (
            <View key={'sep5'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)

        datasource['payButton'] = itemSelected ? <PayWithNewCard keyParam={'payButton'} callback={onPay}/> : null

        datasource['sep6'] = (<View key={'sep6'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
    };

    const onPay = () => {
        if (itemSelected && itemSelected.fundsServiceProviderCode) {
            console.log(navigation.state.params.addsNewCard)
            if (navigation.state.params.addsNewCard) {
                hook.registerRecurringTransaction(itemSelected.id, itemSelected.fundsServiceProviderCode, (data)=> {
                    payByUrl(data.redirectUrl).then((resp)=> {
                        navigation.pop()
                    });
                });
            }
            return
        }

        let params = navigation.state.params;
        if (params && params.amount && params.abonentCode) {
            let resultObj = {
                status: false,
                merchant: params.merchant,
                amount: params.amount,
                imageUrl: params.imageUrl,
            };

            resultObj.debtResponse = params.debtResponse;
            resultObj.merchantParams = params.merchantParams;
            resultObj.abonentCode = params.abonentCode;

            let fundsSOCode = "UniWallet"
            if (addsNewCard) {//Also need to have a check for already attached cards
                fundsSOCode = itemSelected.fundsServiceProviderCode
            }
            paymentsHook.pay(params.amount, params.abonentCode, params.merchantCode, params.merchantServiceCode, params.debtCode, itemSelected.id, itemSelected.accountId, fundsSOCode, (data) => {
                if (data) {
                    if (data.status.toLowerCase() === 'success' || data.status.toLowerCase() === 'proccessing') {
                        resultObj.status = true;
                        if (!data.isecommerce) {
                            navigation.navigate('PaymentSingleResultScreen', resultObj)
                        } else {
                            payByUrl(data.redirectUrl).then((resp)=> {
                                resultObj.socketId = data.op_id
                                navigation.navigate('PaymentSingleResultScreen', resultObj)
                            })
                        }
                    }
                } else {
                    navigation.navigate('PaymentSingleResultScreen', resultObj)
                }
            })
        }
    };

    const payByUrl = async (url) => {
        //console.log("opening browser for url ", url)
        return await WebBrowser.openBrowserAsync(url);
    };

    const onAddNewCard = () => {
        setItemSelected(null)
        setAddsNewCard(true)
    };

    buildDatasource();

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>
            <Header
                title={t('authorized.selectedPaymentType')}
                rightSideIcon={require("../../../assets/transparent.png")}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
            />
            <FlatList
                data={Object.keys(datasource)}
                keyExtractor={item => item.toString()}
                renderItem={object => viewForKey(object.item)}
                contentContainerStyle={{flex: 0, flexGrow: 1}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rectButton: {
        flex: 1,
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    separator: {
        backgroundColor: 'transparent',
        height: 16,
    },
    fromText: {
        ...FontCfg.book,
        ...Sizes.fs14,
        backgroundColor: 'transparent',
        marginLeft: 16
    },
    lastFour: {
        ...FontCfg.bold,
        ...Sizes.fs14
    },
});

export default bankScreenChooser;
