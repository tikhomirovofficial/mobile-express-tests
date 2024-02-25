import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from '../../icons'

export type BackButtonProps = {
    handleBack: () => any
}
export const BackButton: FC<BackButtonProps> = ({handleBack}) => {
    return (
        <TouchableOpacity style={{ paddingVertical: 8, paddingRight: 14}} onPress={handleBack}>
            <ArrowLeft />
        </TouchableOpacity>
    )
}
