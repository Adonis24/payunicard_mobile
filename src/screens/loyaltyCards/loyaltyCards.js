import React, {useState, useEffect, useRef, Component} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    Vibration,
    Animated,
    Easing, ScrollView,
} from 'react-native';

import {Text, TextInput} from 'components';
import t from 'strings';
import Header from "../../components/commonHeader";
import SearchInput from "../../components/searchInput";
import loyaltyCardHook from "../../hooks/loyaltyCardHook";
import SortableList from 'react-native-sortable-list';
import {Defaults} from "utils";

function loyaltyCards({navigation}) {

    const hook = loyaltyCardHook();
    const [searchLabelIsVisible, setSearchLabelIsVisible] = useState(true);
    const [searchExpression, setSearchExpression] = useState('');
    const favTitle = t('authorized.loyaltyCardsFavCards');
    const othersTitle = t('authorized.loyaltyCardsOtherCards');

    const beginDetailScreenModalHandler = (card) => {
        setTimeout(function () {
            Defaults.loyaltyCardObject = card;
            Defaults.loyaltyCardDetailScreen.open()
        }, 500);
    };

    const configureData = () => {

        const list = hook.loyaltyCards;

        let all = {};

        let i = 0;

        const append = (item) => {
            all[i] = item;
            i += 1;
        };

        const favorites = list.filter(function (item) {
            return item.isFavorite === true;
        });
        
        if (favorites.length > 0) {

        	append({title: favTitle});

            for (let i = 0; i < favorites.length; i++) {
                const obj = favorites[i];
                if (searchExpression.length > 0) {
                    if (obj.cardName.toLowerCase().indexOf(searchExpression.toLowerCase()) > -1) {
                        append(obj)
                    }
                } else {
                    append(obj)
                }
            }
        }

        const others = list.filter(function (item) {
            return item.isFavorite === false;
        });

        if (others.length > 0) {

            append({title: othersTitle})

            for (let i = 0; i < others.length; i++) {
                const obj = others[i];
                if (searchExpression.length > 0) {
                    if (obj.cardName.toLowerCase().indexOf(searchExpression.toLowerCase()) > -1) {
                        append(obj)
                    }
                } else {
                    append(obj)
                }
            }
        }

        return all;
    };

    const renderRow = ({data, active}) => {
        return <Row data={data} active={data.loyaltyCardId != null}/>
    }

    return (

        <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>
            <Header
                closeButtonHasBg={false}
                onRightSidePress={() => {
                    navigation.navigate('MerchantsList')
                }}
                rightSideIcon={require("../../../assets/plusButton.png")}
                title={t('authorized.loyaltyCards')}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
            />
            <View style={{width: '100%', height: 40, paddingHorizontal: 24, marginTop: 24}}>
                <SearchInput
                    searchLabelIsVisible={searchLabelIsVisible}
                    setSearchExpression={(text)=> {
                        setSearchExpression(text)
                    }}
                    setSearchLabelIsVisible={(value)=> {
                        setSearchLabelIsVisible(value)
                    }}/>
            </View>

            <View style={{height: 16}}/>

            <View style={{background: 'red', flex: 1}}>
                <SortableList
                    onPressRow={(key)=> {
                        const data = configureData()
                        beginDetailScreenModalHandler(data[key])
                    }}
                    onActivateRow={()=> {
                        Vibration.vibrate()
                    }}
                    sortingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    contentContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                    innerContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                    data={configureData()}
                    horizontal={false}
                    renderRow={renderRow}/>
            </View>
        </View>
    );
}

class Row extends Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            ...Platform.select({
                ios: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1],
                        }),
                    }],
                    shadowRadius: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 10],
                    }),
                },

                android: {
                    transform: [{
                        scale: this._active.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.07],
                        }),
                    }],
                    elevation: this._active.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2, 6],
                    }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const {data} = this.props;

        return (
            <Animated.View pointerEvents="none" style={[
                styles.row,
                this._style,
            ]}>
                {data.loyaltyCardId != null ?
                    (
                        <View>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={{uri: `${data.imageURL}`}}
                                           resizeMode='cover'
                                           style={
                                               {
                                                   width: 40,
                                                   height: 30,
                                                   borderRadius: 5,
                                                   backgroundColor: '#f2f2f2'
                                               }
                                           }/>
                                    <Text
                                        style={{marginLeft: 16, color: '#6B6B6B', fontSize: 14}}>{data.cardName}</Text>
                                </View>
                                <Image source={require('../../../assets/icDragDrop.png')} style={{
                                    width: 12,
                                    height: 12,
                                    marginRight: 12
                                }}/>
                                <View style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    marginLeft: 52,
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: '#F1F1F1'
                                }}/>
                            </View>
                        </View>
                    )
                    :
                    <TouchableOpacity style={{marginVertical: 16}}>
                        <Text style={{color: '#6B6B6B'}}>{data.title}</Text>
                    </TouchableOpacity>
                }

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },

    list: {
        flexDirection: 'column',
        flex: 1,
    },

    row: {
        height: 55,
        width: '100%',
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },

    text: {
        fontSize: 24,
        color: '#222222',
    },
});

export default loyaltyCards;

