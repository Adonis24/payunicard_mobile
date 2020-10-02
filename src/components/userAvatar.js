
import React from 'react';
import Text from './text';
import Touchable from './touchable';
import {View, Image} from "react-native"
import { Colors } from 'styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


function userAvatar({ image, name, editable , onPress}) {

    return (
        <View style={{flex:0}}>
            <TouchableOpacity onPress={onPress} style={{flex:0,width : 96, height : 96, position:"relative", alignSelf:"center"}}>
                <Image
                    source={{uri :image }}
                    style={{flex:0, resizeMode:"cover", width:96, height:96, borderRadius:48, }}
                />
                {
                    editable ? 
                        <View 
                            style={{position:"absolute", width:32, height:32, borderRadius:16, backgroundColor:"#FFFFFF", 
                                    borderColor:"#F3F3F3", borderWidth:1, justifyContent:"center", alignItems:"center", alignSelf:"flex-end"}}
                        >
                            <Image
                                source={require("../../assets/pencil.png")}
                                style={{flex:0, resizeMode:"contain", width:12, height : 12,}}
                            />
                        </View>
                    :
                    null
                }
                
            </TouchableOpacity>
            <Text style={{fontSize : 18, color : "#130D1E", flexWrap:"wrap",alignSelf:"center", marginTop:16}}>{name}</Text>
        </View>
    )
}

export default userAvatar;

