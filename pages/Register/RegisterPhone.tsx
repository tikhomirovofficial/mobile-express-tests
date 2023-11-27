import React, { FC, useEffect, useState} from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, Keyboard} from "react-native";
import { useAppDispatch } from '../../app/base/hooks';
import { handlePatientInvitingModal } from '../../app/features/modals/modalsSlice';
import { cs } from '../../common/styles';
import AppContainer from '../../components/AppContainer';
import PatientInvitingModal from '../../components/Modals/PatientInvitingModal';
import PatientItem from '../../components/PatientItem';
import ButtonYellow from '../../components/SelectableBtn';
import { SearchIcon } from '../../icons';
import { fs } from '../../navigation/AppNavigator';
import { NavProps } from '../../types/common.types';
import { LinearGradient } from 'expo-linear-gradient';
import WhiteBorderedLayout from '../../layouts/WhiteBordered';

const LoginPhone: FC<NavProps> = ({ navigation }) => {
    const dispatch = useAppDispatch()

    const handleToCode = () => {
        navigation.navigate("sms_login")
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
    

    return (
        <Animated.ScrollView contentContainerStyle={{ minHeight: "100%" }}>
            <View style={[cs.fColumn, cs.spaceM, { minHeight: "100%" }]}>
                <WhiteBorderedLayout
                    topContent={
                        <AppContainer style={{ paddingBottom: 0 }}>
                            <View style={[cs.fCenterCol]}>
                                <Text style={[cs.fwSemi, cs.fwSemi, cs.fzXL]}>Вход</Text>
                            </View>
                        </AppContainer>
                    }
                    style={{ paddingTop: 40, maxHeight: "100%"}}>
                    <View style={[cs.fColumnBetw, cs.flexOne, {minHeight: !keyboardStatus ? "100%" : "99%", paddingBottom: 32}]}>
                        <View style={[cs.spaceM]}>
                            <View style={[cs.fColumn, cs.spaceM]}>
                                <Text style={[cs.fzS, fs.montR, cs.fwMedium]} aria-label="Label for Usernam"
                                    nativeID="labelFirstName">Введите номер телефона, чтобы войти</Text>
                                <TextInput keyboardType={"number-pad"} accessibilityLabelledBy={"labelFirstName"} placeholder={"+7"}
                                    style={[cs.inputField, cs.fzM, fs.montR]} />
                            </View>
                            <TouchableOpacity onPress={handleToCode}>
                                <LinearGradient style={[cs.yellowBtn, cs.fCenterCol]}
                                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                    <Text style={[cs.fzM, cs.yellowBtnText]}>Продолжить</Text>
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

export default LoginPhone;