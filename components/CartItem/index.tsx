import React, { FC, useCallback } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { cs } from '../../common/styles'
import { RemoveIcon, AddIcon } from '../../icons'
import { fs } from '../../navigation/AppNavigator'
import { AnalysisApi } from '../../types/entities/analysis.types'
import { useAppDispatch, useAppSelector } from '../../app/base/hooks'
import { CartItemType, addToCart, removeProduct } from '../../app/features/cart/cartSlice'
import { useAppTheme } from '../../hooks/useTheme'

type CartItemProps = {
    item: CartItemType,
    removeItem?: () => void
}
const CartItem: FC<CartItemProps> = ({ item, removeItem }) => {
    const theme = useAppTheme()
    return (
        <TouchableOpacity style={[cs.fRowBetw, cs.spaceS, cs.fAlCenter]} >
            <View key={item.id} style={[cs.fRow, cs.spaceS, { maxWidth: "80%" }]}>
                <View style={[cs.fColumn]}>
                    <Text style={[cs.fwMedium, fs.montR, cs.fzS, { color: theme.text_label }]}>{item.name}</Text>
                    <Text style={[cs.fwBold, fs.montR, cs.fzS, { color: theme.text_label }]}>{item.cost} ₽</Text>
                </View>
            </View>
            <TouchableOpacity style={[{paddingVertical: 10, paddingLeft: 10}]} onPress={removeItem}>
                <RemoveIcon />
            </TouchableOpacity>
        </TouchableOpacity>)
}
export default React.memo(CartItem)