import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { ActivityIndicator, Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleBonusesBottomSheet, handleBonusesModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import PatientItem from '../../PatientItem';
import { BarChart } from 'react-native-chart-kit';
import { ChartConfig, ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { BarChartProps } from 'react-native-chart-kit/dist/BarChart';
import { containerStyles } from '../../AppContainer';
import { OrderItem } from '../../OrderItem';
import { BonusesChart } from './BonusesChart';
import { BottomSheet } from '../../BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { ModalContainer } from '../../ModalContainer';
import { getOrdersByPatientId, setPatientData } from '../../../app/features/current-data/currentData';
import { PatientApi } from '../../../types/entities/patients.types';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../SkeletonView';
import { getChartBonusesData } from '../../../app/features/bonuses/bonusesSlice';
import { getAllPatients, incrementPatientsPart, resetAllPatients } from '../../../app/features/patients/patientsSlice';
import { usePagination } from '../../../hooks/usePagination';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useTheme';

const BonusesModal = () => {
    const dispatch = useAppDispatch()
    const { bonusesModal, bonusesBottomSheet } = useAppSelector(state => state.modals)
    const patients = useAppSelector(state => state.patients)
    const bonuses = useAppSelector(state => state.bonuses)
    const theme = useAppTheme()

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

    const handleModal = () => {
        dispatch(handleBonusesModal())
    }

    const handleOpenPatientInfo = (patient: PatientApi) => {
        dispatch(setPatientData(patient))
        // dispatch(getOrdersByPatientId({
        //     pacient: patient.id,
        //     part: 1
        // }))
        dispatch(handleBonusesBottomSheet())
    }

    useEffect(loadOrders, [patients.part])

    useEffect(() => {
        dispatch(getChartBonusesData())
        return () => {
            dispatch(resetAllPatients())
        }
    }, [])

    return (
        <Modal animationType={"slide"} visible={bonusesModal} transparent={true}>
            <GestureHandlerRootView style={[cs.flexOne]}>
                <WhiteBordered scrollable={false} style={{ ...cs.modalSlidedBottom }}>
                    <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={handleModal}
                                style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.fzM, cs.fwSemi, {color: theme.text_label}]}>Бонусы</Text>
                            </View>
                            <View style={{ flex: 0.4 }}></View>
                        </View>
                        <View style={[cs.flexOne, cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                {bonuses.loadings.chart ?
                                    <SkeletonContainer>
                                        <SkeletonView width={"100%"} height={170} />
                                    </SkeletonContainer>
                                    :
                                    <View style={[cs.wBlockShadow, cs.fCenterCol, { borderRadius: 16, paddingVertical: 10, backgroundColor: theme.chart}]}>
                                        <BonusesChart />
                                    </View>
                                }
                                <ButtonYellow style={[cs.fCenterRow, cs.spaceS]} handlePress={() => { }}>
                                    <HeartIcon />
                                    <Text style={[cs.colorDark, cs.fwSemi, cs.fzM]}>Вывести бонусы</Text>
                                </ButtonYellow>
                            </View>
                            {
                                patients.loadings.patients ?
                                    <>
                                        <SkeletonContainer>
                                            <View style={[cs.flexOne, cs.spaceS, cs.fColumn]}>
                                                <SkeletonView height={60} width={"100%"}></SkeletonView>
                                                <SkeletonView height={60} width={"100%"}></SkeletonView>
                                                <SkeletonView height={60} width={"100%"}></SkeletonView>
                                            </View>
                                        </SkeletonContainer>
                                    </> :
                                    <View style={cs.flexOne}>
                                        {
                                            patients.list.length ?
                                                <>
                                                    <FlatList
                                                        onEndReached={loadMore}
                                                        data={patients.list}
                                                        style={[cs.fColumn]}
                                                        renderItem={({ item, index }) => (
                                                            <PatientItem
                                                                handlePress={() => handleOpenPatientInfo(item)}
                                                                bottomText={`${item.bonus} бонусов за всё время`}
                                                                neededBottomBorder={index !== patients.list.length - 1}
                                                                {...item} />
                                                        )} />
                                                    <View style={{ height: 10 }}>
                                                        {patients.loadings.patients_pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}
                                                    </View>
                                                </>
                                                :
                                                <Text style={fs.montR}>Вы пока не пригласили ни одного пациента.</Text>
                                        }

                                    </View>
                            }
                        </View>
                    </View>
                </WhiteBordered>
                {bonusesBottomSheet ? <BottomSheet /> : null}
            </GestureHandlerRootView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        paddingBottom: 16
    },
    bonusesBlock: {
        paddingVertical: 27,
        paddingHorizontal: 24,
        borderRadius: 16
    },
    bonusesBlockContent: {
        maxWidth: 190
    },
    progressBonuses: {
        borderRadius: 100,
        position: "relative",
        flex: 1,
        height: 2,
        backgroundColor: "#E1E1E1"
    },
    progressBonusesFilled: {
        backgroundColor: "#12B2B3",
        left: 0,
        top: 0,
        height: "100%",
    },
})
export default BonusesModal;