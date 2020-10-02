import React from 'react';
import Touchable from './touchable';
import {ViewPropTypes, ActivityIndicator, View, Image, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import Text from './text';
import {Colors, Common, Dimens} from 'styles';
import {AntDesign} from '@expo/vector-icons';

const {height} = Dimensions.get('window');

function listPicker({items, text, customView, title, handleOnPress, value, onBackPressed}) {

    const ListItemRow = ({item}) => {
        return <Touchable
            onPress={() => {
                handleOnPress(item)
            }}
            style={[{
                width: '100%'
            }]}>
            <View style={{height: 44}}>
                <Text style={{
                    fontWeight: '400',
                    fontSize: 14,
                    marginTop: 16,
                    lineHeight: 14,
                    color: '#424242',
                    paddingLeft: 24
                }}>
                    {item[value]}
                </Text>
            </View>
            <View style={{height: 1, marginLeft: 24, width: '100%', backgroundColor: '#F3F3F3'}}/>
        </Touchable>;
    };

    return (
        <View style={{width: '100%', flex: 1}}>

            <View style={[{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16
            }, Common.horizontalMargin]}>

                <View style={{width: '15%'}}>
                    <TouchableOpacity onPress={onBackPressed}>
                        <AntDesign style={{fontWeight: 'bold', alignSelf: 'flex-start'}} name='left'
                                   color='#b0b0b0' size={16}/>
                    </TouchableOpacity>
                </View>

                <View style={{width: '85%', alignItems: 'center'}}>
                    <Text style={{
                        marginLeft: '-15%',
                        color: Colors.text,
                        fontSize: 18,
                    }}>{title}</Text>
                </View>

            </View>

            <View style={{ height: '100%', width: '100%' }}>
                {text && text.length > 0 && <Text style={{
                    color: Colors.text,
                    fontSize: 14,
                }}>{text}</Text>}

                {customView}

                {
                    items && items.length > 0 &&
                    <FlatList data={items}
                              renderItem={
                                    object => <ListItemRow item={object.item}/>
                                  }/>
                }
            </View>
        </View>
    )
}

listPicker.propTypes = {
    style: ViewPropTypes.style
}

export default listPicker;
