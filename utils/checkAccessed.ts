import { getPin } from "./storePin";

export const checkPinExists = async () => {
    const pinExists = await getPin();

    if (!pinExists) {
        return false
    }
    return true
}