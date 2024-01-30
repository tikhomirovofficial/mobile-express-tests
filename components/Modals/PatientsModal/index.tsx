import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, StyleSheet, Text, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import PatientItem from "../../PatientItem";
import {
    handleOrderInfoModal,
    handlePatientInfoModal, handlePatientInvitingModal,
    handlePatientsModal
} from "../../../app/features/modals/modalsSlice";
import PatientInfoModal from "../PatientInfoModal";
import { NavProps } from "../../../types/common.types";
import { ModalContainer } from '../../ModalContainer';

const PatientsModal: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { patientsModal, patientInfoModal } = useAppSelector(state => state.modals)
    const handleModal = () => dispatch(handlePatientsModal())
    
    const toInviting = () => {
        handleModal()
        navigation.navigate('inviting')
    }
    const handlePatientInfo = () => {
        dispatch(handlePatientInfoModal())
    }

    return (
        <Modal animationType={"slide"} visible={patientsModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom }}>
                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Мои пациенты</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[styles.patientsContent, cs.fColumnBetw]}>
                        <View style={[cs.fColumn, styles.patientsList]}>
                            <PatientItem handlePress={handlePatientInfo} avatarSrc={null}
                                firstName={"Иван"} lastName={"Иванов"} phone={"+7 (951) 735-00-00"} />
                        </View>
                        <ButtonYellow handlePress={toInviting}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Пригласить пациентов</Text>
                        </ButtonYellow>
                    </View>
                </View>
                {
                    patientInfoModal ? <PatientInfoModal navigation={navigation} /> : null
                }

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
    patientsList: {},
    patientsModalBlock: {
        minHeight: "100%",
        paddingBottom: 32
    },
    patientsContent: {
        flex: 1
    },
})
export default PatientsModal;