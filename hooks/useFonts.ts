import React, {useState} from 'react';
import * as Font from "expo-font";

async function loadFonts() {
    await Font.loadAsync({
        'MontserratRegular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'MontserratMedium': require('../assets/fonts/Montserrat-Medium.ttf'),
        'MontserratSemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'MontserratBold': require('../assets/fonts/Montserrat-Bold.ttf'),
    })
}

const UseFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (!fontsLoaded) {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }
    return [fontsLoaded]
};

export default UseFonts;