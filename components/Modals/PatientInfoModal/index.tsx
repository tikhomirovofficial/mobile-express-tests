import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, StyleSheet, Text, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import {
    handleOrderInfoModal,
    handlePatientInfoModal,
    handlePatientOrderInfoModal
} from "../../../app/features/modals/modalsSlice";
import { PhotoIcon } from "../../../icons";
import AnalysisCard from "../../Cards/AnalysisCard";
import OrderInfoModal from "../OrderInfoModal";
import { setPatient } from '../../../app/features/order/orderSlice';
import { NavProps } from '../../../types/common.types';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../SkeletonView';
import { normalizeDate } from '../../../utils/normalizeDate';
import { getOrdersByPatientId, resetPatientInfo } from '../../../app/features/current-data/currentData';

const PatientInfoModal: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { patientInfoModal, patientOrderInfoModal } = useAppSelector(state => state.modals)
    const { patientInfo, loadings } = useAppSelector(state => state.currentData)

    const handleModal = () => dispatch(handlePatientInfoModal())

    const handleToOrder = () => {
        dispatch(setPatient({
            id: String(patientInfo.data.id),
            firstName: patientInfo.data.first_name,
            lastName: patientInfo.data.last_name
        }))
        navigation.navigate("order_category")
    }

    useEffect(() => {
        if (patientInfo.data.id) {
            dispatch(getOrdersByPatientId(patientInfo.data.id))
        }
    }, [patientInfo])

    useEffect(() => {
        return () => {
            dispatch(resetPatientInfo())
        }
    }, [])

    return (
        <Modal animationType={"slide"} visible={patientInfoModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom }}>
                <SkeletonContainer>
                    <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Пациент</Text>
                            </View>
                            <View style={{ flex: 0.4 }}></View>
                        </View>
                        <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                            {
                                loadings.patient_info ?
                                    <SkeletonView
                                        circle
                                        height={styles.avatarBlock.height}
                                        width={styles.avatarBlock.width}
                                    >

                                    </SkeletonView> :
                                    <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                                        <PhotoIcon />
                                    </View>
                            }
                            {
                                loadings.patient_info ?
                                    <View style={[cs.fColumn, cs.spaceS, cs.flexOne, cs.fAlCenter]}>
                                        <SkeletonView height={20} width={160}></SkeletonView>
                                        <SkeletonView height={20} width={190}></SkeletonView>
                                        <SkeletonView height={20} width={160}></SkeletonView>
                                    </View>



                                    :
                                    <Text style={[cs.fwBold, cs.fzXL, cs.txtCenter, styles.name]}>
                                        {patientInfo.data.last_name} {patientInfo.data.first_name} {patientInfo.data.subname || ""}
                                    </Text>
                            }

                            <ButtonYellow style={{ minWidth: "100%" }} handlePress={handleToOrder}>
                                <Text style={[cs.fzM, cs.yellowBtnText, cs.colorDark]}>Заказать анализы</Text>
                            </ButtonYellow>
                        </View>
                        <View style={[cs.spaceXL]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Личная информация</Text>
                                <View style={[styles.orderInfo]}>
                                    {
                                        loadings.patient_info ?
                                            <>
                                                <SkeletonView height={22} width={180}></SkeletonView>
                                                <SkeletonView height={22} width={190}></SkeletonView>
                                                <SkeletonView height={22} width={200}></SkeletonView>
                                            </> :
                                            <>
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM]}>Возраст</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>27 лет</Text>
                                                </View>
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM]}>Пол</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Мужской</Text>
                                                </View>
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM]}>Телефон</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{patientInfo.data.phone}</Text>
                                                </View>
                                            </>
                                    }
                                </View>
                            </View>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Анализы</Text>
                                <View style={[cs.spaceS]}>

                                    {
                                        loadings.patient_info ?
                                            Array(3).fill("").map(item => (
                                                <SkeletonView height={100} width={"100%"} />
                                            )) :
                                            patientInfo.orders.length > 0 ?
                                                patientInfo.orders.map((item, index) => (
                                                    <AnalysisCard
                                                        handlePress={() => dispatch(handleOrderInfoModal())}
                                                        key={item.id}
                                                        paid={true}
                                                        date={normalizeDate(item.date)}
                                                        id={item.id}
                                                        customer={`Имя Фамилия`}
                                                        analysisList={[]} />
                                                ))
                                                : <Text>Пока пусто.</Text>
                                    }

                                </View>
                            </View>
                        </View>

                    </View>
                </SkeletonContainer>

            </WhiteBordered>
            {
                patientOrderInfoModal ? <OrderInfoModal /> : null
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
        paddingBottom: 24,
        minHeight: "100%"
    },
    patientsContent: {
        flex: 1
    },
})
export default PatientInfoModal;