import {Image, View} from "react-native";
import React from "react";
import Text from "components/text";
import {Switch} from "react-native-paper";

function userSettingSwitcherRow({title, isOn, onChange}) {
    return <View style={{width: '100%', height: 57}}>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
            <Image style={
                {
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#F1F1F1',
                    alignSelf: 'center'
                }
            }/>

            <View style={{ flex: 1, marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%', borderBottomWidth: 1, borderBottomColor: '#F1F1F1' }}>
                <Text style={{ textAlign: 'left' }}>{title}</Text>
                <Switch onValueChange={(value) => {
                    onChange(value)
                }} value={isOn}/>
            </View>
        </View>
    </View>
};

export default userSettingSwitcherRow;
