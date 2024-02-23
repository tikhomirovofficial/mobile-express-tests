import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cs } from "../../../common/styles";
import { DownloadIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { handleOrderInfoModal } from "../../../app/features/modals/modalsSlice";
import { fs } from '../../../navigation/AppNavigator';
import { getOrderById } from '../../../app/features/current-data/currentData';
import { useAppTheme } from '../../../hooks/useTheme';


const OrderCard: FC<OrderAnalysisType> = ({
    id,
    date,
    customer,
    status,
    paid,
    handlePress,
}) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()

    const getStatusObj = useCallback(() => {
        const statusObj = {
            styleBlock: cs.statusGray,
            text: status
        }

        if (status === "Не оплачен") {
            statusObj.styleBlock = cs.statusGray

        } else if (status === "Оплачен") {
            statusObj.styleBlock = cs.statusGray
        }

        return statusObj
    }, [status])

    const handleOpenInfo = () => {
        dispatch(handleOrderInfoModal())
        dispatch(getOrderById({ id }))
    }

    return (
        <TouchableOpacity onPress={handleOpenInfo} style={[styles.card, cs.spaceL, {backgroundColor: theme.card_bg || styles.card.backgroundColor, borderColor: theme.card_border}]}>
            <View style={[cs.fColumn, styles.cardTop]}>
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <View style={[styles.orderNum, cs.fAlCenter, cs.fRow]}>
                        <Text style={[cs.fzS, cs.colorDark, styles.orderNumText, cs.fwMedium, {color: theme.text_label}]}>Заказ №</Text>
                        <View style={[cs.lightGray, {backgroundColor: theme.light_gray_bg}]}>
                            <Text style={[fs.montR, {color: theme.text_label}]}>{id}</Text>
                        </View>
                    </View>
                    <Text style={[cs.colorGray, cs.fzS, fs.montR]}>{date}</Text>
                </View>
                {customer.length ? <Text style={[cs.colorGray, cs.fzXS, fs.montR]}>{customer}</Text> : null}
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter, cs.flexOne, styles.cardBottom]}>
                <View style={[getStatusObj().styleBlock, styles.statusBlock]}>
                    <Text style={[cs.fwSemi, cs.colorWhite, cs.fzS, {color: theme.text_status}]}>{getStatusObj().text}</Text>
                </View>
                <TouchableOpacity style={[cs.fAlCenter, cs.fRow, styles.resultsBtn]}>
                    <DownloadIcon
                        stroke={cs.colorGray.color}
                    />
                    <Text style={[cs.colorGray, cs.fwSemi, cs.fzXXS, styles.resultsText, cs.colorGray]}>
                        Скачивание пока недоступно.
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
        overflow: "visible",
        borderWidth: 1,
        borderColor: "#FAFAFA",
        backgroundColor: "white",
        zIndex: 1,
        position: "relative",
    },
    cardTop: {
        gap: 8
    },
    cardBottom: {
        gap: 10,
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
        gap: 8,
        maxWidth: 300,
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },
    resultsText: {
        textDecorationLine: "underline",
        maxWidth: 128

    }
})
export default OrderCard;