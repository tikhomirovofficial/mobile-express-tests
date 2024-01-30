import React, { FC, useEffect } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import { Modal, StyleSheet, Text, View } from "react-native";
import { PopupProps } from "../../../types/common.types";
import { ModalContainer } from '../../ModalContainer';
import { useAppDispatch, useAppSelector } from '../../../app/base/hooks';
import { handleOrderInfoModal } from '../../../app/features/modals/modalsSlice';
import { getOrderById, resetOrderInfo } from '../../../app/features/current-data/currentData';
import { fs } from '../../../navigation/AppNavigator';

const OrderInfoModal = () => {
    const dispatch = useAppDispatch()
    const handleModal = () => dispatch(handleOrderInfoModal())
    const { orderInfoModal } = useAppSelector(state => state.modals)
    const { orderInfo: { info_order, analiz_list, results }, loadings } = useAppSelector(state => state.currentData)

    useEffect(() => {
        return () => {
            dispatch(resetOrderInfo())
        }
    }, [])

    return (
        <Modal animationType={"slide"} visible={orderInfoModal} transparent={true}>
            <WhiteBordered style={cs.modalSlidedBottom}>
                <View style={styles.analysisOrderContent}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, styles.labelOrderNum, cs.fwMedium]}>Заказ №</Text>
                            <View style={[cs.lightGray]}>
                                <Text style={[cs.colorDark, styles.orderNumber, fs.montR]}>{info_order.order_id}</Text>
                            </View>
                        </View>
                        <Text style={[cs.fzM, cs.colorGray, fs.montR]}>{info_order.date}</Text>
                    </View>
                    <View style={[styles.analysisOrderColumn]}>
                        <View style={[cs.spaceM]}>
                            <Text style={[cs.fzXL, cs.fwBold]}>{loadings.order ? "загрузка" : "Информация о заказе"}</Text>
                            <View style={[styles.orderInfo]}>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Статус</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.status}</Text>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Назначил(а)</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.doctor}</Text>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Пациент</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.pacient}</Text>
                                </View>


                            </View>
                        </View>
                        <View style={[cs.spaceM]}>
                            <Text style={[cs.fzXL, cs.fwBold]}>Результаты анализов</Text>
                            <Text style={[cs.colorGray, cs.fzM]}>
                                Здесь появится возможность скачать результаты анализов после того, как пациент
                                оплатит и сдаст анализы в нашей лаборатории.
                            </Text>
                        </View>
                        <View style={[cs.spaceM]}>
                            <View style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[styles.analysisCount, cs.fzXL, cs.fwBold]}>Список анализов</Text>
                                <View style={[cs.fAlCenter, cs.fRow, styles.analysisCountCircle, cs.bgYellow]}>
                                    <Text style={[]}>2</Text>
                                </View>

                            </View>

                            <View style={[cs.fColumn]}>
                                {
                                    analiz_list.map((item, index) => (
                                        <Text key={item.id} style={[cs.fwMedium, cs.colorDark, cs.fzM]}>{index + 1}. {item.title}</Text>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </WhiteBordered>
        </Modal>
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

        marginTop: 3,
        borderRadius: 50,
        fontSize: 11,
        fontWeight: "600"
    },
    analysisCountCircle: {
        backgroundColor: "orange",
        borderRadius: 1000,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginTop: 3
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
        gap: 10,
        borderRadius: 16,
        height: 150
    },
    labelOrderNum: {
        fontWeight: "500"
    },
    buttonDark: {
        backgroundColor: "#4D4D4D",
    },
    buttonWhite: {
        shadowColor: "black",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 10,
        backgroundColor: "white",
        shadowRadius: 30,
        elevation: 10,
    }
})
export default OrderInfoModal;