import React, { FC } from 'react';
import FeauturesLayout from "../../layouts/FeaturesLayout";
import { Text, TouchableOpacity, View } from "react-native";
import { cs } from "../../common/styles";
import { useAppDispatch } from "../../app/base/hooks";
import { setWelcomeStep } from "../../app/features/welcome/welcomeSlice";
import ButtonYellow from "../../components/Buttons/ButtonYellow";
import InfoPageLayout from '../../layouts/InfoPageLayout';
import AppContainer from '../../components/AppContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { NavProps } from '../../types/common.types';
const WelcomePatientsImage = require('../../assets/step_1.jpg')

const WelcomePatients: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()

    const nextStep = () => {
        dispatch(setWelcomeStep(1))
    }
    const toLoginStep = () => {
        navigation.navigate("login_phone")
    }

    return (
        <InfoPageLayout handleSkip={toLoginStep} title='Ваше сотрудничество с нашей лабораторией' image={WelcomePatientsImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <FeauturesLayout step={0} features={[
                    "Приглашайте своих пациентов по номеру телефона",
                    "Назначайте им необходимые анализы",
                    "Отслеживайте статус заказ",
                    "Просматривайте результаты, назначенных анализов",
                ]} />

                <ButtonYellow style={{ minHeight: 54, flex: 1, width: "100%" }} handlePress={nextStep}>
                    <Text style={[cs.fzM, cs.yellowBtnText]}>Начать</Text>
                </ButtonYellow>

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default WelcomePatients;