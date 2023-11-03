import {StatusBar} from 'expo-status-bar';
import {Button, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import AppContainer from "./components/AppContainer";
import ContentWrapper from "./components/ContentWrapper";
import {commonStyles} from "./common/styles";
import {LinearGradient} from "expo-linear-gradient";

import React, {useEffect, useState} from "react";
import {CheckboxIcon} from "./icons";
import WelcomeStep from "./layouts/WelcomeStep";
import WelcomePatients from "./pages/WelcomePatients";
import useFonts from "./hooks/useFonts";



function App() {
    const [fontsLoaded] = useFonts();

    if(fontsLoaded) {
        return (
            <View style={styles.main}>
                <WelcomePatients/>
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
