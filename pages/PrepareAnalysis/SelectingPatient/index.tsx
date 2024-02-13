import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard } from "react-native";
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
import { getSearchPatients, setPatients } from '../../../app/features/patients/patientsSlice';
import { setPatient } from '../../../app/features/order/orderSlice';
import { useDeferred } from '../../../hooks/useDeffered';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';

const SelectingPatient: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { searched_list, loadings } = useAppSelector(state => state.patients)
    const { patientInvitingModal } = useAppSelector(state => state.modals)

    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 500)

    const [contactsSelected, setContactsSelected] = useState<number>(-1)
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
    const handleSelectPatient = (id: number) => {
        setContactsSelected(id)
        const patientData = searched_list.filter(item => item.id === id)[0]
        dispatch(setPatient({
            id: patientData.id,
            first_name: patientData.first_name || "",
            last_name: patientData.last_name || ""
        }))
    }

    const toSelectCategory = () => navigation.navigate("order_category")


    // useEffect(() => {
    //     (async () => {
    //         // const contactsPermissions = await Permissions.askAsync(Permissions.CONTACTS);
    //         // console.log(contactsPermissions.status);

    //         // const { status } = await Contacts.requestPermissionsAsync();
    //         // if (status === 'granted') {
    //         //     setContactsLoading(true)
    //         //     const { data } = await Contacts.getContactsAsync();

    //         //     if (data.length > 0) {
    //         //         dispatch(setPatients(data.slice(0, 3)))
    //         //         setContactsLoading(false)
    //         //     }
    //         // }
    //     })();
    // }, []);

    const openNewPatient = () => {
        navigation.navigate("inviting")
    }

    useEffect(() => {
        dispatch(getSearchPatients({ pacient: searchVal }))
    }, [defferedSearchVal])

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
                    <View style={[cs.spaceXL, styles.patientsContent]}>
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
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            {loadings.search_patients ?
                                <SkeletonContainer>
                                    <View style={[cs.fColumn, cs.spaceS]}>
                                        <SkeletonView width={"100%"} height={50} />
                                        <SkeletonView width={"100%"} height={50} />
                                    </View>
                                </SkeletonContainer> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList
                                        data={searched_list}
                                        renderItem={({ item }) => (
                                            <PatientItem
                                                handlePress={() => handleSelectPatient(item.id)}
                                                isRadio={true}
                                                key={item.id}
                                                selected={contactsSelected === item.id}
                                                {...item} />
                                        )}
                                    />
                                </View>}
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