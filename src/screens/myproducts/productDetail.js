import React from 'react';
import {
    View,
    Platform,
    SafeAreaView,
    Image,
    Share
} from 'react-native';
import {Text, Button, ProductRowBigView} from 'components';
import {Dimens, Colors} from 'styles';
import {FlatList} from 'react-native-gesture-handler';
import Header from "../../components/commonHeader";
import UserProductRowPropCell from "../../components/userProductRowPropCell";
import {Switch} from "react-native-paper";
import { useActionSheet } from '@expo/react-native-action-sheet'

function productDetail({navigation}) {

    const selectedProduct = navigation.state.params;
    const { showActionSheetWithOptions } = useActionSheet();

    function _callActionSheet() {
        showActionSheetWithOptions({
            options,
            cancelButtonIndex : 2,
            destructiveButtonIndex : 2,
        }, (index) => {alert("clicked "+index)})
    }

    const onShare = async (text) => {
        try {
            const result = await Share.share({
                message: 'ანგარიშის ნომერი: ' + text,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            //alert(error.message);
        }
    };

    let datasource = {}

    const productRow = ({key}) => {
        return (
            <View style={{marginHorizontal: 24}}>
                <ProductRowBigView
                    productName={selectedProduct.productName}
                    amount={selectedProduct.balance}
                    iconUrl={selectedProduct.imageURL}
                    backgroundColor={selectedProduct.color}
                    currency={'₾'}
                    onClick={() => {

                    }}/>
            </View>
        );
    };

    const favRow = () => {
        return (
            <View key={'favRowContainer'} style={{height: 79, alignItems: 'center', justifyContent: 'center'}}>
                <View key={'fabRow0'} style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 24
                }}>
                    <View key={'fabRow1'} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image key={'fabRowImage'} style={{width: 20, height: 20}}
                               source={require('../../../assets/icStarGray.png')}/>
                        <Text key={'fabRow4'} style={{fontSize: 12, marginLeft: 8, color: Colors.placeholder}}>ფავორიტად
                            დაყენება</Text>
                    </View>
                    <Switch onValueChange={() => {

                    }} value={false}/>
                </View>
                <View key={'fabRow2'}
                      style={{height: 1, width: '100%', backgroundColor: '#F1F1F1', position: 'absolute', bottom: 0}}/>
            </View>
        );
    };

    const viewForKey = (key) => {
        return datasource[key]
    }

    const accountDetails = () => {
        return (
            <View key={'accountDetails'} style={{marginHorizontal: 24}}>
                <UserProductRowPropCell key={'accountDetails1'} titleTop={'ანგარიშის დასახელება'} icon={require('../../../assets/icEdit.png')} titleBottom={'მთავარი ანგარიში'} onClick={() => {}} />
                <UserProductRowPropCell key={'accountDetails2'} titleTop={'ანგარიშის ნომერი'} icon={require('../../../assets/icCopy.png')} titleBottom={'UNHF00000006772638'} onClick={() => {}} />
                <UserProductRowPropCell key={'accountDetails3'} titleTop={'დასახელება ბარათზე'} icon={require('../../../assets/icCopy.png')} titleBottom={'George Mshvildadze'} onClick={() => {}} />
                <UserProductRowPropCell key={'accountDetails4'} titleTop={'ხელმისაწვდომი თანხა'} titleBottom={'242.68₾'} onClick={() => {}} />
                <UserProductRowPropCell key={'accountDetails5'} titleTop={'დაბლოკილი თანხა'} titleBottom={'11.24₾'} onClick={() => {}} />
            </View>
        )
    }

    const bottomButtons = () => {
        return (
            <View key={'bottomButtons'} style={{paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 44, width: '100%'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 16}}>
                    <Button title={'გადახდა'}
                            style={{height: 44, width: '50%', marginRight: 8}}
                            textStyle={{fontWeight: '500', fontSize: 12, color: 'white'}}
                            onPress={() => {}}/>
                    <Button title={'გადარიცხვა'}
                            style={{height: 44, width: '50%'}}
                            textStyle={{fontWeight: '500', fontSize: 12, color: Colors.text}}
                            color={true}
                            onPress={() => {}}/>
                </View>
                <Button title={'...'}
                        style={{height: 44, width: 44}}
                        textStyle={{fontWeight: '600',  fontSize: 20, color: Colors.text}}
                        color={true}
                        onPress={() => {}}/>

            </View>
        )
    }

    const buildDatasource = () => {
        datasource['sep1'] = (<View key={'se1'} style={{height: Dimens.DEFAULT_VERTICAL_SPACING}}/>)
        datasource['userProducts'] = productRow('userProducts')
        datasource['favRow'] = favRow()
        datasource['acctName'] = accountDetails()
        datasource['sep10'] = (<View key={'sep10'} style={{height: 44}}/>)
        datasource['bottomButtons'] = bottomButtons()
        datasource['sep11'] = (<View key={'sep11'} style={{height: 44}}/>)
    }

    buildDatasource()

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <Header
                closeIcon={false}
                title={selectedProduct.productName}
                rightSideIcon={require("../../../assets/ic_share.png")}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                onRightSidePress={() => {
                    onShare('UNHF00000006772638')
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

export default productDetail;
