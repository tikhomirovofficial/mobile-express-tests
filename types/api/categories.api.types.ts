import { ResponseStatus } from "../common.types"
import { CategoryApi } from "../entities/categories.types"

export type CategoriesGetReq = {
    title?: string 
}

export type CategoriesGetRes = {
    category: CategoryApi[]
} & ResponseStatus
