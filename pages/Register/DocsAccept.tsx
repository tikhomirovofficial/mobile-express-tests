import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from '../../components/Buttons/ButtonYellow';
import { SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import MaskInput from 'react-native-mask-input';
import { createNumberMask, Masks } from 'react-native-mask-input';
import { handleLoginForm, resetLoginCodeStatus, resetLoginPhoneStatus, sendAuthPhone } from '../../app/features/login/loginSlice';
import { phoneMask } from '../../rules/masks.rules';
import { InputField } from '../../components/InputField';
import { useAppTheme } from '../../hooks/useTheme';
import { DocumentItem } from '../../components/DocumentItem';



const DocsAccept: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { docs_url } = useAppSelector(state => state.profile)

    const downloadDocs = () => {
        const url = "https://iit.csu.ru/content/docs/students/science/Nauchnaja_statja_magistra.pdf"
        
    }

    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>Договор</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: "100%", paddingBottom: 32 }]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.title, { color: theme.title }]}>Подпишите договор</Text>
                                    <Text style={[cs.fzS, fs.montR, { color: theme.text_val }]}>Нажмите кнопку <Text style={[cs.fwSemi, { color: theme.text_label }]}>Подписать</Text>, чтобы подписать договор. Нажмите <Text style={[cs.fwSemi, { color: theme.text_label }]}>Скачать</Text>, чтобы сохранить документ на ваше устройство.</Text>
                                </View>
                                <DocumentItem to={docs_url} title={"Агентский договор"} neededBorder={false} />
                            </View>
                            <TouchableOpacity>
                                <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                    <Text style={[cs.fzM, cs.yellowBtnText]}>Подписать</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={[cs.fCenterCol]}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={[cs.fClickableGray, cs.fzM, cs.fwMedium, cs.textYellow]}>Скачать</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};

export default DocsAccept;