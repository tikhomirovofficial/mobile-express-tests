import React, { FC, useCallback } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { cs } from '../../common/styles'
import { RemoveIcon, AddIcon } from '../../icons'
import { fs } from '../../navigation/AppNavigator'
import { AnalysisApi } from '../../types/entities/analysis.types'
import { useAppDispatch, useAppSelector } from '../../app/base/hooks'
import { CartItem, addToCart, removeProduct } from '../../app/features/cart/cartSlice'

type ProductItemProps = {
    product: AnalysisApi,
    index: number,
    isInCart: boolean,
    clickHandle?: () => void
}
const ProductItem: FC<ProductItemProps> = ({ product, index, isInCart, clickHandle }) => {
    const dispatch = useAppDispatch()

    const addProduct = useCallback(() => {
        dispatch(addToCart({ ...product as CartItem }))
    }, [dispatch, product]);

    const removeItem = useCallback(() => {
        dispatch(removeProduct(product.id))
    }, [dispatch, product]);

    return (
        <TouchableOpacity onPress={clickHandle} style={[cs.fRowBetw, cs.spaceS, cs.fAlCenter, { paddingBottom: 16, paddingTop: index ? 16 : 0, borderBottomWidth: 1, borderBottomColor: "#f3f3f3" }]} >
            <View key={product.id} style={[cs.fRow, cs.spaceS, { maxWidth: "90%" }]}>
                <View style={[cs.fColumn]}>
                    <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark]}>{product.name}</Text>
                    <Text style={[cs.fwBold, fs.montR, cs.fzS, cs.colorDark]}>{product.cost} ₽</Text>
                </View>
            </View>
            <TouchableOpacity onPress={!isInCart ? addProduct : removeItem}>
                {isInCart ? <RemoveIcon /> : <AddIcon />}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default React.memo(ProductItem)