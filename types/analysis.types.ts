
export type AnalysisType = {
    id: number,
    name: string
}
export type OrderAnalysisType = {
    orderNumber: string,
    date: string,
    customer: string,
    status: "PAID" | "NOT_PAID"
    analysisList?: AnalysisType[]
}
export type OrderAnalysisDetails = {
    doctorName: string,
    customerFull: string
    results: string
} & OrderAnalysisType