
export type AnalysisType = {
    id: number,
    name: string
}
export type OrderAnalysisType = {
    orderNumber: string,
    date: string,
    customer: string,
    handlePress?: () => void,
    paid: boolean
    analysisList?: AnalysisType[]
}
export type OrderAnalysisDetails = {
    doctorName: string,
    customerFull: string
    results: string
} & OrderAnalysisType