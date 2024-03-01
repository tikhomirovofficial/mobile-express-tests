import React, { FC } from 'react'
import { AnalysisApi } from '../../types/entities/analysis.types'
import { CategoryApi } from '../../types/entities/categories.types'
import { CategoryItem } from '../CategoryItem'
import ProductItem from '../ProductItem'
import { CartItemType } from '../../app/features/cart/cartSlice'

type CategoryOrProductItem = {
    item: AnalysisApi | CategoryApi,
    toProducts: () => any,
    openAnalysisInfo: () => any,
    cartProducts: CartItemType[]

}
export const CategoryOrProductItem: FC<CategoryOrProductItem> = React.memo(({ item, toProducts, openAnalysisInfo, cartProducts }) => {
    const itemTyped = item as CategoryApi & AnalysisApi
    const isCategory = Object.hasOwn(itemTyped, "istake")
    if (isCategory) {
        return <CategoryItem clickHandle={toProducts} index={item.id} category={itemTyped as CategoryApi} />
    }
    return <ProductItem clickHandle={openAnalysisInfo} product={itemTyped as AnalysisApi} index={item.id} isInCart={cartProducts.some(cartProduct => cartProduct.id === item.id)} />

})
