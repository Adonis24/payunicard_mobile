import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { Colors } from 'styles';
import { isAndroid } from 'utils'

const { width } = Dimensions.get('window');

function Pager({ style, pages, didScrollToPage, didScrollToLast, swipeIndex, renderItem, scrollEnabled = true }) {

    const scrollView = useRef(null);
    let androidFixWidth = ~~width;

    useEffect(() => {
        let w = width;

        if (style && style.width) { w = style.width }

        let x = swipeIndex * w;

        if (isAndroid()) {
            androidFixWidth = ~~w;
        } else {
            androidFixWidth = w;
        }

        if (swipeIndex < pages.length) {
            scrollView.current.scrollTo({ x });
        } else {
            didScrollToLast()
        }
    });

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollView}
                pagingEnabled
                keyboardShouldPersistTaps='handled'
                scrollEnabled={scrollEnabled}
                alwaysBounceHorizontal={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flex:0}}
                style={{flex:1, flexGrow:1}}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    const index = Math.floor(nativeEvent.contentOffset.x / androidFixWidth);
                    if (didScrollToPage) {
                        didScrollToPage(index)
                    }
                }}
                horizontal>
                {pages.map((p, i) =>
                    <View key={i.toString()}
                        style={{ width, flex:1 }}>
                        {renderItem(p, i)}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

function PagerBullets({ pages, swipeIndex, style }) {
    return (
        <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }, style]}>
            <View style={{ height: 5, flexDirection: 'row' }}>
                {pages.map((_, i) => (
                    <View
                        key={i.toString()}
                        style={{
                            marginLeft: i === 0 ? 0 : 5,
                            backgroundColor: i === swipeIndex ? Colors.text : Colors.disabled,
                            height: 4,
                            width: 4,
                            borderRadius: 2
                        }} />
                ))}
            </View>
        </ View>
    )
}

export { Pager, PagerBullets };
