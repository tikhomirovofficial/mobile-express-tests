import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleBonusesModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import BonusesModal from '../BonusesModal';


const OrderItem = () => {
    return (
        <TouchableOpacity style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                    <Text style={[cs.fzS, cs.colorDark, fs.montR]}>Заказ №</Text>
                    <View style={[cs.lightGray]}>
                        <Text style={[fs.montR]}>02-014</Text>
                    </View>
                </View>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
            </View>
            <View style={[cs.fRowBetw, cs.fAlCenter]}>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
            </View>
        </TouchableOpacity>
    )
}
const OrdersDateGroup = () => {
    return <View style={[cs.fColumn, cs.spaceM]}>
        <Text style={[cs.title]}>01.10.2023</Text>
        <View style={[cs.fColumn, cs.spaceM]}>
            <OrderItem />
            <OrderItem />
        </View>
    </View>
}

const OrdersFinancesModal = () => {
    const dispatch = useAppDispatch()
    const { ordersFinancesModal, bonusesModal } = useAppSelector(state => state.modals)

    const handleModal = () => {
        dispatch(handleOrdersFinancesModal())
    }

    return (
        <Modal animationType={"slide"} visible={ordersFinancesModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Финансы</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[cs.flexOne, cs.spaceXL]}>
                        <TouchableOpacity onPress={() => dispatch(handleBonusesModal())} style={[styles.bonusesBlock, cs.wBlockShadow]}>
                            <View style={[cs.fColumn, cs.spaceM, styles.bonusesBlockContent]}>
                                <View style={[cs.fColumn, cs.spaceS,]}>
                                    <View style={[cs.dF, cs.fAlCenter, cs.fRow, cs.spaceS]}>
                                        <View style={[cs.dF, cs.fAlCenter, cs.fRow, cs.spaceS]}>
                                            <HeartIcon height={18} width={18} />
                                            <Text style={[cs.colorDark, cs.fwSemi, cs.fzM]}>Бонусы</Text>
                                        </View>
                                        <Text style={[cs.colorGray, cs.fzS]}>1 ед. = 1 ₽</Text>
                                    </View>
                                    <View style={[cs.fColumn]}>
                                        <Text style={[cs.colorBlack, cs.fzS, cs.fwBold]}>0 из 0 </Text>
                                        <Text style={[cs.colorGray, cs.fzXS, fs.montR]}>Доступно для вывода</Text>
                                    </View>
                                    <View style={[styles.progressBonuses]}>
                                        <View style={[styles.progressBonusesFilled, { width: "0%" }]}></View>
                                    </View>
                                </View>
                                <Text style={[cs.fzXXS, fs.montR, cs.colorGray]}>Мин. сумма для вывода 500 бонусов</Text>
                            </View>

                        </TouchableOpacity>
                        {/* <View style={[cs.fColumn, cs.spaceL]}>
                            <OrdersDateGroup />
                            <OrdersDateGroup />
                        </View> */}
                        <Text style={fs.montR}>Список заказов временно недоступен.</Text>
                    </View>
                </View>
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