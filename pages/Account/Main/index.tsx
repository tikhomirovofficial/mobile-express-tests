import React, {useEffect, useState} from 'react';
import WhiteBordered from "../../../layouts/WhiteBordered";
import {Animated, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {Logo} from "../../../icons";
import AnalysisCard from "../../../components/Cards/AnalysisCard";

const Main = () => {
    const [infoOrderOpened, setInfoOrderOpened] = useState(false)
    const scaleValue = new Animated.Value(1);

    useEffect(() => {
        if (infoOrderOpened) {
            Animated.spring(scaleValue, {
                toValue: .8,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true
            }).start();
        }
    }, [infoOrderOpened, scaleValue]);
    return (
        <Animated.ScrollView style={{transform: [{scale: scaleValue}]}}>
            <WhiteBordered style={{
                paddingTop: 32
            }}>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text style={cs.title}>Вячеслав, добрый день!</Text>
                    <View style={[cs.fRowBetw, styles.buttonsTopContainer]}>
                        <TouchableOpacity
                            style={[
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne,
                                styles.buttonDark
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.colorWhite, cs.txtCenter]}>Пригласить в Экспресс Тест</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonWhite,
                                cs.fColumn,
                                styles.buttonTop,
                                cs.flexOne
                            ]}>
                            <Logo/>
                            <Text style={[cs.fzS, cs.txtCenter]}>Назначить анализы</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[cs.spaceL, cs.fColumn]}>
                    <Text onPress={() => setInfoOrderOpened(true)} style={cs.title}>Заказы анализов</Text>
                    <View style={[cs.fColumn, cs.spaceM]}>
                        <AnalysisCard/>
                        <AnalysisCard/>
                        <AnalysisCard/>
                    </View>
                </View>
            </WhiteBordered>
            <Modal style={{
                backgroundColor: "black",

            }} animationType={"slide"} visible={infoOrderOpened} transparent={true}>
                <WhiteBordered style={cs.modalSlidedBottom}>
                    <Text onPress={() => setInfoOrderOpened(false)}
                          style={[cs.yellowBtnText, cs.textYellow]}>Закрыть</Text>
                </WhiteBordered>
            </Modal>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    buttonsTopContainer: {
        gap: 16,
        marginBottom: 48
    },
    buttonTop: {
        padding: 20,
        alignItems: "center",
        overflow: "hidden",
        gap: 10,
        borderRadius: 16
    },
    buttonDark: {
        backgroundColor: "#4D4D4D",
    },
    buttonWhite: {
        shadowColor: "rgb(19, 101, 101)",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 20,
        backgroundColor: "white",
        shadowRadius: 7,
        elevation: 7,
    }
})
export default Main;