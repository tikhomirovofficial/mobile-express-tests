import React, { FC, useEffect, useState } from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, SectionList, FlatList, Keyboard, ActivityIndicator } from "react-native";
import { cs } from "../../../common/styles";
import { SearchIcon } from "../../../icons";
import { AnalysisApi } from "../../../types/entities/analysis.types";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { NavProps } from "../../../types/common.types";
import AppContainer from "../../../components/AppContainer";
import { fs } from "../../../navigation/AppNavigator";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import { handleAnalysisInfoModal } from "../../../app/features/modals/modalsSlice";

import { getCategories, incrementCategoriesProductsPart, resetCategoriesProducts } from '../../../app/features/categories/categoriesSlice';
import { useDeferred } from '../../../hooks/useDeffered';
import { SkeletonContainer } from 'react-native-skeleton-component';
import { SkeletonView } from '../../../components/SkeletonView';
import { useAppTheme } from '../../../hooks/useTheme';
import { BackButton } from '../../../components/BackButton';
import { usePagination } from '../../../hooks/usePagination';
import { CategoryApi } from '../../../types/entities/categories.types';

import { CategoryOrProductItem } from '../../../components/CategoryOrProductItem';
import { getProductById } from '../../../app/features/current-data/currentData';
import AnalysisInfoModal from '../../../components/Modals/AnalysisInfoModal';

const SelectingCategory: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { analysisInfoModal } = useAppSelector(state => state.modals)
    const cart = useAppSelector(state => state.cart)

    const [searchVal, setSearchVal] = useState("")
    const defferedSearchVal = useDeferred(searchVal, 500)

    const patient = useAppSelector(state => state.order.patientData)
    const cartProducts = useAppSelector(state => state.cart.items)
    const { can_next, part, categories, analisys } = useAppSelector(state => state.categories)
    const loadings = useAppSelector(state => state.categories.loadings)
    const patientFullName = `${patient?.first_name || ""} ${patient?.last_name || ""} ${patient?.first_name === undefined && patient?.last_name === undefined ? "Пациент" : ""}`
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    const [loadCategoriesProducts, loadMore] = usePagination(
        () => dispatch(getCategories({ part, title: searchVal, analiz: searchVal })),
        () => dispatch(incrementCategoriesProductsPart()),
        {
            part,
            can_more: can_next,
            items: [...categories, ...analisys],
            loading: loadings.pagination
        },
    )

    const handleToSelectingPatient = () => {
        navigation.navigate("order_patient")
    }

    const toProducts = () => {
        navigation.navigate("order_products")
    }

    const toCart = () => {
        navigation.navigate("order_cart")
    }
    const handleOpenProductInfo = (product_id: number) => {
        dispatch(handleAnalysisInfoModal())
        dispatch(getProductById({ id: product_id }))
    }

    useEffect(() => {
        dispatch(resetCategoriesProducts())
    }, [defferedSearchVal])

    useEffect(loadCategoriesProducts, [part])

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
                                <BackButton handleBack={handleToSelectingPatient} />
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>{patientFullName}</Text>
                                <View></View>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.spaceXL, styles.patientsContent, { minHeight: keyboardStatus ? "100%" : "100%" }]}>
                        <View style={[cs.spaceL, cs.fColumn]}>
                            <View style={[cs.fRowBetw, cs.spaceM, cs.fAlCenter]}>
                                <Text style={[cs.fwSemi, cs.fwBold, cs.fzXL, { color: theme.title }]}>Выберите категорию</Text>
                                <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                    <View style={[cs.sliderDot]}></View>
                                    <View style={[cs.sliderDot, cs.sliderDotActive]}></View>
                                    <View style={[cs.sliderDot]}></View>
                                </View>
                            </View>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS, styles.searchInputBlock, { backgroundColor: theme.main_bg }]}>
                                <SearchIcon stroke={theme.text_label} />
                                <TextInput value={searchVal} onChangeText={(text) => setSearchVal(text)} placeholderTextColor={theme.text_label} style={[cs.fzS, fs.montR, cs.flexOne, cs.searchInput, { color: theme.title }]} placeholder={"Название категории или анализа"} />
                            </View>

                        </View>
                        <View style={[cs.flexOne]}>
                            <View style={[cs.flexOne, { position: "relative" }]}>
                                {loadings.categories ?
                                    <SkeletonContainer backgroundColor={theme.skeleton}>
                                        <View style={[cs.fColumn, cs.spaceS]}>
                                            <SkeletonView width={"100%"} height={50} />
                                            <SkeletonView width={"100%"} height={50} />
                                        </View>
                                    </SkeletonContainer>
                                    :
                                    [...categories, ...analisys].length ?
                                        <View style={[{ position: "absolute", height: "100%", width: "100%" }]}>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                onEndReached={loadMore}
                                                contentContainerStyle={[cs.fColumn, cs.spaceS]}
                                                data={[...categories, ...analisys] as (CategoryApi | AnalysisApi)[]}
                                                renderItem={({ item }) => {
                                                    return <CategoryOrProductItem openAnalysisInfo={() => handleOpenProductInfo(item.id)} item={item} toProducts={toProducts} cartProducts={cartProducts} />
                                                }}
                                            />
                                        </View> :
                                        <Text style={[fs.montR, { color: theme.text_label }]}>По вашему запросу ничего не найдено.</Text>
                                }

                            </View>
                            <View style={{ height: 20 }}>
                                {loadings.pagination ? <ActivityIndicator color={cs.bgYellow.backgroundColor} /> : null}
                            </View>
                        </View>

                        <ButtonYellow handlePress={toCart}>
                            <View style={[cs.fRow, cs.fAlCenter, cs.spaceS]}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Корзина</Text>
                                {cart.items.length > 0 ? <View style={cs.count}>
                                    <Text style={[cs.countText, fs.montR]}>{cart.items.length}</Text>
                                </View> : null}
                            </View>
                        </ButtonYellow>
                    </View>
                </WhiteBorderedLayout>
            </View >
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
export default SelectingCategory;