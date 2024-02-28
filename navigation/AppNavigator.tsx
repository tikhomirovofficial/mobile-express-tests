import React, { FC, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "../pages/Account/Main";
import { StyleSheet, View, Text } from "react-native";
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
import { getProfile } from '../app/features/profile/profileSlice';
import { getAllPatients } from '../app/features/patients/patientsSlice';
import { checkToken } from '../app/features/login/loginSlice';
import PatientInfoModal from '../components/Modals/PatientInfoModal';
import { NavProps } from '../types/common.types';
import CreatePatient from '../pages/Inviting/CreatePatient';
import OrderInfoModal from '../components/Modals/OrderInfoModal';
import CheckExistsPatient from '../pages/Inviting/CheckExistsPatient';
import InvitingLinked from '../pages/Informational/InvitingLinked';
import { useAppTheme } from '../hooks/useTheme';
import DocsAccept from '../pages/Register/DocsAccept';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabs: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { patientInfoModal, orderInfoModal } = useAppSelector(state => state.modals)

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        <>
            <Tab.Navigator initialRouteName={"orders"} tabBar={(props) => <AppTab key={props.state.index} {...props} />}
                sceneContainerStyle={styles.main}
                screenOptions={{ headerShown: false, unmountOnBlur: true }}>
                <Tab.Screen name="orders" component={Main} />
                <Tab.Screen name="support" component={Support} />
                <Tab.Screen name="profile" component={Profile} />
            </Tab.Navigator>
            {
                patientInfoModal ? <PatientInfoModal navigation={navigation} /> : null

            }
            {
                orderInfoModal ? <OrderInfoModal /> : null
            }
        </>
    );
}

const AppNavigator = () => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    //Тут нужно получить состояния авторизованности пользователя, наличия пин-кода, первый ли раз заходит чел
    const { token } = useAppSelector(state => state.login)
    const { data, loadings, has_profile, has_docs } = useAppSelector(state => state.profile)
    const { alreadyBeen, accepted, pin, faceId } = useAppSelector(state => state.access)
    const inviting = useAppSelector(state => state.inviting)
    const { patientData, success } = useAppSelector(state => state.order)
    const { contacts, media, notifications } = useAppSelector(state => state.permissions)

    // const getInitialRoute = () => {
    //     if (token.valid) {
    //         if (accepted.valid) {
    //             if (!faceId.connected && !faceId.asked) {
    //                 return 'bio_connect'
    //             }
    //             if (!notifications.granted) {
    //                 return "info_notifications"
    //             }
    //             // if (!media.granted) {
    //             //     return "info_media"
    //             // }
    //             // if (!contacts.granted) {
    //             //     return "info_contacts"
    //             // }
    //             return "home"
    //         }
    //         return "pin_accept"
    //     }
    //     if (!alreadyBeen.valid) {
    //         return "welcome"
    //     }
    //     return "login_phone"
    // }

    const getInitialRoute = () => {
        return "loading"
    }

    return (
        <NavigationContainer>
            <View style={[styles.main, { backgroundColor: theme.main_bg }]}>

                <Stack.Navigator initialRouteName={getInitialRoute()}
                    screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.main_bg } }}>


                    {
                        !token.valid ?
                            <>
                                {!alreadyBeen.valid ? <Stack.Screen name="welcome" component={WelcomeContainer} /> : null}
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
                                            {!faceId.connected ?
                                                !faceId.asked ?
                                                    <Stack.Screen name="bio_connect" component={ConnectBio} /> : null
                                                : null
                                            }
                                            {!notifications.granted ? <Stack.Screen name="info_notifications" component={AccessNotifications} /> : null}
                                            {/* {!media.granted ? <Stack.Screen name="info_media" component={AccessMedia} /> : null} */}
                                            {/* {!contacts.granted ? <Stack.Screen name="info_contacts" component={AccessContacts} /> : null} */}
                                            {
                                                has_profile === null ?
                                                    <>
                                                        <Stack.Screen name="loading" component={LoadingScreen} />
                                                    </> :
                                                    has_profile ?
                                                        <>
                                                            {!has_docs ? <Stack.Screen name="docs_accept" component={DocsAccept} /> : null}
                                                            <Stack.Screen name="home" component={MainTabs} />
                                                        </>
                                                        :
                                                        <Stack.Screen name="profile_create" component={CreateProfile} />
                                            }

                                            {/* //Приглашение */}

                                            <Stack.Screen name="inviting_exists" component={CheckExistsPatient} />
                                            {inviting.already_exists.val !== null ?
                                                <Stack.Screen name="inviting" component={CreatePatient} /> : null
                                            }

                                            <Stack.Screen name="inviting_check" component={CheckSelectedPatients} />
                                            {/* //Информативные экраны */}
                                            {inviting.form.success ? <Stack.Screen name="inviting_sent" component={InvitingSent} /> : null}

                                            {inviting.already_exists.val ? <Stack.Screen name="inviting_linked" component={InvitingLinked} /> : null}
                                            <Stack.Screen name="how_get_results" component={HowGetResults} />

                                            {/* //Создание заказа */}
                                            <Stack.Screen name="order_patient" component={SelectingPatient} />
                                            {
                                                patientData.id > 0 ?
                                                    <>
                                                        <Stack.Screen name="order_category" component={SelectingCategory} />
                                                        <Stack.Screen name="order_products" component={SelectingProducts} />
                                                        <Stack.Screen name="order_cart" component={CartProducts} />
                                                    </> : null
                                            }
                                            {success ? <Stack.Screen name="order_sent" component={OrderSent} /> : null}
                                            {/* <Stack.Screen name="order_category" component={SelectingCategory} />
                                            <Stack.Screen name="order_products" component={SelectingProducts} />
                                            <Stack.Screen name="order_cart" component={CartProducts} /> */}

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