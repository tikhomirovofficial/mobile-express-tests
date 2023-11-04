import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Main from "../pages/Account/Main";
import {StyleSheet, View} from "react-native";
import {cs} from "../common/styles";
import WelcomeContainer from "../containers/WelcomeContainer";

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <View style={styles.main}>
                <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false, contentStyle: cs.rootBg}}>
                    <Stack.Screen name="Home" component={Main}/>
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