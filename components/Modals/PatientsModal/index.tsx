import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, StyleSheet, Text, View, FlatList, ActivityIndicator, ModalProps } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import PatientItem from "../../PatientItem";
import {
    handlePatientInfoModal,
    handlePatientsModal
} from "../../../app/features/modals/modalsSlice";
import { ModalCustomProps, NavProps } from "../../../types/common.types";
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../SkeletonView';
import { getPatientById } from '../../../app/features/current-data/currentData';
import { getAllPatients, incrementPatientsPart, resetAllPatients } from '../../../app/features/patients/patientsSlice';
import { usePagination } from '../../../hooks/usePagination';
import { fs } from '../../../navigation/AppNavigator';
import { useAppTheme } from '../../../hooks/useTheme';
import PatientInfoModal from '../PatientInfoModal';
import { ModalShadow } from '../../ModalShadow';

const PatientsModal: FC<NavProps & ModalCustomProps> = ({ navigation, level = 1 }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { patientsModal, patientInfoModal } = useAppSelector(state => state.modals)
    const patients = useAppSelector(state => state.patients)

    const [loadOrders, loadMore] = usePagination(
        () => { dispatch(getAllPatients({ part: patients.part })) },
        () => { dispatch(incrementPatientsPart()) },
        {
            part: patients.part,
            can_more: patients.can_next,
            items: patients.list,
            loading: patients.loadings.patients_pagination
        }
    )

    const handleModal = () => dispatch(handlePatientsModal())

    const toInviting = () => {
        handleModal()
        navigation.navigate('inviting_exists')
    }

    const handlePatientInfo = (id: number) => {
        dispatch(handlePatientInfoModal())
        dispatch(getPatientById({ id }))
    }

    useEffect(loadOrders, [patients.part])

    useEffect(() => {
        return () => {
            dispatch(resetAllPatients())
        }
    }, [])

    return (
        <Modal style={{ position: "relative" }} animationType={"slide"} visible={patientsModal} transparent={true}>
            <ModalShadow show={patientsModal} />
            <WhiteBordered isModal transparentBg modalLevel={level} scrollable={false} style={{ ...cs.modalSlidedBottom, position: "relative" }}>
                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw, cs.fAlCenter]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM, cs.modalCloseText]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi, { color: theme.text_label }]}>Мои пациенты</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>

                    <View style={[cs.flexOne, cs.spaceM, cs.fColumn]}>
                        {
                            patients.loadings.patients ?
                                <>
                                    <SkeletonContainer backgroundColor={theme.skeleton}>
                                        <View style={[cs.flexOne, cs.spaceM, cs.fColumn]}>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                            <SkeletonView height={60} width={"100%"}></SkeletonView>
                                        </View>
                                    </SkeletonContainer>
                                </> :
                                <View style={[cs.flexOne]}>
                                    {
                                        patients.list.length ?
                                            <>
                                                <View style={[cs.flexOne, { position: "relative" }]}>
                                                    <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                                        <FlatList
                                                            showsVerticalScrollIndicator={false}
                                                            data={patients.list}
                                                            onEndReached={loadMore}
                                                            style={[cs.fColumn]}
                                                            renderItem={({ item, index }) => (
                                                                <PatientItem
                                                                    bottomText={`${item.phone}`}
                                                                    neededBottomBorder={index < patients.list.length - 1}
                                                                    handlePress={() => handlePatientInfo(item.id)}
                                                                    {...item} />
                                                            )} />

                                                    </View>
                                                </View>
                                                <View style={{ height: 20 }}>
                                                    {patients.loadings.patients_pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}
                                                </View>

                                            </>
                                            :
                                            <Text style={[fs.montR, { color: theme.text_label }]}>Вы пока не пригласили ни одного пациента.</Text>
                                    }
                                </View>
                        }
                        <ButtonYellow handlePress={toInviting}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Пригласить пациентов</Text>
                        </ButtonYellow>
                    </View>
                </View>
            </WhiteBordered>
            {
                patientInfoModal ? <PatientInfoModal navigation={navigation} /> : null

            }
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
    patientsModalBlock: {
        minHeight: "100%",
        paddingBottom: 32
    },
    patientsContent: {
        flex: 1
    },
})
export default PatientsModal;