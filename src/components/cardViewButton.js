import React, {useState} from 'react';
import Touchable from './touchable';
import {ViewPropTypes, TouchableOpacity, View, Image, Dimensions, Text} from 'react-native';
import {Colors, Common, Dimens} from 'styles';
import {AntDesign} from '@expo/vector-icons';
import Tooltip from 'react-native-walkthrough-tooltip';

const {height} = Dimensions.get('window');

function cardViewButton({title, subTitle, icon, image, iconBackground, onPress, checked, tooltipText = null}) {

    const [toolTipVisible, setToolTipVisible] = useState(false);

    const checkedStyle = {
        borderWidth: 1,
        borderColor: '#D3DAE7',
        borderRadius: 8
    };

    return (
        <Touchable onPress={onPress} style={[{
            height: height / 11.6,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }]}>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                <View style={[{width: 16, height: 16}, !checked ? checkedStyle : null ]}>
                    {checked && <Image source={require('../../assets/RadioButtonOn.png')} style={{width: 16, height: 16}} resizeMode="contain"/>}
                </View>
                {image &&
                    <Image source={image} style={{height: height / 11.6, marginLeft: 16, width: height / 8.12}} resizeMode="contain"/>
                }
                <View style={{flex: 0, marginLeft: 16, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={{fontWeight: '600', fontSize: 14, marginBottom: subTitle ? 2 : 0 }}>{title}</Text>
                    {subTitle &&
                        <Text style={{fontWeight: '200', fontSize: 12, color: Colors.placeholder, maxWidth: 120}}>{subTitle}</Text>
                    }
                </View>
            </View>
            { tooltipText !== null && 
                <Tooltip
                    animated={true}
                    arrowSize={{ width: 16, height: 8 }}
                    backgroundColor="rgba(0,0,0,0.5)"
                    isVisible={toolTipVisible}
                    content={<Text style={{fontWeight: '200', fontSize: 14, color: Colors.text, maxWidth: 120}}>{tooltipText}</Text>}
                    placement="bottom"
                    onClose={() =>  setToolTipVisible(false)}
                    >
                    
                    <TouchableOpacity onPress={() => setToolTipVisible(true) }>
                        <AntDesign size={17} name='infocirlceo' style={{position: 'absolute', right: 4, top: height / 29}} color={Colors.placeholder}/>
                    </TouchableOpacity>
                </Tooltip>
            }
        </Touchable>)
}

cardViewButton.propTypes = {
    style: ViewPropTypes.style
}

export default cardViewButton;
