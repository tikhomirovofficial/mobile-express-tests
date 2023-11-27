import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';

const CodePhoneAccept: FC<NavProps> = ({ navigation }) => {
    const [code, setCode] = useState<string[]>(["", "", "", ""])
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
    useEffect(() => {
        inputRefs.current[0].focus()
    }, [])
    


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
                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Usernam"
                                    nativeID="labelFirstName">Введите код из СМС +7 951 735-89-45</Text>
                                <View style={[cs.fRowBetw]}>
                                    {
                                        code.map((item, index) => (
                                            <TextInput onKeyPress={(e) => {
                                                if (e.nativeEvent.key === 'Backspace') {
                                                    handleBackspace(index);
                                                }
                                            }} value={item} onChangeText={(text) => handleCodeInput(text, index)} ref={(ref) => (inputRefs.current[index] = ref as TextInput)} keyboardType={"numeric"} maxLength={1} accessibilityLabelledBy={"labelFirstName"} placeholder={item}
                                                style={[cs.inputField, cs.fzM, fs.montR, cs.txtCenter, styles.smsCodeField, cs.fwBold]} />
                                        ))
                                    }
                                </View>

                            </View>
                            <TouchableOpacity>
                                <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                    <Text style={[cs.fzM, cs.yellowBtnText]}>Отправить код</Text>
                                </LinearGradient>
                            </TouchableOpacity>
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
        padding: 0,
        paddingVertical: 8
    }
})
export default CodePhoneAccept;