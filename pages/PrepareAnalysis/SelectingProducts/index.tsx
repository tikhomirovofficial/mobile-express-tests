import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard } from "react-native";
import { cs } from "../../../common/styles";
import { AddIcon, ArrowLeft, ArrowRightIcon, Logo, RemoveIcon, SearchIcon } from "../../../icons";
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
import { addToCart, removeProduct } from '../../../app/features/cart/cartSlice';

const SelectingProducts: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)

    const [searchVal, setSearchVal] = useState("")
    const [categoriesLoading, setCategoriesLoading] = useState(false)
    const products = useAppSelector(state => state.products.items)
    const cartProducts = useAppSelector(state => state.cart.items)

    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
    const handleToSelectingCategory = () => {
        navigation.navigate("order_category")
    }

    useEffect(() => {

        (async () => {

        })();
    }, []);

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
                                <TouchableOpacity onPress={handleToSelectingCategory}>
                                    <ArrowLeft />
                                </TouchableOpacity>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Анализ на микроэлементы..</Text>
                                <View></View>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "99%" : "100%" }]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL]}>Выберите анализы</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock]}>
                                <SearchIcon />
                                <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} style={[cs.fzS, fs.montR, cs.flexOne]} placeholder={"Введите название анализа"} />
                            </View>

                        </View>
                        <View style={[cs.flexOne, { position: "relative" }]}>
                            {categoriesLoading ? <Text style={[cs.txtCenter]}>Загрузка...</Text> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList

                                        contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                        data={searchVal.length > 0 ? products.filter(product => {
                                            if (product.title.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase())) {
                                                return product
                                            }

                                        }) : products}
                                        renderItem={({ item }) => {
                                            const isInCart = cartProducts.some(cartProduct => cartProduct.id === item.id)
                                            const addProduct = () => {
                                                dispatch(addToCart({
                                                    id: item.id,
                                                    price: item.price,
                                                    count: 1
                                                }))
                                            }
                                            const removeItem = () => {
                                                dispatch(removeProduct(item.id))
                                            }

                                            return (<TouchableOpacity style={[cs.fRowBetw, cs.spaceS, cs.fAlCenter]} >
                                                <View key={item.id} style={[cs.fRow, cs.spaceS, { maxWidth: "90%" }]}>
                                                    <View style={[cs.fColumn]}>
                                                        <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark]}>{item.title}</Text>
                                                        <Text style={[cs.fwBold, fs.montR, cs.fzS, cs.colorDark]}>{item.price} ₽</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={!isInCart ? addProduct : removeItem}>
                                                    {
                                                        isInCart ?
                                                            <RemoveIcon /> : <AddIcon />
                                                    }

                                                </TouchableOpacity>


                                            </TouchableOpacity>)
                                        }}
                                    />

                                </View>}

                        </View>


                        <ButtonYellow handlePress={handleToSelectingCategory}>
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
export default SelectingProducts;