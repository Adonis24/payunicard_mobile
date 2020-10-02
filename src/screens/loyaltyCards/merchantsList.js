import React, {useState} from 'react';
import {
    View,
    Platform,
    SafeAreaView,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import {Text} from 'components';
import t from 'strings';
import Header from "../../components/commonHeader";
import {useMerchantsList} from 'hooks';
import {Scanner, ScannerType} from '../scanner';
import SearchInput from "../../components/searchInput";

const MerchantRow = ({item, click}) => {
    return <TouchableOpacity onPress={() => {
        click(item)
    }}>
        <View style={{
            width: '100%',
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: `${item.imageUrl}`}}
                       resizeMode='cover'
                       style={
                           {
                               width: 40,
                               height: 30,
                               borderRadius: 5,
                               backgroundColor: '#f2f2f2'
                           }
                       }/>
                <Text style={{marginLeft: 16, color: '#6B6B6B', fontSize: 14}}>{item.name}</Text>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                marginLeft: 52,
                width: '100%',
                height: 1,
                backgroundColor: '#F1F1F1'
            }}/>
        </View>
    </TouchableOpacity>

}

function merchantsList({navigation}) {

    const hook = useMerchantsList();
    const [searchLabelIsVisible, setSearchLabelIsVisible] = useState(true);
    const [searchExpression, setSearchExpression] = useState('');
    const [barCodeVisible, setBarCodeVisible] = useState(false);

    const configureData = () => {

        let result = []
        const list = hook.merchants;

        if (list) {
            for (let i = 0; i < list.length; i++) {
                const obj = list[i];
                if (searchExpression.length > 0) {
                    if (obj.name.toLowerCase().indexOf(searchExpression.toLowerCase()) > -1) {
                        result.push(obj);
                    }
                } else {
                    result.push(obj);
                }
            }
        }

        return result;
    };

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>
            <Header
                closeButtonHasBg={false}
                title={t('authorized.loyaltyListOfMerchants')}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                rightSideIcon={require("../../../assets/transparent.png")}
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

            <ScrollView keyboardDismissMode='on-drag' style={{flex: 1}} >
                <FlatList data={configureData()}
                          contentContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                          innerContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                          keyExtractor={item => item.id.toString()}
                          renderItem={object => <MerchantRow item={object.item} click={(item) => {
                              hook.setSelectedItem(item)
                              setBarCodeVisible(true)
                          }}/>}
                />
            </ScrollView>

            <Modal visible={barCodeVisible} animationType='slide'>
                <Scanner close={(data) => {
                    setBarCodeVisible(false)

                    setTimeout(function () {
                        navigation.navigate('AddLoyaltyCard', {merchant: hook.selectedItem, data: data})
                    }, 300);

                }} type={ScannerType.BAR_CODE} onRequestClose={() => {
                    setBarCodeVisible(false);
                }} manualHandler={() => {
                    setBarCodeVisible(false)

                    setTimeout(function () {
                        navigation.navigate('AddLoyaltyCard', {merchant: hook.selectedItem})
                    }, 300);

                }}/>
            </Modal>

        </SafeAreaView>
    );
}

export default merchantsList;