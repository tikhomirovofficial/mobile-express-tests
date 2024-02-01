import { useEffect, useState } from "react";
import { deleteTokens, getTokens } from "../utils/storeTokens";
import { jwtDecode } from "jwt-decode";


const useToken = () => {
    const [isRefreshValid, setIsRefreshValid] = useState(false)

    const checkIsValid = async () => {
        const tokens = await getTokens();
        if (tokens) {
            const refresh: string | undefined = tokens?.refresh;
            if (refresh.length) {
                const decodedToken: { exp: number } = jwtDecode(refresh);

                const currentTimestamp = Math.floor(Date.now() / 1000);
                const isExpiredToken = decodedToken.exp < currentTimestamp

                if (isExpiredToken) {
                    await deleteTokens()
                    return false
                }

                const hasUserId = "user_id" in decodedToken;

                return !!(refresh && hasUserId);
            }
            return false;

        } else {
            return false;
        }


    }

    useEffect(() => {
        (async () => {

        })()
    }, [])

    return {
        valid: isRefreshValid,
        checkValid: checkIsValid
    }
};

export default useToken;