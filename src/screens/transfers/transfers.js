import {
    TransactionRowView, Cards, Text
} from 'components';

import DashboardCellContainer from '../../components/dashboardCellContainer'
import UserHeaderRow from '../../components/userHeaderRow'
import DataNotFound from '../../components/dataNotFound'
import React, {useState, useEffect} from 'react';
import {View, FlatList, Platform, StyleSheet, Dimensions, Modal, RefreshControl, Image} from 'react-native';
import t from 'strings';
import {Dimens, Sizes, Colors} from 'styles';
import {useDashboard, useTransfers} from 'hooks';
import {timestamp2Date} from '../../utils/dateUtils';
import {Defaults} from "../../utils";
import String from '../../utils/string'
import SearchInput from "../../components/searchInput";
import VerifyUserRow from "../../components/verifyUserRow";
import PaymentCategoryRow from "../../components/paymentCategoryRow";
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');
const safeAreaTop = height > 750 ? 64 : 44;

function Transfers({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const dashboard = useDashboard();
    const hook = useTransfers();

    const templates_not_found = t("common.templates_not_found");
    const templates_not_found_bottom = t("common.templates_not_found_bottom");
    const categories_not_found = t("common.categories_not_found");
    const categories_not_found_bottom = t("common.categories_not_found_bottom");

    const [searchLabelIsVisible, setSearchLabelIsVisible] = useState(true);
    const [searchExpression, setSearchExpression] = useState('');
    const dataNotFoundMessageTitle = t("common.transaction_not_found");
    const dataNotFoundMessageText = t("common.transaction_not_found_bottom");

    let datasource = {}

    Defaults.navigation = navigation;

    useEffect(() => {
        hook.fetchTransferTypes()
        hook.fetchTemplates()
        dashboard.loadUserInfo()
        dashboard.fetchUserStatement()
    }, [])

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        //dashboard.fetchAll()
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    const userHeader = () => {
        return <UserHeaderRow
            onUserClick={() => {
                navigation.navigate("UserMenuScreen")
            }}
            onSetCameraVisible={(value) => {}}
            notificationsIsVisible={false}
            imageUrl={dashboard.userImageUrl}
            userTitle={t('transfers.page_title')}
        />
    };

    const qrTransfer = () => {
        return (
            <DashboardCellContainer
                view={
                    <View style={{ flexDirection: 'row', width: '100%',  height: 64 }}>
                        <View style={{ paddingLeft: 16, width: '50%', height: '100%', flexDirection: 'row', alignContent: 'space-between', justifyContent:'center'}}>
                            <Image source={require("../../../assets/transfers/transfer-qr-transfer.png")}
                                    style={{ width: 48, height: 48 }}/>
                            <View style={{ paddingLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{margin: 4}}>{'QR გადარიცხვა'}</Text>
                            </View>
                        </View>

                        <View style={{ paddingLeft: 16, width: '50%', height: '100%', flexDirection: 'row', alignContent: 'space-between', justifyContent:'center'}}>
                            <Image source={require("../../../assets/transfers/transfer-qr-receive.png")}
                                    style={{ width: 48, height: 48 }}/>
                            <View style={{ paddingLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{'QR მიღება'}</Text>
                            </View>
                        </View>
                    </View>
                }
                leftTitle={t('transfers.qr_transfer')}
                />
        )
    }

    const categories = () => {
        return (
            <DashboardCellContainer
                view={
                    (!hook.items || hook.items.length == 0)
                        ? <DataNotFound title={categories_not_found} text={categories_not_found_bottom}/>
                        :
                        <Cards
                            style={{height: 120}}
                            items={[...hook.items]}
                            renderItem={(obj) => {
                                return <PaymentCategoryRow key={obj.id + '-' + String.randomStr()}
                                                           title={t(obj.name)}
                                                           image={obj.image}
                                                           isCircle={false} onClick={()=>{
                                    navigation.navigate('PaymentCategoriesList', { obj : obj});
                                }}/>
                            }}/>
                }
                bgColor={'transparent'}
                leftTitle={t('transfers.transfer')}
                rightTitle={t('common.seeAll')}
                rightClicked={() => {
                    navigation.navigate('SelectTransferType');
                }}/>
        )
    };

    const templates = () => {
        return (
            <DashboardCellContainer
                view={
                    (!hook.templates || hook.templates.length == 0)
                        ? <DataNotFound title={templates_not_found} text={templates_not_found_bottom}/>
                        :
                        <Cards
                            style={{height: 120}}
                            items={[...hook.templates]}
                            renderItem={(obj) => {
                                return <PaymentCategoryRow key={obj.id + String.randomStr()} imageUrl={obj.imageUrl} title={obj.name} isCircle={true} />
                            }}/>
                }
                bgColor={'transparent'}
                leftTitle={'Templates'}
                rightTitle={t('common.seeAll')}
                rightClicked={() => {
                    navigation.navigate('TransferTemplatesList')
                }}/>
        )
    };

    const mustPayView = () => {
        return (<VerifyUserRow
            title={'სულ გადასახდელი'}
            subTitle={'25,12$'}
            iconTitle={'8'}
            iconBackground={Colors.primary}
            displaysIcon={false}
            onPress={()=> {

            }}
            userIsVerified={false}/>)
    };

    const buildDatasource = () => {
        datasource['mustPayView'] = mustPayView()
        datasource['sep1'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['templates'] = (<View style={styles.padding}>{templates()}</View>)
        datasource['sep2'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['categories'] = (<View style={styles.padding}>{categories()}</View>)
        datasource['sep3'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['qr'] = (<View style={styles.padding}>{qrTransfer()}</View>)
        datasource['sep4'] = (<View style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['transactions'] = (<View style={styles.padding}>{transactions()}</View>)
        datasource['sep5'] = (<View style={{height: 64}}/>)
    };

    const viewForKey = (key) => {
        return datasource[key]
    };

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

    buildDatasource()

    return (
        <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <View style={{marginTop: Platform.OS === 'android' ? 0 : safeAreaTop}}>
                {userHeader()}
                <View style={{width: '100%', height: 40, paddingHorizontal: 24, marginTop: 24}}>
                    <SearchInput
                        searchLabelIsVisible={searchLabelIsVisible}
                        setSearchExpression={(text) => {
                            setSearchExpression(text)
                        }}
                        setSearchLabelIsVisible={(value) => {
                            setSearchLabelIsVisible(value)
                        }}/>
                </View>
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

        </View>
    )
}

export default Transfers;

const styles = StyleSheet.create({
    padding: {
        ...Sizes.pl16,
        ...Sizes.pr16,
    }
});
