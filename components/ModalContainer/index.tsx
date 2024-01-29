import React, { FC, ReactNode } from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { cs } from '../../common/styles'

export const ModalContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Animated.View entering={SlideInDown.delay(200)} exiting={SlideOutDown.delay(200)} style={cs.modal}>
            {children}
        </Animated.View>
    )
}
