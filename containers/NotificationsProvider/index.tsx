import { useEffect, useState, FC, useRef } from 'react'
import { HasNodeChildren } from '../../types/common.types';
import { registerForPushNotificationsAsync } from '../../notifications';
import * as Notifications from 'expo-notifications';
import { useAppSelector } from '../../app/base/hooks';

export const NotificationsProvider: FC<HasNodeChildren> = ({ children }) => {
    const { has_docs } = useAppSelector(state => state.profile)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [_, setNotification] = useState(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        console.log(expoPushToken);
    }, [expoPushToken])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(Boolean(notification));
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return children
}
