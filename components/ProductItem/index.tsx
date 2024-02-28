import React, { FC, useCallback } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { cs } from '../../common/styles'
import { RemoveIcon, AddIcon } from '../../icons'
import { fs } from '../../navigation/AppNavigator'
import { AnalysisApi } from '../../types/entities/analysis.types'
import { useAppDispatch, useAppSelector } from '../../app/base/hooks'
import { CartItemType, addToCart, removeProduct } from '../../app/features/cart/cartSlice'
import { useAppTheme } from '../../hooks/useTheme'

type ProductItemProps = {
    product: AnalysisApi,
    index: number,
    isInCart: boolean,
    clickHandle?: () => void
}
const ProductItem: FC<ProductItemProps> = ({ product, index, isInCart, clickHandle }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()

    const addProduct = useCallback(() => {
        dispatch(addToCart({ ...product as CartItemType }))
    }, [dispatch, product]);

    const removeItem = useCallback(() => {
        dispatch(removeProduct(product.id))
    }, [dispatch, product]);

    return (
        <TouchableOpacity onPress={clickHandle} style={[cs.fRowBetw, cs.spaceS, cs.fAlCenter, { paddingBottom: 16, paddingTop: index ? 16 : 0, borderBottomWidth: 1, borderBottomColor: "#f3f3f3" }]} >
            <View key={product.id} style={[cs.fRow, cs.spaceS, { maxWidth: "80%" }]}>
                <View style={[cs.fColumn]}>
                    <Text style={[cs.fwMedium, fs.montR, cs.fzS, { color: theme.text_label }]}>{product.name}</Text>
                    <Text style={[cs.fwBold, fs.montR, cs.fzS, cs.colorDark, { color: theme.text_label }]}>{product.cost} ₽</Text>
                </View>
            </View>
            <TouchableOpacity style={[{ paddingVertical: 10, paddingLeft: 10 }]} onPress={!isInCart ? addProduct : removeItem}>
                {isInCart ? <RemoveIcon /> : <AddIcon />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default React.memo(ProductItem)