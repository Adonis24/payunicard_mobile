import {Colors, FontCfg, Sizes} from "styles";
import {View} from "react-native";
import {CurrentUserView, IconViewWithBadge, Text} from "components/index";
import React from "react";

function UserHeaderRow({onUserClick, onNotificationsClick, imageUrl, userTitle, onSetCameraVisible, notificationCount = 0, notificationsIsVisible = true}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', ...Sizes.mt8, ...Sizes.ml24}}>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <CurrentUserView
                    imageUrl={imageUrl}
                    onClick={() => onUserClick() }
                />
                <Text style={{
                    alignSelf: 'center',
                    height: '100%', ...Sizes.ml16,
                    color: Colors.text, ...FontCfg.bold
                }}>
                    {userTitle}
                </Text>
            </View>
            <View style={{
                width: notificationsIsVisible ? 96 : 48,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'flex-end', ...Sizes.mr24
            }}>
                <IconViewWithBadge onClick={() => {
                    onSetCameraVisible(true)
                }} style={{...Sizes.mr16}} iconUrl={require('../../assets/iconQRCode.png')}/>

                {notificationsIsVisible && <IconViewWithBadge onClick={() => {
                    onNotificationsClick()
                }} iconUrl={require('../../assets/iconNotification.png')}
                                   badgeValue={`${notificationCount}`}/>}
            </View>
        </View>
    )
}

export default UserHeaderRow;