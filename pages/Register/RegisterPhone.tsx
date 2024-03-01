import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, View, Keyboard, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import ButtonYellow from '../../components/Buttons/ButtonYellow';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { handleLoginForm, resetLoginPhoneStatus, sendAuthPhone, setCodeFreezedSecs, setCodeIsFreezed } from '../../app/features/login/loginSlice';
import { phoneMask } from '../../rules/masks.rules';
import { InputField } from '../../components/InputField';
import { useAppTheme } from '../../hooks/useTheme';



const LoginPhone: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { auth } = useAppSelector(state => state.login)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const disabledBtn = auth.form.phone.length < 11

    const handleSendPhone = () => {
        dispatch(sendAuthPhone({ username: auth.form.phone }))
    }

    useEffect(() => {
        if (auth.success.phone) {
            navigation.navigate("sms_login")
            dispatch(resetLoginPhoneStatus())
            dispatch(setCodeIsFreezed(true))
            dispatch(setCodeFreezedSecs(5))
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
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>Вход</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32 }]}>
                        <View style={[cs.spaceM]}>
                            <InputField
                                error={auth.errors.phone}
                                mask={phoneMask}
                                label={"Введите номер телефона, чтобы войти"}
                                val={auth.form.maskedPhone}
                                idInput={"login-phone"}
                                type={"number-pad"}
                                placeholder={"+7"}
                                onChange={(masked: string, unmasked: string | undefined) => {
                                    if (masked.startsWith("+7")) {
                                        dispatch(handleLoginForm({ key: "maskedPhone", val: masked }))
                                        dispatch(handleLoginForm({ key: "phone", val: String(unmasked) }))
                                    }

                                }}
                            />

                            <ButtonYellow style={{ minHeight: 54 }} disabled={disabledBtn || auth.loading} handlePress={handleSendPhone}>
                                {auth.loading ? <ActivityIndicator color={"black"} /> : <Text style={[cs.fzM, cs.yellowBtnText]}>Продолжить</Text>}

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