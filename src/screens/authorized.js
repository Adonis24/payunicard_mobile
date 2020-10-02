import {
    BalanceView,
    TransactionRowView,
    ProductRowView,
    Cards,
    CardSliderItem,
} from 'components';

import DashboardCellContainer from '../components/dashboardCellContainer'
import DataNotFound from '../components/dataNotFound'
import React, {useState, useEffect} from 'react';
import {View, FlatList, Platform, StyleSheet, Dimensions, Modal, RefreshControl} from 'react-native';
import t from 'strings';
import {Dimens, Sizes, FontCfg, Colors} from 'styles';
import {useDashboard, useNotification} from 'hooks';
import {Scanner, ScannerType} from './scanner';
import {timestamp2Date} from '../utils/dateUtils';
import {Defaults} from "../utils";
import {showSuccessWithMessage} from 'utils';
import String from '../utils/string'
import UserHeaderRow from "components/userHeaderRow";
import VerifyUserRow from "../components/verifyUserRow";

const {height} = Dimensions.get('window');
const safeAreaTop = height > 750 ? 64 : 44;

function Authorized({navigation}) {

    const [cameraVisible, setCameraVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const dashboard = useDashboard();
    const notification = useNotification();

    const dataNotFoundMessageTitle = t("common.transaction_not_found");
    const dataNotFoundMessageText = t("common.transaction_not_found_bottom");
    const productsNotFoundMessageTitle = t("common.products_not_found");
    const productsNotFoundMessageText = t("common.products_not_found_bottom");

    let datasource = {}

    Defaults.navigation = navigation;

    useEffect(() => {
        dashboard.fetchAll()
    }, [])

    const beginDetailScreenModalHandler = (card) => {
        setTimeout(function () {
            Defaults.loyaltyCardObject = card;
            Defaults.loyaltyCardDetailScreen.open()
        }, 500);
    };

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        dashboard.fetchAll()
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    const userHeader = () => {
        return <UserHeaderRow
            onUserClick={() => {
                navigation.navigate("UserMenuScreen")
            }}
            onNotificationsClick={() => {
                navigation.navigate("NotificationScreen")
            }}
            onSetCameraVisible={(value) => {
                setCameraVisible(value)
            }}
            notificationCount={notification.notificationCount}
            imageUrl={dashboard.userImageUrl}
            userTitle={t('authorized.hello') + dashboard.userHeaderTitle}
        />
    }

    const userVerify = () => {
        return (<VerifyUserRow
            subTitle={t("verify.begin_title")}
            onPress={() => {
                Defaults.verify.open()
                Defaults.verify.onDismiss = () => {
                    console.log("userIsVerified")
                    Defaults.verify.onDismiss = null;
                    dashboard.setUserIsVerified(true)
                    dashboard.fetchAll()
                }
            }}
            userIsVerified={dashboard.userIsVerified}/>)
    };

    const balanceRow = () => {
        return (<View style={{flexDirection: 'row', justifyContent: 'space-between', ...Sizes.mt26, ...Sizes.ml24}}>
            <BalanceView
                topTitle={t('authorized.balance')}
                showsCurrency={true}
                bottomTitle={dashboard.totalBalance ? dashboard.totalBalance.balance : "0.00"}
                onClick={() => {

                }}/>


            <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                <BalanceView
                    topTitle={t('authorized.unipoints')}
                    bottomTitle={dashboard.totalBalance ? dashboard.totalBalance.points : "0.00"}
                    // bottomTitleFontSize={{...Sizes.fs24}}
                    showsIcon={dashboard.totalBalance ? dashboard.totalBalance.isStarred : false}
                    onClick={() => {

                    }}
                    iconUrl={require("../../assets/iconStar.png")}/>
            </View>
        </View>)
    }

    const loyaltyCards = () => {
        return (
            <DashboardCellContainer
                view={<View style={{height: 126}}/>}
                leftTitle={t('authorized.loyaltyCards')}
                rightTitle={t('common.seeAll')}
                rightClicked={() => {
                    navigation.navigate('LoyaltyCards');
                }}/>
        )
    }

    const products = () => {
        return (
            <DashboardCellContainer
                view={
                    (!dashboard.userProducts || dashboard.userProducts.length == 0)
                        ? <DataNotFound title={productsNotFoundMessageTitle} text={productsNotFoundMessageText}/>
                        :
                        <View>
                            {dashboard.userProducts.map((obj, i) => (
                                <ProductRowView
                                    key={'ProductRowBigView' + i}
                                    productName={obj.productName}
                                    amount={obj.balance}
                                    iconUrl={obj.imageURL}
                                    backgroundColor={obj.color}
                                    currency={'₾'}
                                    onClick={() => {
                                        navigation.navigate("productDetail", obj)
                                    }}/>
                            ))}
                        </View>
                }
                leftTitle={t('authorized.myProducts')}
                rightTitle={t('common.seeAll')}
                rightClicked={() => {
                    navigation.navigate('MyProducts');
                }}/>
        )
    }

    const transactionRow = (item) => {
        if (item && item.empty) {
            return (
                <DataNotFound
                    title={dataNotFoundMessageTitle}
                    text={dataNotFoundMessageText}
                />
            )
        }
        return (
            <TransactionRowView
                date={timestamp2Date(item.transactionDate)}
                imageUrl={item.imageUrl}
                merchantName={item.titleTop}
                transactionType={item.titleBottom}
                amount={item.amount}
                onClick={() => {

                }}
            />
        )
    }

    const transactions = () => {
        return (
            <DashboardCellContainer
                view={
                    <FlatList style={{flex: 0}}
                              data={dashboard.statements}
                              keyExtractor={item => (String.randomStr() + item.transactionDate.toString())}
                              renderItem={({item}) => transactionRow(item)}
                              contentContainerStyle={{flex: 0}}
                    />
                }
                leftTitle={t('authorized.lastActivity')}
                rightTitle={t('common.seeAll')}
                rightClicked={() => {

                }}/>
        )
    }

    const buildDatasource = () => {
        datasource['useVerify'] = userVerify()
        datasource['balanceRow'] = balanceRow()
        datasource['sep1'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['loyaltyCards'] = (
            <View style={{backgroundColor: 'transparent'}}>
                <View style={styles.padding}>
                    {loyaltyCards()}
                </View>
                <Cards
                    style={{height: 120, position: 'absolute', bottom: 6}}
                    items={[
                        {imageURL: null, color: null, loyaltyCardId: null, cardName: null, index: 0},
                        ...dashboard.loyaltyCards,
                        {
                            imageURL: null,
                            color: "white",
                            loyaltyCardId: "addCard",
                            cardName: t("authorized.addCard"),
                            index: 1
                        },
                        {imageURL: null, color: null, loyaltyCardId: null, cardName: null, index: 2, customWidth: 8}
                    ]}
                    renderItem={(obj) => {
                        return (
                            <CardSliderItem
                                key={obj.loyaltyCardId ? obj.loyaltyCardId.toString() : `loyaltyCardId${obj.index}`}
                                imageURL={obj.imageURL}
                                color={obj.color}
                                loyaltyCardId={obj.loyaltyCardId}
                                cardName={obj.cardName}
                                index={obj.index}
                                customWidth={obj.customWidth ? obj.customWidth : 16}
                                onAddNew={() => {
                                    navigation.navigate('LoyaltyCards')
                                }}
                                onClick={() => {
                                    beginDetailScreenModalHandler(obj)
                                }}
                            />
                        )
                    }}/>
            </View>
        )
        datasource['sep2'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['products'] = (<View style={styles.padding}>{products()}</View>)
        datasource['sep3'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['transactions'] = (<View style={styles.padding}>{transactions()}</View>)
        datasource['sep4'] = (<View style={{height: 64}}/>)
    }

    const viewForKey = (key) => {
        return datasource[key]
    }

    buildDatasource()

    return (
        <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <View style={{marginTop: Platform.OS === 'android' ? 0 : safeAreaTop}}>
                {userHeader()}
            </View>

            <FlatList data={Object.keys(datasource)}
                      refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                      }
                      keyExtractor={item => item.toString()}
                      renderItem={object => viewForKey(object.item)}
                      contentContainerStyle={{
                          flex: 0,
                          flexGrow: 1,
                          backgroundColor: "#FAFAFA"
                      }}
            />

            <Modal visible={cameraVisible} animationType='slide' onRequestClose={() => {
                setCameraVisible(false);
            }}>
                <Scanner close={(data) => {
                    showSuccessWithMessage(data)
                    setCameraVisible(false);
                }} type={ScannerType.QR} onRequestClose={() => {
                    setCameraVisible(false);
                }}/>
            </Modal>

        </View>
    )
}

export default Authorized;

const styles = StyleSheet.create({
    padding: {
        ...Sizes.pl16,
        ...Sizes.pr16,
    },
    contentContainer: {}
});
