import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { cs } from "../../../common/styles";
import { DownloadIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { handleOrderInfoModal } from "../../../app/features/modals/modalsSlice";
import { fs } from '../../../navigation/AppNavigator';
import { getOrderById } from '../../../app/features/current-data/currentData';


const AnalysisCard: FC<OrderAnalysisType> = ({
    id,
    date,
    customer,
    paid,
    handlePress,
}) => {
    const dispatch = useAppDispatch()
    const getStatusObj = (status: boolean) => {
        const statusObj = {
            styleBlock: cs.statusGray,
            text: "Не оплачен"
        }
        if (status) {
            statusObj.styleBlock = cs.statusGreen
            statusObj.text = "Оплачен"
        }
        return statusObj
    }
    
    const handleOpenInfo = () => {
        dispatch(handleOrderInfoModal())
        dispatch(getOrderById(id))
    }

    return (
        <TouchableOpacity onPress={handleOpenInfo} style={[styles.card, cs.spaceL]}>
            <View style={[cs.fColumn, styles.cardTop]}>
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <View style={[styles.orderNum, cs.fAlCenter, cs.fRow]}>
                        <Text style={[cs.fzS, cs.colorDark, styles.orderNumText, cs.fwMedium]}>Заказ №</Text>
                        <View style={[cs.lightGray]}>
                            <Text style={[fs.montR]}>{id}</Text>
                        </View>
                    </View>
                    <Text style={[cs.colorGray, cs.fzS, fs.montR]}>{date}</Text>
                </View>
                {customer.length ? <Text style={[cs.colorGray, cs.fzXS, fs.montR]}>{customer}</Text> : null}

            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter, cs.flexOne, styles.cardBottom]}>
                <View style={[getStatusObj(paid).styleBlock, styles.statusBlock]}>
                    <Text style={[cs.fwBold, cs.colorWhite]}>{getStatusObj(paid).text}</Text>
                </View>
                <TouchableOpacity style={[cs.fAlCenter, cs.fRow, styles.resultsBtn]}>
                    <DownloadIcon />
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
        shadowOpacity: 0.2,
        backgroundColor: "white",
        shadowRadius: 10,
        elevation: 10,
    },
    cardTop: {
        gap: 8
    },
    cardBottom: {
        gap: 20,
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
        maxWidth: 300,
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },
    resultsText: {
        textDecorationLine: "underline",
        maxWidth: 140
    }
})
export default AnalysisCard;