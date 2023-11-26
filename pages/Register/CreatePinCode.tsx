import React, { ChangeEvent, FC, useEffect, useState, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import { useAppDispatch } from '../../app/base/hooks';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';
import { BackspaceIcon, CloseIcon } from '../../icons';

const CreatePinCode: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const [pin, setPin] = useState<string[]>(["", "", "", ""])
    const [acceptPin, setAcceptPin] = useState<string[]>(["", "", "", ""])
    const [isAccepting, setIsAccepting] = useState(false)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [incorrectAccept, setIncorrectAccept] = useState("")

    const nextStep = () => {
        alert("Дальше")
    }

    const handlePin = (digit: string) => {
        if (isAccepting) {
            setAcceptPin((prev) => {
                const filledCount = acceptPin.filter(item => item !== "").length
                if(digit === "reset") {
                    if (filledCount) {
                        return ["", "", "", ""]
                    }
                    return [...prev]
                }
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
            return;
        }
        setPin((prev) => {
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
        if (pin.every(item => item !== "")) {
            setIsAccepting(true)
        }

    }, [pin])

    useEffect(() => {
        const lengthsEquals = pin.filter(item => item !== "").length === acceptPin.filter(item => item !== "").length && acceptPin.filter(item => item !== "").length === 4
        if (lengthsEquals) {
            const pinsEquals = pin.join(",") === acceptPin.join(",")
            if(!pinsEquals) {
                setIncorrectAccept("Пин-код не совпадает!")
                return;
            }
            nextStep()
            return;
        }
        setIncorrectAccept("")
    }, [acceptPin])

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
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Создайте пин-код</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32 }]}>
                        <View style={[cs.spaceXXL]}>
                            <View style={[cs.spaceM]}>
                                <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                                    <Text style={[cs.fzS, fs.montR, cs.fwMedium, cs.txtCenter, styles.pinLabel]} aria-label="Label for Usernam"
                                        nativeID="labelFirstName">Для безопасного входа необходимо придумать код</Text>

                                </View>
                                <View style={[cs.fRow, cs.spaceXL, cs.jcCenter]}>
                                    {
                                        pin.map(item => (
                                            <View style={[styles.pinDot, (item !== "" ? cs.bgYellow : null)]}></View>
                                        ))
                                    }

                                </View>
                            </View>
                            {
                                isAccepting ?
                                    <View style={[cs.spaceM]}>
                                        <View style={[cs.fColumn, cs.spaceM, cs.fAlCenter]}>
                                            <Text style={[cs.fzS, fs.montR, cs.fwMedium, cs.txtCenter, styles.pinLabel, (incorrectAccept ? cs.textRed : null)]} aria-label="Label for Usernam"
                                                nativeID="labelFirstName">{incorrectAccept || "Повторите код доступа"}</Text>

                                        </View>
                                        <View style={[cs.fRow, cs.spaceXL, cs.jcCenter]}>
                                        {
                                        acceptPin.map(item => (
                                            <View style={[styles.pinDot, (item !== "" ? cs.bgYellow : null), (incorrectAccept ? cs.bgRed : null)]}></View>
                                        ))
                                    }
                                        </View>
                                    </View> : null
                            }

                        </View>
                        <View style={[cs.fColumn, cs.spaceXXL, styles.pinTable]}>
                            <View style={[cs.fColumn, cs.spaceXL]}>
                                <View style={[cs.fRowBetw]}>
                                    <TouchableOpacity onPress={() => handlePin("1")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("2")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("3")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>3</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <TouchableOpacity onPress={() => handlePin("4")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>4</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("5")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>5</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("6")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>6</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <TouchableOpacity onPress={() => handlePin("7")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>7</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("8")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>8</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("9")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>9</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[cs.fRowBetw]}>
                                    <TouchableOpacity onPress={() => handlePin("reset")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <CloseIcon width={30} height={27} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("0")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <Text style={[styles.pinKey, cs.textYellow, fs.montR]}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handlePin("clear")} style={[styles.pinKeyBtn, cs.fCenterCol]}>
                                        <BackspaceIcon width={30} height={27} />
                                    </TouchableOpacity>
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
    pinTable: {
        paddingBottom: 40
    },
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
export default CreatePinCode;