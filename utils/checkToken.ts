import { jwtDecode } from "jwt-decode";
import decoder from 'react-native-base64'
import { deleteTokens, getTokens } from "./storeTokens";

export const checkIsValid = async () => {
    const tokens = await getTokens();
    if (tokens) {
        // const refresh: string | undefined = tokens?.refresh;
        // if (refresh.length) {
        //     const refreshDecoded = decoder.encode(refresh)
        //     const decodedToken: { exp: number } = jwtDecode(refreshDecoded);
        //     const currentTimestamp = Math.floor(Date.now() / 1000);
        //     const isExpiredToken = decodedToken.exp < currentTimestamp

        //     if (isExpiredToken) {
        //         await deleteTokens()
        //         return false
        //     }

        //     const hasUserId = "user_id" in decodedToken;
        //     return true
        //     return !!(refresh && hasUserId);
        // }
        return false;

    } else {
        return false;
    }


}