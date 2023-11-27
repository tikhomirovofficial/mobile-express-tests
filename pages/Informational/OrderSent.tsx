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
const OrderSentImage = require('../../assets/order_sent.jpg')

const OrderSent: FC<NavProps> = ({navigation}) => {
    const dispatch = useAppDispatch()

    const toOrders = () => {
        navigation.navigate("home", {
            screen: "orders"
        })
    }
    const toHowGetResults = () => {
        navigation.navigate("how_get_results")
    }
    return (
        <InfoPageLayout title='Заказ отправлен пациенту' image={OrderSentImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <View style={[cs.fColumn, cs.spaceL]}>
                    <FeauturesLayout features={[
                        <Text>После подтверждения заказа будет начислено <Text style={cs.textBlue}>до 1000 бонусов</Text></Text>,
                        <Text>Пациент может сдать часть анализов по своему выбору, либо отказаться от заказа полностью</Text>
                    ]} />
                    <TouchableOpacity onPress={toHowGetResults} >
                        <Text style={[cs.fzM, fs.montR, cs.textYellow, cs.fwBold]}>Как узнать результаты?</Text>
                    </TouchableOpacity>
                </View>


                <View style={[cs.fColumn, cs.flexOne, cs.spaceM, {
                    justifyContent: "flex-end"
                }]}>

                    <View style={[cs.fColumn, cs.spaceXL]}>
                        <TouchableOpacity style={[cs.flexOne]} onPress={toOrders}>
                            <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Закрыть</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default OrderSent;