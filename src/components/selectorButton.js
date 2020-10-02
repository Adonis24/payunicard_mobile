import React from 'react';
import Touchable from './touchable';
import {ViewPropTypes, ActivityIndicator, View, Dimensions, Image} from 'react-native';
import Text from './text';
import {Colors, Sizes, FontCfg} from 'styles';
import {AntDesign} from '@expo/vector-icons';

const {height} = Dimensions.get('window');

const {primary} = Colors;

function SelectorButton({title, 
                         subTitle, 
                         icon, 
                         iconBackground,
                         iconTitle,
                         iconTitleColor = Colors.white,
                         onPress, 
                         loading, 
                         tintColor, 
                         image, 
                         backgroundColor, 
                         style, 
                         hasBorder = true, 
                         displaysIcon = true}) {
    return (
        <Touchable onPress={loading ? undefined : onPress} style={[style, {
            borderRadius: 16,
            backgroundColor: backgroundColor ? backgroundColor : 'transparent' ,
            borderColor: Colors.border,
            borderWidth: hasBorder ? 1 : 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }]}>

            {(displaysIcon && !loading) && <View style={{
                borderRadius: 20,
                backgroundColor: iconBackground,
                ...Sizes.ml16,
                ...Sizes.mb16,
                ...Sizes.mt16,
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {image 
                ? 
                <Image source={image} style={{height: 24, width: 24}}/>
                :
                <AntDesign size={24} name={icon} color={tintColor ? tintColor :  Colors.white}/>
            }
            </View>}

            {(!displaysIcon) && <View style={{
                borderRadius: 24,
                backgroundColor: iconBackground,
                ...Sizes.ml16,
                ...Sizes.mb16,
                ...Sizes.mt16,
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    color: iconTitleColor,
                    lineHeight: 20,
                    ...FontCfg.bold,
                    ...Sizes.fs16,
                }}>{iconTitle}</Text>
            </View>}

            {!loading && <View style={{
                flex: 2,
                borderRadius: 16,
                ...Sizes.ml16,
                ...Sizes.mr16,
                ...Sizes.mb16,
                ...Sizes.mt16,
                height: 96,
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>

                {title && <Text style={{
                    color: Colors.text,
                    lineHeight: 20,
                    ...FontCfg.bold,
                    ...Sizes.fs13,
                }}>{title}</Text>}

                <Text style={{
                    marginTop: 0,
                    color: Colors.placeholder,
                    lineHeight: 20,
                    ...FontCfg.book,
                    ...Sizes.fs12,
                }}>{subTitle}</Text>
            </View>}
            {!loading &&
            <AntDesign size={height / 36.90} name='right' style={{marginRight: 16}} color={Colors.disabled}/>
            }
            {loading && <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size='large' color={Colors.placeholder}/>
            </View>}
        </Touchable>)
}

SelectorButton.propTypes = {
    style: ViewPropTypes.style
}

export default SelectorButton;
