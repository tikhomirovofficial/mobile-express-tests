import React from 'react';
import FeauturesLayout from "../layouts/FeaturesLayout";
import {Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {cs} from "../common/styles";
import {useAppDispatch} from "../app/base/hooks";
import {setWelcomeStep} from "../app/features/welcome/welcomeSlice";
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
                         <TouchableOpacity onPress={nextStep}>
                             <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                             colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                 <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                             </LinearGradient>
                         </TouchableOpacity>
                     }/>
    );
};

export default WelcomePatients;