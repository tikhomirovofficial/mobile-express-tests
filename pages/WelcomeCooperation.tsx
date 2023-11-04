import React from 'react';
import FeauturesLayout from "../layouts/FeaturesLayout";
import {Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {cs} from "../common/styles";
import {useAppDispatch} from "../app/base/hooks";
import {setWelcomeStep} from "../app/features/welcome/welcomeSlice";

const WelcomePatients = () => {
    const dispatch = useAppDispatch()
    const toLoginStep = () => {
        alert("to login")
    }
    const toPrevStep = () => {
        dispatch(setWelcomeStep(1))
    }

    return (
        <FeauturesLayout features={[
                        "Бонусная программа для вас и выгодные условия для ваших клиентов",
                        "Сдача анализов происходит в нашей лабораторной службе",
                        "Подходит для врачей, тренеров и блогеров",
                    ]}
                         step={2}
                         title={"Ваше сотрудничество с нашей лабораторией"}
                         buttonContent={
                             <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                 <View style={[cs.flexOne, cs.fCenterCol]} >
                                     <TouchableOpacity onPress={toPrevStep}>
                                         <Text style={[cs.fClickableGray, cs.fzM]}>назад</Text>
                                     </TouchableOpacity>
                                 </View>
                                 <TouchableOpacity style={[cs.flexOne]} onPress={toLoginStep}>
                                     <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                                     colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                         <Text style={[cs.fzM, cs.yellowBtnText]}>Начать</Text>
                                     </LinearGradient>
                                 </TouchableOpacity>
                             </View>
                     }/>
    );
};

export default WelcomePatients;