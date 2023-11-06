import React, {FC, ReactNode} from 'react';
import {cs} from "../../common/styles";
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";

type SelectableBtnProps = {
    isFilled?: boolean,
    style?: ViewStyle,
    text: string
    handlePress: () => any
}
const ButtonYellow: FC<SelectableBtnProps> = ({handlePress, text, style, isFilled = true}) => {

    if(isFilled) {
        return (
            <TouchableOpacity onPress={handlePress}>
                <LinearGradient start={{x: 0.2, y: 1}}
                                end={{x: 0.24, y: -0.4}}
                                style={[cs.yellowBtn, cs.fCenterCol, style]}
                                colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                    <Text style={[cs.fzM, cs.yellowBtnText]}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity onPress={handlePress}  style={[cs.yellowBtn, cs.fCenterCol, styles.unfilledButton, style]}>
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
export default ButtonYellow;