import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from '../../components/Buttons/ButtonYellow';
import { SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import MaskInput from 'react-native-mask-input';
import { createNumberMask, Masks } from 'react-native-mask-input';
import { handleLoginForm, sendAuthPhone } from '../../app/features/login/loginSlice';

const phoneMask = ["+", /\d/, '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/];

const LoginPhone: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state.login)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const disabledBtn = auth.form.phone.length < 11

    const handleSendPhone = () => {
        dispatch(sendAuthPhone({ phone: auth.form.phone }))
    }

    useEffect(() => {
        if (auth.success.phone) {
            navigation.navigate("sms_login")
        }
    }, [auth.success.phone])

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
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Вход</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32 }]}>
                        <View style={[cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Usernam"
                                    nativeID="labelFirstName">Введите номер телефона, чтобы войти</Text>
                                <MaskInput
                                    value={auth.form.maskedPhone}
                                    placeholder={"+7"}
                                    keyboardType={"number-pad"}
                                    style={[cs.inputField, cs.fzM, fs.montR]}
                                    onChangeText={(masked: string, unmasked: string) => {
                                        if (masked.startsWith("+7")) {
                                            dispatch(handleLoginForm({ key: "maskedPhone", val: masked }))
                                            dispatch(handleLoginForm({ key: "phone", val: unmasked }))
                                        }

                                    }}
                                    mask={phoneMask}
                                />
                            </View>
                            <ButtonYellow disabled={disabledBtn} handlePress={handleSendPhone}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Продолжить</Text>
                            </ButtonYellow>
                        </View>
                        <Text style={[fs.montR, cs.fzXS, cs.fwMedium, cs.colorGray]}>
                            Нажав кнопку «Продолжить», вы соглашаетесь с <Text onPress={() => { }} style={cs.textYellow}>пользовательским соглашением </Text>
                            и подтверждаете, что ознакомились с <Text onPress={() => { }} style={cs.textYellow}>политикой конфиденциальности, </Text>
                            а также даёте <Text onPress={() => { }} style={cs.textYellow}>согласие на обработку своих персональных данных</Text>
                        </Text>
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};

export default LoginPhone;