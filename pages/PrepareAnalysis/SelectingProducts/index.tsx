import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard } from "react-native";
import { cs } from "../../../common/styles";
import { AddIcon, ArrowLeft, ArrowRightIcon, Logo, RemoveIcon, SearchIcon } from "../../../icons";
import { OrderAnalysisType } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { NavProps } from "../../../types/common.types";
import AppContainer from "../../../components/AppContainer";
import { fs } from "../../../navigation/AppNavigator";
import PatientItem from "../../../components/PatientItem";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import PatientInvitingModal from "../../../components/Modals/PatientInvitingModal";
import { addToCart, removeProduct } from '../../../app/features/cart/cartSlice';
import AnalysisInfoModal from '../../../components/Modals/AnalysisInfoModal';
import { handleAnalysisInfoModal } from '../../../app/features/modals/modalsSlice';
import { useDeferred } from '../../../hooks/useDeffered';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { getProducts } from '../../../app/features/products/productSlice';

const SelectingProducts: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart)

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 500)

    const [categoriesLoading, setCategoriesLoading] = useState(false)
    const { items, part } = useAppSelector(state => state.products)
    const categories = useAppSelector(state => state.categories.items)
    const cartProducts = useAppSelector(state => state.cart.items)
    const currentCategoryId = useAppSelector(state => state.order.currentCategorySelected)
    const currentCategory = categories.filter(ctg => ctg.id === currentCategoryId)[0]

    const handleToCart = () => {
        navigation.navigate("order_cart")
    }
    const handleToSelectingCategory = () => {
        navigation.navigate("order_category")
    }
    const handleOpenProductInfo = () => {
        console.log("Текущий продукт");

        dispatch(handleAnalysisInfoModal())
    }

    useEffect(() => {
        dispatch(getProducts({
            id: currentCategoryId,
            title: searchVal,
            part
        }))
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
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <TouchableOpacity onPress={handleToSelectingCategory}>
                                    <ArrowLeft />
                                </TouchableOpacity>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>{currentCategory !== undefined ? currentCategory.name.slice(0, 17) : ""}</Text>
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
                            {categoriesLoading ?
                                <SkeletonContainer>
                                    <View style={[cs.fColumn, cs.spaceS]}>
                                        <SkeletonView width={"100%"} height={50} />
                                        <SkeletonView width={"100%"} height={50} />
                                    </View>
                                </SkeletonContainer> :
                                <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                    <FlatList
                                        contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                        data={items}
                                        renderItem={({ item, index }) => {
                                            const isInCart = cartProducts.some(cartProduct => cartProduct.id === item.id)
                                            const addProduct = () => {
                                                dispatch(addToCart({
                                                    id: item.id,
                                                    price: item.cost,
                                                    count: 1
                                                }))
                                            }
                                            const removeItem = () => {
                                                dispatch(removeProduct(item.id))
                                            }

                                            return (<TouchableOpacity onPress={handleOpenProductInfo} style={[cs.fRowBetw, cs.spaceS, cs.fAlCenter, { paddingBottom: 16, paddingTop: index ? 16 : 0, borderBottomWidth: 1, borderBottomColor: "#f3f3f3" }]} >
                                                <View key={item.id} style={[cs.fRow, cs.spaceS, { maxWidth: "90%" }]}>
                                                    <View style={[cs.fColumn]}>
                                                        <Text style={[cs.fwMedium, fs.montR, cs.fzS, cs.colorDark]}>{item.name}</Text>
                                                        <Text style={[cs.fwBold, fs.montR, cs.fzS, cs.colorDark]}>{item.cost} ₽</Text>
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


                        <ButtonYellow handlePress={handleToCart}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Корзина</Text>
                                {14 > 0 ? <View style={cs.count}>
                                    <Text style={cs.countText}>{cart.items.length}</Text>
                                </View> : null}
                            </View>
                        </ButtonYellow>
                    </View>
                </WhiteBorderedLayout>
            </View>
            <AnalysisInfoModal />
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