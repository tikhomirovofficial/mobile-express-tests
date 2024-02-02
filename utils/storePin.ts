import { deleteStorage, getStorage, setStorage } from "./store"

export const storePin = async (pin: string) => {
    await setStorage("pin", pin)
}

export const getPin = async (): Promise<string> => {
    return await getStorage("pin") as string
}

export const deletePin = async () => {
    await deleteStorage("pin")
}