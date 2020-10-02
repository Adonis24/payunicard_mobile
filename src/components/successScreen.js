import React from 'react';
import {
    View,
    Image,
    ImageProps
} from 'react-native';
import {Text} from "../components"
import PropTypes from 'prop-types';
import {Button} from "../components"
import Header from "../components/commonHeader"
import t from 'strings';
import {Common, Colors, DeviceWidth, DeviceHeight, Sizes, FontCfg} from 'styles';

function successScreen({header, viewProps}) {

    return (
        <View style={{flex: 1, backgroundColor: "#ffff"}}>
            <Header {...header}/>

            <View style={{flex: 1, justifyContent: "center", alignItems: "stretch"}}>
                <Image
                    source={require("../../assets/noMesageImage.png")}
                    style={{flex: 0, resizeMode: "contain", width: DeviceWidth, height: DeviceWidth}}
                />
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#130D1E",
                    lineHeight: 26,
                    letterSpacing: 0,
                    textAlign: "center",
                    alignSelf: "center"
                }}>{t(viewProps.title)}</Text>
                <Text style={{
                    fontSize: 12,
                    color: "#6B6B6B",
                    lineHeight: 16,
                    letterSpacing: 0,
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: 8
                }}>{viewProps.text ? t(viewProps.text) : ""}</Text>
            </View>

            {
                viewProps.buttonOnPress ?
                    <Button
                        title={t(viewProps.buttonTitle)}
                        style={{height: DeviceHeight / 14.44, ...Sizes.mt8, marginHorizontal: 24, marginVertical: 48}}
                        textStyle={{...FontCfg.bold}}
                        color={viewProps.buttonColor}
                        loading={false}
                        onPress={viewProps.buttonOnPress}
                    />
                    :
                    null
            }

        </View>
    )
}

successScreen.propTypes = {
    header: PropTypes.objectOf({
        title: PropTypes.string,
        text: PropTypes.string,
        closeIcon: PropTypes.bool,
        rightSideIcon: PropTypes.node,
        onLeftSidePress: PropTypes.func,
        onRightSidePress: PropTypes.func
    }),
    viewProps: PropTypes.objectOf({
        title: PropTypes.string,
        text: PropTypes.string,
        buttonOnPress: PropTypes.func,
        buttonColor: PropTypes.string,
        buttonTitle: PropTypes.string
    })
}


export default successScreen;
