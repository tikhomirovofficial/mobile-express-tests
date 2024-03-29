import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import {cs} from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import {PhotoIcon} from "../../../icons";
import {fs} from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import {handleProfileEditModal} from "../../../app/features/modals/modalsSlice";

const ProfileEditModal = () => {
    const dispatch = useAppDispatch()
    const {profileEditModal} = useAppSelector(state => state.modals)
    const handleModal = () => {
        dispatch(handleProfileEditModal())
    }
    return (
        <Modal animationType={"slide"} visible={profileEditModal} transparent={true}>
            <WhiteBordered style={{...cs.modalSlidedBottom, paddingBottom: 20}}>
                <View style={[cs.flexOne, styles.profileDataBlock, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                              style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Личные данные</Text>
                        </View>
                        <View style={{flex: 0.4}}></View>
                    </View>
                    <View style={[styles.profileDataContent, cs.spaceM]}>
                        <ScrollView>
                            <View style={[cs.spaceXL]}>
                                <View style={[cs.fCenterCol, cs.spaceM]}>
                                    <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                                        <PhotoIcon/>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={[cs.fwBold, cs.textYellow, cs.fzS, cs.txtCenter]}>Добавить
                                            фото</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.fzS, fs.montR]} aria-label="Label for Username"
                                          nativeID="labelLastName">Фамилия</Text>
                                    <TextInput accessibilityLabelledBy={"labelLastName"} placeholder={"Фамилия"}
                                               style={[styles.inputField, cs.fzM, fs.montR]}/>
                                </View>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.fzS, fs.montR]} aria-label="Label for Username"
                                          nativeID="labelFirstName">Имя</Text>
                                    <TextInput accessibilityLabelledBy={"labelFirstName"} placeholder={"Имя"}
                                               style={[styles.inputField, cs.fzM, fs.montR]}/>
                                </View>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.fzS, fs.montR]} aria-label="Label for Username"
                                          nativeID="labelMiddleName">Отчество</Text>
                                    <TextInput accessibilityLabelledBy={"labelMiddleName"} placeholder={"Отчество"}
                                               style={[styles.inputField, cs.fzM, fs.montR]}/>
                                </View>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.fzS, fs.montR]} aria-label="Label for Username"
                                          nativeID="labelFirstName">Пол</Text>
                                    <View style={[cs.dF, cs.fRowBetw, cs.spaceS, cs.flexOne]}>
                                        <SelectableBtn isFilled={true} style={styles.selectableBtn}  text={"Мужской"} handlePress={() => {}}/>
                                        <SelectableBtn isFilled={false} style={styles.selectableBtn}  text={"Женский"} handlePress={() => {}}/>
                                    </View>
                                </View>


                            </View>
                        </ScrollView>

                        <ButtonYellow handlePress={() => {}}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Сохранить</Text>
                        </ButtonYellow>
                    </View>

                </View>
            </WhiteBordered>
        </Modal>
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
export default ProfileEditModal;