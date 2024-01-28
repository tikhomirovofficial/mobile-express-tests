import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {Modal, StyleSheet, Text, TextInput, View} from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import {cs} from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import {handlePatientInvitingModal} from "../../../app/features/modals/modalsSlice";
import {fs} from "../../../navigation/AppNavigator";

const PatientInvitingModal = () => {
    const dispatch = useAppDispatch()
    const {patientInvitingModal} = useAppSelector(state => state.modals)
    const handleModal = () => dispatch(handlePatientInvitingModal())

    return (
        <Modal animationType={"slide"} visible={patientInvitingModal} transparent={true}>
            <WhiteBordered style={{...cs.modalSlidedBottom}}>
                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Новый номер</Text>
                        </View>
                        <View style={{flex: 0.4}}></View>
                    </View>
                    <View style={[cs.fColumn, cs.spaceL]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <Text style={[cs.fzXL, cs.fwBold]}>Приглашение пациента</Text>
                            <Text style={[cs.fzS, cs.colorGray, fs.montR]}>Введите номер в строке ниже, чтобы пригласить
                                в приложение</Text>
                        </View>
                        <View style={[cs.fColumn, cs.spaceL]}>
                            <TextInput placeholder={"+7"}
                                       style={[styles.inputField, cs.fzM, fs.montR]}/>
                            <ButtonYellow handlePress={() => {
                            }}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                            </ButtonYellow>
                        </View>

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
    orderInfo: {
        maxWidth: 251,
        gap: 8
    },
    name: {
        maxWidth: "70%"
    },
    selectableBtn: {
        minWidth: 144,
        height: 52
    },
    profileInfo: {
        maxWidth: 251
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    patientsList: {},
    patientsModalBlock: {
        paddingBottom: 32,
        minHeight: "100%"
    },
    patientsContent: {
        flex: 1
    },
})
export default PatientInvitingModal;