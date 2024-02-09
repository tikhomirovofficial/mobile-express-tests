import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

const BonusesModal = () => {
    const dispatch = useAppDispatch()
    const { bonusesModal, bonusesBottomSheet, analysisInfoModal } = useAppSelector(state => state.modals)
    const patients = useAppSelector(state => state.patients)
    const bonuses = useAppSelector(state => state.bonuses)

    const handleModal = () => {
        dispatch(handleBonusesModal())
    }
    const handleOpenPatientInfo = (patient: PatientApi) => {
        dispatch(setPatientData(patient))
        dispatch(getOrdersByPatientId(patient.id))
        dispatch(handleBonusesBottomSheet())
    }
    useEffect(() => {
        dispatch(getChartBonusesData())
    }, [])

    return (

        <Modal animationType={"slide"} visible={bonusesModal} transparent={true}>
            <GestureHandlerRootView style={[cs.flexOne]}>
                <WhiteBordered scrollable={false} style={{ ...cs.modalSlidedBottom, paddingBottom: 20}}>
                    <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={handleModal}
                                style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Бонусы</Text>
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

                                    <View style={[cs.wBlockShadow, cs.fCenterCol, { borderRadius: 16, paddingVertical: 10 }]}>
                                        <BonusesChart />
                                    </View>



                                }
                                <ButtonYellow style={[cs.fCenterRow, cs.spaceS]} handlePress={() => { }}>
                                    <HeartIcon />
                                    <Text style={[cs.colorDark, cs.fwSemi, cs.fzM]}>Вывести бонусы</Text>
                                </ButtonYellow>
                            </View>
                            <FlatList data={patients.list} style={[cs.fColumn]} renderItem={({ item, index }) => (
                                <PatientItem
                                    handlePress={() => handleOpenPatientInfo(item)}
                                    bottomText={`${item.bonus} бонусов за всё время`}
                                    neededBottomBorder={index !== patients.list.length - 1}
                                    {...item} />
                            )} />

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