import React, { FC } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { cs } from '../../common/styles'
import { RemoveIcon, AddIcon, ArrowRightIcon } from '../../icons'
import { fs } from '../../navigation/AppNavigator'
import { AnalysisApi } from '../../types/entities/analysis.types'
import { useAppDispatch, useAppSelector } from '../../app/base/hooks'
import { addToCart, removeProduct } from '../../app/features/cart/cartSlice'
import { setCurrentCategory } from '../../app/features/order/orderSlice'
import { CategoryApi } from '../../types/entities/categories.types'

type CategoryItemProps = {
    category: CategoryApi,
    index: number,
    clickHandle: () => void
}
export const CategoryItem: FC<CategoryItemProps> = ({ category, index, clickHandle }) => {
    const dispatch = useAppDispatch()
    const toProducts = (categoryId: number) => {
        dispatch(setCurrentCategory(categoryId))
        clickHandle()
    }
    return (
        <TouchableOpacity key={category.id} onPress={() => toProducts(category.id)} style={[cs.fRowBetw, cs.spaceS]}>
            <View key={category.id} style={[cs.fRow, cs.spaceS, { maxWidth: "86%" }]}>
                <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark]}>{category.name}</Text>
                {/* <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark, cs.colorGray]}>300</Text> */}
            </View>
            <View style={[{ marginTop: 3 }]}>
                <ArrowRightIcon />
            </View>
        </TouchableOpacity>
    )
}
