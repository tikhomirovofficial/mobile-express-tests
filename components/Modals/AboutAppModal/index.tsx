import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import WhiteBordered from "../../../layouts/WhiteBordered";
import { cs } from "../../../common/styles";
import ButtonYellow from "../../Buttons/ButtonYellow";
import { DocumentIcon, LogoLong, PhotoIcon } from "../../../icons";
import { fs } from "../../../navigation/AppNavigator";
import SelectableBtn from "../../SelectableBtn";
import { handleAboutModal, handleProfileEditModal } from "../../../app/features/modals/modalsSlice";
import { ModalContainer } from '../../ModalContainer';
import { useAppTheme } from '../../../hooks/useTheme';
import { DocumentItem } from '../../DocumentItem';




const docsArr = [1, 3, 34, 5]

const AboutAppModal = () => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { aboutAppModal } = useAppSelector(state => state.modals)

    const handleModal = () => {
        dispatch(handleAboutModal())
    }

    return (
        <Modal animationType={"slide"} visible={aboutAppModal} transparent={true}>
            <WhiteBordered style={{ ...cs.modalSlidedBottom, paddingBottom: 20 }}>
                <View style={[cs.flexOne, styles.aboutAppContent, cs.fColumnBetw, cs.spaceXXL]}>
                    <View style={[cs.fRowBetw]}>
                        <Text onPress={handleModal}
                            style={[cs.yellowBtnText, cs.textYellow, cs.fzM]}>Закрыть</Text>
                        <View style={[cs.fAlCenter]}>
                            <Text style={[cs.fzM, cs.colorDark, cs.fzM, cs.colorDark, cs.fwSemi, {color: theme.text_label}]}>О приложении</Text>
                        </View>
                        <View style={{ flex: 0.4 }}></View>
                    </View>
                    <View style={[styles.aboutAppContent, cs.spaceXL]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <LogoLong />
                            <View style={[styles.versionBlock, cs.dF, cs.fRow]}>
                                <Text style={[cs.fzS, cs.colorGray, fs.montR]}>Версия</Text>
                                <Text style={[cs.fzS, cs.colorDark, cs.fwMedium]}>1.0</Text>
                            </View>
                        </View>
                        <View style={[cs.spaceM, cs.fColumn]}>
                            {
                                docsArr.map((item, index) => (
                                    <DocumentItem title={"Документ"} neededBorder={index !== docsArr.length - 1} />
                                ))
                            }

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
export default AboutAppModal;