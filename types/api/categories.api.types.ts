import { HasNextPart, HasPart, ResponseStatus } from "../common.types"
import { AnalysisApi } from "../entities/analysis.types"
import { CategoryApi } from "../entities/categories.types"

export type CategoriesGetReq = {
    title?: string
    analiz?: string

} & HasPart

export type CategoriesGetRes = {
    category: CategoryApi[]
    analisis: AnalysisApi[]
} & ResponseStatus & HasNextPart
