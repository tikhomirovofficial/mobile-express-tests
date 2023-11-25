import React from 'react';
import FeauturesLayout from "../../layouts/FeaturesLayout";
import { Text, TouchableOpacity, View, Linking } from "react-native";
import { cs } from "../../common/styles";
import { useAppDispatch } from "../../app/base/hooks";
import { setWelcomeStep } from "../../app/features/welcome/welcomeSlice";
import ButtonYellow from "../../components/Buttons/ButtonYellow";
import InfoPageLayout from '../../layouts/InfoPageLayout';
import AppContainer from '../../components/AppContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { fs } from '../../navigation/AppNavigator';
const InfoNotificationsImage = require('../../assets/info_notifications.jpg')

const AccessNotifications = () => {
    const dispatch = useAppDispatch()

    const nextStep = () => {
        dispatch(setWelcomeStep(1))
    }
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
                    <TouchableOpacity style={[cs.flexOne]} onPress={nextStep}>
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