import React, { FC, ReactNode } from 'react';
import { cs } from "../../common/styles";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, View } from "react-native";

type ButtonYellowProps = {
    children: ReactNode,
    isFilled?: boolean,
    style?: ViewStyle | ViewStyle[],
    disabled?: boolean,
    handlePress: () => any
}
const ButtonYellow: FC<ButtonYellowProps> = ({ children, handlePress, style, isFilled = true, disabled }) => {
    if (disabled) {
        return (
            <View style={[cs.yellowBtn, cs.fCenterCol, cs.bgDisabled]}>
                {children}
            </View>
        )

    }
    if (isFilled) {
        return (
            <TouchableOpacity onPress={handlePress}>
                <LinearGradient start={{ x: -1, y: -0.3 }}
                    end={{ x: 1.7, y: .3 }}
                    style={[cs.yellowBtn, cs.fCenterCol, style]}
                    colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                    {children}
                </LinearGradient>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity onPress={handlePress} style={[cs.yellowBtn, cs.fCenterCol, styles.unfilledButton, style]}>
            {children}
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