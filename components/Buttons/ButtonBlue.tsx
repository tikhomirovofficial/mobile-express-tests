import React, { FC, ReactNode } from 'react';
import { cs } from "../../common/styles";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, ViewStyle, View } from "react-native";

type ButtonblueProps = {
    children: ReactNode,
    isFilled?: boolean,
    style?: ViewStyle | ViewStyle[],
    disabled?: boolean,
    handlePress: () => any
}
const Buttonblue: FC<ButtonblueProps> = ({ children, handlePress, style, isFilled = true, disabled }) => {
    if (disabled) {
        return (
            <View style={[cs.yellowBtn, cs.fCenterCol, cs.bgDisabled]}>
                {children}
            </View>
        )

    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <LinearGradient start={{ x: 0.2, y: 1 }}
                end={{ x: 0.24, y: -0.4 }}
                style={[cs.yellowBtn, cs.fCenterCol, style]}
                colors={["#12B2B3", "#56E0E0"]}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );


};
const styles = StyleSheet.create({

})
export default Buttonblue;