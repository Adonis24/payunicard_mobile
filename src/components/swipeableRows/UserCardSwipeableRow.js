import React, {Component} from 'react';
import {View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {renderRightAction} from "../../utils/swipeAction";

const icTrash = require('../../../assets/icTrash.png')
const icStarGray = require('../../../assets/icStarGray.png')

export default function UserCardSwipeableRow({children, onStarClick, onDeleteClick}) {

    const renderRightActions = progress => (
        <View style={{marginRight: 0, width: 136, flexDirection: 'row'}}>
            {renderRightAction(icStarGray, 'transparent', 128, progress, onStarClick, '#F1F1F1')}
            {renderRightAction(icTrash, '#FFEAEA', 64, progress, onDeleteClick)}
        </View>
    );
    const updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this._swipeableRow.close();
    };
    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            leftThreshold={30}
            rightThreshold={40}
            renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    )

}

