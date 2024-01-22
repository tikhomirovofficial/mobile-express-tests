import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from "../../components/Buttons/ButtonYellow";
import { FaceIdIcon, PhotoIcon, SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import SelectableBtn from '../../components/SelectableBtn';

const CreateProfile: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const handleCreateProfile = () => {

    }

    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Настройки</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: "100%", paddingBottom: 32 }]}>
                        <View style={[styles.profileDataContent, cs.spaceM]}>
                            <ScrollView>
                                <View style={[cs.spaceXL]}>
                                    <View style={[cs.fColumn, cs.spaceXXL]}>
                                        <Text style={[cs.title, styles.title]}>Укажите информацию о себе для пациентов</Text>
                                        <View style={[cs.spaceXL]}>
                                            <View style={[cs.fCenterCol, cs.spaceM]}>
                                                <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                                                    <PhotoIcon />
                                                </View>
                                                <TouchableOpacity>
                                                    <Text style={[cs.fwBold, cs.textYellow, cs.fzS, cs.txtCenter]}>Добавить
                                                        фото</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelLastName">Фамилия</Text>
                                                <TextInput accessibilityLabelledBy={"labelLastName"} placeholder={"Фамилия"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Имя</Text>
                                                <TextInput accessibilityLabelledBy={"labelFirstName"} placeholder={"Имя"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Отчество</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"Отчество"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Пол</Text>
                                                <View style={[cs.dF, cs.fRowBetw, cs.spaceS, cs.flexOne]}>
                                                    <SelectableBtn isFilled={true} style={styles.selectableBtn} text={"Мужской"} handlePress={() => { }} />
                                                    <SelectableBtn isFilled={false} style={styles.selectableBtn} text={"Женский"} handlePress={() => { }} />
                                                </View>
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Дата рождения</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"ДД.ММ.ГГГГ"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Серия и номер паспорта</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"СССС НННННН"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Когда выдан</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"ДД.ММ.ГГГГ"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Кем выдан</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"Кем выдан паспорт"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">E-mail</Text>
                                                <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"E-mail"}
                                                    style={[styles.inputField, cs.fzM, fs.montR]} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            <ButtonYellow handlePress={() => {}}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Сохранить</Text>
                            </ButtonYellow>
                        </View>
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    inputField: {
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderStyle: "solid",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E2E9"
    },
    selectableBtn: {
        minWidth: 144,
        height: 52
    },
    profileInfo: {
        maxWidth: 228
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    block: {
        height: 80,
    },
    title: {
        maxWidth: 220
    },
    bonuses: {
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    profileHubItem: {
        paddingVertical: 14,
        borderRadius: 16,
        overflow: "hidden",
        gap: 18,
        minWidth: 140
    },
    profileItemIcon: {
        height: 64,
        width: 64
    },
    profileDataBlock: {
        minHeight: "100%"
    },
    profileDataContent: {
        flex: 1,
    }
})
export default CreateProfile;