import React, { useState } from 'react';
import useFonts from "./hooks/useFonts";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";


const Root = () => {
    const [fontsLoaded] = useFonts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        // Здесь можно выполнить логику обновления данных
        // Например, запрос к серверу или обновление состояния

        // Предположим, что после выполнения логики обновления данных,
        // устанавливаем refreshing в false
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Задержка для имитации выполнения запроса
    };
    if (fontsLoaded) {
        return (
            <>
                <StatusBar style={"auto"} />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="gray"
                                colors={['gray']}
                            />
                        }
                    >
                        {/* Ваше содержимое страницы */}
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