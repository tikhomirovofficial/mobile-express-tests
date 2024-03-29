import React, { FC, useState } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import { cs } from "../../../common/styles";
import { Logo } from "../../../icons";
import AnalysisCard from "../../../components/Cards/AnalysisCard";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { handleOrderInfoModal } from "../../../app/features/modals/modalsSlice";
import { NavProps } from "../../../types/common.types";
import OrderInfoModal from "../../../components/Modals/OrderInfoModal";


const Main: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { orderInfoModal } = useAppSelector(state => state.modals)
    const orders = useAppSelector(state => state.orders.items)
    const [refreshing, setRefreshing] = useState(false);


    return (
        <Animated.ScrollView
            contentContainerStyle={{ flex: 1 }}
        >
            <WhiteBorderedLayout style={{
                paddingTop: 32,
            }}>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Вячеслав, добрый день!</Text>
                    <View style={[cs.fRowBetw, styles.buttonsTopContainer]}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("info_contacts")}
                            style={[
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne,
                                styles.buttonDark
                            ]}>
                            <Logo />
                            <Text style={[cs.fzS, cs.colorWhite, cs.txtCenter]}>Пригласить в Экспресс Тест</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("order_patient")}
                            style={[
                                cs.wBlockShadow,
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne
                            ]}>
                            <Logo />
                            <Text style={[cs.fzS, cs.txtCenter]}>Назначить анализы</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Заказы анализов</Text>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        {
                            orders.length > 0 ?
                                orders.map((item, index) => (
                                    <AnalysisCard key={item.id} paid={item.isPaid}
                                        handlePress={() => dispatch(handleOrderInfoModal())}
                                        date={item.date} orderNumber={item.id.toString()} customer={`${item.patientFirstName || ""} ${item.patientLastName || ""}`}
                                        analysisList={[]} />
                                ))
                                : <Text>Пока пусто.</Text>
                        }
                    </View>
                </View>
            </WhiteBorderedLayout>
            <OrderInfoModal opened={orderInfoModal} handlePopup={() => dispatch(handleOrderInfoModal())} />
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
export default Main;