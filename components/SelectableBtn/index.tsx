import React, { FC, ReactNode } from 'react';
import { cs } from "../../common/styles";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import ButtonYellow from '../Buttons/ButtonYellow';

type SelectableBtnProps = {
    isFilled?: boolean,
    style?: ViewStyle[],
    text: string
    handlePress: () => any
}
const SelectableBtn: FC<SelectableBtnProps> = ({ handlePress, text, style, isFilled = true }) => {

    if (isFilled) {
        return (
            <ButtonYellow isFilled={true} handlePress={handlePress} style={[cs.flexOne, {width: "100%"}, style as ViewStyle]}>
                <Text style={[cs.fzM, cs.yellowBtnText, cs.colorBlack]}>{text}</Text>
            </ButtonYellow>
        );
    }
    return (
        <TouchableOpacity onPress={handlePress} style={[cs.yellowBtn, cs.fCenterCol, styles.unfilledButton, style]}>
            <Text style={[cs.fzM, cs.yellowBtnText, cs.textYellow]}>{text}</Text>
        </TouchableOpacity>
    )

};
const styles = StyleSheet.create({
    unfilledButton: {
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderColor: "#FFCB3D",
        borderWidth: 1
    }
})
export default SelectableBtn;