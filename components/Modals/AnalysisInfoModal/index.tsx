import React, { FC } from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import { Modal, StyleSheet, Text, View } from "react-native";
import { PopupProps } from "../../../types/common.types";
import { useAppDispatch, useAppSelector } from '../../../app/base/hooks';
import { handleAnalysisInfoModal } from '../../../app/features/modals/modalsSlice';
import { fs } from '../../../navigation/AppNavigator';
import ButtonYellow from '../../Buttons/ButtonYellow';
import { HeartIcon, MinusIcon, PlusIcon } from '../../../icons';
import ButtonBlue from '../../Buttons/ButtonBlue';

const inCart = false
const AnalysisInfoModal = () => {
    const dispatch = useAppDispatch()
    const { analysisInfoModal } = useAppSelector(state => state.modals)
    const { cart } = useAppSelector(state => state)
    const handleModal = () => {
        dispatch(handleAnalysisInfoModal())
    }
    return (
        <Modal animationType={"slide"} visible={analysisInfoModal} transparent={true}>
            <WhiteBordered style={[cs.modalSlidedBottom]}>

                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Подробнее</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[styles.patientsContent, cs.fColumnBetw]}>
                        <View style={[styles.analysisOrderColumn]}>
                            <View style={[cs.spaceM]}>
                                <Text style={[cs.fzXL, cs.fwBold]}>Индекс ROMA (включает исследования СА 125 и НЕ-4) (П)</Text>
                                <View style={[cs.fRow, cs.spaceL]}>
                                    <Text style={[cs.colorGray, cs.fzM, fs.montR]}>Биоматериал</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Венозная кровь</Text>
                                </View>
                            </View>
                            <View style={[cs.spaceM, cs.flexOne,]}>
                                <Text style={[cs.fzM, cs.fwBold]}>Описание</Text>
                                <Text style={[cs.colorGray, cs.fzS, fs.montR]}>
                                    Если у вас возникли вопросы или вам нужна помощь в работе приложения, то вы можете связаться с нами удобным способом
                                </Text>
                            </View>

                        </View>
                        {
                            !inCart ? <ButtonYellow style={[cs.fCenterRow, cs.fAlCenter, cs.spaceS]} handlePress={() => { }}>
                                <PlusIcon />
                                <Text style={[cs.fwSemi, cs.colorDark, cs.fzM]}>Добавить в корзину</Text>
                            </ButtonYellow> :
                                <View>
                                    <View style={[cs.fRowBetw, cs.fAlCenter, cs.spaceS]}>
                                        <ButtonYellow style={[cs.fRow, cs.spaceS, { minWidth: "60%" }]} handlePress={() => { }}>
                                            <Text style={[cs.fzM, cs.yellowBtnText]}>В корзине</Text>
                                            <View style={[cs.count]}>
                                                <Text style={cs.countText}>{cart.items.length}</Text>
                                            </View>

                                        </ButtonYellow>
                                        <ButtonBlue style={[cs.fRow, cs.spaceS]} handlePress={() => { }}>
                                            <MinusIcon width={10} height={3} />
                                            <Text style={[cs.fzM, cs.colorWhite, cs.fwSemi]}>Убрать</Text>
                                        </ButtonBlue>
                                    </View>
                                </View>
                        }

                    </View>
                </View>


            </WhiteBordered>
        </Modal>
    );
};
const styles = StyleSheet.create({
    analysisOrderContent: {
        gap: 40
    },
    analysisInfoModalBlock: {
        paddingBottom: 32,
        backgroundColor: "red"
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
    ,







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
    patientsList: {},
    patientsModalBlock: {
        minHeight: "100%",
        paddingBottom: 32
    },
    patientsContent: {
        flex: 1
    },

})
export default AnalysisInfoModal;