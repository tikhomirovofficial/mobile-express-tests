import { HasId } from "../common.types";

export type CategoryApi = {
    color: string
    istake: boolean
    name: string
    take: number
} & HasId