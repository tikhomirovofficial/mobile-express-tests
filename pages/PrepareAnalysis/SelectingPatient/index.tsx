import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard, ActivityIndicator } from "react-native";
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
import { getSearchPatients, incrementSearchedPatientsPart, resetSearchedPatients, setPatients } from '../../../app/features/patients/patientsSlice';
import { resetPatient, setPatient } from '../../../app/features/order/orderSlice';
import { useDeferred } from '../../../hooks/useDeffered';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { usePagination } from '../../../hooks/usePagination';

const SelectingPatient: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { patientData } = useAppSelector(state => state.order)
    const { searched_list, loadings, searched_can_next, searched_part } = useAppSelector(state => state.patients)
    const { patientInvitingModal } = useAppSelector(state => state.modals)
    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 100)

    const [loadSearchedPatients, loadMore] = usePagination(
        () => { dispatch(getSearchPatients({ part: searched_part, pacient: searchVal })) },
        () => { dispatch(incrementSearchedPatientsPart()) },
        {
            part: searched_part,
            can_more: searched_can_next,
            items: searched_list,
            loading: loadings.search_patients_pagination
        }
    )

    const [contactsSelected, setContactsSelected] = useState<number>(patientData.id > 0 ? patientData.id : -1)
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
    const handleSelectPatient = (id: number) => {
        if (id) {
            setContactsSelected(id)
            const patientData = searched_list.filter(item => item.id === id)[0]
            dispatch(setPatient({
                id: patientData.id,
                first_name: patientData.first_name || "",
                last_name: patientData.last_name || ""
            }))
        }

    }
    useEffect(() => {
        console.log(patientData);

    }, [patientData])

    const toSelectCategory = () => navigation.navigate("order_category")

    const openNewPatient = () => {
        navigation.navigate("inviting")
    }

    useEffect(() => {
        dispatch(resetSearchedPatients())
    }, [defferedSearchVal])

    useEffect(loadSearchedPatients, [searched_part])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });
        return () => {
            dispatch(resetSearchedPatients())
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Animated.View>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: keyboardStatus ? "99%" : "100%" }]}>
                <WhiteBorderedLayout
                    scrollable={false}
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRow, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={handleToMyPatients}>
                                    <ArrowLeft />
                                </TouchableOpacity>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Подготовка анализов</Text>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceS, styles.patientsContent]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL]}>Выберите пациента</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock]}>
                                <SearchIcon />
                                <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} style={[cs.fzS, fs.montR, cs.flexOne]} placeholder={"Найти по имени или номеру"} />
                            </View>
                            <TouchableOpacity onPress={openNewPatient}>
                                <Text style={[cs.textYellow, cs.fwSemi, { textDecorationLine: "underline" }]}>Пригласить пациента</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={cs.flexOne}>
                            <View style={[cs.flexOne, { position: "relative" }]}>
                                {loadings.search_patients ?
                                    <SkeletonContainer>
                                        <View style={[cs.fColumn, cs.spaceS]}>
                                            <SkeletonView width={"100%"} height={50} />
                                            <SkeletonView width={"100%"} height={50} />
                                        </View>
                                    </SkeletonContainer> :
                                    searched_list.length ?
                                        <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                            <FlatList
                                                data={searched_list}
                                                showsVerticalScrollIndicator={false}
                                                onEndReached={loadMore}
                                                renderItem={({ item }) => (
                                                    <PatientItem
                                                        handlePress={() => handleSelectPatient(item.id)}
                                                        isRadio={true}
                                                        key={item.id}
                                                        selected={contactsSelected === item.id}
                                                        {...item} />
                                                )}
                                            />
                                        </View> :
                                        <Text style={fs.montR}>Вы пока не пригласили пациентов.</Text>
                                }

                            </View>
                            <View style={{ height: 20 }}>
                                {loadings.search_patients_pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}
                            </View>
                        </View>
                        <ButtonYellow disabled={contactsSelected === -1} handlePress={toSelectCategory}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
                            </View>
                        </ButtonYellow>
                    </View>
                </WhiteBorderedLayout>
            </View >
            {patientInvitingModal ? <PatientInvitingModal /> : null}
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
        paddingBottom: 32
    },
})
export default SelectingPatient;