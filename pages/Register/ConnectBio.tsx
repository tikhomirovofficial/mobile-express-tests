import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from '../../components/SelectableBtn';
import { FaceIdIcon, SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { setFaceIdAsked } from '../../app/features/access/accessSlice';
import { useAppTheme } from '../../hooks/useTheme';

const ConnectBio: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()

    const handleToNotifications = () => {
        navigation.navigate("info_notifications")
    }
    const handleSkip = () => dispatch(setFaceIdAsked(true))
    const openNewPatient = () => dispatch(handlePatientInvitingModal())


    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, {color: theme.title}]}>Подключите биометрию</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: "100%", paddingBottom: 32 }]}>
                        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
                            <View style={[cs.spaceM, cs.fColumn, cs.fAlCenter, { gap: 64 }]}>
                                <FaceIdIcon />
                                <Text style={[cs.fzS, fs.montR, cs.fwMedium, cs.txtCenter, styles.bioConnectText, {color: theme.title}]}>Подключите вход с помощью Face ID, чтобы не вводить код доступа</Text>
                            </View>
                        </View>

                        <View style={[cs.fColumn, cs.spaceM]}>

                            <TouchableOpacity>
                                <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                    <Text style={[cs.fzM, cs.yellowBtnText]}>Разрешить</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={[cs.fCenterCol]}>
                                <TouchableOpacity onPress={handleToNotifications}>
                                    <Text onPress={handleSkip} style={[cs.fClickableGray, cs.fzM, cs.fwMedium, {color: theme.title}]}>Пропустить</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    bioConnectText: {
        maxWidth: 270
    }
})
export default ConnectBio;