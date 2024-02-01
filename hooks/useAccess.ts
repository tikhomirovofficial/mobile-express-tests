import { useState } from "react"

export const useAccess = () => {
    const [firstTime, setFirstTime] = useState(false)
    const [pinAccepted, setPinAccepted] = useState(false)
    const [auth, setAuth] = useState(false)
    return {
        isFirstTime: firstTime,
        pinAccepted: pinAccepted,
        authorized: auth
    }
}