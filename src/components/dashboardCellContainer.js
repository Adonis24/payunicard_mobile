import React from 'react';
import {View, StyleSheet} from 'react-native'
import {Button, Text} from 'components'
import {Colors} from 'styles';

function DashboardCellContainer({view, leftTitle, rightTitle, rightClicked, bgColor = Colors.white, hasHorizontalPaddings = true}) {

    return (
        <View style={styles.container}>
            <View style={[styles.shadow, { backgroundColor: bgColor }]}/>
            <View style={[ hasHorizontalPaddings ? styles.viewOutsideHorizontal : {}, styles.viewOutsideVertical, {
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }]}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{leftTitle}</Text>
                    {rightTitle && <Button title={rightTitle}
                                           style={{borderRadius: 0, height: 'auto', backgroundColor: 'transparent'}}
                                           textStyle={{color: 'gray', fontSize: 12}} onPress={() => {
                        rightClicked()
                    }}/>
                    }
                </View>
            </View>
            <View style={styles.view}>{view}</View>
        </View>
    )
}

export default DashboardCellContainer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },

    view: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    },

    viewOutsideHorizontal: {
        marginLeft: 16,
        marginRight: 16
    },

    viewOutsideVertical: {
        marginTop: 16,
        marginBottom: 16
    },

    shadow: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.05,
        shadowRadius: 7,
        // elevation:4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        borderRadius: 16,
        borderWidth: 0,
        borderColor: Colors.border,
        zIndex:0,
        backfaceVisibility : "hidden"
    }
});
