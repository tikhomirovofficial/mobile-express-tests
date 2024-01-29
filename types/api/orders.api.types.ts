import { ResponseStatus } from "../common.types"
import { OrderAnalysisDetails } from "../entities/analysis.types"
import { OrderApi, OrderDetailsApi } from "../entities/order.types"

// Получить информацию о заказе 
export type OrderDetailsReq = {
    id: number
}
export type OrderDetailsRes = OrderDetailsApi

//Получить заказы пациента
export type OrdersByPatientGetReq = {
    pacient: number
}
export type OrdersByPatientGetRes = {
    first_name: string
    last_name: string
    orders: OrderApi[]
    total_bonus: number
} & ResponseStatus