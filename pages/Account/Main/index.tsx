import React, {useEffect, useState} from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import {Animated, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {Logo} from "../../../icons";
import AnalysisCard from "../../../components/Cards/AnalysisCard";
import {OrderAnalysisType} from "../../../types/analysis.types";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {handleOrderInfoModal} from "../../../app/features/modals/modalsSlice";

const analysisData: OrderAnalysisType[] = [
    {
        customer: "Владислав Тузов",
        date: "25.09.2023",
        orderNumber: "02-014",
        status: "PAID"
    },
    {
        customer: "Александр Тузов",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    }
]
const Main = () => {
    const dispatch = useAppDispatch()
    const {orderInfoModal} = useAppSelector(state => state.modals)
    const scaleValue = new Animated.Value(1);

    useEffect(() => {
        if (orderInfoModal) {
            Animated.spring(scaleValue, {
                toValue: .8,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true
            }).start();
        }
    }, [orderInfoModal, scaleValue]);
    return (
        <Animated.ScrollView style={{transform: [{scale: scaleValue}]}}>
            <WhiteBorderedLayout style={{
                paddingTop: 32
            }}>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Вячеслав, добрый день!</Text>
                    <View style={[cs.fRowBetw, styles.buttonsTopContainer]}>
                        <TouchableOpacity
                            style={[
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne,
                                styles.buttonDark
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.colorWhite, cs.txtCenter]}>Пригласить в Экспресс Тест</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonWhite,
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.txtCenter]}>Назначить анализы</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Заказы анализов</Text>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        {
                            analysisData.map((item, index) => (
                                <AnalysisCard key={index} {...item}/>
                            ))
                        }
                    </View>
                </View>
            </WhiteBorderedLayout>
            <Modal style={{
                backgroundColor: "black",

            }} animationType={"slide"} visible={orderInfoModal} transparent={true}>
                <WhiteBordered style={cs.modalSlidedBottom}>
                    <View style={styles.analysisOrderContent}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={() => dispatch(handleOrderInfoModal())}
                                  style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, styles.labelOrderNum]}>Заказ №</Text>
                                <View style={[cs.lightGray]}>
                                    <Text style={[cs.colorDark, styles.orderNumber]}>102-20</Text>
                                </View>
                            </View>
                            <Text style={[cs.fzM, cs.colorGray]}>25.09.2023</Text>
                        </View>
                        <View style={[styles.analysisOrderColumn]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Информация о заказе</Text>
                                <View style={[styles.orderInfo]}>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Статус</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Отправлен</Text>
                                    </View>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Назначил(а)</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Подосёнов В. С.</Text>
                                    </View>
                                    <View style={[cs.fRowBetw]}>
                                        <Text style={[cs.colorGray, cs.fzM]}>Пациент</Text>
                                        <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Тузов В.В.</Text>
                                    </View>


                                </View>
                            </View>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Результаты анализов</Text>
                                <Text style={[cs.colorGray, cs.fzM]}>
                                    Здесь появится возможность скачать результаты анализов после того, как пациент оплатит и сдаст анализы в нашей лаборатории.
                                </Text>
                            </View>
                            <View style={[cs.spaceM]}>
                                <View style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <Text style={[cs.fzXL, cs.fwBold]}>Список анализов</Text>
                                    <Text style={[styles.analysisCount]}>2</Text>
                                </View>

                                <View style={[cs.fColumn]}>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>1. Бактериальная панель (IgE) (П)</Text>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>2. Т3 свободный (П)</Text>
                                    <Text style={[cs.fwMedium, cs.colorDark, cs.fzM]}>3. ФСГ (фолликулостимулирующий гормон) (П)</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                </WhiteBordered>
            </Modal>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    analysisOrderContent: {
        gap: 40
    },
    analysisOrderColumn: {
        gap: 32
    },
    analysisCount: {
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginTop: 3,
        borderRadius: 1000,
        backgroundColor: "#FFCF00",
        fontSize: 11,
        fontWeight:"600"
    },
    orderInfo: {
        maxWidth: 240,
        gap: 8
    },
    buttonsTopContainer: {
        gap: 16,
        marginBottom: 48
    },
    orderNumber: {
        fontSize: 13
    },
    buttonTop: {
        padding: 20,
        alignItems: "center",
        overflow: "hidden",
        gap: 10,
        borderRadius: 16
    },
    labelOrderNum: {
        fontWeight: "500"
    },
    buttonDark: {
        backgroundColor: "#4D4D4D",
    },
    buttonWhite: {
        shadowColor: "rgb(19, 101, 101)",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 20,
        backgroundColor: "white",
        shadowRadius: 7,
        elevation: 7,
    }
})
export default Main;