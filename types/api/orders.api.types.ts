import { HasNextPart, HasPart, ResponseStatus } from "../common.types"
import { OrderAnalysisDetails } from "../entities/analysis.types"
import { OrderApi, OrderByDateApi, OrderDetailsApi } from "../entities/order.types"

// Получить информацию о заказе 
export type OrderDetailsReq = {
    id: number
}
export type OrderDetailsRes = {
    order: OrderDetailsApi
} & ResponseStatus

// Получить заказы пациента (Краткие данные (Получение бонуса))
export type OrdersByPatientGetReq = {
    pacient: number
} & HasPart
export type OrdersByPatientGetRes = {
    first_name: string
    last_name: string
    total_bonus: number
    orders: OrderApi[]
} & ResponseStatus & HasNextPart

// Получить заказы пациента с результатами 
export type OrdersByPatientDetailedGetReq = {
    id: number
} & HasPart
export type OrdersByPatientDetailedGetRes = {
    first_name: string
    last_name: string
    total_bonus: number
    orders: OrderApi[]
} & ResponseStatus & HasNextPart

// Получить все заказы, сделанные врачом
export type GetAllOrdersReq = HasPart
export type GetAllOrdersRes = {
    orders: OrderApi[]
} & ResponseStatus & HasNextPart

// Получить все заказы для страницы финансов за каждую дату
export type GetAllFinancesOrdersReq = HasPart
export type GetAllFinancesOrdersRes = {
    total_bonus: number
    orders: OrderByDateApi[]
} & ResponseStatus & HasNextPart

// Создание заказа
export type CreateOrderReq = {
    user_id: number,
    analiz: number[]
}
export type CreateOrderRes = {} & ResponseStatus

