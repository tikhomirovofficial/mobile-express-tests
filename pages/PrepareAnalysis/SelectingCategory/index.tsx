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
import { getCategories } from '../../../app/features/categories/categoriesSlice';
import { useDeferred } from '../../../hooks/useDeffered';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { CategoryItem } from '../../../components/CategoryItem';

const SelectingCategory: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)

    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 100)

    
    const patient = useAppSelector(state => state.order.patientData)
    console.log(patient);
    const categories = useAppSelector(state => state.categories.items)
    const loadings = useAppSelector(state => state.categories.loadings)
    const patientFullName = `${patient?.first_name || ""} ${patient?.last_name || ""} ${patient?.first_name === undefined && patient?.last_name === undefined ? "Пациент" : ""}`
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    const handleToSelectingPatient = () => {
        navigation.navigate("order_patient")
    }

    const toProducts = () => {
        navigation.navigate("order_products")
    }

    const toCart = () => {
        navigation.navigate("order_cart")
    }

    useEffect(() => {
        dispatch(getCategories({title: defferedSearchVal}))
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
            <View style={[cs.fColumn, cs.spaceM]}>
                <WhiteBorderedLayout
                    scrollable={false}
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
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "100%" : "100%" }]}>
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
                            {loadings.categories ?
                                <SkeletonContainer>
                                    <View style={[cs.fColumn, cs.spaceS]}>
                                        <SkeletonView width={"100%"} height={50} />
                                        <SkeletonView width={"100%"} height={50} />
                                    </View>
                                </SkeletonContainer>
                                :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                        data={categories}
                                        renderItem={({ item, index }) => (
                                            <CategoryItem clickHandle={toProducts} index={index} category={item} />
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