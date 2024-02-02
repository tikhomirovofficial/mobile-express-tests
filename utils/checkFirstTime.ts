import { jwtDecode } from "jwt-decode";
import decoder from 'react-native-base64'
import { deleteTokens, getTokens } from "./storeTokens";
import { getAccessed } from "./storeAccessed";
import { getAlreadyBeen } from "./storeFirstTime";

export const checkIsAlreadyBeen = async () => {
    const alreadyBeen = await getAlreadyBeen();
    if (!alreadyBeen) {
        return false
    }
    return alreadyBeen
}