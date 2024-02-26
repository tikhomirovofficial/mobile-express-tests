import { HasId } from "../common.types";

export type OrderApi = {
    date: string
    bonus: number
    status: string
    bonus_status?: boolean
    pacient?: string
} & HasId

export type OrderDetailsApi = {
    info_order: {
        doctor: string,
        pacient: string,
        status: string,
        date: string,
        order_id: number
    },
    results: string[]
    analiz_list: Array<{ title: string } & HasId>
}
export type OrderByDateApi = {
    date: string,
    orders: OrderApi[]
}