import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard } from "react-native";
import { cs } from "../../../common/styles";
import { ArrowLeft, ArrowRightIcon, Logo, SearchIcon } from "../../../icons";
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
import { setCurrentCategory } from '../../../app/features/order/orderSlice';

const SelectingCategory: FC<NavProps> = ({navigation }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)
    const patients = useAppSelector(state => state.patients.items)

    const [searchVal, setSearchVal] = useState("")
    const [categoriesLoading, setCategoriesLoading] = useState(false)
    const patient = useAppSelector(state => state.order.patientData)
    const categories = useAppSelector(state => state.categories.items)
    const products = useAppSelector(state => state.products.items)
    const patientFullName = `${patient?.firstName || ""} ${patient?.lastName || ""} ${patient?.firstName === undefined && patient?.lastName === undefined ? "Пациент" : ""}`
    

    const handleToSelectingPatient = () => {
        navigation.navigate("order_patient")
    }
    const toProducts = (categoryId: number) => {
        dispatch(setCurrentCategory(categoryId))
        navigation.navigate("order_products")
    }
    const toCart = () => {
        navigation.navigate("order_cart")
    }
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
            <View style={[cs.fColumn, cs.spaceM]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={handleToSelectingPatient}>
                                    <ArrowLeft />
                                </TouchableOpacity>

                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>{patientFullName}</Text>
                                <View></View>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "99%" : "100%" }]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL]}>Выберите категорию</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot, , cs.sliderDotActive]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock]}>
                                <SearchIcon />
                                <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} style={[cs.fzS, fs.montR, cs.flexOne]} placeholder={"Название категории"} />
                            </View>

                        </View>
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            {categoriesLoading ? <Text style={[cs.txtCenter]}>Загрузка...</Text> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList

                                        contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                        data={searchVal.length > 0 ? categories.filter(category => {
                                            if(category.title.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())) {
                                                return category
                                            }

                                        }) : categories}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => toProducts(item.id)} style={[cs.fRowBetw, cs.spaceS]}>
                                                <View key={item.id} style={[cs.fRow, cs.spaceS, { maxWidth: "90%" }]}>
                                                    <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark]}>{item.title}</Text>
                                                    <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark, cs.colorGray]}>{products.filter(product => product.category_id === item.id).length}</Text>
                                                </View>
                                                <View style={[{ marginTop: 3 }]}>
                                                    <ArrowRightIcon />
                                                </View>


                                            </TouchableOpacity>
                                        )}
                                    />

                                </View>}

                        </View>


                        <ButtonYellow handlePress={toCart}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Корзина</Text>
                                {14 > 0 ? <View style={cs.count}>
                                    <Text style={cs.countText}>{cart.items.length}</Text>
                                </View> : null}

                            </View>



                        </ButtonYellow>


                    </View>

                </WhiteBorderedLayout>
            </View >
            
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
export default SelectingCategory;