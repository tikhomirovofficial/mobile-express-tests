import React, { FC, useEffect, useState } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import { cs } from "../../../common/styles";
import { AnalysisIcon, Logo } from "../../../icons";
import AnalysisCard from "../../../components/Cards/AnalysisCard";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { handleOrderInfoModal } from "../../../app/features/modals/modalsSlice";
import { NavProps } from "../../../types/common.types";
import OrderInfoModal from "../../../components/Modals/OrderInfoModal";
import { getGreeting } from '../../../utils/getGreeting';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { normalizeDate } from '../../../utils/normalizeDate';
import { getAllOrders } from '../../../app/features/orders/ordersSlice';

const Main: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { orderInfoModal } = useAppSelector(state => state.modals)
    const { all_orders, loadings } = useAppSelector(state => state.orders)
    const profile = useAppSelector(state => state.profile)


    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return (
        <Animated.ScrollView
            contentContainerStyle={{ flex: 1 }}
        >
            <WhiteBorderedLayout style={{
                paddingTop: 32,
            }}>
                <SkeletonContainer>
                    <View style={[cs.spaceL, cs.fColumn]}>
                        {
                            profile.loadings.profile ? <SkeletonView height={30} width={'100%'} /> :
                                <Text style={cs.title}>{profile.data.first_name}, {getGreeting()}!</Text>
                        }
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
                                <AnalysisIcon />
                                <Text style={[cs.fzS, cs.txtCenter]}>Назначить анализы</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[cs.spaceL, cs.fColumn]}>
                        <Text style={cs.title}>Заказы анализов</Text>

                        <View style={[cs.fColumn, cs.spaceM]}>
                            {
                                loadings.all_orders ?
                                    Array(3).fill("").map(item => (
                                        <SkeletonView height={100} width={"100%"} />
                                    )) :

                                    all_orders.length > 0 ?
                                        all_orders.map((item, index) => (
                                            <AnalysisCard
                                                handlePress={() => dispatch(handleOrderInfoModal())}
                                                key={item.id}
                                                paid={true}
                                                date={normalizeDate(item.date)}
                                                id={item.id}
                                                customer={`Имя Фамилия`}
                                                analysisList={[]} />
                                        ))
                                        : <Text>Пока пусто.</Text>

                            }

                        </View>
                    </View>
                </SkeletonContainer>
            </WhiteBorderedLayout>
            {orderInfoModal ? <OrderInfoModal /> : null}


        </Animated.ScrollView >
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