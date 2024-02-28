import { useEffect } from 'react'
import { initNotificationsListen, getOrRegisterPushToken } from '../../notifications';
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { storePushToken } from '../../app/features/profile/profileSlice';

export const NotificationsProvider = () => {
    const dispatch = useAppDispatch()
    const notificationsGranted = useAppSelector(state => state.permissions.notifications.granted)
    const { token } = useAppSelector(state => state.login)
    const { push_token } = useAppSelector(state => state.profile)

    useEffect(() => {
        if (token.valid && notificationsGranted && push_token !== null) {
            (async () => {
                //если в ответ от has_token false, то делаем запрос к владу для записи токена
                const token = await getOrRegisterPushToken()
                if (!token) {
                    console.log("Ошибка генерации push-токена");
                    return

                }
                if (!push_token || push_token === "None" || push_token !== token) {
                    console.log("Отправляем: ", token);
                    dispatch(storePushToken({ token, is_push: true }))
                    return
                }
                initNotificationsListen()
            })()
        }
    }, [notificationsGranted, token.valid, push_token])

    return <></>
}
