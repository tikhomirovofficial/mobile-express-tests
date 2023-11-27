import React, { FC } from 'react';
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
import { NavProps } from '../../types/common.types';
const InfoGetResultsImage = require('../../assets/info_get_results.jpg')

const HowGetResults: FC<NavProps> = ({navigation}) => {
    const dispatch = useAppDispatch()

    const toHome = () => {
        navigation.navigate("home", {
            screen: "orders"
        })
    }
    return (
        <InfoPageLayout title='Как узнать результаты?' image={InfoGetResultsImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <FeauturesLayout features={[
                    "По готовности вам придёт уведомление в приложении",
                    "Информацию по заказу вы можете найти на главном экране в разделе “Заказы анализов”."
                ]} />
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <TouchableOpacity onPress={toHome} style={[cs.flexOne]}>
                        <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                            colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Закрыть</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
               

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default HowGetResults;