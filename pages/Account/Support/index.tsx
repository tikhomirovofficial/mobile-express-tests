import React, {useEffect} from 'react';
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import {Animated, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {cs} from "../../../common/styles";
import {useAppDispatch, useAppSelector} from "../../../app/base/hooks";
import {fs} from "../../../navigation/AppNavigator";
import {LinearGradient} from "expo-linear-gradient";
import {TelegramIcon, WhatsappIcon} from "../../../icons";

const Support = () => {
    const dispatch = useAppDispatch()


    const toTelegram = () => Linking.openURL("https://google.com")
    const toWhatsapp= () => Linking.openURL("https://google.com")


    return (
        <Animated.ScrollView>
            <WhiteBorderedLayout style={{
                paddingTop: 32
            }}>

                <View style={[cs.spaceM, cs.fColumn]}>
                    <Text style={cs.title}>Поддержка</Text>
                    <View style={[styles.supportContent]}>
                        <Text style={[cs.colorGray, cs.fzS, fs.montR]}>Если у вас возникли вопросы или вам нужна помощь
                            в работе приложения, то вы можете связаться с нами удобным способом</Text>
                        <View style={[cs.fRowBetw, cs.spaceM]}>
                            <TouchableOpacity onPress={toTelegram} style={[cs.flexOne, styles.linkBlock]}>
                                <LinearGradient start={{x: 0.2, y: 1.2}}
                                                end={{x: -0.2, y: 0.2}}
                                                colors={["#37AEE2", "#1E96C8"]}
                                                style={[styles.linkBlockContainer]}
                                >
                                    <View style={[cs.fColumn, cs.fAlCenter, cs.spaceM]}>
                                        <TelegramIcon/>
                                        <View style={[cs.fColumn, cs.fAlCenter]}>
                                            <Text style={[cs.fzS, cs.colorWhite, fs.montR]}>Связаться в</Text>
                                            <Text style={[cs.fzS, cs.colorWhite, fs.montR, cs.fwMedium]}>Telegram</Text>
                                        </View>
                                    </View>

                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toWhatsapp} style={[cs.flexOne, styles.linkBlock]}>
                                <LinearGradient start={{x: 0.4, y: 1.4}}
                                                end={{x: 0, y: 0}}
                                                colors={["#25CF43", "#61FD7D"]}
                                                style={[styles.linkBlockContainer]}
                                >
                                    <View style={[cs.fColumn, cs.fAlCenter, cs.spaceM]}>
                                        <WhatsappIcon/>
                                        <View style={[cs.fColumn, cs.fAlCenter]}>
                                            <Text style={[cs.fzS, cs.colorWhite, fs.montR]}>Связаться в</Text>
                                            <Text style={[cs.fzS, cs.colorWhite, fs.montR, cs.fwMedium]}>WhatsApp</Text>
                                        </View>
                                    </View>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </WhiteBorderedLayout>
        </Animated.ScrollView>

    );
};
const styles = StyleSheet.create({
    supportContent: {
      gap: 24
    },
    linkBlock: {
        borderRadius: 16,
        overflow: "hidden"
    },
    linkBlockContainer: {
        paddingVertical: 20,
    }
})
export default Support;