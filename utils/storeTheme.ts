import { deleteStorage, getStorage, setStorage } from "./store"

export const storeTheme = async (theme: string) => {
    await setStorage("theme", theme)
}

export const getTheme = async (): Promise<string> => {
    return await getStorage("theme") as string
}

export const deleteTheme = async () => {
    await deleteStorage("theme")
}