import React, { FC } from 'react'
import { DimensionValue } from 'react-native'
import { Skeleton } from 'react-native-skeleton-component'
import { useAppTheme } from '../../hooks/useTheme'

type SkeletonViewProps = {
    height: number | string,
    width: number | string,
    circle?: boolean
}
export const SkeletonView: FC<SkeletonViewProps> = ({ height, width, circle = false }) => {
    const theme = useAppTheme()
    return (
        <Skeleton style={{borderRadius: circle ? 1000 : 6, height: height as DimensionValue, width: width as DimensionValue}}/>
    )
}
