import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {Modal, StyleSheet, Text, View} from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import {cs} from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import {handleOrderInfoModal, handlePatientInfoModal} from "../../../app/features/modals/modalsSlice";
import {PhotoIcon} from "../../../icons";
import AnalysisCard from "../../Cards/AnalysisCard";

const PatientInfoModal = () => {
    const dispatch = useAppDispatch()
    const {patientInfoModal} = useAppSelector(state => state.modals)
    const handleModal = () => dispatch(handlePatientInfoModal())

    return (
        <Modal animationType={"slide"} visible={patientInfoModal} transparent={true}>
            <WhiteBordered style={{...cs.modalSlidedBottom}}>
                <View style={[cs.spaceXXL, styles.patientsModalBlock]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal} style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi]}>Пациент</Text>
                        </View>
                        <View style={{flex: 0.4}}></View>
                    </View>
                    <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                        <View style={[styles.avatarBlock, cs.circle, cs.fCenterCol]}>
                            <PhotoIcon/>
                        </View>
                        <Text style={[cs.fwBold, cs.fzXL, cs.txtCenter, styles.name]}>
                            Подосёнов Вячеслав Сергеевич
                        </Text>
                        <ButtonYellow style={{minWidth: "100%"}} handlePress={() => alert("В разработке")}>
                            <Text style={[cs.fzM, cs.yellowBtnText, cs.colorDark]}>Заказать анализы</Text>
                        </ButtonYellow>
                    </View>
                    <View style={[cs.spaceXL]}>
                        <View style={[cs.spaceM]}>
                            <Text style={[cs.fzXL, cs.fwBold]}>Личная информация</Text>
                            <View style={[styles.orderInfo]}>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Возраст</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>27 лет</Text>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Пол</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>Мужской</Text>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <Text style={[cs.colorGray, cs.fzM]}>Телефон</Text>
                                    <Text style={[cs.colorDark, cs.fzM, cs.fwMedium]}>+7 (951) 735-89-45</Text>
                                </View>


                            </View>
                        </View>
                        <View style={[cs.spaceM]}>
                            <Text style={[cs.fzXL, cs.fwBold]}>Анализы</Text>
                            <View style={[cs.spaceS]}>
                                <AnalysisCard handlePress={() => dispatch(handleOrderInfoModal())}
                                              orderNumber={"02-014"} date={"25.09.2023"} customer={""} status={"PAID"}/>
                                <AnalysisCard handlePress={() => dispatch(handleOrderInfoModal())}
                                              orderNumber={"02-014"} date={"25.09.2023"} customer={""} status={"PAID"}/>
                                <AnalysisCard handlePress={() => dispatch(handleOrderInfoModal())}
                                              orderNumber={"02-014"} date={"25.09.2023"} customer={""} status={"PAID"}/>
                            </View>
                        </View>
                    </View>

                </View>
            </WhiteBordered>

        </Modal>
    );
};

const styles = StyleSheet.create({
    inputField: {
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderStyle: "solid",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E2E2E9"
    },
    orderInfo: {
        maxWidth: 251,
        gap: 8
    },
    name: {
        maxWidth: "70%"
    },
    selectableBtn: {
        minWidth: 144,
        height: 52
    },
    profileInfo: {
        maxWidth: 251
    },
    avatarBlock: {
        backgroundColor: cs.rootBg.backgroundColor,
        height: 80,
        width: 80,
    },
    patientsList: {},
    patientsModalBlock: {
        paddingBottom: 24,
        minHeight: "100%"
    },
    patientsContent: {
        flex: 1
    },
})
export default PatientInfoModal;