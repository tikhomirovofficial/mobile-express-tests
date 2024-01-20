import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList } from "react-native";
import { cs } from "../../../common/styles";
import { ArrowLeft, Logo, SearchIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { NavProps } from "../../../types/common.types";
import AppContainer from "../../../components/AppContainer";
import { fs } from "../../../navigation/AppNavigator";
import PatientItem from "../../../components/PatientItem";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import PatientInvitingModal from "../../../components/Modals/PatientInvitingModal";
import { handlePatientInvitingModal } from "../../../app/features/modals/modalsSlice";
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { addInvitingsId, removeInvitingsId, resetInvitingsIds } from '../../../app/features/patients/patientsSlice';

const CheckSelectedPatients: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()

    const contacts = useAppSelector(state => state.patients.items)
    const [contactsLoading, setContactsLoading] = useState(false)
    const contactsSelected = useAppSelector(state => state.patients.invitingsIds)

    const handleToSelectingPatients = () => {
        navigation.navigate("inviting")
    }
    const sendInvitings = () => {
        dispatch(resetInvitingsIds())
        navigation.navigate("inviting_sent")
    }

    return (
        <Animated.View>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRow, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={handleToSelectingPatients}>
                                    <ArrowLeft />
                                </TouchableOpacity>

                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Приглашение пациентов</Text>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL]}>Проверьте номера</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                </View>
                            </View>
                        </View>
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            {contactsLoading ? <Text style={[cs.txtCenter]}>Загрузка...</Text> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList
                                        data={contacts}
                                        renderItem={({ item }) => (
                                            <PatientItem handlePress={() => {
                                                const alreadySelected = contactsSelected.some(contact => contact === item.id)

                                               
                                                if(!alreadySelected) {
                                                    dispatch(addInvitingsId(item.id))
                                                    return
                                                } 
                                                dispatch(removeInvitingsId(item.id))

                                            }} key={item.id} selected={contactsSelected.some(contact => contact === item.id)} firstName={item.firstName || ""} lastName={item.lastName || ""} phone={item.phoneNumbers ? item.phoneNumbers[0]?.number || "" : ""} avatarSrc={null} />
                                        )}
                                    />

                                </View>}

                        </View>


                        <ButtonYellow disabled={contactsSelected.length < 1} handlePress={sendInvitings}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Пригласить</Text>
                                {contactsSelected.length > 0 ? <View style={cs.count}>
                                    <Text style={cs.countText}>{contactsSelected.length}</Text>
                                </View> : null}

                            </View>


                        </ButtonYellow>


                    </View>

                </WhiteBorderedLayout>
            </View >
            <PatientInvitingModal />
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
export default CheckSelectedPatients;