import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "../pages/Account/Main";
import { StyleSheet, View } from "react-native";
import { cs } from "../common/styles";
import WelcomeContainer from "../containers/WelcomeContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import CartProducts from '../pages/PrepareAnalysis/CartProducts';
import CreateProfile from '../pages/Register/CreateProfile';
import AcceptPinCode from '../pages/Register/AcceptPinCode';
import { useAccess } from '../hooks/useAccess';
import { useAppDispatch, useAppSelector } from '../app/base/hooks';
import { getAllOrders, getProfile } from '../app/features/profile/profileSlice';
import { getAllPatients } from '../app/features/patients/patientsSlice';
import { checkToken } from '../app/features/login/loginSlice';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabs = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProfile())
        dispatch(getAllPatients())
    }, [])

    return (
        <Tab.Navigator initialRouteName={"orders"} tabBar={(props) => <AppTab key={props.state.index} {...props} />}
            sceneContainerStyle={styles.main}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="orders" component={Main} />
            <Tab.Screen name="support" component={Support} />
            <Tab.Screen name="profile" component={Profile} />
        </Tab.Navigator>
    );
}
const AppNavigator = () => {
    const dispatch = useAppDispatch()
    //Тут нужно получить состояния авторизованности пользователя, наличия пин-кода, первый ли раз заходит чел
    const { token } = useAppSelector(state => state.login)
    const { data, loadings } = useAppSelector(state => state.profile)
    const { alreadyBeen, accepted, pin } = useAppSelector(state => state.access)

    const getInitialRoute = () => {
        if (token.valid) {
            if (accepted.valid) {
                return "home"
            }
            return "pin_accept"
        }
        if (!alreadyBeen.valid) {
            return "welcome"
        }
        return "login_phone"
    }

    return (
        <NavigationContainer>
            <View style={styles.main}>
                <Stack.Navigator initialRouteName={getInitialRoute()}
                    screenOptions={{ headerShown: false, contentStyle: cs.rootBg }}>
                    {
                        !token.valid ?
                            <>
                                {
                                    !alreadyBeen.valid ? <Stack.Screen name="welcome" component={WelcomeContainer} /> : null
                                }
                                <Stack.Screen name="login_phone" component={LoginPhone} />
                                <Stack.Screen name="sms_login" component={CodePhoneAccept} />
                            </>
                            :
                            <>

                                {
                                    !accepted.valid ?
                                        !pin.exists ?
                                            <Stack.Screen name="pin_create" component={CreatePinCode} />
                                            :
                                            <Stack.Screen name="pin_accept" component={AcceptPinCode} /> :
                                        <>
                                            {/* //Профиль */}
                                            {
                                                !data.first_name.length ?
                                                    <Stack.Screen name="home" component={MainTabs} /> :
                                                    <Stack.Screen name="profile_create" component={CreateProfile} />
                                            }

                                            {/* //Приглашение */}
                                            <Stack.Screen name="inviting" component={SelectingPatients} />
                                            <Stack.Screen name="inviting_check" component={CheckSelectedPatients} />
                                            {/* //Регистрация */}
                                            {/* //Логин */}
                                            {/* //Доступы */}
                                            <Stack.Screen name="info_contacts" component={AccessContacts} />
                                            <Stack.Screen name="info_media" component={AccessMedia} />
                                            <Stack.Screen name="info_notifications" component={AccessNotifications} />
                                            <Stack.Screen name="bio_connect" component={ConnectBio} />
                                            {/* //Информативные экраны */}
                                            <Stack.Screen name="inviting_sent" component={InvitingSent} />
                                            <Stack.Screen name="order_sent" component={OrderSent} />
                                            <Stack.Screen name="how_get_results" component={HowGetResults} />
                                            {/* //Создание заказа */}
                                            <Stack.Screen name="order_patient" component={SelectingPatient} />
                                            <Stack.Screen name="order_category" component={SelectingCategory} />
                                            <Stack.Screen name="order_products" component={SelectingProducts} />
                                            <Stack.Screen name="order_cart" component={CartProducts} />
                                        </>
                                }
                            </>

                    }



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