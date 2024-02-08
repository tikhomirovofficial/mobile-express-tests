import { FC, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { createProfile, resetCreateProfileForm, handleCreateProfileGender } from "../../../app/features/profile/profileSlice";
import { cs } from "../../../common/styles";
import AppContainer, { containerStyles } from "../../../components/AppContainer";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import { InputField } from "../../../components/InputField";
import SelectableBtn from "../../../components/SelectableBtn";
import { ArrowLeft, PhotoIcon } from "../../../icons";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { fs } from "../../../navigation/AppNavigator";
import { dateMask, passport, phoneMask } from "../../../rules/masks.rules";
import { ProfileCreateReq } from "../../../types/api/user.api.types";
import { NavProps } from "../../../types/common.types";
import { InvitingCreateReq } from "../../../types/api/patients.api.types";
import { handleCreateInvitingForm, handleCreateInvitingGender } from "../../../app/features/inviting/invitingSlice";


const CreatePatient: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { text_fields, gender, disabled, sending } = useAppSelector(state => state.inviting.form)

    const toBackScreen = () => {
        navigation.goBack()
    }

    const handleCreateInviting = () => {
        console.log(text_fields, gender);

    }

    useEffect(() => {
        return () => {
            dispatch(resetCreateProfileForm())
        }
    }, [])

    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRow, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={toBackScreen}>
                                    <ArrowLeft />
                                </TouchableOpacity>

                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Приглашение пациентов</Text>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: "100%", paddingBottom: 32 }]}>
                        <View style={[styles.profileDataContent, cs.spaceM]}>
                            <ScrollView>
                                <View style={[cs.spaceXL]}>
                                    <View style={[cs.fColumn, cs.spaceL]}>
                                        <View style={[cs.fColumn, cs.spaceM]}>
                                            <Text style={[cs.title]}>Приглашение пациента</Text>
                                            <Text style={[cs.fzS, fs.montR, cs.colorGray]}>Заполните данные ниже, чтобы пригласить пациента в приложение</Text>
                                        </View>
                                        <View style={[cs.spaceXL]}>

                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelLastName">Фамилия</Text>
                                                <InputField
                                                    val={text_fields.last_name}
                                                    placeholder={"Фамилия"}
                                                    idInput={"labelLastName"}
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "last_name", val }))}
                                                />

                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Имя</Text>
                                                <InputField
                                                    val={text_fields.first_name}
                                                    placeholder={"Имя"}
                                                    idInput={"labelFirstName"}
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "first_name", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">Отчество</Text>
                                                <InputField
                                                    val={text_fields.subname || ""}
                                                    placeholder={"Отчество"}
                                                    idInput={"labelMiddleName"}
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "subname", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="dateDob">Номер телефона</Text>
                                                <InputField
                                                    mask={phoneMask}
                                                    type={"number-pad"}
                                                    val={text_fields.dob}
                                                    placeholder={"+7"}
                                                    idInput={"dateDob"}
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "dob", val }))}
                                                />
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
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "dob", val }))}
                                                />
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelFirstName">Пол</Text>
                                                <View style={[cs.dF, cs.fRowBetw, cs.spaceS, cs.flexOne]}>
                                                    <SelectableBtn isFilled={gender === 1} style={[styles.selectableBtn]} text={"Мужской"} handlePress={() => dispatch(handleCreateInvitingGender(1))} />
                                                    <SelectableBtn isFilled={gender === 0} style={[styles.selectableBtn]} text={"Женский"} handlePress={() => dispatch(handleCreateInvitingGender(0))} />
                                                </View>
                                            </View>
                                            <View style={[cs.fColumn, cs.spaceM]}>
                                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Username"
                                                    nativeID="labelMiddleName">E-mail</Text>
                                                <InputField
                                                    val={text_fields.email}
                                                    placeholder={"E-mail"}
                                                    idInput={"labelMiddleName"}
                                                    onChange={val => dispatch(handleCreateInvitingForm({ key: "email", val }))}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            <ButtonYellow disabled={disabled} handlePress={handleCreateInviting}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
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
export default CreatePatient;