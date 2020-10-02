import React from 'react';
import {
    View,
} from 'react-native';

import SuccessScreen from "../components/successScreen"
import t from "../strings";

export default function noMessageScreen ({navigation}) {

    return (
        <View style={{flex:1, backgroundColor:"#ffff"}}>
            <SuccessScreen
                header={
                    {
                        closeIcon : false,
                        title : t('common.messages'),
                        onLeftSidePress : () => navigation.pop(),
                    }
                }

                viewProps = {
                    {
                        title : "common.messagesNotFound",
                        // buttonOnPress : () => {},
                        // buttonColor : "green",
                        // buttonTitle : "common.close"
                    }
                }

            />

        </View>
    )
}
