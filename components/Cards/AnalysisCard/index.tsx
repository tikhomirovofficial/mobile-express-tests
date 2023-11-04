import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {cs} from "../../../common/styles";
import {DownloadIcon} from "../../../icons";

const AnalysisCard = () => {
    return (
        <TouchableOpacity style={[styles.card, cs.spaceL]}>
            <View style={[cs.fColumn, styles.cardTop]}>
                <View style={[cs.fRowBetw, cs.fAlCenter]}>
                    <View style={[styles.orderNum, cs.fAlCenter, cs.fRow]}>
                        <Text style={[cs.fzS, cs.colorDark, styles.orderNumText]}>Заказ №</Text>
                        <View style={[cs.lightGray]}>
                            <Text>02-014</Text>
                        </View>
                    </View>
                    <Text style={[cs.colorGray, cs.fzS]}>25.09.2023</Text>
                </View>
                <Text style={[cs.colorGray, cs.fzXS]}>Владислав Тузов</Text>
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter, cs.flexOne, styles.cardBottom]}>
                <View style={[cs.statusGreen, styles.statusBlock]}>
                    <Text style={[cs.fwBold, cs.colorWhite]}>Не оплачен</Text>
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
    orderNumText:{
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