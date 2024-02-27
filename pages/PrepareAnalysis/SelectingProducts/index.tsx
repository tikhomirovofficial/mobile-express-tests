import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard, ActivityIndicator } from "react-native";
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
import { getProducts, incrementProductsPart, resetPart, resetProducts } from '../../../app/features/products/productSlice';
import ProductItem from '../../../components/ProductItem';
import { getProductById } from '../../../app/features/current-data/currentData';
import { useAppTheme } from '../../../hooks/useTheme';
import { BackButton } from '../../../components/BackButton';
import { usePagination } from '../../../hooks/usePagination';

const SelectingProducts: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()

    const cart = useAppSelector(state => state.cart)
    const categories = useAppSelector(state => state.categories.categories)
    const cartProducts = useAppSelector(state => state.cart.items)
    const { analysisInfoModal } = useAppSelector(state => state.modals)
    const { items, part, loadings, can_next } = useAppSelector(state => state.products)

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 200)

    const currentCategoryId = useAppSelector(state => state.order.currentCategorySelected)
    const currentCategory = categories.filter(ctg => ctg.id === currentCategoryId)[0]

    const [loadProducts, loadMore] = usePagination(
        () => dispatch(getProducts({ part, title: searchVal, id: currentCategoryId })),
        () => dispatch(incrementProductsPart()),
        {
            part,
            can_more: can_next,
            items,
            loading: loadings.pagination
        },
        [currentCategoryId]
    )
    const handleToCart = () => {
        navigation.navigate("order_cart")
    }

    const handleToSelectingCategory = () => {
        navigation.navigate("order_category")
    }

    const handleOpenProductInfo = (product_id: number) => {
        dispatch(handleAnalysisInfoModal())
        dispatch(getProductById({ id: product_id }))
    }

    // const loadProducts = () => {
    //     if (part !== 1) {
    //         if (part === 0 && !items.length) {
    //             dispatch(getProducts({
    //                 id: currentCategoryId,
    //                 title: defferedSearchVal,
    //                 part
    //             }));
    //         } else if (can_next) {
    //             dispatch(getProducts({
    //                 id: currentCategoryId,
    //                 title: defferedSearchVal,
    //                 part
    //             }));
    //         }
    //     }
    // }

    // const loadMore = () => {
    //     if (can_next && items.length, !loadings.pagination) {
    //         dispatch(incrementProductsPart())
    //     }
    // }

    useEffect(() => {
        dispatch(resetProducts())
    }, [defferedSearchVal])


    useEffect(loadProducts, [part])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });
        return () => {
            dispatch(resetProducts())
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
                                <BackButton handleBack={handleToSelectingCategory} />
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>{currentCategory !== undefined ? currentCategory.name.slice(0, 17) : ""} {currentCategory.name.length >= 16 ? "..." : ""}</Text>
                                <View></View>
                            </View>
                        </AppContainer>

                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "100%" : "100%" }]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL, { color: theme.title }]}>Выберите анализы</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock, { backgroundColor: theme.main_bg }]}>
                                <SearchIcon stroke={theme.text_label} />
                                <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} placeholderTextColor={theme.text_label} style={[cs.fzS, fs.montR, cs.flexOne, { color: theme.title }]} placeholder={"Найти по названию"} />
                            </View>

                        </View>
                        <View style={[cs.flexOne]}>
                            <View style={[cs.flexOne, { position: "relative" }]}>
                                {loadings.products ?
                                    <SkeletonContainer backgroundColor={theme.skeleton}>
                                        <View style={[cs.fColumn, cs.spaceS, cs.flexOne]}>
                                            <SkeletonView width={"100%"} height={50} />
                                            <SkeletonView width={"100%"} height={50} />
                                        </View>
                                    </SkeletonContainer> :
                                    items.length ?
                                        <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                            <FlatList
                                                contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                                onEndReached={loadMore}
                                                getItemLayout={(data, index) => ({
                                                    length: 50,
                                                    offset: 50 * index,
                                                    index,
                                                })}
                                                initialNumToRender={5}
                                                showsVerticalScrollIndicator={false}
                                                data={items}
                                                renderItem={({ item, index }) =>
                                                    <ProductItem
                                                        clickHandle={() => handleOpenProductInfo(item.id)}
                                                        product={item}
                                                        isInCart={cartProducts.some(cartProduct => cartProduct.id === item.id)}
                                                        index={index}
                                                    ></ProductItem>}
                                            />
                                        </View> :
                                        <Text style={[fs.montR, { color: theme.text_label }]}>По вашему запросу ничего не найдено.</Text>
                                }
                            </View>
                            <View style={{ height: 20 }}>
                                {loadings.pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}
                            </View>
                        </View>

                        <ButtonYellow handlePress={handleToCart}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Корзина</Text>
                                {cart.items.length > 0 ? <View style={cs.count}>
                                    <Text style={[cs.countText, fs.montR]}>{cart.items.length}</Text>
                                </View> : null}
                            </View>
                        </ButtonYellow>
                    </View>
                </WhiteBorderedLayout>
            </View>
            {
                analysisInfoModal ? <AnalysisInfoModal navigation={navigation} /> : null
            }

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