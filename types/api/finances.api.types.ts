import { ResponseStatus } from "../common.types"

export type BonusesDiagramGetRes = {
    bonuses: Record<string, number>
} & ResponseStatus
