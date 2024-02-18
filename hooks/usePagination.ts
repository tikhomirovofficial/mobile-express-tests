import { useCallback, useState } from "react"
import useToken from "./useToken"

export const usePagination = (loadCb: () => any, incrementCb: () => any, options: { part: number, items: any[], can_more: boolean, loading: boolean }, deps: Array<any> = []) => {
    const loadOrders = useCallback(() => {
        if (options.part !== 1) {
            if (options.part === 0 && !options.items.length) {
                loadCb()
            } else if (options.can_more) {
                loadCb()
            }
        }
    }, [options.part, options.can_more, options.items, ...deps])

    const loadMore = useCallback(() => {
        if (options.can_more && options.items.length, !options.loading) {
            incrementCb()
        }
    }, [options.can_more, options.items, options.loading, ...deps])

    return [loadOrders, loadMore]
}