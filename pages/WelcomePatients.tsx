import React from 'react';
import WelcomeStep from "../layouts/WelcomeStep";
import {Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {commonStyles} from "../common/styles";

const WelcomePatients = () => {
    return (
        <WelcomeStep features={[
                        "Лучшее 1",
                        "Лучшее 2",
                    ]}
                     step={0}
                     title={"Работа с вашими пациентами"}
                     buttonContent={
                         <TouchableOpacity>
                             <LinearGradient style={[commonStyles.yellowBtn, commonStyles.fCenterCol]}
                                             colors={["#FB0", "#FFCB3D", "#FFDA75"]}>
                                 <Text style={[commonStyles.fzM, commonStyles.yellowBtnText]}>Далее</Text>
                             </LinearGradient>
                         </TouchableOpacity>
                     }/>
    );
};

export default WelcomePatients;