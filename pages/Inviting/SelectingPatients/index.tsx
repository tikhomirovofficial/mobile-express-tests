import React, {FC} from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import {Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {cs} from "../../../common/styles";
import {ArrowLeft, Logo, SearchIcon} from "../../../icons";
import {OrderAnalysisType} from "../../../types/analysis.types";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {NavProps} from "../../../types/common.types";
import AppContainer from "../../../components/AppContainer";
import {fs} from "../../../navigation/AppNavigator";
import PatientItem from "../../../components/PatientItem";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import PatientInvitingModal from "../../../components/Modals/PatientInvitingModal";
import {handlePatientInvitingModal} from "../../../app/features/modals/modalsSlice";

const analysisData: OrderAnalysisType[] = [
    {
        customer: "Владислав Тузов",
        date: "25.09.2023",
        orderNumber: "02-014",
        status: "PAID"
    },
    {
        customer: "Александр Тузов",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    },
    {
        customer: "Артём Тихомиров",
        date: "25.09.2023",
        orderNumber: "02-016",
        status: "NOT_PAID"
    }
]

const SelectingPatients: FC<NavProps> = ({navigation}) => {
    const dispatch = useAppDispatch()
    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
    const openNewPatient = () => dispatch(handlePatientInvitingModal())
    
    return (
        <Animated.View>
            <View style={[cs.fColumn, cs.spaceM, {minHeight: "100%"}]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{paddingBottom: 0}}>
                            <View style={[cs.fRow, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={handleToMyPatients}>
                                    <ArrowLeft/>
                                </TouchableOpacity>

                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Приглашение пациентов</Text>
                            </View>
                        </AppContainer>

                    }
                    style={{paddingTop: 40, maxHeight: "100%"}}>
                    <View style={[cs.spaceXL, styles.patientsContent]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL]}>Выберите пациентов</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock]}>
                                <SearchIcon/>
                                <TextInput style={[cs.fzS, fs.montR, cs.flexOne]} placeholder={"Найти по имени или номеру"} />
                            </View>
                            <TouchableOpacity onPress={openNewPatient}>
                                <Text style={[cs.textYellow, cs.fwSemi, {textDecorationLine: "underline"}]}>Новый номер телефона</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[cs.fColumn, cs.spaceM, cs.flexOne]}>
                            <Text style={[cs.colorGray, cs.fwBold, styles.firstLetterContact]}>В</Text>
                            <View>
                                <PatientItem selected={true} firstName={"Вячеслав"} lastName={"Подосёнов"} phone={"+7 (951) 735-89-45"} avatarSrc={null}/>
                                <PatientItem selected={false} firstName={"Вячеслав"} lastName={"Подосёнов"} phone={"+7 (951) 735-89-45"} avatarSrc={null}/>
                            </View>

                        </View>
                        <ButtonYellow handlePress={() => {
                        }}>
                            <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                        </ButtonYellow>


                    </View>

                </WhiteBorderedLayout>
            </View>
            <PatientInvitingModal/>
        </Animated.View>

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
        minHeight: "94%"
    },
})
export default SelectingPatients;