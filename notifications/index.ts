import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";
import Constants from "expo-constants";

export const initNotificationChannel = () => {
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
}
export const initNotificationsListen = () => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    initNotificationChannel()
}


export function handleNotificationResponse(response: any) {
    console.log(response);
}

export async function getOrRegisterPushToken() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    if (existingStatus === "granted") {
        const token = await Notifications.getExpoPushTokenAsync({
            projectId: `${Constants?.expoConfig?.extra?.eas.projectId}`
        });
        return token.data;
    }
    return false

}