import {Dimensions, View} from "react-native";
import {Colors, Sizes} from "styles";
import {SelectorButton} from "components/index";
import React from "react";
const {height} = Dimensions.get('window');

function VerifyUserRow({
    userIsVerified, title, subTitle, onPress, tintColor = 'red', iconBackground=Colors.white, iconTitle='',
    image = require('../../assets/exclamation-mark.png'), displaysIcon=true}) {
    if (userIsVerified) {
        return null
    }
    return <View style={{...Sizes.ml24, ...Sizes.mr24, ...Sizes.mt24}}>
        <SelectorButton style={{
            height: height * 0.1, backgroundColor: 'white',
            shadowColor: '#000000', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.05, shadowRadius: 7
        }}
            title={title}
            subTitle={subTitle}
            displaysIcon={displaysIcon}
            iconBackground={iconBackground}
            iconTitle={iconTitle}
            backgroundColor={Colors.white}
            hasBorder={false}
            tintColor={tintColor}
            image={image}
            onPress={() => {
                onPress()
            }}>
        </SelectorButton>
    </View>
};

export default VerifyUserRow;