import { Text as RNText } from 'react-native';
import { Colors } from 'styles';
import {getFixedTextStyle} from "../utils/fontStyle";
import React from "react";

//TODO: Needs work on android texts are cut off
function Text({ children, style, numberOfLines }) {
    let fixedStyle = {
        color: Colors.text,
        ...getFixedTextStyle(style)
    }
    return <RNText numberOfLines={numberOfLines} style={fixedStyle}>{children}</RNText>
}

Text.propTypes = {
    style: RNText.propTypes.style
}

export default Text;
