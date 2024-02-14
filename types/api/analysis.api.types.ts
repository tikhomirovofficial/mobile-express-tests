import { ResponseStatus } from "../common.types"
import { AnalysisApi } from "../entities/analysis.types"

export type AnalysisGetReq = {
    id: number,
    part: number,
    title?: string
}
export type AnalysisGetRes = {
    can_next: boolean
    analiz: AnalysisApi[]
} & ResponseStatus

export type AnalysisGetByIdReq = {
    id: number
}
export type AnalysisGetByIdRes = {
    analiz: AnalysisApi
}
