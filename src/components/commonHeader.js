import React from "react";
import {View , Image,SafeAreaView , Platform , StatusBar} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Text} from "../components"
import t from 'strings';
import PropTypes from 'prop-types';


  function commonHeader({closeIcon, closeButtonHasBg = true, title, rightSideIcon , onRightSidePress, onLeftSidePress , rightText}){


    return (
        <SafeAreaView  style={{flex:0, marginTop : Platform.OS == "ios" ? 8 : StatusBar.currentHeight+8}}>
            <View style={{flex:0, flexDirection:"row", height: 40,marginHorizontal : 24, justifyContent:"space-between", alignItems:"center"}}>
                <TouchableOpacity
                    onPress={onLeftSidePress}
                    style={{flex:0}}>
                    {
                        closeIcon ?
                        <View style={{flex : 0, width : 40, height : 40, justifyContent:"center", alignItems:"center", borderRadius:20,
                            backgroundColor: closeButtonHasBg ?  "#F1F1F1" : "transparent"}}>
                            <Image
                                source={require("../../assets/closeIcon.png")}
                                style={{flex:0, resizeMode:"contain", width:12, height:12}}
                            />
                        </View>
                        :
                        <View style={{flex : 0, width : 22, height : 40, justifyContent:"center", alignItems:"center"}}>
                            <Image
                                source={require("../../assets/back.png")}
                                style={{flex:0, resizeMode:"contain", width:22, height:22}}
                            />
                        </View>

                    }
                </TouchableOpacity>
                <Text>{title}</Text>
                {
                    rightSideIcon ?
                        <TouchableOpacity
                            onPress={onRightSidePress}
                            style={{flex:0}}
                        >
                            <View style={{flex : 0, width : 40, height : 40, justifyContent:"center", alignItems:"center"}}>
                                <Image
                                    source={rightSideIcon}
                                    style={{flex:0, resizeMode:"contain", width:18, height:18}}
                                />
                            </View>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            onPress={onRightSidePress}
                            style={{flex:0}}
                        >
                            <View style={{flex : 0, height : 40, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{color :"#6B6B6B", fontSize : 14}}>{t(rightText)}</Text>
                            </View>
                        </TouchableOpacity>
                }

            </View>
        </SafeAreaView>

    )
}



commonHeader.propTypes = {
    title : PropTypes.string,
    text : PropTypes.string,
    closeIcon : PropTypes.bool,
    rightSideIcon : PropTypes.node,
    onLeftSidePress : PropTypes.func,
    onRightSidePress : PropTypes.func,
    rightText : PropTypes.string

}

export default commonHeader;
