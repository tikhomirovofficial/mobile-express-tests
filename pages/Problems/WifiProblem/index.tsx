import React from 'react'
import { useAppTheme } from '../../../hooks/useTheme'
import { FC, useState, useEffect } from "react";
import { Keyboard, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { cs } from '../../../common/styles';
import { WifiProblemIcon } from '../../../icons';
import { fs } from '../../../navigation/AppNavigator';
import AppContainer from '../../../components/AppContainer';
import ButtonYellow from '../../../components/Buttons/ButtonYellow';

type WifiProblemProps = {
    refreshState: () => any
}
export const WifiProblem: FC<WifiProblemProps> = ({ refreshState }) => {
    const theme = useAppTheme()

    return (
        <View style={[cs.flexOne, cs.fCenterCol, { backgroundColor: theme.borderedBg }]}>
            <AppContainer>
                <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                    <WifiProblemIcon />
                    <Text style={[cs.fzS, fs.montR, cs.fwMedium, cs.txtCenter, { color: theme.title }]}>Отсутствует подключение к интернету. Пожалуйста проверьте настройки сети</Text>
                    <ButtonYellow handlePress={refreshState}>
                        <Text style={[cs.fzM, cs.yellowBtnText]}>Обновить</Text>
                    </ButtonYellow>
                </View>
            </AppContainer>

        </View>
    )
}
