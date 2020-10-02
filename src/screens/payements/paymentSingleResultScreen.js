import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    SafeAreaView,
    Image
} from 'react-native';
import {Text} from 'components';
import {Dimens, Sizes, FontCfg, Colors} from 'styles';
import t from 'strings';
import useBanks from '../../hooks/bankHook'
import {FlatList, RectButton} from 'react-native-gesture-handler';
import Header from "../../components/commonHeader";
import String from '../../utils/string'

function paymentSingleResultScreen({navigation}) {

    let datasource = {}
    let socket = new WebSocket('wss://api.unicard.ge/WebSocket/WebSocket.ashx?id=' + navigation.state.params.socketId);

    const [status, setStatus] = useState(navigation.state.params.status)

    if (navigation.state.params.socketId && navigation.state.params.socketId !== '') {
        socket.onopen = () => {
            //console.log('socket has been opened...')
        };
        socket.onmessage = ({data}) => {
            if (data && data.length !== '') {
                if (data === '0') {
                    navigation.state.params.socketId = null;
                    setStatus(false)
                } else if (data === '1') {
                    navigation.state.params.socketId = null;
                    setStatus(true)
                }
            }
        };
    }

    //console.log('paymentSingleResultScreen: ', navigation.state.params)

    const closeButton = (key) => {
        return (
            <View key={key} style={{
                marginHorizontal: 24,
                height: 54,
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[{...Sizes.ml10}, {
                        color: '#424242', fontWeight: "500",
                        textTransform: 'uppercase',
                        flexWrap: "wrap"
                    }]}>
                        {t('common.close')}
                    </Text>
                </View>
            </View>
        );
    };

    const statusView = (key, isInProgress) => {
        const image = isInProgress
            ? require('../../../assets/ic_progress.png')
            : (status ? require('../../../assets/ic_ok.png') : require('../../../assets/ic_err.png'))
        return <View style={{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
            <View key={key} style={
                {
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    alignItems: 'center',
                    backgroundColor: status ? Colors.primary : 'red'
                }
            }>
                <Image source={image} style={{width: 24, height: 24}}/>
            </View>
        </View>
    };

    const statusTitleView = (key, title) => {
        return <View key={key} style={
            {
                justifyContent: 'center',
                marginHorizontal: 32,
                marginVertical: 24
            }
        }>
            <Text style={{
                fontSize: 16,
                color: "#130D1E",
                fontWeight: "500",
                textTransform: 'uppercase',
                flexWrap: "wrap",
                alignSelf: "center"
            }}>{title}</Text>
        </View>
    };

    const dataView = (key, obj) => {
        return <View key={key} style={
            {
                width: '100%',
                height: 48,
                marginVertical: 2
            }
        }>

            <View style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginHorizontal: 24
            }}>

                <Text style={{
                    fontSize: 14,
                    color: "#6B6B6B",
                    fontWeight: "300",
                    flexWrap: "wrap"
                }}>{obj.title}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: 14,
                        color: obj.customColor ? obj.customColor : '#130D1E',
                        fontWeight: "500",
                        flexWrap: "wrap"
                    }}>{obj.title2}</Text>
                    {obj.logoURL &&
                    <Image
                        source={{uri: `${obj.logoURL}`}}
                        style={
                            {
                                marginLeft: 4,
                                resizeMode: 'cover',
                                width: 32,
                                height: 32,
                                borderRadius: 16
                            }
                        }/>}
                </View>

            </View>

        </View>
    };

    const share = (key) => {

        const shareItem = (title, image) => {
            return <View style={{alignItems: 'center'}}>
                <View style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    borderColor: '#f1f1f1',
                    borderWidth: 1
                }}>
                    <Image
                        source={image}
                        style={
                            {
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }
                        }/>
                </View>
                <Text style={{
                    marginTop: 8,
                    textAlign: 'center',
                    fontSize: 12,
                    color: "#6B6B6B",
                    fontWeight: "300",
                    flexWrap: "wrap"
                }}>{title}</Text>

            </View>
        }


        return <View key={key} style={
            {
                width: '100%'
            }
        }>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 48}}>
                {shareItem('გაზიარება', require('../../../assets/ic_payment_result_share.png'))}
                {shareItem('შაბლონად\nშენახვა', require('../../../assets/ic_payment_result_save_as_templ.png'))}
                {shareItem('გამეორება', require('../../../assets/ic_payment_result_restart.png'))}
            </View>

        </View>
    };

    const viewForKey = (key) => {
        return datasource[key]
    };

    const buildDatasource = () => {

        const params = navigation.state.params;

        datasource['sep0'] = (<View key={'sep0'} style={{height: 48}}/>)

        if (params.socketId) {
            datasource['statusView'] = statusView('statusView', true);
            datasource['statusTitleView'] = statusTitleView('statusTitleView', 'მონაცემები მუშავდება...');

        } else {
            datasource['statusView'] = statusView('statusView');
            datasource['statusTitleView'] = statusTitleView('statusTitleView', status ? 'ოპერაცია შესრულდა წარმატებით' : 'გადახდა ვერ განხორციელდა');
            ////
        }

        datasource['separator_row_0'] = (
            <View key={'separator_row_0'} style={{height: 1, backgroundColor: '#F1F1F1', marginHorizontal: 24}}/>)
        datasource['sep1'] = (<View key={'sep1'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['item1'] = dataView('item1', {
            title: 'მერჩანტი',
            title2: params.merchant,
            logoURL: params.imageUrl
        })
        datasource['item2'] = dataView('item2', {title: 'მომხმარებელი', title2: params.abonentCode})

        for (let i = 0; i < params.debtResponse.length; i++) {
            const deptItem = params.debtResponse[i];
            if (deptItem.fieldCode.toLowerCase() !== 'debt' && deptItem.value) {
                datasource[String.randomStr()] = dataView(String.randomStr(), {title: deptItem.fieldName, title2: deptItem.value})
            }
        }

        datasource['item4'] = dataView('item4', {title: 'დავალიანება', title2: params.amount + '₾', customColor: 'red'})
        datasource['separator_row_1'] = (
            <View key={'separator_row_1'} style={{height: 1, backgroundColor: '#F1F1F1', marginHorizontal: 24}}/>)
        datasource['sep2'] = (<View key={'sep2'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['share'] = share('share')
        datasource['sep3'] = (<View key={'sep3'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['closeButton'] = closeButton('closeButton')
        datasource['sep5'] = (<View key={'sep5'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
    };

    buildDatasource();

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <Header
                title={t('authorized.paymentResultScreen')}
                rightSideIcon={require("../../../assets/transparent.png")}
                onLeftSidePress={() => {

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

export default paymentSingleResultScreen;
