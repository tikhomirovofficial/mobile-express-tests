import React, { FC, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, Keyboard, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { BackspaceIcon, CloseIcon, TouchIdIcon } from '../../icons';
import { checkBioEntered, checkValidEnteredPin, resetAcceptedErr } from '../../app/features/access/accessSlice';
import { vibrate } from '../../utils/device/vibrate';
import { useAppTheme } from '../../hooks/useTheme';
import { useLogout } from '../../hooks/useLogout';
import { FACEID_TYPE, FINGERPRINT_TYPE } from '../../common/contants';
import * as LocalAuthentication from 'expo-local-authentication';

const AcceptPinCode: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const [pin, setPin] = useState<string[]>(["", "", "", ""])
    const [_, setKeyboardStatus] = useState(false);
    const { accepted: { error, sending }, bio } = useAppSelector(state => state.access)

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
        (async () => {
            if (bio.device_compatible) {
                if (bio.device_supported_types?.includes(FACEID_TYPE)) {
                    dispatch(checkBioEntered(2))
                }
            }
        })()

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
                                {
                                    sending ?
                                        <View style={[cs.fCenterRow]}>
                                            <ActivityIndicator color={cs.bgYellow.backgroundColor} />
                                        </View>
                                        :
                                        <View style={[cs.fRow, cs.spaceXL, cs.jcCenter]}>
                                            {
                                                pin.map(item => (
                                                    <View style={[styles.pinDot, (!error ? item !== "" ? cs.bgYellow : null : cs.errBg)]}></View>
                                                ))
                                            }
                                        </View>
                                }
                            </View>
                        </View>
                        <View style={[cs.fColumn, cs.spaceL, cs.fAlCenter,]}>
                            <View style={[cs.fColumn, cs.spaceL, { maxWidth: "85%" }]}>
                                <View style={[cs.fRowBetw, cs.spaceXXL, { width: "100%" }]}>
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
                                <View style={[cs.fRowBetw, cs.spaceXXL, { width: "100%" }]}>
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
                                <View style={[cs.fRowBetw, cs.spaceXXL, { width: "100%" }]}>
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
                                <View style={[cs.fRowBetw, cs.spaceXXL, { width: "100%" }]}>
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
                                <View style={[(bio.device_supported_types?.includes(FINGERPRINT_TYPE) ? cs.fRowBetw : cs.fCenterRow), cs.spaceXXL, cs.fAlCenter, { width: "100%" }]}>
                                    {
                                        bio.device_supported_types?.includes(FINGERPRINT_TYPE) ?
                                            <TouchableOpacity onPress={() => dispatch(checkBioEntered(1))} style={[styles.pinKeyBtn, cs.fCenterCol, { backgroundColor: theme.pin_btns }]}>
                                                <TouchIdIcon width={35} height={35} />
                                            </TouchableOpacity> : null
                                    }

                                    <Text onPress={handleLogout} style={[cs.textRed, fs.montR]}>Выйти</Text>
                                </View>
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