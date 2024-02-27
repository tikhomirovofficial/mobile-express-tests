import { useEffect } from 'react'
import { initNotificationsListen, registerForPushNotificationsAsync } from '../../notifications';
import { useAppSelector } from '../../app/base/hooks';

export const NotificationsProvider = () => {
    const notificationsGranted = useAppSelector(state => state.permissions.notifications.granted)
    const { token } = useAppSelector(state => state.login)
    const { has_docs } = useAppSelector(state => state.profile)
    const has_notif_token = false

    useEffect(() => {
        if (token.valid && notificationsGranted && has_docs !== null) {
            (async () => {
                //если в ответ от has_token false, то делаем запрос к владу для записи токена
                if (!has_docs) {
                    const token = await registerForPushNotificationsAsync()
                    console.log(token);
                    return
                }
                //Слушаются уведомления
                console.log("Слушаем");
                
                initNotificationsListen()
            })()
        }
    }, [notificationsGranted, token.valid, has_docs])

    return <></>
}
