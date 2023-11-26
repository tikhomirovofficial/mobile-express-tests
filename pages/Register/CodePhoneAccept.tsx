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
    const dispatch = useAppDispatch()
    const [code, setCode] = useState<string[]>(["", "", "", ""])
    const inputRefs = useRef<TextInput[]>([]);

    const handleToMyPatients = () => {
        navigation.navigate("home")
    }
   
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
                                            <TextInput  ref={(ref) => (inputRefs.current[index] = ref as TextInput)}  keyboardType={"numeric"} maxLength={1} accessibilityLabelledBy={"labelFirstName"} placeholder={item}
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