import React from "react";
import {View , Image,SafeAreaView ,StyleSheet } from "react-native";
import {Text} from "../../components"
import {timestamp2Date} from "utils/dateUtils";

export default function ({subject, imageUrl, text, dateCreated, isRead, index}){


    return (
        <View key={index} style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri : imageUrl}}
                    style={{flex:0, resizeMode:"contain", width:40, height:40,  borderRadius:20}}
                />            
            </View>
            <View style={styles.mainTextAndTimeContainer}>
                <View style={{flex:1, justifyContent: "flex-start", alignItems:"flex-start"}}>
                    <Text style={{fontSize : 14, color : "#130D1E",marginBottom : 8}} numberOfLines={1}>{subject}</Text>
                    <Text style={{fontSize : 12, color : "#6B6B6B"}} numberOfLines={1}>{text}</Text>
                </View>
                <View style={{flex : 0, justifyContent:"center", marginLeft : 16, height:40}}>
                    <Text style={{color : isRead ? "#130D1E" : "#6B6B6B" , fontSize : 12}}>{timestamp2Date(dateCreated)}</Text>
                </View>
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    mainContainer : {
        flex:0, 
        flexDirection:"row", 
        height: 56,
        marginHorizontal : 24, 
        marginBottom : 16, 
        justifyContent:"space-between", 
        alignItems:"stretch"
    },
    imageContainer : {
        flex:0, 
        height: 56, 
        width:40, 
        marginRight: 8, 
        justifyContent:"flex-start", 
        alignItems:"center" 
    },
    mainTextAndTimeContainer : {
        flex:1, 
        justifyContent:"flex-start", 
        alignItems:"stretch", 
        borderBottomWidth:1, 
        borderBottomColor:"#F1F1F1", 
        flexDirection:"row"
    },


});