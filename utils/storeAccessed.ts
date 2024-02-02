import { deleteStorage, getStorage, setStorage } from "./store"

export const storeAccessed = async (accessed: boolean) => {
    await setStorage("accessed", accessed)
}

export const getAccessed = async (): Promise<boolean> => {
    return await getStorage("accessed") as boolean
}

export const deleteAccessed = async () => {
    await deleteStorage("accessed")
}