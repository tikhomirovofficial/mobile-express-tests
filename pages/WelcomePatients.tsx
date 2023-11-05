import React from 'react';
import FeauturesLayout from "../layouts/FeaturesLayout";
import {Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {cs} from "../common/styles";
import {useAppDispatch} from "../app/base/hooks";
import {setWelcomeStep} from "../app/features/welcome/welcomeSlice";
import ButtonYellow from "../components/Buttons/ButtonYellow";
const WelcomePatients = () => {
    const dispatch = useAppDispatch()

    const nextStep = () => {
        dispatch(setWelcomeStep(1))
    }
    return (
        <FeauturesLayout features={[
                        "Приглашайте своих пациентов по номеру телефона",
                        "Назначайте им необходимые анализы",
                        "Отслеживайте статус заказ",
                        "Просматривайте результаты, назначенных анализов",
                    ]}
                         step={0}
                         image={"step_1.jpg"}
                         title={"Работа с вашими пациентами"}
                         buttonContent={
                             <ButtonYellow handlePress={nextStep}>
                                 <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                             </ButtonYellow>
                     }/>
    );
};

export default WelcomePatients;