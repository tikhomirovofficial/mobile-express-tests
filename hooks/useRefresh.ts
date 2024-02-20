import { useAppDispatch, useAppSelector } from "../app/base/hooks";
import { getProfile, resetProfileData } from "../app/features/profile/profileSlice";
import { getAllOrders, resetOrders } from "../app/features/orders/ordersSlice";
import { useState } from "react";

export const useRefresh = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(state => state.orders)
    const modals = useAppSelector(state => state.modals)
    const [refreshing, setRefreshing] = useState(false)
    const { loadings } = useAppSelector(state => state.profile)


    const refresh = () => {
    
        setRefreshing(true)
        dispatch(resetOrders())
        dispatch(getProfile())
        setRefreshing(false)
    

    }

    return {
        refreshing: refreshing && (loadings.profile || orders.loadings.all_orders),
        sendRefresh: refresh
    }
}