import React from 'react';
import FeauturesLayout from "../../layouts/FeaturesLayout";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cs } from "../../common/styles";
import { useAppDispatch } from "../../app/base/hooks";
import { setWelcomeStep } from "../../app/features/welcome/welcomeSlice";
import AppContainer from '../../components/AppContainer';
import InfoPageLayout from '../../layouts/InfoPageLayout';
const WelcomeConditionsImage = require('../../assets/welcome_conditions.jpg')

const WelcomePatients = () => {
    const dispatch = useAppDispatch()
    const toPrevStep = () => {
        dispatch(setWelcomeStep(0))
    }
    const toNextStep = () => {
        dispatch(setWelcomeStep(2))
    }

    return (
        <InfoPageLayout handleSkip={() => { alert("skip") }} title='Комфортные условия вашей работы' image={WelcomeConditionsImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <FeauturesLayout step={1} features={[
                    "Конфиденциальность ваших контактных данных",
                    "Соответствие всем требованиям к персональным данным",
                    "Приглашение новых пациентов за два шага",
                    "Удобный и понятный интерфейс приложения",
                ]} />
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <View style={[cs.flexOne, cs.fCenterCol]} >
                        <TouchableOpacity onPress={toPrevStep}>
                            <Text style={[cs.fClickableGray, cs.fzM]}>назад</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[cs.flexOne]} onPress={toNextStep}>
                        <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                            colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </AppContainer>

        }></InfoPageLayout>
    );
};


export default WelcomePatients;