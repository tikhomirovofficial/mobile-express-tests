import React, { FC } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useAppSelector } from '../../app/base/hooks'

type ModalShadowProps = {
    show: boolean
}
export const ModalShadow: FC<ModalShadowProps> = ({ show }) => {
    const { theme } = useAppSelector(state => state.settings)
    if (!show) {
        return null
    }
    return <Animated.View entering={FadeIn.duration(500)} style={[{ position: "absolute", height: "100%", top: 0, left: 0, width: "100%", backgroundColor: show ? theme === "light" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.04)" : "white", }]}>
    </Animated.View>
}
