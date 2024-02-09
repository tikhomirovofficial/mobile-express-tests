import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { checkToken, resetLoginCodeStatus, sendAuthCode, sendAuthPhone, setCodeFreezedSecs, setCodeIsFreezed } from '../../app/features/login/loginSlice';
import { resetAcceptedErr } from '../../app/features/access/accessSlice';
import { useInterval } from '../../hooks/useInterval';
import ButtonYellow from '../../components/Buttons/ButtonYellow';

const CodePhoneAccept: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state.login)
    const [code, setCode] = useState<string[]>(["", "", "", ""])
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [sended, setSended] = useState(false);
    const inputRefs = useRef<TextInput[]>([]);

    const handleCodeInput = (text: string, index: number) => {
        if (/^\d*$/.test(text) && text.length <= 1) {
            setCode(prevCode => {
                const newCode = [...prevCode];
                newCode[index] = text;

                if (text !== '' && index < inputRefs.current.length - 1) {
                    const nextInput = inputRefs.current[index + 1];
                    nextInput?.focus();
                } else if (text === '' && index > 0) {
                    const prevInput = inputRefs.current[index - 1];
                    prevInput?.focus();
                }

                return newCode;
            });
        }
    };

    const handleNewCode = () => {
        if (!auth.code_options.is_freezed) {
            dispatch(sendAuthPhone({ phone: auth.form.phone }))
            dispatch(setCodeIsFreezed(true))
            dispatch(setCodeFreezedSecs(5))
            setCode(["", "", "", ""])
            return;
        }
    }

    const handleBackspace = (index: number) => {
        if (index > 0 && code[index] === '') {
            const prevInput = inputRefs.current[index - 1];
            prevInput?.focus();
        }

        setCode(prevCode => {
            const newCode = [...prevCode];
            newCode[index] = '';
            return newCode;
        });
    };

    const handleSendCode = () => {
        dispatch(sendAuthCode({
            username: auth.form.phone,
            password: code.join("")
        }))
    }

    useEffect(() => {
        if (auth.success.code) {
            //dispatch(checkToken())
        }
    }, [auth.success.code])

    useInterval(() => {
        if (auth.code_options.is_freezed && auth.code_options.freezed_sec > 0) {
            dispatch(setCodeFreezedSecs(auth.code_options.freezed_sec - 1))
        } else {
            dispatch(setCodeIsFreezed(false))
            dispatch(setCodeFreezedSecs(0))
        }
    }, 1000);

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

    useEffect(() => {
        inputRefs.current[0].focus()
    }, [])

    useEffect(() => {
        if (code.filter(item => item !== "").length === 4) {
            if (!sended && auth.success.code === null) {
                if (keyboardStatus) {
                    Keyboard.dismiss()
                }
                if (!keyboardStatus) {
                    setSended(true)
                    handleSendCode()
                }
            }
            return
        }
        if (auth.success.code === false) {
            dispatch(resetLoginCodeStatus())
        }
        setSended(false)
    }, [code, keyboardStatus, sended, auth.success.code])


    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Код из СМС</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32 }]}>
                        <View style={[cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.fzS, fs.montR, cs.fwMedium, (auth.success.code === false ? cs.colorRed : null)]} aria-label="Label for Usernam"
                                    nativeID="labelFirstName">
                                    {
                                        auth.success.code !== false ? ` Введите код из СМС ${auth.form.maskedPhone}` :
                                            "Неверный код!"
                                    }

                                </Text>
                                <View style={[cs.fRowBetw]}>
                                    {
                                        code.map((item, index) => (
                                            <TextInput onKeyPress={(e) => {
                                                if (e.nativeEvent.key === 'Backspace') {
                                                    handleBackspace(index);
                                                }
                                            }} value={item} onChangeText={(text) => handleCodeInput(text, index)} ref={(ref) => (inputRefs.current[index] = ref as TextInput)} keyboardType={"numeric"} maxLength={1} accessibilityLabelledBy={"labelFirstName"} placeholder={item}
                                                style={[cs.inputField, cs.fzM, fs.montR, cs.txtCenter, styles.smsCodeField, cs.fwBold, (auth.success.code === false ? [cs.errBorderColor, cs.colorRed] : null)]} />
                                        ))
                                    }
                                </View>

                            </View>

                            <ButtonYellow disabled={auth.code_options.is_freezed} handlePress={handleNewCode}>
                                <Text style={[cs.fzM, cs.yellowBtnText]}>Отправить код еще раз {auth.code_options.is_freezed ? `(${auth.code_options.freezed_sec} сек)` : null}</Text>
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

const styles = StyleSheet.create({
    smsCodeField: {
        fontSize: 36,
        minWidth: "23.6%",
        padding: 0,
        paddingVertical: 8
    }
})
export default CodePhoneAccept;