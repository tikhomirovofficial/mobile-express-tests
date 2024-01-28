import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleBonusesModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import PatientItem from '../../PatientItem';


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
    const { bonusesModal } = useAppSelector(state => state.modals)

    const handleModal = () => {
        dispatch(handleBonusesModal())
    }

    return (
        <Modal animationType={"slide"} visible={bonusesModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <View style={[cs.flexOne, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Бонусы</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[cs.flexOne, cs.spaceM]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <View style={[styles.bonusesBlock, cs.wBlockShadow]}>

                            </View>
                            <ButtonYellow style={[cs.fCenterRow, cs.spaceS]} handlePress={() => { }}>
                                <HeartIcon/>
                                <Text style={[cs.colorDark, cs.fwSemi, cs.fzM]}>Вывести бонусы</Text>
                            </ButtonYellow>
                        </View>
                        <View style={[cs.fColumn]}>
                            <PatientItem firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />
                            <PatientItem firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />
                            <PatientItem neededBottomBorder={false} firstName={'Ахмед'} lastName={'Ахматов'} phone={'775 Бонусов'} avatarSrc={null} />

                        </View>

                    </View>
                </View>
            </WhiteBordered>
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