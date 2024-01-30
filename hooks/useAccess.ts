import { useState } from "react"

export const useAccess = () => {
    const [firstTime, setFirstTime] = useState(false)
    const [pinAccepted, setPinAccepted] = useState(true)
    const [auth, setAuth] = useState(true)
    return {
        isFirstTime: firstTime,
        pinAccepted: pinAccepted,
        authorized: auth
    }
}