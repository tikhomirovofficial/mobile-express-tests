import React, { FC, ReactNode, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ContentWrapper from "../../components/ContentWrapper";
import AppContainer from "../../components/AppContainer";
import { cs } from "../../common/styles";
import { CheckboxIcon } from "../../icons";

interface WelcomeStepProps {
    features: Array<string>
    step?: number
}

const FeauturesLayout: FC<WelcomeStepProps> = ({ step, features }) => {
    useEffect(() => {

    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={[{ flex: 1, flexDirection: "column", justifyContent: "space-between", gap: 15}]}>
                <View style={[cs.fColumn, styles.welcomeStepFeatures]}>
                    {features.map(item => (
                        <View key={item} style={[cs.dF, { flexDirection: "row", gap: 8 }]}>
                            <CheckboxIcon />
                            <Text style={[cs.fzM, styles.welcomeStepFeatureText]}>{item}</Text>
                        </View>
                    ))}
                </View>
                {step !== undefined ?
                    <View style={[cs.fCenterCol, { flexDirection: "row", gap: 13 }]}>
                        {
                            Array(3).fill(0).map((item, index) => (
                                <View key={index}
                                    style={[cs.sliderDot, (index === step ? cs.sliderDotActive : null)]}></View>
                            ))
                        }
                    </View> : null
                }

            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    welcomeStepFeatures: {
        gap: 15,
        marginTop: 20,
        flex: 0.72,
    },
    welcomeStepFeatureText: {
        fontFamily: "MontserratMedium",
        marginTop: -3,
        flex: 1
    },
    textSkip: {
        fontFamily: "MontserratBold",
        paddingBottom: 40
    },
    backgroundWrapper: {
        borderBottomLeftRadius: 40,
        maxHeight: "52%",
        overflow: "hidden",
        position: "relative",
        shadowColor: "rgba(0, 64, 128, 0.3)",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    welcomeStepTitle: {
        fontFamily: "MontserratBold",
        maxWidth: "90%"
    },
    background: {
        height: "100%",
        width: "100%",
    },
    contentWelcome: {
    }

});
export default FeauturesLayout;