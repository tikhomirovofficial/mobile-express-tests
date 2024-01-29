import { ResponseStatus } from "../common.types"
import { AnalysisApi } from "../entities/analysis.types"

export type AnalysisGetReq = {
    id: number,
    part: number,
    title?: string
}
export type AnalysisGetRes = {
    analiz: AnalysisApi[]
} & ResponseStatus

export type AnalysisGetByIdReq = {
    id: number
}
export type AnalysisGetByIdRes = {
    analiz: AnalysisApi
}
