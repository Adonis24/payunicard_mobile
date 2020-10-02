import React from 'react';
import {
    View,
    StyleSheet,
    Platform,
    SafeAreaView,
    Image, TouchableOpacity, RefreshControl
} from 'react-native';
import {Text, ProductRowBigView} from 'components';
import {Dimens, Sizes, FontCfg, Colors} from 'styles';
import t from 'strings';
import useProducts from '../../hooks/myProductsHook'
import {FlatList, RectButton} from 'react-native-gesture-handler';
import UserCardSwipeableRow from '../../components/swipeableRows/UserCardSwipeableRow';
import Header from "../../components/commonHeader";

function myProducts({navigation}) {

    const hook = useProducts();
    const [refreshing, setRefreshing] = React.useState(false);
    let datasource = {}

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        hook.fetchAll();
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    const Row = ({item}) => (
        <View key={item.toString()}>
            <RectButton style={styles.rectButton} onPress={() => {
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>

                    <View style={
                        {
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: `${item.color}`,
                        }}>
                        <Image source={{uri: `${item.imageURL}`}}
                               style={
                                   {
                                       resizeMode: 'cover',
                                       width: '100%',
                                       height: '100%',
                                       borderRadius: 16
                                   }
                               }/>
                    </View>

                    <Text style={styles.fromText}>{item.bankName}</Text>
                </View>
                <Text style={styles.lastFour}>
                    {item.cardNumber}
                </Text>
            </RectButton>
            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>
        </View>
    );

    const productRow = ({key}) => {
        return (
            <View key={key} style={{marginHorizontal: 24}}>
                {
                    hook.userProducts.map((obj, i) => (
                        <View key={'ProductRowBigView' + i}>
                            <ProductRowBigView
                                productName={obj.productName}
                                amount={obj.balance}
                                iconUrl={obj.imageURL}
                                backgroundColor={obj.color}
                                currency={'₾'}
                                onClick={() => {
                                    navigation.navigate("productDetail", obj)
                                }}/>
                            <View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>
                        </View>
                    ))
                }
            </View>
        );
    };

    const cardRow = ({key}) => {
        return (
            <View key={key} style={{marginHorizontal: 24}}>
                {
                    hook.userCards.map((obj, i) => (
                        <UserCardSwipeableRow key={'UserCardSwipeableRow_' + i} children={<Row item={obj}/>}/>
                    ))
                }
            </View>
        );
    };

    const addNewCard = (key) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('BankScreenChooser', { addsNewCard: true })
            }}>
                <View key={key} style={{
                    marginHorizontal: 24,
                    height: 54,
                    borderRadius: 10,
                    backgroundColor: '#F1F1F1',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../../assets/icAddNewCard.png')} style={{width: 16, height: 16}}/>
                        <Text style={{...Sizes.ml10}}>{t('authorized.myProductsAddNewCards')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const titleView = (key) => {
        return <View key={key} style={{marginHorizontal: 24}}>
            <Text>{t('authorized.myProductsAttachedCards')}</Text>
        </View>
    }

    const viewForKey = (key) => {
        return datasource[key]
    }

    const buildDatasource = () => {
        datasource['userProducts'] = productRow('userProducts')
        datasource['sep1'] = (<View key={'sep1'} style={{height: 32}}/>)
        datasource['sep2'] = titleView('sep2')
        datasource['sep3'] = (<View key={'sep3'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['userCards'] = cardRow('userCards')
        datasource['sep4'] = (<View key={'sep4'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['addNewCard'] = addNewCard('addNewCard')
        datasource['sep5'] = (<View key={'sep5'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
    }

    buildDatasource()

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <Header
                title={t('myProducts.pageTitle')}
                rightSideIcon={require("../../../assets/transparent.png")}
                onLeftSidePress={() => {navigation.pop() }}
            />

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
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
        marginLeft: 8
    },
    lastFour: {
        ...FontCfg.bold,
        ...Sizes.fs14
    },
});

export default myProducts;
