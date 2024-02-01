import { useState } from "react"
import useToken from "./useToken"

export const useAccess = () => {
    const [firstTime, setFirstTime] = useState(true)
    const [pinAccepted, setPinAccepted] = useState(false)
    //const [auth, setAuth] = useState(false)
    const auth = useToken()
    return {
        isFirstTime: firstTime,
        pinAccepted: pinAccepted,
        authorized: auth
    }
}