import { HasId } from "../common.types"

export type AnalysisType = {
    id: number,
    name: string
}
export type OrderAnalysisType = {
    id: number,
    date: string,
    status: string,
    customer: string,
    customerHide?: boolean,
    handlePress?: () => void,
    paid: boolean
    analysisList?: AnalysisType[]
}
export type OrderAnalysisDetails = {
    doctorName: string,
    customerFull: string
    results: string
} & OrderAnalysisType


export type AnalysisApi = {
    cat: number,
    code: string,
    cost: number,
    info: string,
    maxdur: number,
    mindur: number,
    name: string,
    prepare: any[],
    tags: any[],
    templates: any[]
} & HasId