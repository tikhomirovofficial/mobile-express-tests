import { resetAccess } from "../app/features/access/accessSlice"
import { logout } from "../app/features/login/loginSlice"
import { resetProfileData } from "../app/features/profile/profileSlice"
import { useAppDispatch } from "../app/base/hooks"

export const useLogout = () => {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
        dispatch(resetProfileData())
        dispatch(resetAccess())
    }
    return {
        handleLogout
    }
}