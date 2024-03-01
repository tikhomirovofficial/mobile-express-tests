import React, { FC, ReactNode, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle, Text, RefreshControl } from "react-native";
import AppContainer from "../../components/AppContainer";
import { cs } from "../../common/styles";
import { IOScrollView } from 'react-native-intersection-observer';
import { useRefresh } from '../../hooks/useRefresh';
import { useAppSelector } from '../../app/base/hooks';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useTheme';

type WhiteBorderedProps = {
    children: ReactNode,
    scrollable?: boolean
    style?: ViewStyle | ViewStyle[],
    isModal?: boolean
    topContent?: ReactNode,
    modalLevel?: number,
    onRefresh?: () => any,
    refreshing?: boolean,
    transparentBg?: boolean
}
const minContainerHeight = Dimensions.get("window").height / 100 * 92

const WhiteBorderedLayout: FC<WhiteBorderedProps> = ({ children, topContent, style, isModal = false, scrollable = true, onRefresh, modalLevel = 1, refreshing = false, transparentBg = true }) => {
    const theme = useAppTheme()
    const { modals } = useAppSelector(state => state)
    const modalsKeys = Object.keys(modals) as [keyof typeof modals]
    const openedSome = modalsKeys.some(key => modals[key])
    const offsetViaPaddingTop = modalLevel > 1 ? (80 + (modalLevel * 12)) : 80

    return (
        <View style={[styles.baseView, { backgroundColor: isModal ? "rgba(0, 0, 0, 0.0)" : theme.main_bg }]}>
            {
                scrollable ?
                    <IOScrollView refreshControl={
                        onRefresh && !openedSome ? <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        /> : undefined
                    } nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} style={cs.flexOne}>
                        <View style={[styles.containerWrapperScroll, { backgroundColor: transparentBg ? "transparent" : theme.main_bg, paddingTop: offsetViaPaddingTop }]}>
                            {topContent}
                            <View style={[styles.whiteContainer, style, { backgroundColor: theme.borderedBg }]}>
                                <AppContainer>
                                    {children}
                                </AppContainer>
                            </View>
                        </View>
                    </IOScrollView> :
                    <View style={[cs.flexOne, styles.scrollContainer, { backgroundColor: transparentBg ? "transparent" : theme.main_bg }]}>
                        <View style={[styles.containerWrapperScroll, { paddingTop: offsetViaPaddingTop }]}>
                            {topContent}
                            <View style={[styles.whiteContainer, style, { backgroundColor: theme.borderedBg }]}>
                                <AppContainer style={{ flex: 1 }}>
                                    {children}
                                </AppContainer>
                            </View>
                        </View>
                    </View>
            }

        </View>


    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        minHeight: "100%"
    },

    baseView: {
        minHeight: "100%",
        backgroundColor: "black"
    },
    containerWrapper: {
        flex: 1,
    },
    containerWrapperScroll: {
        display: "flex",
        minHeight: "100%",
        gap: 16,
        flex: 1,
        paddingTop: 80,
        justifyContent: "flex-end",
        flexDirection: "column"

    },
    whiteContainer: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.1,
        maxHeight: "100%",
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    }
})
export default WhiteBorderedLayout;