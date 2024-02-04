import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer, { containerStyles } from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from "../../components/Buttons/ButtonYellow";
import { FaceIdIcon, PhotoIcon, SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import SelectableBtn from '../../components/SelectableBtn';
import MaskInput from 'react-native-mask-input';
import { dateMask, passport, phoneMask } from '../../rules/masks.rules';
import { handleCreateProfileForm, handleCreateProfileGender } from '../../app/features/profile/profileSlice';
import { InputField } from '../../components/InputField';

const CreateProfile: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { text_fields, gender } = useAppSelector(state => state.profile.creating_form)

    const handleCreateProfile = () => {
        console.log(text_fields);
    }

    useEffect(() => {
        return () => {
            //clear form
        }
    }, [])

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
                                                    <Text onPress={() => alert("Будет доступно в следующих версиях.")} style={[cs.fwBold, cs.textYellow, cs.fzS, cs.txtCenter]}>Добавить
                                                        фото</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelLastName">Фамилия</Text>
                                                <InputField
                                                    val={text_fields.last_name}
                                                    placeholder={"Фамилия"}
                                                    idInput={"labelLastName"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "last_name", val }))}
                                                />

                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Имя</Text>
                                                <InputField
                                                    val={text_fields.first_name}
                                                    placeholder={"Имя"}
                                                    idInput={"labelFirstName"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "first_name", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Отчество</Text>
                                                <InputField
                                                    val={text_fields.subname}
                                                    placeholder={"Отчество"}
                                                    idInput={"labelMiddleName"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "subname", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Пол</Text>
                                                <View style={[cs.dF, cs.fRowBetw, cs.spaceS, cs.flexOne]}>
                                                    <SelectableBtn isFilled={gender === 1} style={[styles.selectableBtn]} text={"Мужской"} handlePress={() => dispatch(handleCreateProfileGender(1))} />
                                                    <SelectableBtn isFilled={gender === 0} style={[styles.selectableBtn]} text={"Женский"} handlePress={() => dispatch(handleCreateProfileGender(0))} />
                                                </View>
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="dateDob">Дата рождения</Text>
                                                <InputField
                                                    mask={dateMask}
                                                    type={"number-pad"}
                                                    val={text_fields.dob}
                                                    placeholder={"ДД.ММ.ГГГГ"}
                                                    idInput={"dateDob"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "dob", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="pass">Серия и номер паспорта</Text>
                                                <InputField
                                                    mask={passport}
                                                    type={"number-pad"}
                                                    val={text_fields.passport_numbers}
                                                    placeholder={"СССС НННННН"}
                                                    idInput={"pass"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "passport_numbers", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="pass-date">Когда выдан</Text>
                                                <InputField
                                                    mask={dateMask}
                                                    type={"number-pad"}
                                                    val={text_fields.passport_issue_date}
                                                    placeholder={"ДД.ММ.ГГГГ"}
                                                    idInput={"pass-date"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "passport_issue_date", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Кем выдан</Text>
                                                <InputField
                                                    val={text_fields.passport_issued_by}
                                                    placeholder={"Кем выдан паспорт"}
                                                    idInput={"labelMiddleName"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "passport_issued_by", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">E-mail</Text>
                                                <InputField
                                                    val={text_fields.email}
                                                    placeholder={"E-mail"}
                                                    idInput={"labelMiddleName"}
                                                    onChange={val => dispatch(handleCreateProfileForm({ key: "email", val }))}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            <ButtonYellow isFilled={true} handlePress={handleCreateProfile}>
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
        height: 52,
        width: (containerStyles.container.maxWidth / 2) - 10
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