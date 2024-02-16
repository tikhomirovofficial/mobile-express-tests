import React, { FC } from 'react'
import { View } from 'react-native'
import { InView } from 'react-native-intersection-observer'

type PaginationBottomProps = {
    onVisible: (inView: boolean) => any
}

export const PaginationBottom: FC<PaginationBottomProps> = ({ onVisible }) => {
    return (
        <InView onChange={onVisible}>
            <View style={{ height: 1, width: "100%" }}></View>
        </InView>
    )
}
