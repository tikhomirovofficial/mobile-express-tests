import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, HeartIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleOrdersFinancesModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";


type DocumentItemProps = {
    neededBorder?: boolean
}

const DocumentItem: FC<DocumentItemProps> = ({ neededBorder = true }) => {
    return (
        <TouchableOpacity style={[cs.dF, cs.fRow, cs.fAlCenter, cs.spaceM, styles.documentItem, (neededBorder ? cs.bottomBorder : null)]}>
            <View style={[styles.documentIcon, cs.circle, cs.fCenterCol]}>
                <DocumentIcon />
            </View>
            <Text style={[styles.documentFile, cs.fzS, fs.montR, cs.colorBlack]}>Согласие на обработку персональных данных</Text>
        </TouchableOpacity>
    )
}
const docsArr = [1, 3, 34, 5]

const OrdersFinancesModal = () => {
    const dispatch = useAppDispatch()
    const { ordersFinancesModal } = useAppSelector(state => state.modals)

    const handleModal = () => {
        dispatch(handleOrdersFinancesModal())
    }

    return (
        <Modal animationType={"slide"} visible={!ordersFinancesModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <View style={[cs.flexOne, styles.aboutAppContent, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Финансы</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[styles.aboutAppContent, cs.spaceXL]}>
                        <TouchableOpacity style={[styles.bonusesBlock, cs.wBlockShadow]}>
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
                                        <Text style={[cs.colorBlack, cs.fzS, cs.fwBold]}>34 из 545 </Text>
                                        <Text style={[cs.colorGray, cs.fzXS, fs.montR]}>Доступно для вывода</Text>
                                    </View>
                                    <View style={[styles.progressBonuses]}>
                                        <View style={[styles.progressBonusesFilled, { width: "30%" }]}>

                                        </View>
                                    </View>
                                </View>
                                <Text style={[cs.fzXXS, fs.montR, cs.colorGray]}>Мин. сумма для вывода 500 бонусов</Text>
                            </View>

                        </TouchableOpacity>
                        <View style={[cs.fColumn, cs.spaceL]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.title]}>01.10.2023</Text>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <View style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                                                <Text style={[cs.fzS, cs.colorDark]}>Заказ №</Text>
                                                <View style={[cs.lightGray]}>
                                                    <Text>02-014</Text>
                                                </View>
                                            </View>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
                                        </View>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.title]}>01.10.2023</Text>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <View style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                                                <Text style={[cs.fzS, cs.colorDark]}>Заказ №</Text>
                                                <View style={[cs.lightGray]}>
                                                    <Text>02-014</Text>
                                                </View>
                                            </View>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
                                        </View>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.title]}>01.10.2023</Text>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <View style={[cs.fColumn, cs.spaceS, cs.bottomBorder, styles.orderItem]}>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <View style={[cs.fAlCenter, cs.fRow, cs.spaceM]}>
                                                <Text style={[cs.fzS, cs.colorDark]}>Заказ №</Text>
                                                <View style={[cs.lightGray]}>
                                                    <Text>02-014</Text>
                                                </View>
                                            </View>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>100</Text>
                                        </View>
                                        <View style={[cs.fRowBetw, cs.fAlCenter]}>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Владислав Тузов</Text>
                                            <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Ожидание</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        
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
    inputField: {
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderStyle: "solid",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E2E9"
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
    selectableBtn: {
        minWidth: 144,
        height: 52
    },
    profileInfo: {
        maxWidth: 228
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    documentItem: {
        paddingBottom: 16
    },
    block: {
        height: 80,
    },
    bonuses: {
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    profileHubItem: {
        paddingVertical: 14,
        borderRadius: 16,
        overflow: "hidden",
        gap: 18,
        minWidth: 140
    },
    versionBlock: {
        gap: 70
    },
    documentIcon: {
        height: 40,
        width: 40,
        overflow: "hidden",
        backgroundColor: cs.rootBg.backgroundColor
    },
    profileDataBlock: {
        minHeight: "100%"
    },
    documentFile: {
        maxWidth: 180
    },
    aboutAppContent: {
        flex: 1,
    }
})
export default OrdersFinancesModal;