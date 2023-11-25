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
const InfoInvitingSentImage = require('../../assets/info_inviting_sent.jpg')

const InvitingSent = () => {
    const dispatch = useAppDispatch()

    const nextStep = () => {
        dispatch(setWelcomeStep(1))
    }
    return (
        <InfoPageLayout title='Приглашения отправлены' image={InfoInvitingSentImage} content={
            <AppContainer style={{ flex: 1, ...cs.spaceXXL }}>
                <FeauturesLayout features={[
                    <Text>После перехода по ссылке и регистрации, пациент появится в разделе <Text style={cs.textYellow}>«Мои пациенты»</Text> в вашем профиле</Text>
                ]} />

                <View style={[cs.fColumn, cs.flexOne, cs.spaceM, {
                    justifyContent: "flex-end"
                }]}>

                    <View style={[cs.fColumn, cs.spaceXL]}>
                        <TouchableOpacity style={[cs.flexOne]} onPress={nextStep}>
                            <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Закрыть</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: "center" }}>
                            <Text style={[cs.fzM, fs.montR, cs.textYellow, cs.fwMedium]}>Пригласить других пациентов</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </AppContainer>

        }></InfoPageLayout>
    );
};

export default InvitingSent;