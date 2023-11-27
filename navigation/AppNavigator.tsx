import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Main from "../pages/Account/Main";
import {StyleSheet, View} from "react-native";
import {cs} from "../common/styles";
import WelcomeContainer from "../containers/WelcomeContainer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AppTab from "./AppTabs";
import Profile from "../pages/Account/Profile";
import Support from "../pages/Account/Support";
import SelectingPatients from "../pages/Inviting/SelectingPatients";
import AccessContacts from '../pages/Informational/AccessContacts';
import AccessMedia from '../pages/Informational/AccessMedia';
import AccessNotifications from '../pages/Informational/AccessNotifications';
import InvitingSent from '../pages/Informational/InvitingSent';
import OrderSent from '../pages/Informational/OrderSent';
import HowGetResults from '../pages/Informational/HowGetResults';
import LoginPhone from '../pages/Register/RegisterPhone';
import CodePhoneAccept from '../pages/Register/CodePhoneAccept';
import CreatePinCode from '../pages/Register/CreatePinCode';
import ConnectBio from '../pages/Register/ConnectBio';
import CheckSelectedPatients from '../pages/Inviting/CheckSelectedPatients';
import SelectingPatient from '../pages/PrepareAnalysis/SelectingPatient';
import SelectingCategory from '../pages/PrepareAnalysis/SelectingCategory';
import SelectingProducts from '../pages/PrepareAnalysis/SelectingProducts';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabs = () => {
    return (
        <Tab.Navigator initialRouteName={"orders"} tabBar={(props) => <AppTab key={props.state.index} {...props}/>}
                       sceneContainerStyle={styles.main}
                       screenOptions={{headerShown: false}}>
            <Tab.Screen name="orders" component={Main}/>
            <Tab.Screen name="support" component={Support}/>
            <Tab.Screen name="profile" component={Profile}/>
        </Tab.Navigator>
    );
}
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <View style={styles.main}>
                <Stack.Navigator initialRouteName={"order_products"}
                                 screenOptions={{headerShown: false, contentStyle: cs.rootBg}}>
                    <Stack.Screen name="home" component={MainTabs}/>
                    <Stack.Screen name="inviting" component={SelectingPatients}/>
                    <Stack.Screen name="register" component={WelcomeContainer}/>
                    <Stack.Screen name="info_contacts" component={AccessContacts}/>
                    <Stack.Screen name="info_media" component={AccessMedia}/>
                    <Stack.Screen name="info_notifications" component={AccessNotifications}/>
                    <Stack.Screen name="inviting_sent" component={InvitingSent}/>
                    <Stack.Screen name="order_sent" component={OrderSent}/>
                    <Stack.Screen name="how_get_results" component={HowGetResults}/>
                    <Stack.Screen name="login_phone" component={LoginPhone}/>
                    <Stack.Screen name="sms_login" component={CodePhoneAccept}/>
                    <Stack.Screen name="pin_create" component={CreatePinCode}/>
                    <Stack.Screen name="bio_connect" component={ConnectBio}/>
                    <Stack.Screen name="inviting_check" component={CheckSelectedPatients}/>
                    <Stack.Screen name="order_patient" component={SelectingPatient}/>
                    <Stack.Screen name="order_category" component={SelectingCategory}/>
                    <Stack.Screen name="order_products" component={SelectingProducts}/>
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
export const fs = StyleSheet.create({
    montR: {
        fontFamily: "MontserratRegular"
    }
})
export default AppNavigator;