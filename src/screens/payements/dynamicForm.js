import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Platform,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Modal,
    StyleSheet, Image
} from 'react-native';
import {Text, Button, TextInput, ListPicker} from 'components';
import {usePayments} from 'hooks';
import Header from "../../components/commonHeader";
import SimulatedModal from "../../components/SimulatedModal";
import t from 'strings';
import {Colors, Common} from 'styles';
import String from "../../utils/string";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const styles = StyleSheet.create({
    image_view: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f2f2f2'
    },
    leftLabel: {
        alignSelf: 'flex-start',
        color: Colors.placeholder,
        fontSize: 11
    }, rightLabel: {
        alignSelf: 'flex-start',
        fontSize: 12,
        textAlign: 'left',
        marginTop: 2
    }, labeContainer: {
        marginTop: 8,
        marginBottom: 8,
        flex: 1
    }
});

function dynamicForm({navigation}) {

    const hook = usePayments();
    const [title, setTitle] = useState(null)
    const [values, setValues] = useState({})

    const [payButtonTitle, setPayButtonTitle] = useState(t('payments.debt_button_title'))
    const pickerRef = useRef(null);

    const [currentPickerOptions, setCurrentPickerOptions] = useState(null)
    const [currentFieldID, setCurrentFieldID] = useState(null)
    const selectedPickerOptions = new Map()

    const payTitle = t('authorized.paymentResultScreen')

    let params = navigation.state.params;

    let payObject = {
        status: false
    };

    if (params && params.object) {
        //console.log('service: ', params.object)
        payObject.merchant = params.object.name;
        payObject.imageUrl = params.object.imageUrl;
        payObject.merchantCode = params.object.merchantCode;
        payObject.merchantServiceCode = params.object.merchantServiceCode;
    }

    useEffect(() => {
        fetch()
    }, [])

    const fetch = () => {
        let params = navigation.state.params
        if (params && params.object) {
            hook.fetchMerchantParams(params.object.merchantCode, params.object.merchantServiceCode)
            hook.fetchPaymentDetails(params.object.merchantCode, params.object.merchantServiceCode)
            setTitle(params.object.name)
        }
    };

    const setNewValue = (id, value) => {
        let newValues = values;
        newValues[id] = value;
        setValues(newValues)
    };

    const Field = ({item, index}) => {
        return <TextInput label={item.name}
        editable={item.editable ?? true}
        autoCorrect={false}
        value={values[item.id]}
        keyboardType={item.format && item.format.toLowerCase() === 'double' ? 'numeric' : 'default'}
        autoCapitalize = 'none'
        onChangeText={(text) => {
            setTimeout(()=> {
                setNewValue(item.id, text);
                item.value = values[item.id];
                //console.log('TEXT NOT UPDATING AFTER DEBT VERIFY: ', text, values)
            }, 500)
        }}
        style={[
            { marginTop: index == 0 ? 0 : 16 },
            item.id == -100 ? { borderWidth: 1, borderColor: Colors.primary, backgroundColor: 'transparent' } : {},
            !item.editable ? { backgroundColor: '#F1F1F1' } : {}
        ]}/>
    };

    const DebtData = ({items}) => {
        let result = []
        if (!items) { return null }

        const sorted = items.sort(function(a, b){return a['ccy']-b['ccy']})

        for (let i = 0; i < sorted.length; i++) {

            if (sorted[i].fieldCode.toLowerCase() === "debt" && !values[-100]) {
                let debt = Math.abs(sorted[i].value).toFixed(2);
                setNewValue(-100, debt)
            }

            const view = (
                <View style={styles.labeContainer} key={i.toString() + 'sub_row'}>
                    <Text style={styles.leftLabel}>{sorted[i].fieldName}</Text>

                    {
                        sorted[i].fieldCode.toLowerCase() === "debt" &&
                        <Text style={[styles.rightLabel, {color: 'red', fontWeight: '500'}]}>
                            {sorted[i].value + String.ccy(sorted[i].ccy)}
                        </Text>}

                    {sorted[i].fieldCode.toLowerCase() !== "debt" &&
                    <Text
                        style={
                            [
                                styles.rightLabel,
                                {color: sorted[i].rgba && sorted[i].rgba !== '0,0,0,0' ? 'rgba(' + sorted[i].rgba + ')' : Colors.text}
                            ]
                        }>
                        {sorted[i].value}
                    </Text>}
                </View>
            )

            result.push(view)
        }

        return (<View style={{borderRadius: 10, flex: 1, borderWidth: 1, borderColor: '#F1F1F1', marginTop: 16, padding: 16}}>{result}</View>)
    }

    const Picker = ({item, click}) => {
        return <TouchableOpacity onPress={() => {
            setCurrentFieldID(item.fieldID)
            let kv = []
            if (item.pickerValues) {
                for (let i = 0; i < item.pickerValues.length; i++) {
                    kv.push({ key: item.pickerValues[i].value, value: item.pickerValues[i].displayTxt })
                }
            }

            setCurrentPickerOptions(kv)
            pickerRef.current.open()
        }}>
            <View style={{borderRadius: 10, flex: 1, borderWidth: 1, borderColor: '#F1F1F1', backgroundColor: Colors.input, marginTop: 16, padding: 16}}>
                <Text style={{color: '#6B6B6B', fontSize: 14}}>{item.name}</Text>
                <Image source={require('../../../assets/arrow_down.png')}
                       tintColor={'#f1f1f1'}
                       style={{ width: 16, height: 16, position: 'absolute', right: 16, top: 15 }}
                       resizeMode='cover'/>
            </View>
        </TouchableOpacity>

    };

    let result = []

    const configureData = () => {

        result = []

        const list = hook.merchantParams;
        payObject.merchantParams = list;
        for (let i = 0; i < list.length; i++) {
            let field = list[i]

            const dropDowns = field.dropdown
            if (dropDowns && dropDowns.length > 0) {
                let first = dropDowns[0]
                let option = {
                    id: 'picker_option' + first.displayTxt,
                    name: first.displayTxt,
                    value: first.value,
                    type: 1,
                    pickerValues: dropDowns,
                    fieldID: field.id
                  };
                  selectedPickerOptions.set(field.id, { key: first.value, value: first.displayTxt })
                  result.push(option)
            }

            let fieldCopy = {
                id: field.id,
                name: field.name,
                value: field.value ?? values[field.id],
                type: 0,
                fieldID: field.id,
                editable: !values[field.id],
            }

            //console.log(fieldCopy, field.value, values[field.id])

            result.push(fieldCopy)
        }

        if (hook.debtResponse && hook.debtResponse.length > 0) {

            let debtPlaceHolder = {
                id: -200,
                value: hook.debtResponse,
                type: 2,
                fieldID: ''
              }

            result.push(debtPlaceHolder)

            hook.debtResponse.forEach(debtItem => {
                if (debtItem['fieldCode'] && debtItem['fieldCode'].toLowerCase() === 'debt') {
                    let debt = Math.abs(debtItem['value']).toFixed(2);
                    const amount = { id: -100, value: debt, name: 'Amount', format: 'Double' }
                    payObject.amount = debt;
                    result.push(amount)
                }
            });

        }

        return result;
    };

    const viewForItem = (item, index) => {
        if (item.type == 1) { return <Picker item={item} index={index}/> }
        if (item.type == 2) { return <DebtData items={item.value}/> }
        return <Field item={item} index={index}/>
    };

    return (
        <SafeAreaView style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>

            <Header
                title={t('authorized.paymentResultScreen')}
                closeButtonHasBg={false}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                rightSideIcon={require("../../../assets/transparent.png")}/>

            <View style={{height: 16}}/>

            <ScrollView keyboardDismissMode='on-drag' style={{flex: 1}} >
                <FlatList data={configureData()}
                          contentContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                          innerContainerStyle={{flex: 0, flexGrow: 1, paddingHorizontal: 24}}
                          keyExtractor={item => item.id.toString()}
                          renderItem={object => viewForItem(object.item, object.index)}/>

                <View style={{height: 16}}/>

                <Button style={{ marginHorizontal: 24 }} loading={hook.loading} title={payButtonTitle}
                        onPress={() => {
                            if (hook.debtResponse && hook.debtResponse.length > 0 && hook.paymentDetails) {
                                payObject.debtResponse = hook.debtResponse;
                                payObject.abonentCode = hook.abonentCode;
                                payObject.debtCode = hook.paymentDetails.debtCode;
                                navigation.navigate('BankScreenChooser', payObject)
                            } else {
                                let accountNo = ''
                                for (let i = 0; i < result.length; i++) {

                                    if (result[i].id != -100 && result[i].id != -200) {
                                        let pickerValues = selectedPickerOptions.get(result[i].id)
                                        if (pickerValues && pickerValues.key) {
                                            accountNo += pickerValues.key
                                        }

                                        accountNo += result[i].value
                                    }
                                }
                                hook.getdeptstructure((shouldCheckForDebt)=> {
                                    if (shouldCheckForDebt) {
                                        hook.checkDebt(accountNo)
                                    } else {
                                        payObject.abonentCode = hook.abonentCode;
                                        payObject.debtCode = hook.paymentDetails.debtCode;
                                        navigation.navigate('BankScreenChooser', payObject)
                                    }
                                });

                                setPayButtonTitle(payTitle)
                            }
                        }}/>

            </ScrollView>

            <SimulatedModal ref={pickerRef} hidesDragView={true} height={'80%'}>
                <ListPicker
                    onBackPressed={() => {
                        pickerRef.current.close()
                    }}
                    handleOnPress={(item) => {
                        selectedPickerOptions.set(currentFieldID, item)
                        pickerRef.current.close()
                    }}
                    items={currentPickerOptions}
                    value={'value'}
                    title={t('verify.cities')}/>
            </SimulatedModal>

        </SafeAreaView>
    );
}

export default dynamicForm;
