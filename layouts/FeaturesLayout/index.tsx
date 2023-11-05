import React, {FC, ReactNode, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ContentWrapper from "../../components/ContentWrapper";
import AppContainer from "../../components/AppContainer";
import {cs} from "../../common/styles";
import {CheckboxIcon} from "../../icons";

interface WelcomeStepProps {
    title: string,
    features: Array<string>
    step?: number,
    buttonContent: ReactNode
    image: string
}

const FeauturesLayout: FC<WelcomeStepProps> = ({title, image, step, features, buttonContent}) => {
    useEffect(() => {

    }, [])
    return (

        <View style={{flex: 1}}>
            <View style={styles.backgroundWrapper}>
                <ImageBackground style={[styles.background]} resizeMode={"cover"}
                                 source={require(`../../assets/step_1.jpg`)}>
                    <LinearGradient start={{x: 0.18, y: 0}}
                                    end={{x: 0, y: 0.8}}
                                    style={{height: "80%", position: "absolute", bottom: 0, left: 0, width: "100%"}}
                                    colors={['rgba(255, 0, 0, 0.0)', 'white']}>

                    </LinearGradient>
                    <ContentWrapper style={{height: "100%"}}>
                        <AppContainer style={{height: "100%"}}>
                            <View style={[cs.fColumnBetw, {flex: 1, paddingBottom: 30}]}>
                                <Text style={[styles.textSkip, cs.textYellow]}
                                      onPress={() => alert("sas")}>Пропустить</Text>
                                <Text style={[cs.fwBold, cs.fzXL, styles.welcomeStepTitle]}>{title}</Text>
                            </View>


                        </AppContainer>
                    </ContentWrapper>

                </ImageBackground>

            </View>

            <AppContainer style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
                <View style={[cs.fColumn, styles.welcomeStepFeatures]}>
                    {features.map(item => (
                        <View key={item} style={[cs.dF, {flexDirection: "row", gap: 8}]}>
                            <CheckboxIcon/>
                            <Text style={[cs.fzM, styles.welcomeStepFeatureText]}>{item}</Text>
                        </View>
                    ))}


                </View>
                <View style={[cs.fCenterCol, {flexDirection: "row", gap: 13}]}>
                    {
                        Array(3).fill(0).map((item, index) => (
                            <View key={index}
                                  style={[styles.sliderDot, (index === step ? styles.sliderDotActive : null)]}></View>
                        ))
                    }
                </View>
                <View>
                    {buttonContent}
                </View>
            </AppContainer>
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
        backgroundColor: "blue",
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
        backgroundColor: "red"
    },
    sliderDot: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: "rgba(54, 202, 203, 1)"
    },
    sliderDotActive: {
        transform: "scale(1.8)"
    },

});
export default FeauturesLayout;