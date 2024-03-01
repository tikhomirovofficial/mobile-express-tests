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
                <View style={cs.flexOne}></View>
                <View style={[cs.flexOne]}>

                    <View style={[cs.fColumn, cs.flexOne, cs.spaceM]}>
                        <Text style={[fs.montR, cs.fzXS, cs.fwMedium, cs.colorGray]}>
                            Нажав кнопку «Разрешить», вы соглашаетесь с <Text onPress={() => { }} style={cs.textYellow}>пользовательским соглашением</Text> и подтверждаете, что ознакомились с <Text onPress={() => { }} style={cs.textYellow}>политикой конфиденциальности</Text>
                        </Text>
                        <ButtonYellow style={{ minHeight: 54, flex: 1, width: "100%" }} handlePress={getNotificationPermission}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Разрешить</Text>
                        </ButtonYellow>
                    </View>
                </View>

            </AppContainer>
        }></InfoPageLayout>
    );
};

export default AccessNotifications;