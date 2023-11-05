import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {DownloadIcon} from "../../../icons";
import {OrderAnalysisType} from "../../../types/analysis.types";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {handleOrderInfoModal} from "../../../app/features/modals/modalsSlice";


const AnalysisCard: FC<OrderAnalysisType> = ({
                                                 orderNumber,
                                                 date,
                                                 customer,
                                                 status
                                             }) => {
    const dispatch = useAppDispatch()
    const {orderInfoModal} = useAppSelector(state => state.modals)
    const getStatusObj = (status: "PAID" | "NOT_PAID") => {
        const statusObj = {
            styleBlock: cs.statusGray,
            text: "Не оплачен"
        }
        if(status == "PAID") {
            statusObj.styleBlock = cs.statusGreen
            statusObj.text = "Оплачен"
        }
        return statusObj
    }
    const openOrderInfo = () => {
        dispatch(handleOrderInfoModal())
    }
    return (
        <TouchableOpacity onPress={openOrderInfo} style={[styles.card, cs.spaceL]}>
            <View style={[cs.fColumn, styles.cardTop]}>
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <View style={[styles.orderNum, cs.fAlCenter, cs.fRow]}>
                        <Text style={[cs.fzS, cs.colorDark, styles.orderNumText]}>Заказ №</Text>
                        <View style={[cs.lightGray]}>
                            <Text>{orderNumber}</Text>
                        </View>
                    </View>
                    <Text style={[cs.colorGray, cs.fzS]}>{date}</Text>
                </View>
                <Text style={[cs.colorGray, cs.fzXS]}>{customer}</Text>
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter, cs.flexOne, styles.cardBottom]}>
                <View style={[getStatusObj(status).styleBlock, styles.statusBlock]}>
                    <Text style={[cs.fwBold, cs.colorWhite]}>{getStatusObj(status).text}</Text>
                </View>
                <TouchableOpacity style={[cs.fAlCenter, cs.fRow, styles.resultsBtn]}>
                    <DownloadIcon/>
                    <Text style={[cs.colorGray, cs.fwBold, cs.fzXS, styles.resultsText]}>
                        Скачать результаты анализов
                    </Text>
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 6,
        shadowColor: "rgba(19, 101, 101, 0.3)",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 10,
        backgroundColor: "white",
        shadowRadius: 2,
        elevation: 5,
    },
    cardTop: {
        gap: 8
    },
    cardBottom: {
        gap: 20
    },
    statusBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    orderNum: {
        gap: 5
    },
    orderNumText: {
        fontWeight: "500"
    },
    resultsBtn: {
        gap: 10,
        flex: 1,

    },
    resultsText: {
        textDecorationLine: "underline"
    }
})
export default AnalysisCard;