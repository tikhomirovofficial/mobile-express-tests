import { useState } from "react"
import useToken from "./useToken"
import { useAppSelector } from "../app/base/hooks"
import { getColors } from "../common/styles/themes"

export const useAppTheme = (): ReturnType<typeof getColors> => {
    const { theme } = useAppSelector(state => state.settings)
    return getColors(theme)
}