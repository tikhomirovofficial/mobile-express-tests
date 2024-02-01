import React, { useEffect, useState } from 'react';
import useFonts from "./hooks/useFonts";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import { Logo } from './icons';
import { cs } from './common/styles';
import { useAppDispatch, useAppSelector } from './app/base/hooks';
import { checkToken } from './app/features/login/loginSlice';


const Root = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(state => state.login)
    const [fontsLoaded] = useFonts();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    
    useEffect(() => {
        dispatch(checkToken())
    }, [])
    
    if (fontsLoaded && !token.checking) {
        return (
            <>
                <StatusBar style={"auto"} />
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <AppNavigator />
                    </ScrollView>
                </View>


            </>
        )
    }
    return (
        <View style={[cs.flexOne, cs.fCenterCol]}>
            <Logo height={100} width={70} />
        </View>

    );
};


export default Root;