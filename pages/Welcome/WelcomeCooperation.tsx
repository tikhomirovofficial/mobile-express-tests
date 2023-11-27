import React, { FC } from 'react';
import FeauturesLayout from "../../layouts/FeaturesLayout";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cs } from "../../common/styles";
import { useAppDispatch } from "../../app/base/hooks";
import { setWelcomeStep } from "../../app/features/welcome/welcomeSlice";
import { NavProps } from "../../types/common.types";
import InfoPageLayout from '../../layouts/InfoPageLayout';
import AppContainer from '../../components/AppContainer';
const WelcomeCooperationImage = require('../../assets/welcome_cooperative.jpg')

const WelcomePatients: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const toLoginStep = () => {
        navigation.navigate("login_phone")
    }
    const toPrevStep = () => {
        dispatch(setWelcomeStep(1))
    }

    return (
        <InfoPageLayout title='Ваше сотрудничество с нашей лабораторией' image={WelcomeCooperationImage} content={
            <AppContainer style={{flex: 1, ...cs.spaceXXL}}>
                <FeauturesLayout step={2} features={[
                    "Бонусная программа для вас и выгодные условия для ваших клиентов",
                    "Сдача анализов происходит в нашей лабораторной службе",
                    "Подходит для врачей, тренеров и блогеров",
                ]} />
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

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default WelcomePatients;