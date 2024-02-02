import { deleteStorage, getStorage, setStorage } from "./store"

export const storeAlreadyBeen = async (firstTime: boolean) => {
    await setStorage("alreadyBeen", firstTime)
}

export const getAlreadyBeen = async (): Promise<boolean> => {
    return await getStorage("alreadyBeen") as boolean
}

export const deleteAlreadyBeen = async () => {
    await deleteStorage("alreadyBeen")
}