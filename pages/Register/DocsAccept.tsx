import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard, ActivityIndicator, Linking } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import * as FileSystem from 'expo-file-system';
import { useAppTheme } from '../../hooks/useTheme';
import { DocumentItem } from '../../components/DocumentItem';
import { setHasDocs } from '../../app/features/profile/profileSlice';
import ButtonYellow from '../../components/Buttons/ButtonYellow';



const DocsAccept: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { docs_url } = useAppSelector(state => state.profile)

    const downloadDocs = () => {
        if (!docs_url) {
            return undefined
        }
        if (docs_url) {
            return () => {
                try {
                    Linking.openURL(docs_url)
                } catch {
                    console.log("Ошибка перехода на файл");
                }
            }
        }

    }
    const acceptDocs = () => dispatch(setHasDocs(true))

    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>Договор</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: "100%", paddingBottom: 32 }]}>
                        <View style={[cs.fColumn, cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <View style={[cs.fColumn, cs.spaceM]}>
                                    <Text style={[cs.title, { color: theme.title }]}>Подпишите договор</Text>
                                    <Text style={[cs.fzS, fs.montR, { color: theme.text_val }]}>Нажмите кнопку <Text style={[cs.fwSemi, { color: theme.text_label }]}>Подписать</Text>, чтобы подписать договор. Нажмите <Text style={[cs.fwSemi, { color: theme.text_label }]}>Скачать</Text>, чтобы сохранить документ на ваше устройство.</Text>
                                </View>
                                <DocumentItem to={docs_url} title={"Агентский договор"} neededBorder={false} />
                            </View>
                            <ButtonYellow handlePress={acceptDocs}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Подписать</Text>
                            </ButtonYellow>
                            <View style={[cs.fCenterCol]}>
                                <TouchableOpacity onPress={downloadDocs}>
                                    <Text style={[cs.fClickableGray, cs.fzM, cs.fwMedium, cs.textYellow]}>Скачать</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};

export default DocsAccept;