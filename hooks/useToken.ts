import { useEffect, useState } from "react";
import { deleteTokens, getTokens } from "../utils/storeTokens";
import { jwtDecode } from "jwt-decode";


const useToken = () => {
    const [isRefreshValid, setIsRefreshValid] = useState(false)

    const checkIsValid = async () => {
        const tokens = await getTokens();
        if (tokens) {
            const refresh: string | undefined = tokens?.refresh;
            return refresh.length > 20
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