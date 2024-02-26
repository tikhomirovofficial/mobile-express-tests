import React, { FC, useEffect, useState } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View, RefreshControl, FlatList, ActivityIndicator } from "react-native";
import { cs } from "../../../common/styles";
import { AnalysisIcon, Logo } from "../../../icons";
import OrderCard from "../../../components/Cards/OrderCard";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { handleOrderInfoModal } from "../../../app/features/modals/modalsSlice";
import { NavProps } from "../../../types/common.types";
import OrderInfoModal from "../../../components/Modals/OrderInfoModal";
import { getGreeting } from '../../../utils/getGreeting';
import { SkeletonContainer, Skeleton } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { normalizeDate } from '../../../utils/normalizeDate';
import { getAllOrders, incrementOrdersPart, resetOrders } from '../../../app/features/orders/ordersSlice';
import { fs } from '../../../navigation/AppNavigator';
import { IOScrollView, InView } from 'react-native-intersection-observer'
import { PaginationBottom } from '../../../components/PaginationBottom';
import { usePagination } from '../../../hooks/usePagination';
import { incrementProductsPart } from '../../../app/features/products/productSlice';
import { resetPatient } from '../../../app/features/order/orderSlice';
import { useRefresh } from '../../../hooks/useRefresh';
import { useAppTheme } from '../../../hooks/useTheme';

const Main: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { all_orders, loadings, can_next, part } = useAppSelector(state => state.orders)
    const { refreshing, sendRefresh } = useRefresh()
    const profile = useAppSelector(state => state.profile)

    const [loadOrders, loadMore] = usePagination(
        () => {
            dispatch(getAllOrders({ part }
            ))
        },
        () => { dispatch(incrementOrdersPart()) },
        {
            part,
            can_more: can_next,
            items: all_orders,
            loading: loadings.all_orders_pagination
        }
    )
    const handleToOrdering = () => {
        dispatch(resetPatient())
        navigation.navigate("order_patient")
    }

    useEffect(loadOrders, [part])

    useEffect(() => {
        return () => {
            dispatch(resetOrders())
        }
    }, [])

    return (
        <View
            style={{ flex: 1 }}
        >
            <WhiteBorderedLayout transparentBg={false} onRefresh={sendRefresh} refreshing={refreshing} style={{ paddingTop: 32 }}>
                <SkeletonContainer backgroundColor={theme.skeleton}>
                    <View style={[cs.spaceL, cs.fColumn]}>
                        {
                            profile.loadings.profile ? <SkeletonView height={30} width={'100%'} /> :
                                <Text style={[cs.title, { color: theme.title }]}>{profile.data.first_name.trim()}, {getGreeting()}!</Text>
                        }
                        <View style={[cs.fRowBetw, styles.buttonsTopContainer]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("inviting_exists")}
                                style={[
                                    cs.fColumn,
                                    styles.buttonTop,
                                    cs.flexOne,
                                    styles.buttonDark
                                ]}>
                                <Logo />
                                <Text style={[cs.fzS, cs.colorWhite, cs.txtCenter, fs.montR]}>Пригласить в Экспресс Тест</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleToOrdering}
                                style={[
                                    cs.wBlockShadow,
                                    cs.fColumn,
                                    styles.buttonTop,
                                    cs.flexOne,
                                    { backgroundColor: theme.chart }
                                ]}>
                                <AnalysisIcon />
                                <Text style={[cs.fzS, cs.txtCenter, fs.montR, { color: theme.title }]}>Назначить анализы</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[cs.spaceL, cs.fColumn]}>
                        <Text style={[cs.title, { color: theme.title }]}>Заказы анализов</Text>

                        <View style={[cs.fColumn, cs.spaceM]}>
                            {
                                loadings.all_orders ?
                                    Array(3).fill("").map(item => (
                                        <SkeletonView height={100} width={"100%"} />
                                    )) :

                                    all_orders.length > 0 ?
                                        <View style={[cs.fColumn]}>
                                            <FlatList
                                                scrollEnabled={false}
                                                data={all_orders}
                                                style={{ overflow: "visible" }}
                                                contentContainerStyle={[cs.fColumn, cs.spaceL]}
                                                renderItem={({ item }) => (
                                                    <OrderCard
                                                        status={item.status}
                                                        handlePress={() => dispatch(handleOrderInfoModal())}
                                                        key={item.id}
                                                        paid={true}
                                                        date={normalizeDate(item.date)}
                                                        id={item.id}
                                                        customer={item.pacient || "Имя Фамилия"}
                                                        analysisList={[]} />
                                                )}
                                            />
                                            <PaginationBottom onVisible={(inView) => inView ? loadMore() : null} />
                                            {loadings.all_orders_pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}

                                        </View>
                                        : <Text style={[fs.montR, { color: theme.text_label }]}>Не сделан ни один заказ.</Text>
                            }
                        </View>
                    </View>
                </SkeletonContainer>
            </WhiteBorderedLayout>
        </View>
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
        padding: 18,
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