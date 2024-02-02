import { getPin } from "./storePin";

export const checkEnteredPin = async (entered_pin: string) => {
    const storedPin = await getPin();
    return entered_pin === storedPin
}