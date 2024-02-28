import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { ArrowLeft } from '../../icons'

export type BackButtonProps = {
    handleBack: () => any
}
export const BackButton: FC<BackButtonProps> = ({handleBack}) => {
    return (
        <TouchableOpacity style={{ paddingVertical: 12, paddingRight: 16}} onPress={handleBack}>
            <ArrowLeft />
        </TouchableOpacity>
    )
}
