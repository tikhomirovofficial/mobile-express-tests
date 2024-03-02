import React, { FC, useEffect } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import { Modal, StyleSheet, Text, View } from "react-native";
import { ModalCustomProps, PopupProps } from "../../../types/common.types";
import { ModalContainer } from '../../ModalContainer';
import { useAppDispatch, useAppSelector } from '../../../app/base/hooks';
import { handleOrderInfoModal } from '../../../app/features/modals/modalsSlice';
import { getOrderById, resetOrderInfo } from '../../../app/features/current-data/currentData';
import { fs } from '../../../navigation/AppNavigator';
import { SkeletonView } from '../../SkeletonView';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { useAppTheme } from '../../../hooks/useTheme';
import { ModalShadow } from '../../ModalShadow';
import { correctFormDate } from '../../../utils/correctFormDate';
import { normalizeDate } from '../../../utils/normalizeDate';

const OrderInfoModal: FC<ModalCustomProps> = ({ show, handleModal }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { orderInfo: { info_order, analiz_list, results }, loadings } = useAppSelector(state => state.currentData)

    useEffect(() => {
        return () => {
            dispatch(resetOrderInfo())
        }
    }, [])

    return (
        <Modal style={{ position: "relative" }} animationType={"slide"} visible={show} transparent={true}>
            <ModalShadow show={show !== undefined ? show : false} />
            <WhiteBordered isModal transparentBg style={[cs.modalSlidedBottom, { position: "relative" }]}>
                <SkeletonContainer backgroundColor={theme.skeleton}>
                    <View style={styles.analysisOrderContent}>
                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                            <Text onPress={handleModal}
                                style={[cs.yellowBtnText, cs.textYellow, cs.fzM, cs.modalCloseText]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, styles.labelOrderNum, cs.fwMedium, { color: theme.text_label }]}>Заказ №</Text>
                                {loadings.order ? <SkeletonView height={22} width={60} /> :
                                    <View style={[cs.lightGray, { backgroundColor: theme.light_gray_bg }]}>

                                        <Text style={[cs.colorDark, styles.orderNumber, fs.montR, { color: theme.text_label }]}>{info_order.order_id}</Text>
                                    </View>}
                            </View>
                            {
                                loadings.order ? <SkeletonView height={22} width={84} /> : <Text style={[cs.fzM, cs.colorGray, fs.montR]}>{normalizeDate(info_order.date)}</Text>
                            }

                        </View>
                        <View style={[styles.analysisOrderColumn]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold, { color: theme.title }]}>Информация о заказе</Text>
                                {
                                    loadings.order ? <SkeletonView height={82} width={"100%"} /> :

                                        <View style={[styles.orderInfo]}>
                                            <View style={[cs.fRowBetw]}>
                                                <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Статус</Text>
                                                <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.status}</Text>
                                            </View>
                                            <View style={[cs.fRowBetw]}>
                                                <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Назначил(а)</Text>
                                                <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.doctor}</Text>
                                            </View>
                                            <View style={[cs.fRowBetw]}>
                                                <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Пациент</Text>
                                                <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>{info_order.pacient}</Text>
                                            </View>
                                        </View>}
                            </View>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Результаты анализов</Text>
                                {
                                    loadings.order ? <SkeletonView height={60} width={"100%"} /> :
                                        <Text style={[cs.colorGray, cs.fzM, fs.montR]}>
                                            Здесь появится возможность скачать результаты анализов после того, как пациент
                                            оплатит и сдаст анализы в нашей лаборатории.
                                        </Text>
                                }

                            </View>
                            <View style={[cs.spaceM]}>
                                <View style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <Text style={[styles.analysisCount, cs.fzXL, cs.fwBold, { color: theme.title }]}>Список анализов</Text>
                                    {
                                        loadings.order ? null : <View style={[cs.fAlCenter, cs.fRow, styles.analysisCountCircle, cs.bgYellow]}>
                                            <Text style={[]}>{analiz_list.length}</Text>
                                        </View>
                                    }


                                </View>
                                {
                                    loadings.order ?
                                        <View style={[cs.fColumn, cs.spaceS]}>
                                            <SkeletonView height={20} width={"100%"} />
                                            <SkeletonView height={20} width={"100%"} />
                                            <SkeletonView height={20} width={"100%"} />
                                        </View> :

                                        <View style={[cs.fColumn]}>
                                            {
                                                analiz_list.map((item, index) => (
                                                    <Text key={item.id} style={[cs.fwMedium, cs.colorDark, cs.fzM, { color: theme.text_label }]}>{index + 1}. {item.title}</Text>
                                                ))
                                            }
                                        </View>
                                }

                            </View>
                        </View>
                    </View>
                </SkeletonContainer>

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