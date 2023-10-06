import {StatusBar} from 'expo-status-bar';
import {Button, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import AppContainer from "./components/AppContainer";
import ContentWrapper from "./components/ContentWrapper";
import {commonStyles} from "./common/styles";
import {LinearGradient} from "expo-linear-gradient";
import * as Font from 'expo-font';
import React, {useEffect, useState} from "react";
import {CheckboxIcon} from "./icons";
import WelcomeStep from "./pages/WelcomeStep";

async function loadFonts() {
    await Font.loadAsync({
        'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'MontserratSemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
    })
}

function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Вызываем функцию для загрузки шрифта
    if (!fontsLoaded) {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    }

    if(fontsLoaded) {
        return (
            <View style={styles.main}>


                <WelcomeStep features={["1", "2"]} step={1} title={"Работа с вашими пациентами"} buttonContent={
                    <TouchableOpacity>
                        <LinearGradient style={[commonStyles.yellowBtn, commonStyles.fCenterCol]} colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                            <Text style={[commonStyles.fzM, commonStyles.yellowBtnText]}>Далее</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                }/>
                <StatusBar style="auto"/>
            </View>
        )
    }
    return (
        <Text>Загрузка</Text>

    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
        backgroundColor: "#F4FAFA",
        paddingBottom: 30
    }
});
export default App
