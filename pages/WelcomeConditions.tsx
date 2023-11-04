import React from 'react';
import FeauturesLayout from "../layouts/FeaturesLayout";
import {Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {cs} from "../common/styles";
import {useAppDispatch} from "../app/base/hooks";
import {setWelcomeStep} from "../app/features/welcome/welcomeSlice";

const WelcomePatients = () => {
    const dispatch = useAppDispatch()
    const toPrevStep = () => {
        dispatch(setWelcomeStep(0))
    }
    return (
        <FeauturesLayout features={[
                        "Конфиденциальность ваших контактных данных",
                        "Соответствие всем требованиям к персональным данным",
                        "Приглашение новых пациентов за два шага",
                        "Удобный и понятный интерфейс приложения",
                    ]}
                         step={1}
                         image={"step_1.jpg"}
                         title={"Комфортные условия вашей работы"}
                         buttonContent={
                            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                <View style={[cs.flexOne, cs.fCenterCol]} >
                                    <TouchableOpacity onPress={toPrevStep}>
                                        <Text style={[cs.fClickableGray, cs.fzM]}>назад</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={[cs.flexOne]} onPress={() => dispatch(setWelcomeStep(2))}>
                                    <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                        <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                     }/>
    );
};


export default WelcomePatients;