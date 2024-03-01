import React, { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import {
    handleOrderInfoModal,
    handlePatientInfoModal,
    handlePatientOrderInfoModal,
    handlePatientsModal
} from "../../../app/features/modals/modalsSlice";
import { PhotoIcon } from "../../../icons";
import OrderCard from "../../Cards/OrderCard";
import OrderInfoModal from "../OrderInfoModal";
import { resetOrderBonusesTotal, setPatient } from '../../../app/features/order/orderSlice';
import { ModalCustomProps, NavProps } from '../../../types/common.types';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../SkeletonView';
import { normalizeDate } from '../../../utils/normalizeDate';
import { getOrdersByPatientId, incrementPatientOrdersPart, resetPatientInfo, resetPatientOrders } from '../../../app/features/current-data/currentData';
import { PaginationBottom } from '../../PaginationBottom';
import { usePagination } from '../../../hooks/usePagination';
import { fs } from '../../../navigation/AppNavigator';
import { useAppTheme } from '../../../hooks/useTheme';
import { formatPhoneNumber } from '../../../utils/formatePhone';
import { getAgeByDob } from '../../../utils/getAgeByDob';
import { clearCart } from '../../../app/features/cart/cartSlice';
import { ModalShadow } from '../../ModalShadow';

const PatientInfoModal: FC<NavProps & ModalCustomProps> = ({ navigation, level = 2 }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { patientInfoModal, patientOrderInfoModal, patientsModal } = useAppSelector(state => state.modals)
    const { patientInfo, loadings, parts, can_next } = useAppSelector(state => state.currentData)

    console.log(patientInfo);

    const handleModal = () => dispatch(handlePatientInfoModal())

    const handleToOrder = () => {
        dispatch(setPatient({
            id: 1,
            first_name: patientInfo.data.first_name,
            last_name: patientInfo.data.last_name
        }))
        // alert(patientInfo.data.id)
        dispatch(clearCart())
        handleModal()
        dispatch(resetOrderBonusesTotal())
        if (patientsModal) {
            dispatch(handlePatientsModal())
        }
        setTimeout(() => {
            navigation.navigate("order_category")
        }, 50)
    }

    const [loadOrders, loadMore] = usePagination(
        () => {
            dispatch(getOrdersByPatientId({
                pacient: patientInfo.data.id,
                part: parts.patients_orders
            }))
        },
        () => { dispatch(incrementPatientOrdersPart()) },
        {
            part: parts.patients_orders,
            can_more: can_next.patients_orders,
            items: patientInfo.orders,
            loading: loadings.patient_orders_pagination
        },
        [patientInfo.data.id]
    )

    useEffect(() => {
        if (patientInfo.data.id) {
            loadOrders()
        }

    }, [parts.patients_orders, patientInfo.data.id])

    useEffect(() => {
        return () => {
            dispatch(resetPatientInfo())
            dispatch(resetPatientOrders())
        }
    }, [])

    return (
        <Modal style={{ position: "relative" }} animationType={"slide"} visible={patientInfoModal} transparent={true}>
            <ModalShadow show={patientInfoModal} />
            <WhiteBordered isModal transparentBg modalLevel={level} style={{ ...cs.modalSlidedBottom, position: "relative" }}>
                <SkeletonContainer backgroundColor={theme.skeleton}>
                    <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                            <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM, cs.modalCloseText]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi, { color: theme.text_label }]}>Пациент</Text>
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
                                    <Text style={[cs.fwBold, cs.fzXL, cs.txtCenter, styles.name, { color: theme.title }]}>
                                        {patientInfo.data.last_name} {patientInfo.data.first_name} {patientInfo.data.subname || ""}
                                    </Text>
                            }

                            <ButtonYellow style={{ minWidth: "100%" }} handlePress={handleToOrder}>
                                <Text style={[cs.fzM, cs.yellowBtnText, cs.colorDark]}>Заказать анализы</Text>
                            </ButtonYellow>
                        </View>
                        <View style={[cs.spaceXL]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold, { color: theme.title }]}>Личная информация</Text>
                                <View style={[styles.orderInfo]}>
                                    {
                                        loadings.patient_info ?
                                            <>
                                                <SkeletonView height={22} width={180}></SkeletonView>
                                                <SkeletonView height={22} width={190}></SkeletonView>
                                                <SkeletonView height={22} width={200}></SkeletonView>
                                            </> :
                                            <>
                                                {/* <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM]}>Возраст</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>27 лет</Text>
                                                </View> */}
                                                {/* <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM]}>Пол</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Мужской</Text>
                                                </View> */}
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Телефон</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium, { color: theme.text_label }]}>{formatPhoneNumber(patientInfo.data.phone)}</Text>
                                                </View>
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Пол</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium, { color: theme.text_label }]}>{patientInfo.data.sex ? "Мужской" : "Женский"}</Text>
                                                </View>
                                                <View style={[cs.fRowBetw]}>
                                                    <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Возраст</Text>
                                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium, { color: theme.text_label }]}>{patientInfo.data?.dob ? getAgeByDob(patientInfo.data?.dob || "") : "Не указан"}</Text>
                                                </View>
                                            </>
                                    }
                                </View>
                            </View>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold, { color: theme.title }]}>Анализы</Text>
                                <View style={[cs.spaceS]}>

                                    {
                                        loadings.patient_orders ?
                                            Array(3).fill("").map(_ => (
                                                <SkeletonView height={100} width={"100%"} />
                                            )) :
                                            patientInfo.orders.length > 0 ?
                                                <View style={[cs.fColumn]}>
                                                    <FlatList
                                                        scrollEnabled={false}
                                                        data={patientInfo.orders}
                                                        style={{ overflow: "visible" }}
                                                        contentContainerStyle={[cs.fColumn, cs.spaceL]}
                                                        renderItem={({ item }) => (
                                                            <OrderCard
                                                                customerHide
                                                                status={item.status}
                                                                handlePress={() => dispatch(handlePatientOrderInfoModal())}
                                                                key={item.id}
                                                                paid={true}
                                                                date={normalizeDate(item.date)}
                                                                id={item.id}
                                                                customer={String(item.pacient)}
                                                                analysisList={[]} />
                                                        )}
                                                    />
                                                    <PaginationBottom onVisible={(inView) => inView ? loadMore() : null} />
                                                    {loadings.patient_orders_pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}

                                                </View>

                                                : <Text style={[fs.montR, { color: theme.text_label }]}>Анализы ещё не назначались.</Text>
                                    }

                                </View>
                            </View>
                        </View>

                    </View>
                </SkeletonContainer>

            </WhiteBordered>
            {
                patientOrderInfoModal ? <OrderInfoModal level={3} /> : null
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