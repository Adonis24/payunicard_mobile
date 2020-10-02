import {Text, TextInput} from "components/index";
import {Image, View} from "react-native";
import React from "react";

function SearchInput({searchLabelIsVisible, setSearchExpression, setSearchLabelIsVisible}) {
    return (
        <View style={{width: '100%', height: '100%', backgroundColor: '#EDEDED', borderRadius: 20}}>
            {searchLabelIsVisible &&
            <Text style={{position: 'absolute', top: 12, left: 16, color: '#6B6B6B'}}>ძიება</Text>}
            <Image source={require('../../assets/searchIcon.png')} style={{
                width: 16,
                height: 16,
                position: 'absolute',
                right: 16,
                top: 12
            }}/>
            <TextInput label={''}
                       autoCorrect={false}
                       style={{width: '100%', height: 40, marginHorizontal: 4, backgroundColor: 'transparent'}}
                       autoCapitalize='none'
                       onChangeText={(text) => {
                           setSearchExpression(text)
                       }}
                       onFocus={() => {
                           setSearchLabelIsVisible(false)
                       }}
                       onBlur={() => {
                           setSearchLabelIsVisible(true)
                       }}
            />
        </View>
    )
}

export default SearchInput;