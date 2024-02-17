import React, { useEffect, useState } from 'react';
import useFonts from "./hooks/useFonts";
import { StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./navigation/AppNavigator";
import { Logo } from './icons';
import { cs } from './common/styles';
import { useAppDispatch, useAppSelector } from './app/base/hooks';
import { checkToken } from './app/features/login/loginSlice';
import { checkPinCodeExists, checkFirstTime } from './app/features/access/accessSlice';
import { deleteTokens, getTokens, storeTokens } from './utils/storeTokens';
import { deleteAlreadyBeen } from './utils/storeFirstTime';
import { deleteAccessed } from './utils/storeAccessed';
import { getHasProfile } from './app/features/profile/profileSlice';
import { checkContactsPerm, checkMediaPerm, checkNotificationsPerm } from './app/features/permissions/permissionsSlice';
import PatientInfoModal from './components/Modals/PatientInfoModal';
import { deletePin } from './utils/storePin';


const Root = () => {
    const dispatch = useAppDispatch()

    const { token } = useAppSelector(state => state.login)
    const { has_profile } = useAppSelector(state => state.profile)
    const { pin, alreadyBeen, faceId } = useAppSelector(state => state.access)
    const { notifications, media, contacts } = useAppSelector(state => state.permissions)
    const [fontsLoaded] = useFonts();
    const [refreshing, setRefreshing] = React.useState(false);
    const allAccessesAndPermissionsDefined = !token.checking && !pin.checking && !alreadyBeen.checking && !notifications.checking && !contacts.checking && !media.checking

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (allAccessesAndPermissionsDefined) {
            console.log(`
            token: ${token.valid},\n 
            pin exists: ${pin.exists},\n 
            already been: ${alreadyBeen.valid},\n
            face id connected: ${faceId.connected},\n
            face id asked: ${faceId.asked},\n
            notifications_perm: ${notifications.granted},\n
            contacts_perm: ${contacts.granted},\n
            media_perm: ${media.granted},\n
            `);
        }
    }, [pin.checking, token.checking, pin.checking, alreadyBeen.checking, notifications.checking, contacts.checking, media.checking])

    useEffect(() => {
        if (token.valid) {
            dispatch(getHasProfile())
        }
    }, [token.valid])

    useEffect(() => {
        // deleteTokens()
        // deleteAlreadyBeen()
        // deleteAccessed()
        // deletePin()
        dispatch(checkToken())
        dispatch(checkPinCodeExists())
        dispatch(checkFirstTime())

        dispatch(checkNotificationsPerm())
        dispatch(checkContactsPerm())
        dispatch(checkMediaPerm())
    }, [])

    if (fontsLoaded && allAccessesAndPermissionsDefined) {
        return (
            <>
                <StatusBar style={"auto"} />
                <View style={{ flex: 1 }}>
                    <AppNavigator />
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