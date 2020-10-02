import { StyleSheet } from "react-native";

export function getFixedTextStyle(style) {
    const flattenStyle = { ...StyleSheet.flatten(style) };
    let fontFamily;
    if (flattenStyle && flattenStyle.fontWeight) {
        switch (flattenStyle.fontWeight) {
            case '100':
                fontFamily = 'Book'
                break;
            case 'light':
            case '200':
            case '300':
                fontFamily = 'Light'
                break;
            case '400':
            case '500':
                fontFamily = 'Medium'
                break;
            case 'bold':
            case '600':
            case '700':
            case '800':
            case '900':
                fontFamily = 'Bold'
                break;
            default:
                fontFamily = 'Regular';
        }
        delete flattenStyle.fontWeight;
    } else {
        fontFamily = 'Regular';
    }

    return { ...flattenStyle, fontFamily }
}

