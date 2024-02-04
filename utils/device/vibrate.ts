import { Vibration, Platform } from "react-native";

// vibrate is platform specific. default is 400ms
export const vibrate = (ms: number = 400) => {
    if (Platform.OS === "ios") {
        // this logic works in android too. you could omit the else statement
        const interval = setInterval(() => Vibration.vibrate(), 1000);
        // it will vibrate for 5 seconds
        setTimeout(() => clearInterval(interval), ms);
    } else {

        Vibration.vibrate(ms);
    }
};