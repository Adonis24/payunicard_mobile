import { StyleSheet ,Dimensions } from 'react-native';

const Dimens = {
    DEFAULT_MARGIN: 24,
    FIELD_HEIGHT: 45,
    DEFAULT_VERTICAL_SPACING: 16,
    DEFAULT_VERTICAL_SPACING_LITTLE: 8,
}

const Common = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    horizontalMargin: {
        marginHorizontal: Dimens.DEFAULT_MARGIN
    },
    horizontalPadding: {
        paddingHorizontal: Dimens.DEFAULT_MARGIN
    }
})

const DeviceWidth = Dimensions.get("window").width
const DeviceHeight = Dimensions.get("window").height;

export {
    Common,
    Dimens,
    DeviceWidth,
    DeviceHeight
};
