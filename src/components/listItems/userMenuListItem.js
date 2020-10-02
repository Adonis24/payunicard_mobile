import React from "react";
import {View , Image,SafeAreaView ,StyleSheet } from "react-native";
import {Text} from "../../components"
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import t from 'strings';


export default function ({icon, title, onPress, index , backgroundColor}){


    return (
        <TouchableOpacity 
            key={index} 
            style={styles.mainContainer}
            onPress={onPress}
        >
            <View style={[styles.imageContainer ,{backgroundColor : backgroundColor}]}>
                <Image
                    source={icon}
                    style={{flex:0, resizeMode:"contain", width:16, height:16}}
                />            
            </View>
            <View style={styles.mainTextAndTimeContainer }>
                <View style={{flex:1, justifyContent: "center", alignItems:"flex-start",}}>
                    <Text style={{fontSize : 14, color : "#6B6B6B"}} numberOfLines={1}>{t(title)}</Text>
                </View>
                <View style={{flex : 0, justifyContent:"center", marginLeft : 16,}}>
                    <AntDesign
                        name='right'
                        color='#b0b0b0'
                        size={22}
                    />
                </View>
            </View>
        </TouchableOpacity>
        
    )
}


const styles = StyleSheet.create({
    mainContainer : {
        flex:0, 
        flexDirection:"row", 
        height: 56,
        marginLeft : 24, 
        marginRight : 16,
        marginBottom : 16, 
        justifyContent:"space-between", 
        alignItems:"stretch"
    },
    imageContainer : {
        flex:0, 
        height: 40, 
        width:40, 
        marginRight: 16, 
        justifyContent:"center", 
        alignItems:"center" ,
        borderRadius:20, 
    },
    mainTextAndTimeContainer : {
        flex:1, 
        justifyContent:"flex-start", 
        alignItems:"center", 
        alignContent:"center",
        borderBottomWidth:1, 
        borderBottomColor:"#F1F1F1", 
        flexDirection:"row",
        paddingBottom:16,

    },


});
