import { jwtDecode } from "jwt-decode";
import decoder from 'react-native-base64'
import { deleteTokens, getTokens } from "./storeTokens";

export const checkIsValid = async () => {
    const tokens = await getTokens();
    if (tokens) {
        const refresh: string | undefined = tokens?.refresh;
        return refresh.length > 20
    } else {
        return false;
    }
}