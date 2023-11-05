import React, {FC, ReactNode} from 'react';
import {cs} from "../../common/styles";
import {LinearGradient} from "expo-linear-gradient";
import {Text, TouchableOpacity} from "react-native";

type ButtonYellowProps = {
    children: ReactNode,
    handlePress: () => any
}
const ButtonYellow: FC<ButtonYellowProps> = ({children, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <LinearGradient start={{x: 0.2, y: 1}}
                            end={{x: 0.24, y: -0.4}}
                            style={[cs.yellowBtn, cs.fCenterCol]}
                            colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ButtonYellow;