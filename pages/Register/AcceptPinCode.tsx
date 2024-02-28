import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { BackspaceIcon, CloseIcon, LogoutIcon } from '../../icons';
import { checkValidEnteredPin, resetAcceptedErr } from '../../app/features/access/accessSlice';
import * as Haptics from 'expo-haptics';
import { vibrate } from '../../utils/device/vibrate';
import { useTheme } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useTheme';
import { useLogout } from '../../hooks/useLogout';

const AcceptPinCode: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const [pin, setPin] = useState<string[]>(["", "", "", ""])
    const [_, setKeyboardStatus] = useState(false);
    const { error } = useAppSelector(state => state.access.accepted)

    const { handleLogout } = useLogout()

    const handlePin = (digit: string) => {
        vibrate(80)
        setPin((prev) => {
            if (digit === "reset") {
                return ["", "", "", ""]
            }
            const filledCount = pin.filter(item => item !== "").length

            if (digit === "clear") {
                if (filledCount) {
                    prev[filledCount - 1] = ""
                    return [...prev]
                }
                return [...prev]
            }

            if (filledCount < pin.length) {
                prev[filledCount] = digit
                return [...prev]
            }
            return [...prev]
        })
    }

    useEffect(() => {
        if (pin.filter(item => item !== "").length === 4) {
            if (!error) {
                const pinStr = pin.join("")
                dispatch(checkValidEnteredPin(pinStr))
            }
            return
        }
        if (error) {
            dispatch(resetAcceptedErr())
        }

    }, [pin, error])

    useEffect(() => {
        Keyboard.dismiss()
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
                        <AppContainer style={{ paddingBottom: 32 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, { color: theme.title }]}>Подтвердите вход</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%", flex: 1 }}>
                    <View style={[cs.fColumnBetw, { paddingBottom: 32, height: "100%" }]}>
                        <View style={[cs.spaceXXL, cs.flexOne]}>
                            <View style={[cs.spaceM]}>
                                <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.fwMedium, cs.txtCenter, styles.pinLabel]} aria-label="Label for Usernam"
                                        nativeID="labelFirstName">{error || "Чтобы войти, введите пин-код"}</Text>

                                </View>
                                <View style={[cs.fRow, cs.spaceXL, cs.jcCenter]}>
                                    {
                                        pin.map(item => (
                                            <View style={[styles.pinDot, (!error ? item !== "" ? cs.bgYellow : null : cs.errBg)]}></View>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={[cs.fColumn, cs.spaceL]}>
                            <View style={[cs.fColumn, cs.spaceL]}>
                                <View style={[cs.fCenterRow, cs.spaceXXL]}>
                                    <TouchableOpacity onPress={() => handlePin("1")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("2")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("3")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>3</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fCenterRow, cs.spaceXXL]}>
                                    <TouchableOpacity onPress={() => handlePin("4")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>4</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("5")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>5</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("6")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>6</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fCenterRow, cs.spaceXXL]}>
                                    <TouchableOpacity onPress={() => handlePin("7")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>7</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("8")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>8</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("9")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>9</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fCenterRow, cs.spaceXXL]}>
                                    <TouchableOpacity onPress={() => handlePin("reset")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <CloseIcon width={30} height={27} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("0")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("clear")} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                        <BackspaceIcon width={30} height={27} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[cs.fCenterRow, cs.spaceXXL]}>
                                <Text onPress={handleLogout} style={[cs.textRed, fs.montR]}>Выйти</Text>
                            </View>
                        </View>

                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};

const styles = StyleSheet.create({
    pinLabel: {
        maxWidth: 254
    },
    pinDot: {
        height: 14,
        width: 14,
        borderRadius: 1000,
        backgroundColor: "#C7EDED"

    },
    pinKey: {
        fontSize: 32
    },
    pinKeyBtn: {
        height: 50,
        width: 50,
        borderRadius: 1000,
        backgroundColor: "#F4FAFA"
    }
})
export default AcceptPinCode;