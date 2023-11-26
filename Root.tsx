import React, { useState } from 'react';
import useFonts from "./hooks/useFonts";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";


const Root = () => {
    const [fontsLoaded] = useFonts();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    if (fontsLoaded) {
        return (
            <>
                <StatusBar style={"auto"} />
                <View style={{ flex: 1 }}>
                    <ScrollView
                    
                        contentContainerStyle={{flexGrow: 1}}
                    
                    >
                        <AppNavigator />
                    </ScrollView>
                </View>

            </>
        )
    }
    return (
        <Text>Загрузка</Text>

    );
};


export default Root;