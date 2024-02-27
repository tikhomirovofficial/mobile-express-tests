import React, { FC, useEffect, useMemo, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard, ActivityIndicator } from "react-native";
import { cs } from "../../../common/styles";
import { AddIcon, ArrowLeft, ArrowRightIcon, ClearIcon, HeartIcon, Logo, RemoveIcon, SearchIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { NavProps } from "../../../types/common.types";
import AppContainer from "../../../components/AppContainer";
import { fs } from "../../../navigation/AppNavigator";
import PatientItem from "../../../components/PatientItem";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import PatientInvitingModal from "../../../components/Modals/PatientInvitingModal";
import { addToCart, clearCart, removeProduct } from '../../../app/features/cart/cartSlice';
import { createOrder, resetPatient, setCurrentCategory, setOrderBonusesTotal, setPatient } from '../../../app/features/order/orderSlice';
import CartItem from '../../../components/CartItem';
import { CreateOrderReq } from '../../../types/api/orders.api.types';
import { useAppTheme } from '../../../hooks/useTheme';
import { BackButton } from '../../../components/BackButton';

const CartProducts: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const cartProducts = useAppSelector(state => state.cart.items)
    const { patientData, sending, success, err, bonuses } = useAppSelector(state => state.order)
    const orderTotalSum = useMemo(() => {
        return cartProducts.reduce((a, b) => {
            return a + b.cost
        }, 0)
    }, [cartProducts])


    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleOrder = () => {
        const data: CreateOrderReq = {
            user_id: patientData.id,
            analiz: cartProducts.map(item => item.id)
        }
        dispatch(createOrder(data))

    }

    const handleToSelectingCategory = () => {
        navigation.navigate("order_category")
    }

    useEffect(() => {
        if (success) {
            dispatch(setOrderBonusesTotal((orderTotalSum / 100) * bonuses.percent))
            handleClearCart()
            dispatch(setCurrentCategory(-1))
            dispatch(resetPatient())
            navigation.navigate("order_sent")
        }
    }, [success])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Animated.View>
            <View style={[cs.fColumn, cs.spaceM]}>
                <WhiteBorderedLayout
                    scrollable={false}
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <BackButton handleBack={handleToSelectingCategory} />
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>Корзина</Text>
                                <View></View>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "99%" : "100%" }]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL, { color: theme.title }]}>Всего анализов: {cartProducts.length}</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, { backgroundColor: "#36CACB", paddingHorizontal: 15, paddingVertical: 6, borderRadius: 300 }]}>
                                    <HeartIcon stroke={"#ffffff"} />
                                    <Text style={[cs.fwSemi, cs.colorWhite]}>{(orderTotalSum / 100) * bonuses.percent}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleClearCart} style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <ClearIcon />
                                <Text style={[cs.textRed, cs.fwMedium, fs.montR, cs.fzM]}>Очистить</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                    data={cartProducts}
                                    renderItem={({ item }) => (
                                        <CartItem
                                            removeItem={() => dispatch(removeProduct(item.id))}
                                            item={item}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        <View style={[cs.fColumn, cs.spaceS]}>
                            <Text style={[fs.montR, cs.colorRed]}>{err}</Text>
                            <ButtonYellow style={{ minHeight: 54 }} disabled={cartProducts.length < 1 || sending} handlePress={handleOrder}>
                                {sending ? <ActivityIndicator color={"black"} /> : <Text style={[cs.fzM, cs.yellowBtnText]}>Отправить заказ</Text>}
                            </ButtonYellow>
                        </View>
                    </View>
                </WhiteBorderedLayout>
            </View >
        </Animated.View >
    );
};
const styles = StyleSheet.create({
    searchInputBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    firstLetterContact: {
        fontSize: 18
    },
    patientsContent: {
        flex: 1,
        minHeight: "100%",
        paddingBottom: 40
    },
})
export default CartProducts;