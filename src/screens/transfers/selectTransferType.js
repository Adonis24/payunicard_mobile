import React, {useState, useEffect} from 'react';
import {
    View,
    Platform,
    SafeAreaView,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    StyleSheet
} from 'react-native';
import {Text} from 'components';
import t from 'strings';
import Header from "../../components/commonHeader";
import {useTransfers} from 'hooks';
import SearchInput from "../../components/searchInput";

const styles = StyleSheet.create({
    image_view: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f2f2f2',
        resizeMode: 'cover'
    }
});

const TransferTypeRow = ({item, click}) => {
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
                <Image source={item.image}
                       resizeMode='contain'
                       style={styles.image_view}/>
                <Text style={{marginLeft: 16, color: '#6B6B6B', fontSize: 14}}>{t(item.name)}</Text>
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

function selectTransferType({navigation}) {

    const hook = useTransfers();
    const [searchExpression, setSearchExpression] = useState('');
    const [searchLabelIsVisible, setSearchLabelIsVisible] = useState(true);

    useEffect(() => {
        hook.fetchTransferTypes()
    }, [])

    const configureData = () => {

        let result = []
        const list = hook.items;

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
                title={t('transfers.transfer')}
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
                          renderItem={object => <TransferTypeRow item={object.item} click={(item)=> {}}/>}
                />
            </ScrollView>

        </SafeAreaView>
    );
}

export default selectTransferType;
