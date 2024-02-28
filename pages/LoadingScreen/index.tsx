import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { cs } from '../../common/styles'

export const LoadingScreen = () => {
    return (
        <View style={[cs.flexOne, cs.fCenterCol]}>
            <ActivityIndicator size={"large"} color={cs.bgYellow.backgroundColor} />
        </View>
    )
}
