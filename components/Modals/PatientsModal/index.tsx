import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, StyleSheet, Text, View, FlatList } from "react-native";
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
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../SkeletonView';

const PatientsModal: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { patientsModal, patientInfoModal } = useAppSelector(state => state.modals)
    const patients = useAppSelector(state => state.patients)

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
            <WhiteBordered scrollable={false} style={{ ...cs.modalSlidedBottom }}>
                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Мои пациенты</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>

                    <View style={[cs.flexOne, cs.spaceM, cs.fColumn]}>
                        {
                            patients.loadings.patients ?
                                <>
                                    <SkeletonContainer>
                                        <View style={[cs.flexOne, cs.spaceM, cs.fColumn]}>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                        </View>
                                    </SkeletonContainer>
                                </> :
                                <View style={[cs.flexOne, { position: "relative" }]}>
                                    <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                            <FlatList
                                                data={patients.list}
                                                style={[cs.fColumn, styles.patientsList]}
                                                renderItem={({ item }) => (
                                                    <PatientItem handlePress={handlePatientInfo} {...item} />
                                                )} />

                                        </View>

                                </View>
                        }
                        <ButtonYellow handlePress={toInviting}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Пригласить пациентов</Text>
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