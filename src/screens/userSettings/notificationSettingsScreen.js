import React from 'react';
import {
    View,
} from 'react-native';

import Header from "../../components/commonHeader"
import {ScrollableWithInputHandling, UserSettingSwitcherRow} from "components"
import t from 'strings';
import notificationSettingsHook from "hooks/notificationSettingsHook";
export default function notificationSettingsScreen({navigation}) {

    const hook = notificationSettingsHook()

    return (
        <ScrollableWithInputHandling
            style={{flex: 1, backgroundColor: "#ffff"}}
        >
            <Header
                closeIcon={false}
                title={t('menuName.notification')}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                rightText={""}
            />
            <View style={{width: '100%', paddingHorizontal: 24, marginTop: 32}}>
                {
                    hook.notificationStatuses.map((obj, i) => (
                        <UserSettingSwitcherRow key={obj.notificationTypeId} title={obj.name} isOn={obj.isActive} onChange={(state) => {
                            let items = hook.notificationStatuses
                            for (let i = 0; i < hook.notificationStatuses.length; i++) {
                                if (items[i].notificationTypeId == obj.notificationTypeId) {
                                    items[i].isActive = state
                                    hook.setNotificationStatuses(items)
                                    hook.updateNotificationStatuses(obj.notificationTypeId, state)
                                    break;
                                }
                            }
                        }}/>
                    ))

                }

            </View>
        </ScrollableWithInputHandling>
    )
}
