import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleBonusesModal, handleOrderInfoModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import BonusesModal from '../BonusesModal';
import { useAppTheme } from '../../../hooks/useTheme';
import { getAllDatedOrders, incrementDatedOrdersPart, resetDatedOrders } from '../../../app/features/orders/ordersSlice';
import { usePagination } from '../../../hooks/usePagination';
import { OrderItem } from '../../OrderItem';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { normalizeDate } from '../../../utils/normalizeDate';
import OrderCard from '../../Cards/OrderCard';
import { PaginationBottom } from '../../PaginationBottom';
import { SkeletonView } from '../../SkeletonView';
import { OrderByDateApi } from '../../../types/entities/order.types';


// const OrderItem = () => {
//     return (
//         <TouchableOpacity style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
//             <View style={[cs.fRowBetw, cs.fAlCenter]}>
//                 <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
//                     <Text style={[cs.fzS, cs.colorDark, fs.montR]}>Заказ №</Text>
//                     <View style={[cs.lightGray]}>
//                         <Text style={[fs.montR]}>02-014</Text>
//                     </View>
//                 </View>
//                 <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
//             </View>
//             <View style={[cs.fRowBetw, cs.fAlCenter]}>
//                 <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
//                 <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
//             </View>
//         </TouchableOpacity>
//     )
// }
type OrdersDateGroupProps = {
    data: OrderByDateApi
}

const OrdersDateGroup: FC<OrdersDateGroupProps> = ({ data }) => {
    const theme = useAppTheme()
    return <View style={[cs.fColumn, cs.spaceM]}>
        <Text style={[cs.title, { color: theme.title }]}>{data.date}</Text>
        <View style={[cs.fColumn, cs.spaceM]}>
            {
                data.orders?.length ?
                    data.orders.map(item => (
                        <OrderItem
                            id={item.id}
                            codeText={String(item.id)}
                            bottomLeftText={String(item.pacient)}
                            bottomRightText={item.status}
                            topRightText={String(item.bonus)}
                        />
                    )) : <Text style={[fs.montR, { color: theme.title }]}>На этот день заказов не найдено.</Text>
            }

        </View>
    </View>
}

const OrdersFinancesModal = () => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { bonus } = useAppSelector(state => state.profile.data)
    const { ordersFinancesModal, bonusesModal } = useAppSelector(state => state.modals)
    const { dated_can_next, dated_part, all_dated_orders, loadings } = useAppSelector(state => state.orders)

    const [loadDatedOrders, loadMore] = usePagination(
        () => { dispatch(getAllDatedOrders({ part: dated_part })) },
        () => { dispatch(incrementDatedOrdersPart()) },
        {
            part: dated_part,
            can_more: dated_can_next,
            items: all_dated_orders,
            loading: loadings.all_dated_orders_pagination
        }
    )

    const handleModal = () => {
        dispatch(handleOrdersFinancesModal())
    }
    useEffect(loadDatedOrders, [dated_part])

    useEffect(() => {
        return () => {
            dispatch(resetDatedOrders())
        }
    }, [])
    return (
        <Modal animationType={"slide"} visible={ordersFinancesModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <SkeletonContainer>
                    <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                        <View style={[cs.fRowBetw]}>
                            <Text onPress={handleModal}
                                style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                            <View style={[cs.fAlCenter]}>
                                <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi, { color: theme.text_label }]}>Финансы</Text>
                            </View>
                            <View style={{ flex: 0.4 }}></View>
                        </View>
                        <View style={[cs.flexOne, cs.spaceXL]}>
                            <TouchableOpacity onPress={() => dispatch(handleBonusesModal())} style={[styles.bonusesBlock, cs.wBlockShadow, { backgroundColor: theme.card_bg || cs.wBlockShadow.backgroundColor }]}>
                                <View style={[cs.fColumn, cs.spaceM, styles.bonusesBlockContent]}>
                                    <View style={[cs.fColumn, cs.spaceS,]}>
                                        <View style={[cs.dF, cs.fAlCenter, cs.fRow, cs.spaceS]}>
                                            <View style={[cs.dF, cs.fAlCenter, cs.fRow, cs.spaceS]}>
                                                <HeartIcon stroke={theme.text_label} height={18} width={18} />
                                                <Text style={[cs.colorDark, cs.fwSemi, cs.fzM, { color: theme.text_label }]}>Бонусы</Text>
                                            </View>
                                            <Text style={[cs.colorGray, cs.fzS]}>1 ед. = 1 ₽</Text>
                                        </View>
                                        <View style={[cs.fColumn]}>
                                            <Text style={[cs.colorBlack, cs.fzS, cs.fwBold, { color: theme.title }]}>Бонусов: {bonus} </Text>
                                            {/* <Text style={[cs.colorGray, cs.fzXS, fs.montR]}>Доступно для вывода</Text> */}
                                        </View>
                                        {/* <View style={[styles.progressBonuses]}>
                                            <View style={[styles.progressBonusesFilled, { width: "0%" }]}></View>
                                        </View> */}
                                    </View>
                                    <Text style={[cs.fzXXS, fs.montR, cs.colorGray]}>Мин. сумма для вывода 500 бонусов</Text>
                                </View>

                            </TouchableOpacity>
                            <View style={[cs.fColumn, cs.spaceL]}>
                                {
                                    loadings.all_dated_orders ?
                                        <View style={[cs.fColumn, cs.spaceS]}>
                                            {Array(3).fill("").map(item => (
                                                <SkeletonView height={100} width={"100%"} />
                                            ))}
                                        </View>
                                        :

                                        all_dated_orders.length > 0 ?
                                            <View style={[cs.fColumn]}>
                                                <FlatList
                                                    scrollEnabled={false}
                                                    data={all_dated_orders}
                                                    style={{ overflow: "visible" }}
                                                    contentContainerStyle={[cs.fColumn, cs.spaceM]}
                                                    renderItem={({ item }) => (
                                                        <OrdersDateGroup data={item} />
                                                    )}
                                                />
                                                <PaginationBottom onVisible={(inView) => inView ? loadMore() : null} />
                                                {loadings.all_dated_orders_pagination ?
                                                    <View style={{ height: 20 }}>
                                                        <ActivityIndicator color={cs.bgYellow.backgroundColor} />
                                                    </View>
                                                    : null}

                                            </View>
                                            : <Text style={[fs.montR, { color: theme.text_label }]}>Не сделан ни один заказ.</Text>
                                }
                            </View>
                            {/* <Text style={[fs.montR, { color: theme.title }]}>Список заказов временно недоступен.</Text> */}
                        </View>
                    </View>
                </SkeletonContainer>

            </WhiteBordered>
            {bonusesModal ? <BonusesModal /> : null}
        </Modal>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        paddingBottom: 16
    },
    bonusesBlock: {
        paddingVertical: 27,
        paddingHorizontal: 24,
        borderRadius: 16
    },
    bonusesBlockContent: {
        maxWidth: 190
    },
    progressBonuses: {
        borderRadius: 100,
        position: "relative",
        flex: 1,
        height: 2,
        backgroundColor: "#E1E1E1"
    },
    progressBonusesFilled: {
        backgroundColor: "#12B2B3",
        left: 0,
        top: 0,
        height: "100%",
    },
})
export default OrdersFinancesModal;