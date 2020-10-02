import React from 'react';
import {
    View,
    FlatList, Platform,
} from 'react-native';

import Header from "../components/commonHeader"
import NotificationListItem from '../components/listItems/notificationListItem'
import t from 'strings';
import { useNotification } from 'hooks';


export default function NotificationScreen ({navigation}) {

    const notification  = useNotification();

    function viewableItem({item, index}) {
        return(
            <NotificationListItem {...item} index={index} />
        )
    }

    return (
        <View style={{paddingTop: Platform.OS === 'android' ? 25 : 0, flex: 1, backgroundColor: "#FAFAFA"}}>
            <Header
                title={t('common.notification')}
                rightSideIcon={require("../../assets/messageIcon.png")}
                onLeftSidePress={() => {navigation.pop() }}
                onRightSidePress={() => {navigation.navigate("NoMessageScreen")}}
            />
            <FlatList
                data={notification.notifications}
                keyExtractor={item => item.notificationID.toString()}
                renderItem={viewableItem}
                contentContainerStyle={{flex:0,flexGrow:1, marginTop : 24}}
            />

        </View>
    )
}
