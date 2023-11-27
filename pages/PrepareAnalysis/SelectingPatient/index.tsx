import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard } from "react-native";
import { cs } from "../../../common/styles";
import { ArrowLeft, Logo, SearchIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/analysis.types";
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

const SelectingPatient: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const [searchVal, setSearchVal] = useState("")
    const [contacts, setContacts] = useState<Array<Contacts.Contact>>([])
    const [contactsLoading, setContactsLoading] = useState(false)
    const [contactsSelected, setContactsSelected] = useState<string[]>([])

    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
    const toSelectCategory = () => {
        navigation.navigate("order_category")
    }
    
    useEffect(() => {

        (async () => {
            const contactsPermissions = await Permissions.askAsync(Permissions.CONTACTS);
            console.log(contactsPermissions.status);

            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setContactsLoading(true)
                const { data } = await Contacts.getContactsAsync();

                if (data.length > 0) {
                    setContacts(data.slice(0, 3))
                    setContactsLoading(false)
                }
            }
        })();
    }, []);
    const openNewPatient = () => dispatch(handlePatientInvitingModal())
    
    const [keyboardStatus, setKeyboardStatus] = useState(false);

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
                                <Text style={[cs.textYellow, cs.fwSemi, { textDecorationLine: "underline" }]}>Новый номер телефона</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            {contactsLoading ? <Text style={[cs.txtCenter]}>Загрузка...</Text> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList
                                        data={searchVal.length > 0 ? contacts.filter(contact => {
                                            const matchFirstName = contact.firstName?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
                                            const matchLastName = contact.lastName?.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())
                                            if(matchFirstName || matchLastName) {
                                                return contact
                                            }

                                    
                                        }): contacts}
                                        renderItem={({ item }) => (
                                            <PatientItem isRadio={true} handlePress={() => {
                                                

                                                setContactsSelected(prev => {
                
                                                    const alreadySelected = contactsSelected.some(contact => contact === item.id)
                                                    if (!alreadySelected) {
                                                            
                                                        return [item.id]
                                                    }
                                                    return prev.filter(contact => contact !== item.id)

                                                })

                                            }} key={item.id} selected={contactsSelected.some(contact => contact === item.id)} firstName={item.firstName || ""} lastName={item.lastName || ""} phone={item.phoneNumbers ? item.phoneNumbers[0]?.number || "" : ""} avatarSrc={null} />
                                        )}
                                    />

                                </View>}

                        </View>


                        <ButtonYellow disabled={contactsSelected.length < 1} handlePress={toSelectCategory}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Далее</Text>
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
export default SelectingPatient;