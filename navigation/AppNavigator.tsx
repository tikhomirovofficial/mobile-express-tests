import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Main from "../pages/Account/Main";
import {StyleSheet, View} from "react-native";
import {cs} from "../common/styles";
import WelcomeContainer from "../containers/WelcomeContainer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AppTab from "./AppTabs";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppTabs = () => {
    return (
        <Tab.Navigator tabBar={(props) => <AppTab key={props.state.key} {...props}/>}
                       sceneContainerStyle={styles.main}
                       screenOptions={{headerShown: false}}>
            <Tab.Screen name="Главная" component={Main}/>
            <Tab.Screen name="Поддержка" component={Main}/>
            <Tab.Screen name="Профиль" component={Main}/>
        </Tab.Navigator>
    );
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <View style={styles.main}>
                <Stack.Navigator initialRouteName={"Home"}
                                 screenOptions={{headerShown: false, contentStyle: cs.rootBg}}>
                    <Stack.Screen name="Home" component={AppTabs}/>
                    <Stack.Screen name="Register" component={WelcomeContainer}/>
                </Stack.Navigator>
            </View>

        </NavigationContainer>
    )
};
const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
        backgroundColor: "#F4FAFA",
    },
    mainScroll: {
        flex: 1,
    }
})
export default AppNavigator;