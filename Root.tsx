import React from 'react';
import useFonts from "./hooks/useFonts";
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";


const Root = () => {
    const [fontsLoaded] = useFonts();

    if (fontsLoaded) {
        return (
           <>
               <StatusBar style={"auto"}/>
               <AppNavigator/>
           </>
        )
    }
    return (
        <Text>Загрузка</Text>

    );
};


export default Root;