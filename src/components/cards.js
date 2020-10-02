import React from 'react';
import { ScrollView } from 'react-native';

export default function Cards({ items, renderItem, style }) {

    return (
        <ScrollView
            scrollEventThrottle={8}
            style={style}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={false}
        >
            {items.map((i) => renderItem(i))}
        </ScrollView>
    )
}