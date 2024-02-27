import { FC, useState, useEffect } from "react";
import { Keyboard, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../app/base/hooks";
import { sendAuthPhone, resetLoginPhoneStatus, handleLoginForm } from "../../../app/features/login/loginSlice";
import { cs } from "../../../common/styles";
import AppContainer from "../../../components/AppContainer";
import ButtonYellow from "../../../components/Buttons/ButtonYellow";
import { InputField } from "../../../components/InputField";
import WhiteBorderedLayout from "../../../layouts/WhiteBordered";
import { phoneMask } from "../../../rules/masks.rules";
import { NavProps } from "../../../types/common.types";
import { checkPatientExists, handleCreateInvitingForm } from "../../../app/features/inviting/invitingSlice";
import { extractDigits } from "../../../utils/normalizePhone";
import { ArrowLeft } from "../../../icons";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "../../../hooks/useTheme";
import { BackButton } from "../../../components/BackButton";



const CheckExistsPatient: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const theme = useAppTheme()
    const { already_exists, form } = useAppSelector(state => state.inviting)
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const disabledBtn = form.text_fields.phone.length < 11
    
    const toBackScreen = () => {
        navigation.goBack()
    }
    const handleCheckExistsPatient = () => {
        dispatch(checkPatientExists({ phone: extractDigits(form.text_fields.phone) }))
    }

    useEffect(() => {
        if (already_exists.val === false) {
            navigation.navigate("inviting")
            return
        }
        if (already_exists.val === true) {
            navigation.navigate("inviting_linked")
        }
    }, [already_exists.val])


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
                            <View style={[cs.fRow, cs.spaceM, cs.fAlCenter]}>
                                <BackButton handleBack={toBackScreen}/>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL, {color: theme.title}]}>Пригласить пациента</Text>
                                <View style={{width: 1, height: 1}}></View>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%" }}>
                    <View style={[cs.fColumnBetw, cs.flexOne, { minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32 }]}>
                        <View style={[cs.spaceM]}>
                            <InputField
                                error={already_exists.err}
                                mask={phoneMask}
                                label={"Введите номер телефона пациента"}
                                val={form.text_fields.phone}
                                idInput={"patient-phone"}
                                type={"number-pad"}
                                placeholder={"+7"}
                                onChange={val => dispatch(handleCreateInvitingForm({ key: "phone", val }))}
                            />

                            <ButtonYellow style={{ minHeight: 54 }} disabled={disabledBtn || already_exists.sending} handlePress={handleCheckExistsPatient}>
                                {already_exists.sending ? <ActivityIndicator color={"black"} /> : <Text style={[cs.fzM, cs.yellowBtnText]}>Продолжить</Text>}
                            </ButtonYellow>
                        </View>
                        {/* <Text style={[fs.montR, cs.fzXS, cs.fwMedium, cs.colorGray]}>
                            Нажав кнопку «Продолжить», вы соглашаетесь с <Text onPress={() => { }} style={cs.textYellow}>пользовательским соглашением </Text>
                            и подтверждаете, что ознакомились с <Text onPress={() => { }} style={cs.textYellow}>политикой конфиденциальности, </Text>
                            а также даёте <Text onPress={() => { }} style={cs.textYellow}>согласие на обработку своих персональных данных</Text>
                        </Text> */}
                    </View>
                </WhiteBorderedLayout>
            </View>
        </Animated.ScrollView>

    );
};

export default CheckExistsPatient;