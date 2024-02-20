import React, { FC, useEffect } from 'react';
import FeauturesLayout from "../../layouts/FeaturesLayout";
import { Text, TouchableOpacity, View, Linking, AppState } from "react-native";
import { cs } from "../../common/styles";
import { useAppDispatch } from "../../app/base/hooks";
import { setWelcomeStep } from "../../app/features/welcome/welcomeSlice";
import ButtonYellow from "../../components/Buttons/ButtonYellow";
import InfoPageLayout from '../../layouts/InfoPageLayout';
import AppContainer from '../../components/AppContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import * as Notifications from 'expo-notifications'
import { checkNotificationsPerm, setNotificationPerm } from '../../app/features/permissions/permissionsSlice';
const InfoNotificationsImage = require('../../assets/info_notifications.jpg')

const AccessNotifications: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const getNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            dispatch(setNotificationPerm(true))
            return
        }
        if (status === "denied") {
            Linking.openSettings()
            return;
        }

    };

    useEffect(() => {
        const subscriptrion = AppState.addEventListener("change", (e) => {
            if (e === "active") {
                dispatch(checkNotificationsPerm())
            }
        })
        return () => {
            subscriptrion.remove()
        }

    }, [])

    return (
        <InfoPageLayout title='Разрешите присылать уведомления' image={InfoNotificationsImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <FeauturesLayout features={[
                    "Вы не пропустите информацию о готовности анализов",
                    "Получите уведомление о зачислении бонусов"
                ]} />

                <View style={[cs.fColumn, cs.flexOne, cs.spaceM]}>
                    <View style={[cs.flexOne]}>
                        <Text style={[cs.flexOne, fs.montR, cs.fzXS, cs.fwMedium, cs.colorGray]}>
                            Нажав кнопку «Разрешить», вы соглашаетесь с <Text onPress={() => { }} style={cs.textYellow}>пользовательским соглашением</Text> и подтверждаете, что ознакомились с <Text onPress={() => { }} style={cs.textYellow}>политикой конфиденциальности</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={[cs.flexOne]} onPress={getNotificationPermission}>
                        <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                            colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Разрешить</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default AccessNotifications;